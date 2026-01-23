import { Resend } from "resend";

// Email configuration
const FROM_EMAIL = "AnduBer <noreply@anduberinnovate.space>";
const TO_EMAIL = "info@anduberinnovate.space";

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
  [key: string]: unknown;
}

/**
 * Send contact form email
 */
export async function sendContactEmail(data: ContactEmailData): Promise<{ success: boolean; error?: string }> {
  console.log("========================================");
  console.log("📧 sendContactEmail called");
  console.log("========================================");

  // Check for API key
  const apiKey = process.env.RESEND_API_KEY;
  console.log("RESEND_API_KEY exists:", !!apiKey);
  console.log("RESEND_API_KEY length:", apiKey?.length || 0);

  if (!apiKey) {
    console.error("❌ RESEND_API_KEY is not set in environment variables");
    return { success: false, error: "Email service not configured - missing API key" };
  }

  // Create Resend client
  console.log("Creating Resend client...");
  const resend = new Resend(apiKey);

  const inquiryLabels: Record<string, string> = {
    partners: "AnduBer Partners - Strategic Consulting",
    labs: "AnduBer Labs - Research Collaboration",
    foundation: "The Gathering - Venture Capital",
    general: "General Inquiry",
    media: "Media / Press",
  };

  const emailPayload = {
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: data.email,
    subject: `[Contact Form] ${data.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>New Contact Form Submission</title></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background: #f5f5f5; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="background: #1E0A14; padding: 24px; text-align: center;">
            <h1 style="color: #F5E6C8; margin: 0; font-size: 24px;">New Contact Message</h1>
            <p style="color: #D4AA6A; margin: 8px 0 0 0; font-size: 14px;">${inquiryLabels[data.inquiryType] || data.inquiryType}</p>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #333; width: 120px;">From</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #333;">Email</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">
                  <a href="mailto:${data.email}" style="color: #1A7B7A;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #333;">Subject</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">${data.subject}</td>
              </tr>
            </table>
            <div style="margin-top: 24px;">
              <h3 style="color: #333; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
              <div style="background: #f9f9f9; padding: 16px; border-radius: 6px; color: #555; line-height: 1.6; white-space: pre-wrap;">${data.message}</div>
            </div>
          </div>
          <div style="background: #f9f9f9; padding: 16px 24px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              Submitted via anduberinnovate.space contact form<br>
              <a href="mailto:${data.email}" style="color: #1A7B7A;">Reply to ${data.name}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  console.log("📤 Sending email with payload:");
  console.log("   From:", emailPayload.from);
  console.log("   To:", emailPayload.to);
  console.log("   ReplyTo:", emailPayload.replyTo);
  console.log("   Subject:", emailPayload.subject);

  try {
    console.log("Calling resend.emails.send()...");
    const { data: responseData, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error("❌ Resend API returned error:", JSON.stringify(error, null, 2));
      return { success: false, error: error.message };
    }

    console.log("✅ Email sent successfully!");
    console.log("   Response:", JSON.stringify(responseData, null, 2));
    return { success: true };
  } catch (err) {
    console.error("❌ Exception while sending email:", err);
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

/**
 * Send join application email
 */
export async function sendJoinEmail(data: JoinEmailData): Promise<{ success: boolean; error?: string }> {
  console.log("========================================");
  console.log("📧 sendJoinEmail called");
  console.log("========================================");

  // Check for API key
  const apiKey = process.env.RESEND_API_KEY;
  console.log("RESEND_API_KEY exists:", !!apiKey);
  console.log("RESEND_API_KEY length:", apiKey?.length || 0);

  if (!apiKey) {
    console.error("❌ RESEND_API_KEY is not set in environment variables");
    return { success: false, error: "Email service not configured - missing API key" };
  }

  // Create Resend client
  console.log("Creating Resend client...");
  const resend = new Resend(apiKey);

  // Build the fields table from all data except internal fields
  const excludeFields = ["category", "categoryId", "website"];
  const fieldRows = Object.entries(data)
    .filter(([key]) => !excludeFields.includes(key))
    .map(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      const displayValue = Array.isArray(value) ? value.join(", ") : String(value || "—");
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #333; width: 180px; vertical-align: top;">${label}</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666; white-space: pre-wrap;">${displayValue}</td>
        </tr>
      `;
    })
    .join("");

  const emailPayload = {
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: data.email,
    subject: `[${data.category}] New Application from ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>New ${data.category} Application</title></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background: #f5f5f5; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="background: #1E0A14; padding: 24px; text-align: center;">
            <h1 style="color: #F5E6C8; margin: 0; font-size: 24px;">New Application</h1>
            <p style="color: #D4AA6A; margin: 8px 0 0 0; font-size: 14px;">${data.category}</p>
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
              <a href="mailto:${data.email}" style="color: #1A7B7A;">Reply to ${data.name}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  console.log("📤 Sending email with payload:");
  console.log("   From:", emailPayload.from);
  console.log("   To:", emailPayload.to);
  console.log("   ReplyTo:", emailPayload.replyTo);
  console.log("   Subject:", emailPayload.subject);

  try {
    console.log("Calling resend.emails.send()...");
    const { data: responseData, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error("❌ Resend API returned error:", JSON.stringify(error, null, 2));
      return { success: false, error: error.message };
    }

    console.log("✅ Email sent successfully!");
    console.log("   Response:", JSON.stringify(responseData, null, 2));
    return { success: true };
  } catch (err) {
    console.error("❌ Exception while sending email:", err);
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

/**
 * Check if email service is configured
 */
export function isEmailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}
