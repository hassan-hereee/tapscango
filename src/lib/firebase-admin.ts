import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";

let adminApp: App | null = null;

export function getAdminAuth(): Auth | null {
  try {
    if (getApps().length > 0) {
      return getAuth(getApps()[0]);
    }

    const projectId =
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
      process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId) {
      console.warn("⚠️ Firebase Admin: NEXT_PUBLIC_FIREBASE_PROJECT_ID is missing.");
      return null;
    }

    if (!clientEmail || !privateKey) {
      console.warn("⚠️ Firebase Admin: FIREBASE_CLIENT_EMAIL or FIREBASE_PRIVATE_KEY is missing.");
      return null;
    }

    // Sanitize privateKey: strip surrounding quotes if present from .env or Vercel
    privateKey = privateKey.trim();
    if (
      (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
      (privateKey.startsWith("'") && privateKey.endsWith("'"))
    ) {
      privateKey = privateKey.slice(1, -1);
    }
    // Replace escaped newlines with actual newline characters
    privateKey = privateKey.replace(/\\n/g, "\n");

    adminApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });

    return getAuth(adminApp);
  } catch (error: any) {
    console.error("❌ Firebase Admin initialization failed:", error.message || error);
    return null;
  }
}

export const adminAuth: Auth | null = getAdminAuth();

