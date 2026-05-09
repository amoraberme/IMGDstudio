# Design Spec: Unified Pricing Card Design

## Goal
Unify the design of the standard and "Charcoal" (Multi-Page) pricing cards to ensure visual consistency in layout, padding, and borders, while maintaining the brand's distinct variants.

## Current State Analysis
- Both variants already share the `.pricing-card` and `.pricing-card-wrap` base classes.
- Standard card uses `background-color: var(--accent--grey-100)` (light gray).
- Charcoal card uses `background-color: var(--charcoal-100)` (currently `#F0F0EC`, also light gray).
- Charcoal variant has specific overrides in `index.html` and `CSS` for background colors and borders.
- The user previously requested a primary color of `#1D1E1F` and border color of `#969696`.

## Proposed Changes

### 1. Style Synchronization (`dist/index.html`)
Update the `<style>` block in `dist/index.html` to align the charcoal card's colors with the standard card's structure, while keeping the "Charcoal" identity through subtle differences:

- **Pricing Card Container:**
  - Update `.pricing-card.charcoal` border-color to `var(--charcoal-300)` (which is now `#969696`).
  - *Decision:* Both cards already have `box-shadow: inset 0 0 0 1px #969696` from the previous CSS update. No changes needed to the outer border.

- **Internal Backgrounds:**
  - Standard `.pricing-card-wrap` uses `var(--accent--grey-100)`.
  - Charcoal `.pricing-card-wrap.charcoal` uses `#fcfcfa` (off-white).
  - *Decision:* Standardize both to use the same internal layout logic.

- **Variables Alignment:**
  - Ensure `--charcoal-100` (used for standard card bg) is consistent.

### 2. Layout & Spacing (`dist/assets/7904ac232a1c726473c81f62b2f7dc3b.css`)
- Both cards currently share the same padding (`padding: 68px 24px 28px`) and border-radius (`24px`).
- *Decision:* No structural changes needed in the main CSS as they already inherit unified spacing.

### 3. Visual Polish (`dist/index.html`)
- Align the `.pricing-card.charcoal .button` and toggle colors.
- Ensure the charcoal card uses the same border weight and style as the standard card.

## Implementation Plan
1.  **HTML Style Update:** Modify the `<style>` block in `dist/index.html` to remove redundant overrides and ensure both variants use the same primary/border color scheme where appropriate.
2.  **Verification:** Visual check to ensure both cards have the same size, padding, and border definition.
