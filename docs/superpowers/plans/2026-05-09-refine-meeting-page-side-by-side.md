# Refine Meeting Page Side-by-Side Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Place testimonial and logos side-by-side and resize the booking iframe.

**Architecture:** Use inline styles to override the flex direction and width of the testimonial section, and reduce the iframe height.

**Tech Stack:** HTML, CSS.

---

### Task 1: Update Side-by-Side Layout

**Files:**
- Modify: `dist/15-min-meeting.html`

- [ ] **Step 1: Apply flex-row to booking-hero-text-content**

Find the div and add inline styles for desktop layout.
```html
<div class="booking-hero-text-content" style="flex-direction: row; width: 100%; max-width: 1130px; padding-left: 0; justify-content: space-between; align-items: flex-start; gap: 60px;">
```

- [ ] **Step 2: Adjust children widths and remove border**

Add `flex: 1` to both children.
```html
<div class="booking-hero-text-wrap" style="flex: 1; border-bottom: none; padding-bottom: 0;">
...
<div class="flex-gap-vertical-40px" style="flex: 1;">
```

---

### Task 2: Resize Booking Widget

**Files:**
- Modify: `dist/15-min-meeting.html`

- [ ] **Step 1: Reduce iframe height**

Change height from `2032px` to `800px`.
```html
<iframe class="cal-embed" title="Book a call" src="https://cal.com/jerico-berme-t00o9z/15min?layout=month_view" loading="lazy" style="width:100%;height:800px;border:0;"></iframe>
```

---

### Task 3: Handle Mobile Responsiveness

- [ ] **Step 1: Add a small style block for mobile override**

Ensure the `flex-direction` reverts to `column` on small screens.
```html
<style>
  @media screen and (max-width: 991px) {
    .booking-hero-text-content {
      flex-direction: column !important;
      gap: 40px !important;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add dist/15-min-meeting.html
git commit -m "feat: refine meeting page with side-by-side testimonial layout and resized booking widget"
```
