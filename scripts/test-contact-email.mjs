import assert from "node:assert/strict";

import {
  buildContactEmail,
  validateContactPayload,
} from "../contact-email.js";

const validPayload = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  subject: "Website redesign",
  message: "We need a sharper launch page.",
  sourcePage: "https://quick14studio.example/pricing",
  website: "",
};

{
  const result = validateContactPayload(validPayload);
  assert.equal(result.ok, true, "valid contact payload should pass");
  assert.equal(result.data.name, "Ada Lovelace");
  assert.equal(result.data.email, "ada@example.com");
  assert.equal(result.data.subject, "Website redesign");
  assert.equal(result.data.message, "We need a sharper launch page.");
}

{
  const result = validateContactPayload({
    name: " ",
    email: "not-an-email",
    subject: "",
    message: "",
  });
  assert.equal(result.ok, false, "invalid contact payload should fail");
  assert.equal(result.fields.name, "Name is required.");
  assert.equal(result.fields.email, "Enter a valid email address.");
  assert.equal(result.fields.subject, "Subject is required.");
  assert.equal(result.fields.message, "Message is required.");
}

{
  const result = validateContactPayload({ ...validPayload, website: "spam-link" });
  assert.equal(result.ok, false, "honeypot submissions should be rejected");
  assert.equal(result.spam, true);
}

{
  const email = buildContactEmail({
    ...validPayload,
    message: "<script>alert('xss')</script>\nSecond line",
    timestamp: "2026-05-09T11:30:00.000Z",
  });
  assert.equal(email.subject, "Quick14 contact: Website redesign");
  assert.match(email.text, /Ada Lovelace/);
  assert.match(email.text, /2026-05-09T11:30:00.000Z/);
  assert.match(email.html, /&lt;script&gt;alert/);
  assert.doesNotMatch(email.html, /<script>alert/);
}

console.log("Contact email checks passed.");
