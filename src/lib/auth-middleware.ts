import { NextRequest } from "next/server";
import { verifyAuthToken, AUTH_COOKIE_NAME, JwtUserPayload } from "./jwt";
import { connectToDatabase } from "./db";
import User, { IUser } from "@/models/User";

export interface AuthenticatedResult {
  user: IUser;
  payload: JwtUserPayload;
}

/**
 * Extracts and verifies the authenticated user from the Request headers or cookies.
 * Throws or returns null if unauthenticated.
 */
export async function getAuthenticatedUser(
  request: NextRequest
): Promise<AuthenticatedResult | null> {
  let token: string | null = null;

  // 1. Check Authorization Bearer header
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2. Fallback to HTTP-only cookie
  if (!token) {
    const cookieToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (cookieToken) {
      token = cookieToken;
    }
  }

  if (!token) {
    return null;
  }

  const payload = verifyAuthToken(token);
  if (!payload || !payload.userId) {
    return null;
  }

  await connectToDatabase();
  const user = await User.findById(payload.userId);
  if (!user) {
    return null;
  }

  return { user, payload };
}
