"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, login, loginWithGooglePopup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/account");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setLoading(true);
    const res = await login({ email: email.trim(), password });
    setLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || "Login failed.");
    } else {
      router.push("/account");
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setGoogleLoading(true);
    const res = await loginWithGooglePopup();
    setGoogleLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || "Google sign-in could not be completed.");
    } else {
      router.push("/account");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AnnouncementBar />
      <Header />

      <main style={{ flex: 1 }} className="tap-auth-page-container">
        <div className="tap-auth-page-box">
          <div className="tap-auth-card" style={{ maxWidth: "100%", boxShadow: "0 20px 50px -10px rgba(11, 35, 65, 0.12), 0 0 0 1px #e2e8f0" }}>
            <div className="tap-auth-header">
              <div className="tap-auth-badge">TAPSCAN ACCOUNT</div>
              <h1 className="tap-auth-title">Welcome back</h1>
              <p className="tap-auth-subtitle">
                Log in to manage your smart NFC & QR review stands, analytics and orders.
              </p>
            </div>

            {errorMessage && (
              <div className="tap-auth-error-banner" role="alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Google Sign-in Button */}
            <button
              type="button"
              className="tap-google-btn"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
            >
              {googleLoading ? (
                <div className="tap-spinner" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              )}
              <span>{googleLoading ? "Connecting with Google..." : "Continue with Google"}</span>
            </button>

            <div className="tap-auth-divider">
              <span>or sign in with email</span>
            </div>

            <form onSubmit={handleSubmit} className="tap-auth-form">
              <div className="tap-form-group">
                <label className="tap-form-label" htmlFor="page-login-email">
                  Email Address
                </label>
                <div className="tap-input-wrap">
                  <svg className="tap-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    id="page-login-email"
                    type="email"
                    placeholder="you@business.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="tap-input"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="tap-form-group">
                <div className="tap-form-label-row">
                  <label className="tap-form-label" htmlFor="page-login-password">
                    Password
                  </label>
                  <Link href="/auth/forgot-password" className="tap-forgot-link">
                    Forgot password?
                  </Link>
                </div>
                <div className="tap-input-wrap">
                  <svg className="tap-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="page-login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="tap-input"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="tap-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="tap-btn-primary"
                disabled={loading || googleLoading}
              >
                {loading ? <div className="tap-spinner" /> : "Sign In to TapScan"}
              </button>

              <div style={{ textAlign: "center", marginTop: 12, fontSize: 13, color: "#64748b" }}>
                Don&apos;t have an account yet?{" "}
                <Link href="/auth/signup" style={{ color: "#0b69b3", fontWeight: 600 }}>
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
