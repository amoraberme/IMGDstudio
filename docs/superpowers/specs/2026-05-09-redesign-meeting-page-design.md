# Design Spec: Redesign Meeting Page (Approach 2)

## Goal
Rearrange the booking page layout to prioritize the testimonial content followed by the booking widget, and update the Cal.com link.

## Changes

### 1. HTML Rearrangement (`dist/15-min-meeting.html`)
- **Structure Change**:
  - Keep `booking-hero-top-wrap` (Logo and Heading) at the top.
  - Move `booking-hero-text-content` (Testimonial and "Trusted by founders" logos) to immediately follow `booking-hero-top-wrap`.
  - Place `booking-hero-code` (The iframe) immediately after the text content.
  - **Remove** `booking-hero-bottom-wrap` (The scrolling marquee) entirely.
- **Iframe Update**:
  - Change the `src` attribute of the iframe inside `.booking-hero-code` to `https://cal.com/jerico-berme-t00o9z/15min?layout=month_view`.

### 2. Styling Adjustments (`dist/assets/7904ac232a1c726473c81f62b2f7dc3b.css`)
- Ensure the containers have appropriate vertical spacing now that they are stacked.
- If the `booking-hero-wrapper` is a grid, ensure it's configured for a single-column layout or that the elements span full width.

## Verification
- Confirm the testimonial appears before the booking widget.
- Confirm the new Cal.com link is active.
- Verify the scrolling marquee is gone.
