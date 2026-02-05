import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendJoinEmail, isEmailConfigured } from "@/lib/email";

// Rate limiting store (in-memory; in production use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

// Periodic cleanup to prevent memory leak
setInterval(() => {
  const now = Date.now();
  const keysToDelete: string[] = [];
  rateLimitStore.forEach((value, key) => {
    if (now > value.resetTime) {
      keysToDelete.push(key);
    }
  });
  keysToDelete.forEach((key) => rateLimitStore.delete(key));
}, 10 * 60 * 1000); // every 10 minutes

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

// Validation schema - honeypot field passes through (no max(0))
const joinSchema = z.object({
  category: z.string().min(1, "Category is required"),
  categoryId: z.string().min(1, "Category ID is required"),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(254),
  website: z.string().optional(), // Honeypot - checked manually
  organization: z.string().max(200).optional(),
  expertise: z.string().max(500).optional(),
  message: z.string().max(2000).optional(),
  linkedIn: z.string().max(300).optional(),
  portfolio: z.string().max(300).optional(),
  interests: z.array(z.string().max(100)).max(20).optional(),
});

// Spam detection patterns
const spamPatterns = [
  /\b(viagra|cialis|lottery|winner|congratulations|inheritance)\b/i,
  /<script|javascript:|data:/i,
  /\[url=|<a\s+href/i,
  /(.)\1{10,}/i,
];

function detectSpam(data: Record<string, unknown>): boolean {
  const textContent = Object.values(data)
    .filter((v) => typeof v === "string")
    .join(" ");

  return spamPatterns.some((pattern) => pattern.test(textContent));
}

export async function POST(request: NextRequest) {
  try {
    // CSRF: Verify origin header
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json(
        { success: false, error: "Invalid request origin." },
        { status: 403 }
      );
    }

    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Increment rate limit for ALL requests (before validation)
    incrementRateLimit(ip);

    // Check rate limit
    const rateLimitInfo = getRateLimitInfo(ip);
    if (rateLimitInfo.count > RATE_LIMIT_MAX) {
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

    // Validate schema
    const validation = joinSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          errors: validation.error.issues,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Check honeypot - silently reject bots
    if (data.website && data.website.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Thank you for your submission.",
      });
    }

    // Check for spam - silently reject
    if (detectSpam(body)) {
      return NextResponse.json({
        success: true,
        message: "Thank you for your submission.",
      });
    }

    // Log submission without PII
    console.log("=== NEW JOIN APPLICATION ===");
    console.log("Category:", data.category);
    console.log("Submitted at:", new Date().toISOString());
    console.log("============================");

    // Send email via Resend - only whitelisted fields
    const emailResult = await sendJoinEmail({
      category: data.category,
      categoryId: data.categoryId,
      name: data.name,
      email: data.email,
      organization: data.organization,
      expertise: data.expertise,
      message: data.message,
      linkedIn: data.linkedIn,
      portfolio: data.portfolio,
      interests: data.interests,
    });

    if (!emailResult.success) {
      console.error("Failed to send join email:", emailResult.error);
      if (!isEmailConfigured()) {
        console.warn("RESEND_API_KEY not set - emails will not be sent");
      }
      return NextResponse.json(
        {
          success: false,
          error: "We received your application but could not send a confirmation. Please try again later.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your application. We will get back to you soon.",
    });
  } catch (error) {
    console.error("Join form error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
