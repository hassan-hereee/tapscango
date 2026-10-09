import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    // For production security (preventing user enumeration), always return success even if user not found
    if (!user) {
      return NextResponse.json(
        {
          success: true,
          message:
            "If an account with that email exists, a password reset link has been sent.",
        },
        { status: 200 }
      );
    }

    // Generate reset token and save expiry (1 hour)
    const rawToken = user.createPasswordResetToken();
    await user.save();

    const emailResult = await sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      token: rawToken,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "If an account with that email exists, a password reset link has been sent.",
        data: {
          // Included for seamless Postman testing in dev
          preview: {
            rawToken,
            resetUrl: `/api/auth/reset-password`,
            emailMode: emailResult.mode,
          },
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "An unexpected error occurred while requesting password reset.",
      },
      { status: 500 }
    );
  }
}
