import { handleContactRequest } from "../contact-email.js";

async function readBody(req) {
  if (req.body) {
    return req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");

  try {
    return JSON.parse(rawBody);
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      ok: false,
      error: "Method not allowed.",
    });
  }

  const result = await handleContactRequest({
    body: await readBody(req),
    headers: req.headers,
  });

  return res.status(result.status).json(result.body);
}
