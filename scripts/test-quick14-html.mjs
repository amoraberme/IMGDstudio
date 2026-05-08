import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";

const indexHtml = readFileSync("dist/index.html", "utf8");
const meetingHtml = readFileSync("dist/15-min-meeting.html", "utf8");
const dom = new JSDOM(indexHtml);
const document = dom.window.document;

const failures = [];

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function textContent(selector) {
  return [...document.querySelectorAll(selector)].map((node) => node.textContent.trim());
}

const brandGrayRule = ".review-section, .review-card, .faq-wrap, .brand-logo-section";
assert(
  !indexHtml.includes(brandGrayRule),
  "brand-logo-section should not be grouped into the forced gray background rule"
);

assert(!indexHtml.includes("View recent work"), "work section Figma CTA should be removed");
assert(!indexHtml.includes("https://x.com/him_uiux"), "navbar/footer X links should be removed");
assert(!indexHtml.includes("Figma logo"), "navbar/footer Figma icons should be removed");

const prices = textContent(".pricing-card-price-text");
assert(prices.includes("$1000+"), "landing page design-only price should be $1000+");
assert(prices.includes("$1800+"), "landing page full price should be $1800+");
assert(prices.includes("$2000+"), "multi-page design-only price should be $2000+");
assert(prices.includes("$2800+"), "multi-page full price should be $2800+");
for (const stalePrice of ["$3000+", "$4800+", "$5000+", "$8000+"]) {
  assert(!prices.includes(stalePrice), `stale price ${stalePrice} should be gone`);
}

const pricingLabels = textContent(".pricing-card-pointer [data-pricing-toggle-label]");
assert(
  pricingLabels.length === 2 && pricingLabels.every((label) => label === "Choose Design Only"),
  "both pricing toggle labels should start at Choose Design Only"
);
assert(!indexHtml.includes("No-Code Development: $1800"), "old landing page add-on label should be gone");
assert(!indexHtml.includes("No-Code Development: $3000"), "old multi-page add-on label should be gone");

const toggles = [...document.querySelectorAll(".pricing-toggle-contain")];
assert(toggles.length === 2, "two pricing toggles should remain");
for (const toggle of toggles) {
  assert(toggle.getAttribute("role") === "switch", "pricing toggles should expose switch semantics");
  assert(
    toggle.getAttribute("data-framer-module") ===
      "https://framer.com/m/NeoSwitch-nF0F.js@f8nRN9NHu71rbNpPjWRo",
    "pricing toggles should reference the requested NeoSwitch module URL"
  );
}

assert(
  indexHtml.includes("closeOtherFaqs"),
  "FAQ script should close other answers when one opens"
);

assert(!meetingHtml.includes("5ee77a3d24a53794e85f7ae52a33c76f.js"), "Cal embed SDK asset should be removed");
assert(!meetingHtml.includes("<cal-inline"), "Cal inline custom element should be removed");
assert(!meetingHtml.includes("Cal("), "Cal inline SDK calls should be removed");
assert(meetingHtml.includes('<iframe class="cal-embed"'), "meeting page should keep the direct booking iframe");

if (failures.length) {
  console.error(`HTML regression checks failed (${failures.length}):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("HTML regression checks passed.");
