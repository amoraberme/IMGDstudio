# Design Spec: Update Brand Colors

## Goal
Update the primary brand color and subtle border colors throughout the project to refresh the visual identity.

## Target Colors
- **Primary Color:** `#1d1e1f` (was `#494a4b`)
- **Border Color:** `#969696` (was various subtle grays like `#dcdcdc`, `#d4d4d4`, `#d1d1d1`, etc.)

## Changes

### 1. CSS Variables Update (`dist/assets/7904ac232a1c726473c81f62b2f7dc3b.css`)
Update the following variables in the `:root` selector:
- `--primary--charcoal`: `#1d1e1f`
- `--primary--charcoal-stroke`: `#969696`
- `--primary--charcoal-text`: `#1d1e1f`

### 2. Global CSS Replacements (`dist/assets/7904ac232a1c726473c81f62b2f7dc3b.css`)
- Replace all occurrences of `#494a4b` (case-insensitive) with `#1d1e1f`.
- Replace common subtle border hex colors with `#969696`:
  - `#dcdcdc` -> `#969696`
  - `#d4d4d4` -> `#969696`
  - `#d1d1d1` -> `#969696`
  - `#d7d8d3` -> `#969696` (only where used for borders)
  - `#e8e8e8` -> `#969696`
  - `#d6e3eb` -> `#969696`
  - `#aaa` -> `#969696` (only where used for borders)
  - `#a3a49f` -> `#969696` (only where used for borders)

### 3. HTML Inline Styles & SVG Updates (`dist/index.html`)
- Update CSS variables in the `<style>` block:
  - `--primary--charcoal`: `#1d1e1f`
  - `--charcoal-700`: `#1d1e1f`
  - `--charcoal-300`: `#969696`
- Update SVG attributes:
  - `stroke="#494A4B"` -> `stroke="#1d1e1f"`
  - `stop-color="#494A4B"` -> `stop-color="#1d1e1f"`

## Verification
- Verify that primary buttons and headings now use the darker charcoal `#1d1e1f`.
- Verify that borders throughout the page are more defined using `#969696`.
- Run `npm test` (or equivalent) to ensure no critical UI regressions.
