import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase client app (singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

/**
 * Triggers Google Sign-In popup via Firebase, then sends the ID token
 * to our backend (/api/auth/firebase) to sync the user into MongoDB and issue a session.
 */
export async function loginWithGoogle() {
  const { signInWithPopup } = await import("firebase/auth");
  const result = await signInWithPopup(auth, googleProvider);
  const idToken = await result.user.getIdToken();

  const response = await fetch("/api/auth/firebase", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  const text = await response.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // Non-JSON response (e.g. server crash or HTML error page)
  }

  if (!response.ok || !data || !data.success) {
    const errorMsg =
      data?.error ||
      (response.status === 500
        ? "Server configuration error: Please check your MongoDB and Firebase Admin credentials in environment variables."
        : `Authentication failed (status ${response.status}).`);
    throw new Error(errorMsg);
  }

  return { firebaseUser: result.user, idToken, session: data };
}

