import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { signAuthToken, getAuthCookieOptions } from "@/lib/jwt";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (error) {
    return NextResponse.redirect(`${appUrl}/auth/login?error=${encodeURIComponent(error)}`);
  }

  if (!code) {
    return NextResponse.json(
      {
        success: false,
        error: "Authorization code missing from Google redirect.",
      },
      { status: 400 }
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI || `${appUrl}/api/auth/google/callback`;

  if (!clientId || !clientSecret || clientId.includes("YOUR_GOOGLE_CLIENT_ID")) {
    return NextResponse.json(
      {
        success: false,
        error: "Google OAuth credentials are not properly configured in .env.local",
      },
      { status: 500 }
    );
  }

  try {
    // 1. Exchange authorization code for Google access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      console.error("Google token exchange error:", tokenData);
      return NextResponse.redirect(
        `${appUrl}/auth/login?error=${encodeURIComponent(tokenData.error_description || "Google authentication failed")}`
      );
    }

    // 2. Fetch User Profile from Google
    const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await userRes.json();
    if (!profile.email) {
      return NextResponse.redirect(
        `${appUrl}/auth/login?error=Unable%20to%20retrieve%20email%20from%20Google`
      );
    }

    await connectToDatabase();

    const normalizedEmail = profile.email.toLowerCase().trim();

    // 3. Find existing user or create a new user
    let user = await User.findOne({ email: normalizedEmail });

    if (user) {
      // Link Google ID and mark email verified
      if (!user.googleId) user.googleId = profile.sub;
      if (!user.avatar && profile.picture) user.avatar = profile.picture;
      user.isEmailVerified = true;
      user.lastLogin = new Date();
      await user.save();
    } else {
      // Create new user authenticated via Google
      user = new User({
        name: profile.name || "Google User",
        email: normalizedEmail,
        authProvider: "google",
        googleId: profile.sub,
        avatar: profile.picture || null,
        isEmailVerified: true,
        lastLogin: new Date(),
      });
      await user.save();
    }

    // 4. Issue TapScan JWT Token
    const authToken = signAuthToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // 5. Set session cookie and redirect to dashboard/homepage
    const response = NextResponse.redirect(`${appUrl}/`);
    const cookieOptions = getAuthCookieOptions();

    response.cookies.set(cookieOptions.name, authToken, {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
      maxAge: cookieOptions.maxAge,
    });

    return response;
  } catch (err: any) {
    console.error("Google OAuth callback exception:", err);
    return NextResponse.redirect(
      `${appUrl}/auth/login?error=${encodeURIComponent(err.message || "OAuth processing failed")}`
    );
  }
}
