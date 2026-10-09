import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { signAuthToken, getAuthCookieOptions } from "@/lib/jwt";

async function processVerification(token: string | null) {
  if (!token || typeof token !== "string" || !token.trim()) {
    return {
      status: 400,
      body: {
        success: false,
        error: "Verification token is required.",
      },
    };
  }

  // 1. Hash the incoming raw token using SHA-256
  const hashedToken = crypto
    .createHash("sha256")
    .update(token.trim())
    .digest("hex");

  await connectToDatabase();

  // 2. Find user with matching token and valid expiry date
  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: new Date() },
  }).select("+emailVerificationToken +emailVerificationExpires");

  if (!user) {
    return {
      status: 400,
      body: {
        success: false,
        error:
          "Verification token is invalid, already used, or has expired. Please sign up or request a new link.",
      },
    };
  }

  // 3. Mark as verified and clear tokens
  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  // 4. Issue auth JWT session
  const authToken = signAuthToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    status: 200,
    body: {
      success: true,
      message: "Email verified successfully! Your account is now active.",
      data: {
        user: user.toSafeObject(),
        token: authToken,
      },
    },
    authToken,
  };
}

// Handle GET requests (clicking link from email or browser)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    const result = await processVerification(token);

    // If request comes from a browser clicking the link in an email, redirect to UI
    const accept = request.headers.get("accept") || "";
    if (accept.includes("text/html")) {
      const redirectUrl = new URL(
        result.status === 200
          ? "/auth/verify-email?status=success"
          : `/auth/verify-email?status=error&message=${encodeURIComponent(
              result.body.error || "Verification failed."
            )}`,
        request.url
      );
      const redirectResponse = NextResponse.redirect(redirectUrl);
      if (result.authToken) {
        const cookieOptions = getAuthCookieOptions();
        redirectResponse.cookies.set(cookieOptions.name, result.authToken, {
          httpOnly: cookieOptions.httpOnly,
          secure: cookieOptions.secure,
          sameSite: cookieOptions.sameSite,
          path: cookieOptions.path,
          maxAge: cookieOptions.maxAge,
        });
      }
      return redirectResponse;
    }

    const response = NextResponse.json(result.body, { status: result.status });

    if (result.authToken) {
      const cookieOptions = getAuthCookieOptions();
      response.cookies.set(cookieOptions.name, result.authToken, {
        httpOnly: cookieOptions.httpOnly,
        secure: cookieOptions.secure,
        sameSite: cookieOptions.sameSite,
        path: cookieOptions.path,
        maxAge: cookieOptions.maxAge,
      });
    }

    return response;
  } catch (error: any) {
    console.error("Email confirmation GET error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to confirm email.",
      },
      { status: 500 }
    );
  }
}

// Handle POST requests (Postman or programmatic JSON API)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const token = body.token || new URL(request.url).searchParams.get("token");

    const result = await processVerification(token);
    const response = NextResponse.json(result.body, { status: result.status });

    if (result.authToken) {
      const cookieOptions = getAuthCookieOptions();
      response.cookies.set(cookieOptions.name, result.authToken, {
        httpOnly: cookieOptions.httpOnly,
        secure: cookieOptions.secure,
        sameSite: cookieOptions.sameSite,
        path: cookieOptions.path,
        maxAge: cookieOptions.maxAge,
      });
    }

    return response;
  } catch (error: any) {
    console.error("Email confirmation POST error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to confirm email.",
      },
      { status: 500 }
    );
  }
}
