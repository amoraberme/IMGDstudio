import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const indexHtml = readFileSync("dist/index.html", "utf8");

const requiredSnippets = [
  "background-image:",
  "email-preview-atmosphere",
  "grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);",
  "CONTACT WITH US",
  "font-family: Georgia, \"Times New Roman\", serif;",
  "font-style: italic;",
  "name=\"subject\" placeholder=\"Subject\" required",
  "name=\"website\"",
  "aria-live=\"polite\"",
  "fetch('/api/contact'",
  "submitButton.disabled = true",
  "email-preview-close\" aria-label=\"Close contact form\"",
];

for (const snippet of requiredSnippets) {
  assert(
    indexHtml.includes(snippet),
    `email preview shell should include: ${snippet}`
  );
}

assert(
  !indexHtml.includes("Resend setup pending"),
  "contact form should no longer use the placeholder Resend pending state"
);

console.log("Email preview shell checks passed.");
