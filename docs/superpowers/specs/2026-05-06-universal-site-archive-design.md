# Design Spec: Universal Website Offline Archive Tool

**Date:** 2026-05-06
**Status:** Draft
**Target:** https://www.quick14studio.com/
**Stack Detected:** Framer (React/Vite)

## 1. Executive Summary
The goal is to create a high-fidelity local offline archive of `quick14studio.com` to serve as a base template for local development and editing. Given the site's reliance on Framer and React hydration, a headless browser approach is required to capture the fully rendered state and all dynamic assets.

## 2. Architecture
The tool is a Node.js CLI application using Playwright for browser orchestration.

### Core Components:
- **Crawler Engine (Playwright)**: Manages the crawl queue, navigates pages, and ensures hydration.
- **Asset Interceptor**: Captures network responses to localize assets (images, fonts, scripts, CSS) from both the primary domain and external CDNs (e.g., `framerusercontent.com`).
- **DOM Sanitizer**: Post-processes rendered HTML to remove aggressive tracking (GA, GTM, FB Pixel) and rewrite paths.
- **Storage Manager**: Organizes the `dist/` directory and logs errors.
- **Local Preview Server**: A lightweight script to serve the `dist/` directory.

## 3. Data Flow
1. **Initialization**: Initialize `dist/` structure and crawl queue with the root URL.
2. **Page Crawl Cycle**:
   - Launch Playwright browser.
   - Navigate to URL and wait for `networkidle`.
   - Execute a "Scroll-to-Bottom" script to trigger Framer's lazy-loading and "Appear" effects.
   - Intercept and save all relevant assets to `dist/assets/`.
   - Extract all internal `<a>` links and add new ones to the queue.
   - Capture `page.content()`.
3. **Asset Processing**:
   - Rewrite URLs in the captured HTML to relative local paths (e.g., `assets/image_hash.png`).
   - Download and localize remote fonts.
4. **Sanitization**:
   - Remove `<script>` and `<iframe>` tags associated with known tracking/analytics services.
   - Neutralize telemetry beacons.
5. **Finalization**: Generate `archive-report.md` and `archive-errors.log`.

## 4. Technical Constraints & Error Handling
- **Fidelity**: Aiming for >95% visual parity. Note that backend-dependent forms (like Calendly) will remain external or be neutralized.
- **Timeouts**: 30s timeout per page; 3 retries for assets.
- **Path Management**: Use content-hashing for assets to avoid name collisions and ensure deduplication.
- **Local Serving**: The archive will be optimized for serving via a local web server (no `file://` protocol limitations).

## 5. Deliverables
- `archive-site.js`: The main crawler script.
- `server.js`: The local dev server.
- `package.json`: Dependencies (playwright, jsdom, express).
- `dist/`: The generated archive.
- `archive-report.md`: Summary of the crawl.

## 6. Testing Strategy
- **Visual Validation**: Manually compare the local `index.html` against the live site.
- **Asset Check**: Verify all images and fonts load from the local `assets/` directory.
- **Link Check**: Ensure internal links point to local `.html` files in `dist/`.
