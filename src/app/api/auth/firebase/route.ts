import { NextRequest, NextResponse } from "next/server";
import { verifyFirebaseIdToken } from "@/lib/firebase-admin";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { signAuthToken, getAuthCookieOptions } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { idToken } = body;

    if (!idToken || typeof idToken !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Firebase ID token is required.",
        },
        { status: 400 }
      );
    }

    // 1. Verify Firebase ID Token via Google Identity & JWKS
    const decodedToken = await verifyFirebaseIdToken(idToken);
    const email = decodedToken.email?.toLowerCase().trim();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Firebase account does not have an associated email address.",
        },
        { status: 400 }
      );
    }

    // 2. Connect to MongoDB & sync user
    await connectToDatabase();
    let user = await User.findOne({ email });

    const fullName = decodedToken.name || "Firebase User";
    const avatar = decodedToken.picture || null;

    if (user) {
      if (!user.googleId) user.googleId = decodedToken.uid;
      if (!user.avatar && avatar) user.avatar = avatar;
      user.isEmailVerified = true;
      user.lastLogin = new Date();
      await user.save();
    } else {
      user = new User({
        name: fullName,
        email,
        authProvider: "google",
        googleId: decodedToken.uid,
        avatar,
        isEmailVerified: true,
        lastLogin: new Date(),
      });
      await user.save();
    }

    // 3. Issue TapScan JWT Auth Token
    const authToken = signAuthToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // 4. Return response & set httpOnly session cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Authenticated successfully with Firebase.",
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
    console.error("Firebase auth error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to authenticate Firebase user.",
      },
      { status: 500 }
    );
  }
}
