import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { JSDOM } from 'jsdom';
import crypto from 'crypto';

const TARGET_URL = 'https://www.quick14studio.com/';
const DIST_DIR = path.resolve('dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');

// Map of original URL to local asset path (relative to dist/)
const assetMap = new Map();

function getHash(data) {
    return crypto.createHash('md5').update(data).digest('hex');
}

async function downloadAsset(url, buffer, contentType) {
    if (assetMap.has(url)) return assetMap.get(url);

    const hash = getHash(buffer);
    const urlObj = new URL(url);
    let ext = path.extname(urlObj.pathname).split('?')[0];

    if (!ext) {
        ext = `.${contentType.split('/')[1]?.split(';')[0] || 'bin'}`;
    }
    
    const fileName = `${hash}${ext}`;
    const filePath = path.join(ASSETS_DIR, fileName);
    const localPath = `assets/${fileName}`;

    try {
        await fs.writeFile(filePath, buffer);
        assetMap.set(url, localPath);
        return localPath;
    } catch (e) {
        return url;
    }
}

async function discoverAndDownloadAssets(html, currentUrl, page) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const urls = new Set();

    const addUrl = (val) => {
        if (!val || val.startsWith('data:') || val.startsWith('#')) return;
        try {
            const absoluteUrl = new URL(val, currentUrl).href;
            const u = new URL(absoluteUrl);
            const isAssetExtension = /\.(png|jpg|jpeg|gif|svg|webp|js|css|woff|woff2|ttf|otf|mp4|webm|ico|json)$/i.test(u.pathname);
            const isCDN = u.hostname.includes('website-files.com') || u.hostname.includes('webflow.com');
            
            if (absoluteUrl.startsWith('http') && (isAssetExtension || isCDN)) {
                if (u.origin === new URL(TARGET_URL).origin && (u.pathname === '/' || !u.pathname.includes('.'))) {
                    return;
                }
                urls.add(absoluteUrl);
            }
        } catch {}
    };

    document.querySelectorAll('[src], [poster], [data-src], [data-href]').forEach(el => {
        addUrl(el.getAttribute('src'));
        addUrl(el.getAttribute('poster'));
        addUrl(el.getAttribute('data-src'));
        addUrl(el.getAttribute('data-href'));
    });
    
    document.querySelectorAll('link').forEach(el => addUrl(el.getAttribute('href')));

    document.querySelectorAll('[srcset]').forEach(el => {
        const srcset = el.getAttribute('srcset');
        srcset.split(',').forEach(part => {
            const trimmed = part.trim();
            const lastSpaceIndex = trimmed.lastIndexOf(' ');
            const url = lastSpaceIndex === -1 ? trimmed : trimmed.substring(0, lastSpaceIndex);
            addUrl(url);
        });
    });

    document.querySelectorAll('style').forEach(style => {
        const content = style.textContent;
        const matches = content.matchAll(/url\(['"]?([^'")]+)['"]?\)/g);
        for (const match of matches) {
            addUrl(match[1]);
        }
    });

    console.log(`Discovered ${urls.size} unique candidate assets. Checking for missing ones...`);

    for (const url of urls) {
        if (!assetMap.has(url)) {
            const baseUrl = url.split('?')[0];
            let found = false;
            for (const [aUrl] of assetMap) {
                if (aUrl.split('?')[0] === baseUrl) {
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                try {
                    const response = await page.request.get(url);
                    if (response.status() === 200) {
                        const buffer = await response.body();
                        const contentType = response.headers()['content-type'] || '';
                        await downloadAsset(url, buffer, contentType);
                    }
                } catch (e) {}
            }
        }
    }
}

