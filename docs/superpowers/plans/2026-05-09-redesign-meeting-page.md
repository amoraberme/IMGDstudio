# Redesign Meeting Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rearrange '15-min-meeting.html' according to Approach 2.

**Architecture:** Vertical stacking of existing components in 'dist/15-min-meeting.html' and removal of the marquee.

**Tech Stack:** HTML.

---

### Task 1: Rearrange HTML Content

**Files:**
- Modify: `dist/15-min-meeting.html`

- [ ] **Step 1: Move booking-hero-text-content**

Cut the entire `<div class="booking-hero-text-content">...</div>` block and paste it immediately after the `<div class="booking-hero-top-wrap">...</div>` block.

- [ ] **Step 2: Remove booking-hero-bottom-wrap**

Delete the entire `<div class="booking-hero-bottom-wrap">...</div>` block (the scrolling marquee).

- [ ] **Step 3: Update the booking URL**

Find the `<iframe>` inside `.booking-hero-code` and update its `src`.

Old: `https://app.cal.com/quick14/15min?layout=month_view`
New: `https://cal.com/jerico-berme-t00o9z/15min?layout=month_view`

- [ ] **Step 4: Commit**

```bash
git add dist/15-min-meeting.html
git commit -m "feat: redesign meeting page layout and update cal.com url"
```
