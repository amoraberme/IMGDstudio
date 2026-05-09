import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'jericoberme29@gmail.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

export async function handleContactRequest({ body, headers }) {
    if (!resend) {
        console.error('RESEND_API_KEY is not configured');
        return {
            status: 500,
            body: { ok: false, error: 'Email service not configured.' }
        };
    }

    const { name, email, subject, message, website, sourcePage } = body;

    // Honeypot check
    if (website) {
        console.warn('Honeypot triggered');
        return {
            status: 200,
            body: { ok: true, message: 'Message received (spam filtered).' }
        };
    }

    // Validation
    const errors = {};
    if (!name?.trim()) errors.name = 'Name is required.';
    if (!email?.trim()) {
        errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Invalid email format.';
    }
    if (!subject?.trim()) errors.subject = 'Subject is required.';
    if (!message?.trim()) errors.message = 'Message is required.';

    if (Object.keys(errors).length > 0) {
        return {
            status: 400,
            body: { ok: false, error: 'Validation failed', fields: errors }
        };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: `Quick14 Contact <${FROM_EMAIL}>`,
            to: [TO_EMAIL],
            reply_to: email,
            subject: `Contact: ${subject}`,
            html: `
                <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #eee;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #666;">
                        <strong>Source Page:</strong> ${sourcePage || 'Unknown'}<br>
                        <strong>Timestamp:</strong> ${new Date().toISOString()}
                    </p>
                </div>
            `
        });

        if (error) {
            console.error('Resend Error:', error);
            return {
                status: 400,
                body: { ok: false, error: error.message }
            };
        }

        return {
            status: 200,
            body: { ok: true, message: 'Thanks, your message was received.' }
        };
    } catch (err) {
        console.error('Unexpected Error:', err);
        return {
            status: 500,
            body: { ok: false, error: 'An unexpected error occurred.' }
        };
    }
}
