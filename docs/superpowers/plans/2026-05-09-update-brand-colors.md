# Brand Colors Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the primary brand color to `#1d1e1f` and border colors to `#969696`.

**Architecture:** Global string replacement of hex codes in CSS and HTML files, along with CSS variable updates.

**Tech Stack:** HTML, CSS.

---

### Task 1: Update CSS File

**Files:**
- Modify: `dist/assets/7904ac232a1c726473c81f62b2f7dc3b.css`

- [ ] **Step 1: Update root variables**

Replace:
`--primary--charcoal:#494a4b;--primary--charcoal-stroke:#a3a49f;--primary--charcoal-text:#494a4b;`
With:
`--primary--charcoal:#1d1e1f;--primary--charcoal-stroke:#969696;--primary--charcoal-text:#1d1e1f;`

- [ ] **Step 2: Replace primary charcoal color globally in CSS**

Replace all `#494a4b` (and case variations) with `#1d1e1f`.

- [ ] **Step 3: Replace subtle border colors with #969696**

Apply the following replacements (targeted to avoid affecting non-border uses if possible, but since these are primarily border colors in this minified file, global hex replacement is generally safe):
- `#dcdcdc` -> `#969696`
- `#d4d4d4` -> `#969696`
- `#d1d1d1` -> `#969696`
- `#e8e8e8` -> `#969696`
- `#d6e3eb` -> `#969696`

- [ ] **Step 4: Commit**

```bash
git add dist/assets/7904ac232a1c726473c81f62b2f7dc3b.css
git commit -m "style: update primary brand and border colors in CSS"
```

---

### Task 2: Update HTML File

**Files:**
- Modify: `dist/index.html`

- [ ] **Step 1: Update root variables in <style> block**

Replace:
```css
    --primary--charcoal: #494A4B;
    --charcoal-700: #494A4B;
    --charcoal-300: #A3A49F;
```
With:
```css
    --primary--charcoal: #1D1E1F;
    --charcoal-700: #1D1E1F;
    --charcoal-300: #969696;
```

- [ ] **Step 2: Update SVG attributes**

Replace all `stroke="#494A4B"` with `stroke="#1D1E1F"`.
Replace all `stop-color="#494A4B"` with `stop-color="#1D1E1F"`.

- [ ] **Step 3: Verify the changes**

Check the page to ensure the new dark charcoal and defined borders are applied correctly.

- [ ] **Step 4: Commit**

```bash
git add dist/index.html
git commit -m "style: update brand colors and SVG strokes in HTML"
```
