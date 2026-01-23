import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendJoinEmail, isEmailConfigured } from "@/lib/email";

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

    // Log submission
    console.log("=== NEW JOIN APPLICATION ===");
    console.log("Category:", body.category);
    console.log("Name:", body.name);
    console.log("Email:", body.email);
    console.log("Submitted at:", new Date().toISOString());
    console.log("============================");

    // Send email via Resend
    const emailResult = await sendJoinEmail({
      category: body.category,
      categoryId: body.categoryId,
      ...body,
    });

    if (!emailResult.success) {
      console.error("Failed to send email:", emailResult.error);
      // Still return success to user - we have the data logged
      if (!isEmailConfigured()) {
        console.warn("⚠️ RESEND_API_KEY not set - emails will not be sent");
      }
    }

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

