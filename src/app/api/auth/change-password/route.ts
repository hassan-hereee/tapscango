import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth-middleware";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify Authentication
    const authResult = await getAuthenticatedUser(request);
    if (!authResult) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Authentication required. Please provide a valid Bearer token or login session.",
        },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { currentPassword, newPassword } = body;

    // 2. Validation
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "Current password and new password are both required.",
        },
        { status: 400 }
      );
    }

    if (typeof newPassword !== "string" || newPassword.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: "New password must be at least 6 characters long.",
        },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "New password must be different from your current password.",
        },
        { status: 400 }
      );
    }

    // 3. Fetch user with password selected
    const user = await User.findById(authResult.user._id).select("+password");
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found.",
        },
        { status: 404 }
      );
    }

    // 4. Verify current password
    const isCurrentValid = await user.comparePassword(currentPassword);
    if (!isCurrentValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Incorrect current password.",
        },
        { status: 400 }
      );
    }

    // 5. Update password
    user.password = newPassword;
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Your password has been changed successfully.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Change password error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An unexpected error occurred while changing password.",
      },
      { status: 500 }
    );
  }
}
