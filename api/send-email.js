const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  let body = req.body;

  try {
    if (typeof body === "string") {
      body = JSON.parse(body);
    }
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const name = body?.name?.trim();
  const email = body?.email?.trim();
  const message = body?.message?.trim();
  const source = body?.source?.trim() || "site";

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactRecipient = process.env.CONTACT_TO_EMAIL;
  const contactSender = process.env.CONTACT_FROM_EMAIL || "IMGD Contact <onboarding@resend.dev>";

  if (!resendApiKey || !contactRecipient) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactSender,
        to: [contactRecipient],
        subject: `New IMGD inquiry from ${name}`,
        html: `
          <h2>New inquiry from IMGD</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Source:</strong> ${escapeHtml(source)}</p>
          <p><strong>Project details:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        `,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: result?.message || "Failed to send the email",
      });
    }

    return res.status(200).json({ success: true, data: result });
  } catch {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