async function sanitize(html, currentUrl) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const urlObj = new URL(currentUrl);
    const depth = urlObj.pathname.split('/').filter(Boolean).length;
    const relPrefix = depth > 0 ? '../'.repeat(depth) : '';

    const trackers = [
        'google-analytics.com', 
        'googletagmanager.com', 
        'facebook.net',
        'analytics.js',
        'gtag/js',
        'fbevents.js',
        'hotjar.com'
    ];
    
    document.querySelectorAll('script').forEach(script => {
        const src = script.src || '';
        const text = script.textContent || '';
        if (trackers.some(t => src.includes(t) || text.includes(t))) {
            script.remove();
        }
    });

    document.querySelectorAll('iframe').forEach(iframe => {
        const src = iframe.src || '';
        if (trackers.some(t => src.includes(t))) {
            iframe.remove();
        }
    });
    
    const resolveUrl = (val) => {
        if (!val) return null;
        try {
            return new URL(val, currentUrl).href;
        } catch {
            return null;
        }
    };

    const rewriteUrl = (val, isAsset = true) => {
        if (!val || val.startsWith('data:') || val.startsWith('#')) return val;
        const absoluteUrl = resolveUrl(val);
        if (!absoluteUrl) return val;

        if (assetMap.has(absoluteUrl)) {
            return relPrefix + assetMap.get(absoluteUrl);
        }

        if (isAsset) {
            const baseUrl = absoluteUrl.split('?')[0];
            for (const [originalUrl, localPath] of assetMap) {
                if (originalUrl.split('?')[0] === baseUrl) {
                    return relPrefix + localPath;
                }
            }
        }

        try {
            const u = new URL(absoluteUrl);
            if (u.origin === new URL(TARGET_URL).origin) {
                const pathname = u.pathname.replace(/\/$/, '');
                if (!pathname || pathname === '') return relPrefix + 'index.html';
                return relPrefix + `${pathname.replace(/^\//, '')}.html`;
            }
        } catch {}

        return val;
    };

    document.querySelectorAll('*').forEach(el => {
        ['src', 'href', 'poster', 'data-src', 'data-href'].forEach(attr => {
            if (el.hasAttribute(attr)) {
                const isAsset = attr !== 'href' || el.tagName === 'LINK';
                el.setAttribute(attr, rewriteUrl(el.getAttribute(attr), isAsset));
            }
        });

        if (el.hasAttribute('srcset')) {
            const srcset = el.getAttribute('srcset');
            const newSrcset = srcset.split(',').map(part => {
                const trimmed = part.trim();
                const lastSpaceIndex = trimmed.lastIndexOf(' ');
                if (lastSpaceIndex === -1) return rewriteUrl(trimmed, true);
                const url = trimmed.substring(0, lastSpaceIndex);
                const size = trimmed.substring(lastSpaceIndex);
                return `${rewriteUrl(url, true)}${size}`;
            }).join(', ');
            el.setAttribute('srcset', newSrcset);
        }

        if (el.hasAttribute('style')) {
            let style = el.getAttribute('style');
            style = style.replace(/url\(['"]?([^'")]+)['"]?\)/g, (match, url) => {
                return `url("${rewriteUrl(url, true)}")`;
            });
            el.setAttribute('style', style);
        }
    });

    document.querySelectorAll('style').forEach(style => {
        let content = style.textContent;
        content = content.replace(/url\(['"]?([^'")]+)['"]?\)/g, (match, url) => {
            return `url("${rewriteUrl(url, true)}")`;
        });
        style.textContent = content;
    });
    
    return dom.serialize();
}

