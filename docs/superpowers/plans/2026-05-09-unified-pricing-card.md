# Unified Pricing Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure the standard and charcoal pricing cards share a unified design in terms of structure and spacing.

**Architecture:** Update the inline styles in `dist/index.html` to align the charcoal card with the standard card's layout and border definition.

**Tech Stack:** HTML, CSS.

---

### Task 1: Unify Styles in index.html

**Files:**
- Modify: `dist/index.html`

- [ ] **Step 1: Simplify charcoal card style overrides**

Align the `.pricing-card.charcoal` and `.pricing-card-wrap.charcoal` styles with the standard variant's background logic.

Replace:
```css
  .pricing-card.charcoal {
    background-color: var(--charcoal-100) !important;
    border-color: var(--charcoal-300) !important;
  }

  .pricing-card-wrap.charcoal {
    background-color: #fcfcfa !important;
    border-color: var(--charcoal-300) !important;
  }
```
With:
```css
  .pricing-card.charcoal {
    background-color: var(--charcoal-100) !important;
  }

  .pricing-card-wrap.charcoal {
    background-color: var(--charcoal-100) !important;
  }
```
*(Note: Both variants share the `#969696` border from the main CSS file).*

- [ ] **Step 2: Commit**

```bash
git add dist/index.html
git commit -m "style: unify pricing card and charcoal variant backgrounds"
```
