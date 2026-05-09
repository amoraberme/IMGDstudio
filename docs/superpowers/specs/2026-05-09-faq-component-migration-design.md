# Design Spec: FAQ Component Migration

## Goal
Replace the existing FAQ structure in `Quick14studio` with the `faq-question` component structure from `IMGDstudio`.

## Changes

### 1. HTML (`dist/index.html`)
- Update each `.faq` item:
  - Replace `<div class="faq-question-wrap">` with `<button class="faq-question" type="button">`.
  - Change `h3.faq-question` to `h4`.
  - Replace `img.faq-icon` with `<span class="faq-item-toggle" aria-hidden="true"></span>`.

### 2. CSS (`dist/assets/7904ac232a1c726473c81f62b2f7dc3b.css`)
- Append the following styles:
  ```css
  .faq-question {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1.15rem 1.2rem 1.15rem 1.35rem;
      background: white;
      border: 0;
      margin: 0;
      font: inherit;
      text-align: left;
      cursor: pointer;
      transition: background-color 420ms ease, padding 420ms ease;
  }
  .faq-question h4 {
      font-size: 0.96rem;
      line-height: 1.45;
      font-weight: 500;
      color: #111827;
  }
  .faq-item-toggle {
      width: 2rem;
      height: 2rem;
      border-radius: 999px;
      background: #F3F4F6;
      color: #111827;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      flex: 0 0 auto;
  }
  .faq-item-toggle::before, .faq-item-toggle::after {
      content: "";
      position: absolute;
      width: 0.7rem;
      height: 0.12rem;
      border-radius: 999px;
      background: currentColor;
  }
  .faq-item-toggle::after {
      transform: rotate(90deg);
  }
  /* Open state */
  .faq.is-open .faq-item-toggle {
      background: #111827;
      color: white;
  }
  .faq.is-open .faq-item-toggle::after {
      transform: rotate(90deg) scaleX(0);
      opacity: 0;
  }
  ```

### 3. JS (`dist/index.html`)
- Update selectors from `.faq-question-wrap` to `.faq-question` to ensure the accordion still functions.
- Toggle the `.is-open` class on the `.faq` element to animate the new toggle icon.

## Out of Scope
- Major redesign or restyling of other components.
