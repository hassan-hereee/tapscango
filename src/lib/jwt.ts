import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "tapscan_super_secret_jwt_key_2026_production_grade_change_in_prod";
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "7d") as string;

export const AUTH_COOKIE_NAME = "tapscan_auth_token";

export interface JwtUserPayload {
  userId: string;
  email: string;
  role: "customer" | "admin";
}

/**
 * Sign a JWT token for the authenticated user
 */
export function signAuthToken(payload: JwtUserPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions);
}

/**
 * Verify and decode an incoming JWT token
 */
export function verifyAuthToken(token: string): JwtUserPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtUserPayload;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Standard cookie configuration for storing JWT in httpOnly cookie
 */
export function getAuthCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    name: AUTH_COOKIE_NAME,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  };
}
