# Design Spec: Refine Meeting Page Layout (Side-by-Side)

## Goal
Update the booking page layout to place the testimonial text and startup logos side-by-side, and adjust the booking widget to a standard size.

## Changes

### 1. Side-by-Side Layout (`dist/15-min-meeting.html`)
- **Container Adjustment**:
  - Update `.booking-hero-text-content` to use `flex-direction: row` (inline style) on desktop.
  - Set `width: 100%` and `max-width: 1130px` (matching the wrapper) for the container.
- **Children Adjustment**:
  - Set `.booking-hero-text-wrap` to `flex: 1` and remove its `border-bottom`.
  - Set `.flex-gap-vertical-40px` to `flex: 1`.
  - Add a gap between them (e.g., `60px`).
- **Responsive Handling**:
  - Ensure the layout reverts to `column` on mobile devices.

### 2. Booking Widget Resize (`dist/15-min-meeting.html`)
- **Iframe Height**:
  - Change the `<iframe>` inline height from `2032px` to `800px`.
  - This provides the "original size" look for the Cal.com monthly layout without the extreme vertical stretching.

## Verification
- Confirm testimonial and logos are on the same horizontal row on desktop.
- Confirm the Cal.com widget is significantly shorter and fits the viewport better.
- Confirm mobile layout still stacks vertically.