async function run() {
    console.log('Starting browser...');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();
    
    await fs.mkdir(ASSETS_DIR, { recursive: true });

    const visited = new Set();
    const queue = [TARGET_URL];

    page.on('response', async (response) => {
        const url = response.url();
        const contentType = response.headers()['content-type'] || '';
        const status = response.status();

        if (status === 200 && url.startsWith('http') && 
            (contentType.includes('image') || contentType.includes('font') || 
             contentType.includes('css') || contentType.includes('javascript') || contentType.includes('json'))) {
            try {
                const buffer = await response.body();
                await downloadAsset(url, buffer, contentType);
            } catch (e) {}
        }
    });

    while (queue.length > 0) {
        let currentUrl = queue.shift();
        currentUrl = currentUrl.replace(/\/$/, '');
        if (currentUrl === 'https://www.quick14studio.com') currentUrl = TARGET_URL;

        if (visited.has(currentUrl)) continue;
        visited.add(currentUrl);

        console.log(`\n--- Crawling: ${currentUrl} ---`);
        try {
            await page.goto(currentUrl, { waitUntil: 'load', timeout: 90000 });
            await page.waitForTimeout(5000);

            console.log('Executing multi-pass scroll for interactions...');
            try {
                await page.evaluate(async () => {
                    const delay = (ms) => new Promise(res => setTimeout(ms, res));
                    for (let i = 1; i <= 4; i++) {
                        window.scrollTo(0, document.body.scrollHeight * (i / 4));
                        await delay(1500);
                    }
                    window.scrollTo(0, 0);
                    await delay(1000);
                });
            } catch (evalError) {
                console.warn(`Non-critical scroll error on ${currentUrl}: ${evalError.message}`);
            }

            await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
            
            const content = await page.content();
            await discoverAndDownloadAssets(content, currentUrl, page);

            console.log(`Sanitizing HTML and applying theme for ${currentUrl}...`);
            const sanitizedContent = await sanitize(content, currentUrl);
            
            const urlObj = new URL(currentUrl);
            let relativePath = urlObj.pathname === '/' ? 'index.html' : `${urlObj.pathname.replace(/^\//, '')}.html`;
            if (relativePath.includes('/')) {
                const subDir = path.dirname(path.join(DIST_DIR, relativePath));
                await fs.mkdir(subDir, { recursive: true });
            }
            
            await fs.writeFile(path.join(DIST_DIR, relativePath), sanitizedContent);
            console.log(`Saved to ${relativePath}`);

            const dom = new JSDOM(content);
            const links = Array.from(dom.window.document.querySelectorAll('a'))
                .map(a => a.href)
                .filter(href => {
                    try {
                        const url = new URL(href, currentUrl);
                        return url.origin === new URL(TARGET_URL).origin && !url.hash && !url.pathname.includes('.');
                    } catch { return false; }
                })
                .map(href => new URL(href, currentUrl).href.replace(/\/$/, ''));

            for (const link of links) {
                const normalizedLink = link === 'https://www.quick14studio.com' ? TARGET_URL : link;
                if (!visited.has(normalizedLink) && !queue.includes(normalizedLink)) {
                    queue.push(normalizedLink);
                }
            }

        } catch (error) {
            console.error(`Error during crawl of ${currentUrl}:`, error.message);
        }
    }

    console.log('\nPost-processing CSS files...');
    const files = await fs.readdir(ASSETS_DIR);
    for (const file of files) {
        if (file.endsWith('.css')) {
            const filePath = path.join(ASSETS_DIR, file);
            let cssContent = await fs.readFile(filePath, 'utf8');
            cssContent = cssContent.replace(/url\(['"]?([^'")]+)['"]?\)/g, (match, url) => {
                if (url.startsWith('data:')) return match;
                const absoluteUrl = url.startsWith('http') ? url : null;
                if (absoluteUrl && assetMap.has(absoluteUrl)) return `url("${assetMap.get(absoluteUrl).replace('assets/', '')}")`;
                if (absoluteUrl) {
                    const baseUrl = absoluteUrl.split('?')[0];
                    for (const [aUrl, localPath] of assetMap) {
                        if (aUrl.split('?')[0] === baseUrl) return `url("${localPath.replace('assets/', '')}")`;
                    }
                }
                return match;
            });
            await fs.writeFile(filePath, cssContent);
        }
    }

    await browser.close();
    console.log(`\nCrawl complete. Visited ${visited.size} pages and captured ${assetMap.size} assets.`);
}

run();
