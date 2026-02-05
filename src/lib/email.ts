import { Resend } from "resend";

// Email configuration
const FROM_EMAIL = "AnduBer <noreply@anduberinnovate.space>";
const TO_EMAIL = "info@anduberinnovate.space";

// HTML sanitization to prevent injection
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: string;
}

export interface JoinEmailData {
  category: string;
  categoryId: string;
  name: string;
  email: string;
  organization?: string;
  expertise?: string;
  message?: string;
  linkedIn?: string;
  portfolio?: string;
  interests?: string[];
}

/**
 * Send contact form email
 */
export async function sendContactEmail(data: ContactEmailData): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY is not configured - contact form emails will not be sent");
    return { success: false, error: "Email service not configured" };
  }

  const resend = new Resend(apiKey);

  const inquiryLabels: Record<string, string> = {
    partners: "AnduBer Partners - Strategic Consulting",
    labs: "AnduBer Labs - Research Collaboration",
    foundation: "The Gathering - Venture Capital",
    general: "General Inquiry",
    media: "Media / Press",
  };

  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeSubject = escapeHtml(data.subject);
  const safeMessage = escapeHtml(data.message);
  const safeInquiryType = escapeHtml(inquiryLabels[data.inquiryType] || data.inquiryType);

  const emailPayload = {
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: data.email,
    subject: `[Contact Form] ${safeSubject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>New Contact Form Submission</title></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background: #f5f5f5; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="background: #1E0A14; padding: 24px; text-align: center;">
            <h1 style="color: #F5E6C8; margin: 0; font-size: 24px;">New Contact Message</h1>
            <p style="color: #D4AA6A; margin: 8px 0 0 0; font-size: 14px;">${safeInquiryType}</p>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #333; width: 120px;">From</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #333;">Email</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">
                  <a href="mailto:${safeEmail}" style="color: #1A7B7A;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #333;">Subject</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">${safeSubject}</td>
              </tr>
            </table>
            <div style="margin-top: 24px;">
              <h3 style="color: #333; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
              <div style="background: #f9f9f9; padding: 16px; border-radius: 6px; color: #555; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</div>
            </div>
          </div>
          <div style="background: #f9f9f9; padding: 16px 24px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              Submitted via anduberinnovate.space contact form<br>
              <a href="mailto:${safeEmail}" style="color: #1A7B7A;">Reply to ${safeName}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const { data: responseData, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error("Resend API error:", error.message);
      return { success: false, error: error.message };
    }

    console.log("Contact email sent successfully, id:", responseData?.id);
    return { success: true };
  } catch (err) {
    console.error("Email send exception:", err instanceof Error ? err.message : "Unknown error");
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

/**
 * Send join application email - only whitelisted fields
 */
export async function sendJoinEmail(data: JoinEmailData): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY is not configured - join form emails will not be sent");
    return { success: false, error: "Email service not configured" };
  }

  const resend = new Resend(apiKey);

  const allowedFields: { key: keyof JoinEmailData; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "organization", label: "Organization" },
    { key: "expertise", label: "Expertise" },
    { key: "message", label: "Message" },
    { key: "linkedIn", label: "LinkedIn" },
    { key: "portfolio", label: "Portfolio" },
    { key: "interests", label: "Interests" },
  ];

  const fieldRows = allowedFields
    .filter(({ key }) => data[key] !== undefined && data[key] !== "")
    .map(({ key, label }) => {
      const value = data[key];
      const displayValue = Array.isArray(value) ? value.map(v => escapeHtml(String(v))).join(", ") : escapeHtml(String(value || "---"));
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #333; width: 180px; vertical-align: top;">${escapeHtml(label)}</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666; white-space: pre-wrap;">${displayValue}</td>
        </tr>
      `;
    })
    .join("");

  const safeCategory = escapeHtml(data.category);
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);

  const emailPayload = {
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: data.email,
    subject: `[${safeCategory}] New Application from ${safeName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>New ${safeCategory} Application</title></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background: #f5f5f5; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="background: #1E0A14; padding: 24px; text-align: center;">
            <h1 style="color: #F5E6C8; margin: 0; font-size: 24px;">New Application</h1>
            <p style="color: #D4AA6A; margin: 8px 0 0 0; font-size: 14px;">${safeCategory}</p>
          </div>
          <div style="padding: 24px;">
            <p style="color: #666; font-size: 14px; margin: 0 0 16px 0;">
              Submitted on ${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}
            </p>
            <table style="width: 100%; border-collapse: collapse;">
              ${fieldRows}
            </table>
          </div>
          <div style="background: #f9f9f9; padding: 16px 24px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              Submitted via anduberinnovate.space<br>
              <a href="mailto:${safeEmail}" style="color: #1A7B7A;">Reply to ${safeName}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const { data: responseData, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error("Resend API error:", error.message);
      return { success: false, error: error.message };
    }

    console.log("Join email sent successfully, id:", responseData?.id);
    return { success: true };
  } catch (err) {
    console.error("Email send exception:", err instanceof Error ? err.message : "Unknown error");
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

/**
 * Check if email service is configured
 */
export function isEmailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}
