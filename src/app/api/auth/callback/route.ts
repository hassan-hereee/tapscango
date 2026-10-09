import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
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
    return NextResponse.redirect(`${appUrl}/auth/login?error=Missing%20authorization%20code`);
  }

  try {
    // 1. Exchange Supabase authorization code for session
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError || !data?.user) {
      console.error("Supabase code exchange error:", exchangeError);
      return NextResponse.redirect(
        `${appUrl}/auth/login?error=${encodeURIComponent(exchangeError?.message || "Authentication failed")}`
      );
    }

    const sbUser = data.user;
    const email = sbUser.email?.toLowerCase().trim();

    if (!email) {
      return NextResponse.redirect(
        `${appUrl}/auth/login?error=No%20email%20provided%20by%20OAuth%20provider`
      );
    }

    // 2. Connect to MongoDB and sync user
    await connectToDatabase();
    let user = await User.findOne({ email });

    const fullName =
      sbUser.user_metadata?.full_name ||
      sbUser.user_metadata?.name ||
      "Google User";
    const avatar = sbUser.user_metadata?.avatar_url || sbUser.user_metadata?.picture || null;

    if (user) {
      if (!user.googleId) user.googleId = sbUser.id;
      if (!user.avatar && avatar) user.avatar = avatar;
      user.isEmailVerified = true;
      user.lastLogin = new Date();
      await user.save();
    } else {
      user = new User({
        name: fullName,
        email,
        authProvider: "google",
        googleId: sbUser.id,
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

    // 4. Set session cookie and redirect to homepage/dashboard
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
    console.error("Supabase OAuth callback error:", err);
    return NextResponse.redirect(
      `${appUrl}/auth/login?error=${encodeURIComponent(err.message || "Failed to complete login")}`
    );
  }
}
