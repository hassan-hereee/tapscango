import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ||
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/google/callback`;

  if (!clientId || clientId.includes("YOUR_GOOGLE_CLIENT_ID")) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Google OAuth is not configured yet. Please add your GOOGLE_CLIENT_ID in .env.local",
      },
      { status: 500 }
    );
  }

  // Construct Google OAuth URL
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: redirectUri,
    client_id: clientId,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);
  const targetUrl = `${rootUrl}?${qs.toString()}`;

  // If user requested JSON url
  const format = new URL(request.url).searchParams.get("format");
  if (format === "json") {
    return NextResponse.json({ success: true, url: targetUrl });
  }

  // Redirect directly to Google Login
  return NextResponse.redirect(targetUrl);
}
