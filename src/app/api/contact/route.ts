import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail, isEmailConfigured } from "@/lib/email";

// =============================================================================
// CONTACT FORM API ROUTE WITH RATE LIMITING AND VALIDATION
// =============================================================================

// Validation schema matching the frontend
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "Name contains invalid characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be less than 254 characters"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message must be less than 5000 characters"),
  inquiryType: z.enum(["partners", "labs", "foundation", "general", "media"]),
});

// =============================================================================
// RATE LIMITING (In-memory for serverless, use Redis for production scale)
// =============================================================================
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Store rate limit data (resets on cold start, which is acceptable for basic protection)
const rateLimitMap = new Map<string, RateLimitEntry>();

// Rate limit configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window
const MAX_REQUESTS_PER_WINDOW = 5; // 5 submissions per hour per IP

function getClientIP(request: NextRequest): string {
  // Check various headers for the real IP
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  if (realIP) {
    return realIP;
  }

  // Fallback (won't work well behind proxies)
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    const keysToDelete: string[] = [];
    rateLimitMap.forEach((value, key) => {
      if (now > value.resetTime) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach((key) => rateLimitMap.delete(key));
  }

  if (!entry || now > entry.resetTime) {
    // First request or window expired
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetIn: entry.resetTime - now,
    };
  }

  // Increment counter
  entry.count++;
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - entry.count,
    resetIn: entry.resetTime - now,
  };
}

// =============================================================================
// SPAM DETECTION
// =============================================================================
function detectSpam(data: z.infer<typeof contactSchema>): boolean {
  const spamPatterns = [
    /\b(viagra|cialis|casino|lottery|winner|bitcoin|crypto|investment|forex)\b/i,
    /\b(click here|act now|limited time|free money|make money fast)\b/i,
    /(http[s]?:\/\/){2,}/i, // Multiple URLs
    /(.)\1{10,}/i, // Repeated characters (spam indicator)
  ];

  const textToCheck = `${data.name} ${data.subject} ${data.message}`;

  for (const pattern of spamPatterns) {
    if (pattern.test(textToCheck)) {
      return true;
    }
  }

  // Check for excessive URLs (more than 3)
  const urlCount = (textToCheck.match(/https?:\/\//gi) || []).length;
  if (urlCount > 3) {
    return true;
  }

  return false;
}

// =============================================================================
// HONEYPOT FIELD CHECK
// =============================================================================
function checkHoneypot(body: Record<string, unknown>): boolean {
  // If honeypot field is filled, it's likely a bot
  return Boolean(body.website || body.url || body.phone_number);
}

// =============================================================================
// API HANDLER
// =============================================================================
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Check rate limit
    const rateLimitResult = checkRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil(rateLimitResult.resetIn / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rateLimitResult.resetIn / 1000)),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(rateLimitResult.resetIn / 1000)),
          },
        }
      );
    }

    // Parse request body
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Check honeypot fields (bot detection)
    if (checkHoneypot(body)) {
      // Silently accept but don't process (fools bots into thinking it worked)
      return NextResponse.json(
        { success: true, message: "Message sent successfully" },
        { status: 200 }
      );
    }

    // Validate input
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return NextResponse.json(
        { success: false, error: "Validation failed", errors },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check for spam content
    if (detectSpam(data)) {
      // Silently accept but don't process
      return NextResponse.json(
        { success: true, message: "Message sent successfully" },
        { status: 200 }
      );
    }

    // ==========================================================================
    // SEND THE EMAIL
    // ==========================================================================

    // Log submission
    console.log("=== Contact Form Submission ===");
    console.log("Time:", new Date().toISOString());
    console.log("IP:", clientIP);
    console.log("Name:", data.name);
    console.log("Email:", data.email);
    console.log("Type:", data.inquiryType);
    console.log("Subject:", data.subject);
    console.log("================================");

    // Send email via Resend
    const emailResult = await sendContactEmail(data);

    if (!emailResult.success) {
      console.error("Failed to send email:", emailResult.error);
      // Still return success to user - we have the data logged
      // In production, you might want to queue for retry or alert admins
      if (!isEmailConfigured()) {
        console.warn("⚠️ RESEND_API_KEY not set - emails will not be sent");
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We will get back to you soon.",
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Remaining": String(rateLimitResult.remaining),
        },
      }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

// Reject other methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
