import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

const TARGET_URL = 'https://www.quick14studio.com/';
const DIST_DIR = path.resolve('dist');

async function run() {
    console.log('Starting browser...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    console.log(`Navigating to ${TARGET_URL}...`);
    try {
        await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 60000 });
        
        const content = await page.content();
        await fs.mkdir(DIST_DIR, { recursive: true });
        await fs.writeFile(path.join(DIST_DIR, 'index.html'), content);
        
        console.log('Successfully captured index.html');
    } catch (error) {
        console.error('Error during crawl:', error);
    } finally {
        await browser.close();
    }
    console.log('Done.');
}

run();
