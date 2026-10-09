import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { signAuthToken, getAuthCookieOptions } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const token = body.token || new URL(request.url).searchParams.get("token");
    const { newPassword } = body;

    // 1. Validation
    if (!token || typeof token !== "string" || !token.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Password reset token is required.",
        },
        { status: 400 }
      );
    }

    if (!newPassword || typeof newPassword !== "string" || newPassword.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: "New password must be at least 6 characters long.",
        },
        { status: 400 }
      );
    }

    // 2. Hash incoming token to match database SHA-256 hash
    const hashedToken = crypto
      .createHash("sha256")
      .update(token.trim())
      .digest("hex");

    await connectToDatabase();

    // 3. Find user with matching unexpired token
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    }).select("+passwordResetToken +passwordResetExpires");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Password reset token is invalid or has expired. Please request a new reset link.",
        },
        { status: 400 }
      );
    }

    // 4. Update password (pre-save hook handles bcrypt hashing)
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 5. Issue fresh login session
    const authToken = signAuthToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Your password has been reset successfully. You are now logged in.",
        data: {
          user: user.toSafeObject(),
          token: authToken,
        },
      },
      { status: 200 }
    );

    const cookieOptions = getAuthCookieOptions();
    response.cookies.set(cookieOptions.name, authToken, {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
      maxAge: cookieOptions.maxAge,
    });

    return response;
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An unexpected error occurred while resetting password.",
      },
      { status: 500 }
    );
  }
}
