# Universal Site Archive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a high-fidelity local offline archive of `quick14studio.com` using Playwright.

**Architecture:** A Node.js CLI tool that uses a headless browser to render pages, intercepts network requests to localize assets, and post-processes HTML to remove tracking and rewrite paths for offline use.

**Tech Stack:** Node.js, Playwright, JSDOM, Express.

---

### Task 1: Project Initialization

**Files:**
- Create: `package.json`
- Create: `.gitignore`

- [ ] **Step 1: Create package.json with dependencies**

```json
{
  "name": "quick14-offline-archive",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "playwright": "^1.43.0",
    "jsdom": "^24.0.0",
    "express": "^4.19.2",
    "chalk": "^5.3.0"
  },
  "scripts": {
    "archive": "node archive-site.js",
    "serve": "node server.js"
  }
}
```

- [ ] **Step 2: Create .gitignore**

```text
node_modules/
dist/
archive-errors.log
.env
```

- [ ] **Step 3: Install dependencies**

Run: `npm install`

- [ ] **Step 4: Install Playwright browsers**

Run: `npx playwright install chromium`

- [ ] **Step 5: Commit**

```bash
git add package.json .gitignore
git commit -m "chore: initialize project dependencies"
```

---

### Task 2: Implement Basic Crawler Engine

**Files:**
- Create: `archive-site.js`

- [ ] **Step 1: Write initial crawler shell**

```javascript
import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

const TARGET_URL = 'https://www.quick14studio.com/';
const DIST_DIR = path.resolve('dist');

async function run() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    console.log(`Navigating to ${TARGET_URL}...`);
    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
    
    const content = await page.content();
    await fs.mkdir(DIST_DIR, { recursive: true });
    await fs.writeFile(path.join(DIST_DIR, 'index.html'), content);
    
    await browser.close();
    console.log('Done.');
}

run();
```

- [ ] **Step 2: Run to verify basic capture**

Run: `node archive-site.js`
Expected: `dist/index.html` is created with content.

- [ ] **Step 3: Commit**

```bash
git add archive-site.js
git commit -m "feat: add basic crawler engine"
```

---

### Task 3: Asset Interception & Localization

**Files:**
- Modify: `archive-site.js`

- [ ] **Step 1: Implement network interception for assets**

```javascript
// Inside run() function in archive-site.js
const assetsDir = path.join(DIST_DIR, 'assets');
await fs.mkdir(assetsDir, { recursive: true });

const assetMap = new Map();

page.on('response', async (response) => {
    const url = response.url();
    const contentType = response.headers()['content-type'] || '';
    
    if (url.startsWith('http') && (contentType.includes('image') || contentType.includes('font') || contentType.includes('css') || contentType.includes('javascript'))) {
        try {
            const buffer = await response.body();
            const fileName = path.basename(new URL(url).pathname) || `asset_${Date.now()}`;
            const filePath = path.join(assetsDir, fileName);
            await fs.writeFile(filePath, buffer);
            assetMap.set(url, `assets/${fileName}`);
        } catch (e) {
            console.error(`Failed to download ${url}: ${e.message}`);
        }
    }
});
```

- [ ] **Step 2: Verify assets are downloaded**

Run: `node archive-site.js`
Expected: `dist/assets/` contains images/scripts from the site.

- [ ] **Step 3: Commit**

```bash
git add archive-site.js
git commit -m "feat: implement asset interception"
```

---

### Task 4: DOM Sanitization & Path Rewriting

**Files:**
- Modify: `archive-site.js`

- [ ] **Step 1: Implement path rewriting and tracking removal using JSDOM**

```javascript
import { JSDOM } from 'jsdom';

async function sanitize(html, assetMap) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Remove tracking scripts
    const trackers = ['google-analytics.com', 'googletagmanager.com', 'facebook.net'];
    document.querySelectorAll('script').forEach(script => {
        if (trackers.some(t => script.src.includes(t) || script.textContent.includes(t))) {
            script.remove();
        }
    });
    
    // Rewrite paths
    document.querySelectorAll('[src], [href], [srcset]').forEach(el => {
        const attr = el.hasAttribute('src') ? 'src' : el.hasAttribute('href') ? 'href' : 'srcset';
        const originalUrl = el.getAttribute(attr);
        if (assetMap.has(originalUrl)) {
            el.setAttribute(attr, assetMap.get(originalUrl));
        }
    });
    
    return dom.serialize();
}
```

- [ ] **Step 2: Update archive-site.js to use sanitize**

- [ ] **Step 3: Commit**

```bash
git add archive-site.js
git commit -m "feat: add DOM sanitization and path rewriting"
```

---

### Task 5: Recursive Crawling

**Files:**
- Modify: `archive-site.js`

- [ ] **Step 1: Implement queue-based recursive crawl**

```javascript
const visited = new Set();
const queue = [TARGET_URL];

while (queue.length > 0) {
    const url = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);
    // ... crawl logic ...
}
```

- [ ] **Step 2: Extract internal links to queue**

- [ ] **Step 3: Commit**

```bash
git add archive-site.js
git commit -m "feat: implement recursive crawling"
```

---

### Task 6: Local Preview Server

**Files:**
- Create: `server.js`

- [ ] **Step 1: Implement Express server for dist/**

```javascript
import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;
const DIST_DIR = path.resolve('dist');

app.use(express.static(DIST_DIR));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

- [ ] **Step 2: Verify server works**

Run: `node server.js`
Expected: Browsing to http://localhost:3000 shows the archived site.

- [ ] **Step 3: Commit**

```bash
git add server.js
git commit -m "feat: add local preview server"
```
