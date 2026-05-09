const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export default async function handler(req, res) {
  console.log("--- New Email Request ---");
  
  if (req.method !== "POST") {
    console.log("Method Not Allowed:", req.method);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  let body = req.body;

  try {
    if (typeof body === "string") {
      body = JSON.parse(body);
    }
    console.log("Parsed request body:", JSON.stringify(body, null, 2));
  } catch (parseError) {
    console.error("Error parsing JSON body:", parseError.message);
    return res.status(400).json({ error: "Invalid JSON body", details: parseError.message });
  }

  const name = body?.name?.trim();
  const email = body?.email?.trim();
  const message = body?.message?.trim();
  const source = body?.source?.trim() || "site";

  if (!name || !email || !message) {
    console.log("Missing required fields");
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!emailPattern.test(email)) {
    console.log("Invalid email address:", email);
    return res.status(400).json({ error: "Invalid email address" });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactRecipient = process.env.CONTACT_TO_EMAIL;
  const contactSender = process.env.CONTACT_FROM_EMAIL || "IMGD Contact <onboarding@resend.dev>";

  if (!resendApiKey) {
    console.error("Missing RESEND_API_KEY");
    return res.status(500).json({ error: "Server configuration error: Missing RESEND_API_KEY" });
  }
  if (!contactRecipient) {
    console.error("Missing CONTACT_TO_EMAIL");
    return res.status(500).json({ error: "Server configuration error: Missing CONTACT_TO_EMAIL" });
  }

  try {
    console.log("Sending email via Resend API...");
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
    console.log("Resend API response status:", response.status);
    console.log("Resend API response body:", JSON.stringify(result, null, 2));

    if (!response.ok) {
      return res.status(response.status).json({
        error: result?.message || "Failed to send the email",
        details: result
      });
    }

    console.log("Email sent successfully!");
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Caught error in send-email handler:", error);
    return res.status(500).json({ 
      error: "Internal Server Error", 
      message: error.message,
      stack: error.stack 
    });
  }
}
