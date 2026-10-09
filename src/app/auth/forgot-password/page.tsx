"use client";

import { useState } from "react";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Failed to process forgot password request.");
      } else {
        setSuccess(true);
      }
    } catch {
      setLoading(false);
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AnnouncementBar />
      <Header />

      <main style={{ flex: 1 }} className="tap-auth-page-container">
        <div className="tap-auth-page-box">
          <div className="tap-auth-card" style={{ maxWidth: "100%", boxShadow: "0 20px 50px -10px rgba(11, 35, 65, 0.12), 0 0 0 1px #e2e8f0" }}>
            {!success ? (
              <>
                <div className="tap-auth-header">
                  <div className="tap-auth-badge">ACCOUNT RECOVERY</div>
                  <h1 className="tap-auth-title">Reset your password</h1>
                  <p className="tap-auth-subtitle">
                    Enter your email address and we will send you a secure link to reset your account password.
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

                <form onSubmit={handleSubmit} className="tap-auth-form">
                  <div className="tap-form-group">
                    <label className="tap-form-label" htmlFor="page-forgot-email">
                      Registered Email Address
                    </label>
                    <div className="tap-input-wrap">
                      <svg className="tap-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <input
                        id="page-forgot-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="tap-input"
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="tap-btn-primary"
                    disabled={loading}
                  >
                    {loading ? <div className="tap-spinner" /> : "Send Reset Link"}
                  </button>

                  <Link
                    href="/auth/login"
                    className="tap-back-btn"
                    style={{ display: "block" }}
                  >
                    ← Back to Sign In
                  </Link>
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
                <h2 className="tap-success-title">Password reset link sent</h2>
                <p className="tap-success-desc">
                  If an account exists with <strong style={{ color: "#0b69b3" }}>{email}</strong>, we have sent instructions to reset your password.
                </p>
                <p className="tap-success-subdesc">
                  The link is valid for 1 hour. Please check your spam folder if you do not see it in a few minutes.
                </p>
                <Link
                  href="/auth/login"
                  className="tap-btn-primary"
                  style={{ marginTop: 24, textDecoration: "none" }}
                >
                  Back to Sign In
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
