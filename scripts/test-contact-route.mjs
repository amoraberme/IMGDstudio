import assert from "node:assert/strict";

import { createApp } from "../server.js";

const app = createApp();
const server = app.listen(0);

try {
  await new Promise((resolve) => server.once("listening", resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  const invalidResponse = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "",
      email: "bad",
      subject: "",
      message: "",
    }),
  });
  const invalidJson = await invalidResponse.json();
  assert.equal(invalidResponse.status, 422);
  assert.equal(invalidJson.fields.email, "Enter a valid email address.");

  const honeypotResponse = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Ada",
      email: "ada@example.com",
      subject: "Project",
      message: "Hello",
      website: "spam",
    }),
  });
  const honeypotJson = await honeypotResponse.json();
  assert.equal(honeypotResponse.status, 200);
  assert.equal(honeypotJson.ok, true);

  const unconfiguredResponse = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Ada",
      email: "ada@example.com",
      subject: "Project",
      message: "Hello",
    }),
  });
  const unconfiguredJson = await unconfiguredResponse.json();
  assert.equal(unconfiguredResponse.status, 503);
  assert.deepEqual(unconfiguredJson.requiredEnv, [
    "RESEND_API_KEY",
    "CONTACT_TO_EMAIL",
    "CONTACT_FROM_EMAIL",
  ]);
} finally {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

console.log("Contact route checks passed.");
