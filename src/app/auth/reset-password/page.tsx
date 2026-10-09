"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshUser } = useAuth();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!token) {
      setErrorMessage("Reset token is missing from the link. Please request a new password reset.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Failed to reset password.");
      } else {
        await refreshUser();
        setSuccess(true);
      }
    } catch {
      setLoading(false);
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="tap-auth-card" style={{ maxWidth: "100%", boxShadow: "0 20px 50px -10px rgba(11, 35, 65, 0.12), 0 0 0 1px #e2e8f0" }}>
      {!success ? (
        <>
          <div className="tap-auth-header">
            <div className="tap-auth-badge">SET NEW PASSWORD</div>
            <h1 className="tap-auth-title">Choose a new password</h1>
            <p className="tap-auth-subtitle">
              Your new password must be at least 8 characters long.
            </p>
          </div>

          {!token && (
            <div className="tap-auth-error-banner" role="alert">
              <span>No reset token provided. Please use the link sent to your email.</span>
            </div>
          )}

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
              <label className="tap-form-label" htmlFor="reset-new-password">
                New Password
              </label>
              <div className="tap-input-wrap">
                <svg className="tap-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="reset-new-password"
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
            </div>

            <div className="tap-form-group">
              <label className="tap-form-label" htmlFor="reset-confirm-password">
                Confirm New Password
              </label>
              <div className="tap-input-wrap">
                <svg className="tap-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="reset-confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="tap-input"
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="tap-btn-primary"
              disabled={loading || !token}
            >
              {loading ? <div className="tap-spinner" /> : "Save New Password"}
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
          <h2 className="tap-success-title">Password successfully changed!</h2>
          <p className="tap-success-desc">
            Your password has been updated. You are now logged in and can access your TapScan account.
          </p>
          <button
            type="button"
            className="tap-btn-primary"
            style={{ marginTop: 24 }}
            onClick={() => router.push("/account")}
          >
            Go to My Account
          </button>
        </div>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AnnouncementBar />
      <Header />

      <main style={{ flex: 1 }} className="tap-auth-page-container">
        <div className="tap-auth-page-box">
          <Suspense fallback={<div className="tap-spinner" style={{ margin: "40px auto" }} />}>
            <ResetPasswordContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
