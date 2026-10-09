import * as jose from "jose";

export interface DecodedFirebaseUser {
  uid: string;
  email?: string;
  name?: string;
  picture?: string;
  emailVerified?: boolean;
}

const GOOGLE_JWKS_URL = new URL(
  "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"
);
let remoteJWKS: ReturnType<typeof jose.createRemoteJWKSet> | null = null;

function getRemoteJWKS() {
  if (!remoteJWKS) {
    remoteJWKS = jose.createRemoteJWKSet(GOOGLE_JWKS_URL);
  }
  return remoteJWKS;
}

/**
 * Verifies a Firebase ID token using native ESM jose and Google Identity APIs.
 * This completely eliminates the Vercel Serverless / Next.js ERR_REQUIRE_ESM
 * packaging bug caused by firebase-admin's jwks-rsa dependency.
 */
export async function verifyFirebaseIdToken(idToken: string): Promise<DecodedFirebaseUser> {
  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    "tap-scan-go";
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  // 1. Primary Method: Google Identity Toolkit REST Verification
  if (apiKey) {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );
      const data = await res.json();
      if (res.ok && data.users && data.users.length > 0) {
        const u = data.users[0];
        return {
          uid: u.localId,
          email: u.email,
          name: u.displayName || u.email?.split("@")[0] || "Google User",
          picture: u.photoUrl,
          emailVerified: u.emailVerified ?? true,
        };
      }
    } catch (e: any) {
      console.warn("Google Identity Toolkit fallback:", e.message);
    }
  }

  // 2. Secondary Method: Cryptographic RS256 Verification via Google JWKS
  try {
    const JWKS = getRemoteJWKS();
    const { payload } = await jose.jwtVerify(idToken, JWKS, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });

    return {
      uid: payload.sub as string,
      email: payload.email as string | undefined,
      name: (payload.name as string | undefined) || (payload.email as string | undefined)?.split("@")[0] || "Google User",
      picture: payload.picture as string | undefined,
      emailVerified: (payload.email_verified as boolean | undefined) ?? true,
    };
  } catch (err: any) {
    throw new Error(`Failed to verify Google ID token: ${err.message || "Invalid or expired token"}`);
  }
}
