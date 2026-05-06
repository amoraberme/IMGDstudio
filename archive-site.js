import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

import { JSDOM } from 'jsdom';

const TARGET_URL = 'https://www.quick14studio.com/';
const DIST_DIR = path.resolve('dist');

async function sanitize(html, assetMap) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Remove tracking scripts
    const trackers = [
        'google-analytics.com', 
        'googletagmanager.com', 
        'facebook.net',
        'analytics.js',
        'gtag/js',
        'fbevents.js'
    ];
    
    document.querySelectorAll('script').forEach(script => {
        const src = script.src || '';
        const text = script.textContent || '';
        if (trackers.some(t => src.includes(t) || text.includes(t))) {
            // console.log(`Removing tracker script: ${src || 'inline'}`);
            script.remove();
        }
    });

    // Remove iframes (often used for tracking/ads)
    document.querySelectorAll('iframe').forEach(iframe => {
        const src = iframe.src || '';
        if (trackers.some(t => src.includes(t))) {
            iframe.remove();
        }
    });
    
    // Rewrite paths
    const rewriteAttr = (el, attr) => {
        const val = el.getAttribute(attr);
        if (val && assetMap.has(val)) {
            el.setAttribute(attr, assetMap.get(val));
        } else if (val && val.startsWith('http')) {
            // Check for fuzzy matches if exact match fails (e.g. query params)
            for (const [originalUrl, localPath] of assetMap) {
                if (val.split('?')[0] === originalUrl.split('?')[0]) {
                    el.setAttribute(attr, localPath);
                    break;
                }
            }
        }
    };

    document.querySelectorAll('[src]').forEach(el => rewriteAttr(el, 'src'));
    document.querySelectorAll('[href]').forEach(el => rewriteAttr(el, 'href'));
    document.querySelectorAll('[srcset]').forEach(el => {
        const srcset = el.getAttribute('srcset');
        if (srcset) {
            const parts = srcset.split(',').map(part => {
                const [url, size] = part.trim().split(/\s+/);
                if (assetMap.has(url)) {
                    return `${assetMap.get(url)} ${size || ''}`.trim();
                }
                return part;
            });
            el.setAttribute('srcset', parts.join(', '));
        }
    });
    
    return dom.serialize();
}

async function run() {
    console.log('Starting browser...');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const assetsDir = path.join(DIST_DIR, 'assets');
    await fs.mkdir(assetsDir, { recursive: true });

    const assetMap = new Map();

    // Intercept assets
    page.on('response', async (response) => {
        const url = response.url();
        const contentType = response.headers()['content-type'] || '';
        const status = response.status();

        if (status === 200 && url.startsWith('http') && 
            (contentType.includes('image') || contentType.includes('font') || 
             contentType.includes('css') || contentType.includes('javascript'))) {
            try {
                const buffer = await response.body();
                const urlObj = new URL(url);
                let fileName = path.basename(urlObj.pathname);
                
                if (!fileName || fileName.length < 3) {
                    const ext = contentType.split('/')[1]?.split(';')[0] || 'bin';
                    fileName = `asset_${Math.random().toString(36).substring(7)}.${ext}`;
                }

                const filePath = path.join(assetsDir, fileName);
                await fs.writeFile(filePath, buffer);
                assetMap.set(url, `assets/${fileName}`);
            } catch (e) {
                // Some responses might not have a body or be closed
            }
        }
    });

    console.log(`Navigating to ${TARGET_URL}...`);
    try {
        await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 60000 });
        
        // Scroll to trigger lazy loading
        console.log('Scrolling to trigger lazy loading...');
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                let distance = 200;
                let timer = setInterval(() => {
                    let scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });

        // Wait a bit for final assets
        await page.waitForTimeout(2000);
        
        const content = await page.content();
        
        console.log('Sanitizing HTML and rewriting paths...');
        const sanitizedContent = await sanitize(content, assetMap);
        
        await fs.mkdir(DIST_DIR, { recursive: true });
        await fs.writeFile(path.join(DIST_DIR, 'index.html'), sanitizedContent);
        
        console.log(`Successfully captured and sanitized index.html with ${assetMap.size} assets`);
    } catch (error) {
        console.error('Error during crawl:', error);
    } finally {
        await browser.close();
    }
    console.log('Done.');
}

run();
