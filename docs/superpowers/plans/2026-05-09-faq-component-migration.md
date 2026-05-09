# FAQ Component Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing FAQ structure in `Quick14studio` with the `faq-question` component structure from `IMGDstudio`.

**Architecture:** Surgical update of the HTML structure in `dist/index.html` to use `<button class="faq-question">`, accompanied by CSS updates in `dist/assets/7904ac232a1c726473c81f62b2f7dc3b.css` and a small JS selector update in `dist/index.html`.

**Tech Stack:** HTML, CSS, JavaScript.

---

### Task 1: Update CSS Styles

**Files:**
- Modify: `dist/assets/7904ac232a1c726473c81f62b2f7dc3b.css`

- [ ] **Step 1: Append the new FAQ styles to the CSS file**

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
.faq.is-open .faq-item-toggle {
    background: #111827;
    color: white;
}
.faq.is-open .faq-item-toggle::after {
    transform: rotate(90deg) scaleX(0);
    opacity: 0;
}
```

- [ ] **Step 2: Commit**

```bash
git add dist/assets/7904ac232a1c726473c81f62b2f7dc3b.css
git commit -m "style: add faq-question and faq-item-toggle styles"
```

---

### Task 2: Update HTML Structure

**Files:**
- Modify: `dist/index.html`

- [ ] **Step 1: Replace faq-question-wrap with button.faq-question**

Search for:
```html
<div class="faq-question-wrap"><h3 class="faq-question">
```
Replace with:
```html
<button class="faq-question" type="button"><h4 class="faq-question">
```
(Repeat for all occurrences)

- [ ] **Step 2: Replace faq-icon with faq-item-toggle**

Search for:
```html
<img src="assets/cf8a0e83b36d996c9ace42902c07bd0f.svg" loading="lazy" alt="" class="faq-icon" style="...">
```
Replace with:
```html
<span class="faq-item-toggle" aria-hidden="true"></span>
```
(Repeat for all occurrences)

- [ ] **Step 3: Close the button tag**

Ensure the `</div>` that was closing `.faq-question-wrap` now closes the `<button>`.

- [ ] **Step 4: Commit**

```bash
git add dist/index.html
git commit -m "feat: update FAQ HTML structure to use button.faq-question"
```

---

### Task 3: Update JS Selector and Logic

**Files:**
- Modify: `dist/index.html`

- [ ] **Step 1: Update selectors and add class toggling**

Find the FAQ script and update:
```javascript
  faqItems.forEach((faq) => {
    const trigger = faq.querySelector('.faq-question-wrap');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      if (!isFaqOpen(faq)) {
        closeOtherFaqs(faq);
      }
    }, true);
  });
```
To:
```javascript
  faqItems.forEach((faq) => {
    const trigger = faq.querySelector('.faq-question');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      faq.classList.toggle('is-open');
      if (!isFaqOpen(faq)) {
        closeOtherFaqs(faq);
      } else {
        // If we just opened it, ensure others are closed
        closeOtherFaqs(faq);
      }
    }, true);
  });
```

- [ ] **Step 2: Verify the change**

Run a local server or check the file manually to ensure the accordion still works and the icon animates.

- [ ] **Step 3: Commit**

```bash
git add dist/index.html
git commit -m "fix: update FAQ JS selector and add is-open class toggle"
```
