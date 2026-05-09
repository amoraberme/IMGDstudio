# Replace Logo Asset Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the SVG logo with the new PNG logo.

**Architecture:** Copy asset and update HTML references.

**Tech Stack:** HTML, Shell.

---

### Task 1: Asset Preparation

**Files:**
- Create: `dist/assets/Logo.png`
- Source: `reso/Logo.png`

- [ ] **Step 1: Copy the logo file**

Run: `powershell -Command "Copy-Item reso/Logo.png dist/assets/Logo.png"`

- [ ] **Step 2: Verify file exists**

Run: `ls dist/assets/Logo.png`

---

### Task 2: Update HTML References

**Files:**
- Modify: `dist/index.html`
- Modify: `dist/15-min-meeting.html`

- [ ] **Step 1: Update index.html**

Replace `assets/766dfec18770ef6254dafb3fbb26502e.svg` with `assets/Logo.png`.

- [ ] **Step 2: Update 15-min-meeting.html**

Replace `../assets/766dfec18770ef6254dafb3fbb26502e.svg` with `../assets/Logo.png`.

- [ ] **Step 3: Commit**

```bash
git add dist/assets/Logo.png dist/index.html dist/15-min-meeting.html
git commit -m "feat: replace SVG logo with PNG logo"
```
