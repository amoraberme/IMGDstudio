# Revert Cal.com Design System in 15-min-meeting.html Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revert the Cal.com design system and components in `dist/15-min-meeting.html` to the previous simple iframe version.

**Architecture:** We will use `git checkout` to restore the version of `dist/15-min-meeting.html` from before commit `42aa4cf4`.

**Tech Stack:** Git, HTML

---

### Task 1: Revert 15-min-meeting.html

**Files:**
- Modify: `dist/15-min-meeting.html`

- [ ] **Step 1: Revert the file to the state before commit 42aa4cf4**

Run: `git checkout 42aa4cf4~1 dist/15-min-meeting.html`

- [ ] **Step 2: Verify the change**

Check that `my-cal-inline` is gone and the simple iframe is back.
Run: `Select-String "my-cal-inline" dist/15-min-meeting.html` (should be empty)
Run: `Select-String "iframe" dist/15-min-meeting.html` (should show the simple iframe)

- [ ] **Step 3: Commit the reversion**

```bash
git add dist/15-min-meeting.html
git commit -m "revert: remove cal.com design system from 15-min-meeting.html"
```

### Task 2: Optional - Check index.html

- [ ] **Step 1: Ask user if they also want to revert the Cal.com related changes in index.html**

The commit 42aa4cf4 also modified `dist/index.html`, removing a pricing toggle script and changing colors.
