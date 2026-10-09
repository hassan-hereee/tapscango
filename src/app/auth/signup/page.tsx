"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, signup, loginWithGooglePopup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/account");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !email.trim() || !password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    const res = await signup({
      name: name.trim(),
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || "Signup failed.");
    } else {
      setSentEmail(email.trim());
      setSignupSuccess(true);
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

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: "", color: "#e2e8f0", width: "0%" };
    if (pass.length < 6) return { label: "Weak", color: "#ef4444", width: "25%" };
    const hasLetters = /[a-zA-Z]/.test(pass);
    const hasNumbers = /[0-9]/.test(pass);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pass);

    if (pass.length >= 8 && hasLetters && hasNumbers && hasSpecial) {
      return { label: "Strong", color: "#10b981", width: "100%" };
    }
    if (pass.length >= 6 && hasLetters && hasNumbers) {
      return { label: "Medium", color: "#f59e0b", width: "65%" };
    }
    return { label: "Fair", color: "#ef4444", width: "35%" };
  };

  const strength = getPasswordStrength(password);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AnnouncementBar />
      <Header />

      <main style={{ flex: 1 }} className="tap-auth-page-container">
        <div className="tap-auth-page-box">
          <div className="tap-auth-card" style={{ maxWidth: "100%", boxShadow: "0 20px 50px -10px rgba(11, 35, 65, 0.12), 0 0 0 1px #e2e8f0" }}>
            {!signupSuccess ? (
              <>
                <div className="tap-auth-header">
                  <div className="tap-auth-badge">GET STARTED WITH TAPSCAN</div>
                  <h1 className="tap-auth-title">Create your account</h1>
                  <p className="tap-auth-subtitle">
                    Join Pakistan&apos;s leading smart business presence platform today.
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

                {/* Google Sign-in */}
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
                  <span>{googleLoading ? "Connecting with Google..." : "Sign up with Google"}</span>
                </button>

                <div className="tap-auth-divider">
                  <span>or sign up with email</span>
                </div>

                <form onSubmit={handleSubmit} className="tap-auth-form">
                  <div className="tap-form-group">
                    <label className="tap-form-label" htmlFor="page-signup-name">
                      Full Name / Business Name
                    </label>
                    <div className="tap-input-wrap">
                      <svg className="tap-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <input
                        id="page-signup-name"
                        type="text"
                        placeholder="Ali Hassan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="tap-input"
                        required
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  <div className="tap-form-group">
                    <label className="tap-form-label" htmlFor="page-signup-email">
                      Work Email
                    </label>
                    <div className="tap-input-wrap">
                      <svg className="tap-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <input
                        id="page-signup-email"
                        type="email"
                        placeholder="ali@company.pk"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="tap-input"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="tap-form-group">
                    <label className="tap-form-label" htmlFor="page-signup-password">
                      Create Password
                    </label>
                    <div className="tap-input-wrap">
                      <svg className="tap-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <input
                        id="page-signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="tap-input"
                        required
                        autoComplete="new-password"
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

                    {password && (
                      <div className="tap-password-strength-wrap">
                        <div className="tap-strength-bar">
                          <div
                            className="tap-strength-fill"
                            style={{ width: strength.width, backgroundColor: strength.color }}
                          />
                        </div>
                        <span className="tap-strength-label" style={{ color: strength.color }}>
                          {strength.label}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="tap-terms-note">
                    By creating an account, you agree to TapScan&apos;s{" "}
                    <a href="/pages/terms" target="_blank" rel="noreferrer">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/pages/privacy" target="_blank" rel="noreferrer">
                      Privacy Policy
                    </a>
                    .
                  </p>

                  <button
                    type="submit"
                    className="tap-btn-primary"
                    disabled={loading || googleLoading}
                  >
                    {loading ? <div className="tap-spinner" /> : "Create TapScan Account"}
                  </button>

                  <div style={{ textAlign: "center", marginTop: 12, fontSize: 13, color: "#64748b" }}>
                    Already have an account?{" "}
                    <Link href="/auth/login" style={{ color: "#0b69b3", fontWeight: 600 }}>
                      Log In
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <div className="tap-auth-success-screen">
                <div className="tap-success-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0b69b3" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h2 className="tap-success-title">Verify your email address</h2>
                <p className="tap-success-desc">
                  We&apos;ve sent a verification link to:
                  <br />
                  <strong style={{ color: "#0b69b3" }}>{sentEmail}</strong>
                </p>
                <p className="tap-success-subdesc">
                  Please click the link in that email to activate your account. You can then log in and manage your smart stands!
                </p>
                <Link
                  href="/auth/login"
                  className="tap-btn-primary"
                  style={{ marginTop: 24, textDecoration: "none" }}
                >
                  Go to Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
