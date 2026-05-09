# Design Spec: Replace Logo Asset

## Goal
Replace the existing SVG logo text (`assets/766dfec18770ef6254dafb3fbb26502e.svg`) with the new PNG logo (`reso/Logo.png`).

## Changes

### 1. Asset Management
- Copy `reso/Logo.png` to `dist/assets/Logo.png`.

### 2. HTML Updates
- **`dist/index.html`**:
  - Update `<img src="assets/766dfec18770ef6254dafb3fbb26502e.svg" ...>` to `<img src="assets/Logo.png" ...>`.
- **`dist/15-min-meeting.html`**:
  - Update `<img src="../assets/766dfec18770ef6254dafb3fbb26502e.svg" ...>` to `<img src="../assets/Logo.png" ...>`.

### 3. Visual Adjustments
- The new logo is a PNG, so it might need height/width adjustments if the previous SVG had specific dimensions. However, since the user didn't specify, I will keep the existing classes and attributes for now and adjust if the visual check fails.

## Verification
- Verify that the logo appears correctly in the navbar on both the home page and the booking page.
- Ensure the path is correct relative to each HTML file.
