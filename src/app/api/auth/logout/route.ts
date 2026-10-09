import { NextResponse } from "next/server";
import { getAuthCookieOptions } from "@/lib/jwt";

export async function POST() {
  const response = NextResponse.json(
    {
      success: true,
      message: "Logged out successfully.",
    },
    { status: 200 }
  );

  const cookieOptions = getAuthCookieOptions();
  response.cookies.set(cookieOptions.name, "", {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    path: cookieOptions.path,
    maxAge: 0,
  });

  return response;
}
