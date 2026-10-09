import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { signAuthToken, getAuthCookieOptions } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    // 2. Connect to MongoDB
    await connectToDatabase();

    const normalizedEmail = String(email).trim().toLowerCase();

    // 3. Find user and explicitly select password field
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    // 4. Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    // 5. Check if email is verified
    if (!user.isEmailVerified) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Your email address is not verified yet. Please click the verification link sent to your inbox, or request a new verification link.",
          isEmailVerified: false,
        },
        { status: 403 }
      );
    }

    // 6. Generate JWT Auth Token
    const token = signAuthToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // 7. Update lastLogin
    user.lastLogin = new Date();
    await user.save();

    // 8. Create Response and set HTTP-only cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Logged in successfully.",
        data: {
          user: user.toSafeObject(),
          token,
        },
      },
      { status: 200 }
    );

    const cookieOptions = getAuthCookieOptions();
    response.cookies.set(cookieOptions.name, token, {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
      maxAge: cookieOptions.maxAge,
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An unexpected error occurred during login.",
      },
      { status: 500 }
    );
  }
}
