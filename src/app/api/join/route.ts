import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function getRateLimitInfo(ip: string) {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    return { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
  }

  return record;
}

function incrementRateLimit(ip: string) {
  const info = getRateLimitInfo(ip);
  rateLimitStore.set(ip, {
    count: info.count + 1,
    resetTime: info.resetTime,
  });
  return info.count + 1;
}

// Base schema for all submissions
const baseSchema = z.object({
  category: z.string().min(1, "Category is required"),
  categoryId: z.string().min(1, "Category ID is required"),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(254),
  website: z.string().max(0, "Bot detected").optional(), // Honeypot
});

// Spam detection patterns
const spamPatterns = [
  /\b(viagra|cialis|lottery|winner|congratulations|inheritance)\b/i,
  /<script|javascript:|data:/i,
  /\[url=|<a\s+href/i,
  /(.)\1{10,}/i, // Repeated characters
];

function detectSpam(data: Record<string, unknown>): boolean {
  const textContent = Object.values(data)
    .filter((v) => typeof v === "string")
    .join(" ");

  return spamPatterns.some((pattern) => pattern.test(textContent));
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    const rateLimitInfo = getRateLimitInfo(ip);
    if (rateLimitInfo.count >= RATE_LIMIT_MAX) {
      const retryAfter = Math.ceil(
        (rateLimitInfo.resetTime - Date.now()) / 1000
      );
      return NextResponse.json(
        {
          success: false,
          error: "Too many submissions. Please try again later.",
          retryAfter,
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate base schema
    const baseValidation = baseSchema.safeParse(body);
    if (!baseValidation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          errors: baseValidation.error.issues,
        },
        { status: 400 }
      );
    }

    // Check honeypot
    if (body.website && body.website.length > 0) {
      // Silently reject but return success to confuse bots
      return NextResponse.json({
        success: true,
        message: "Thank you for your submission.",
      });
    }

    // Check for spam
    if (detectSpam(body)) {
      // Silently reject spam
      return NextResponse.json({
        success: true,
        message: "Thank you for your submission.",
      });
    }

    // Increment rate limit counter
    incrementRateLimit(ip);

    // Format the submission data for email
    const emailData = {
      to: "info@anduberinnovate.space",
      subject: `New ${body.category} Application from ${body.name}`,
      category: body.category,
      categoryId: body.categoryId,
      submittedAt: new Date().toISOString(),
      data: body,
    };

    // In production, send email via SendGrid, Resend, or similar
    // For now, log the submission
    console.log("=== NEW JOIN APPLICATION ===");
    console.log("Category:", emailData.category);
    console.log("Name:", body.name);
    console.log("Email:", body.email);
    console.log("Submitted at:", emailData.submittedAt);
    console.log("Full data:", JSON.stringify(body, null, 2));
    console.log("============================");

    // Here you would integrate with your email service:
    // await sendEmail(emailData);
    //
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'applications@anduberinnovate.space',
    //   to: 'info@anduberinnovate.space',
    //   subject: emailData.subject,
    //   html: generateEmailTemplate(emailData),
    // });

    return NextResponse.json({
      success: true,
      message: "Thank you for your application. We will get back to you soon.",
    });
  } catch (error) {
    console.error("Join form submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}

// Helper function to generate email HTML (for future use with email service)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _generateEmailTemplate(data: {
  category: string;
  categoryId: string;
  submittedAt: string;
  data: Record<string, unknown>;
}) {
  const fieldRows = Object.entries(data.data)
    .filter(([key]) => !["category", "categoryId", "website"].includes(key))
    .map(
      ([key, value]) => `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee; font-weight: 500; color: #333;">
          ${key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
        </td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee; color: #666;">
          ${Array.isArray(value) ? value.join(", ") : String(value)}
        </td>
      </tr>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New ${data.category} Application</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="background: #1E0A14; padding: 24px; text-align: center;">
          <h1 style="color: #F5E6C8; margin: 0; font-size: 24px;">New Application</h1>
          <p style="color: #D4AA6A; margin: 8px 0 0 0; font-size: 14px;">${data.category}</p>
        </div>
        <div style="padding: 24px;">
          <p style="color: #666; font-size: 14px; margin: 0 0 16px 0;">
            Submitted on ${new Date(data.submittedAt).toLocaleString()}
          </p>
          <table style="width: 100%; border-collapse: collapse;">
            ${fieldRows}
          </table>
        </div>
        <div style="background: #f9f9f9; padding: 16px 24px; text-align: center; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            This application was submitted through anduberinnovate.space
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}
