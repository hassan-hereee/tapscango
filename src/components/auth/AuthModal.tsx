"use client";

import React, { useState, useEffect } from "react";
import { useAuth, AuthModalView } from "@/context/AuthContext";

export default function AuthModal() {
  const {
    isAuthModalOpen,
    authModalView,
    closeAuthModal,
    setAuthModalView,
    login,
    signup,
    loginWithGooglePopup,
  } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupEmailSentTo, setSignupEmailSentTo] = useState("");

  // Forgot password form state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Status & error states
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Reset errors and sub-states when view changes or modal closes
  useEffect(() => {
    setErrorMessage(null);
    setIsLoading(false);
    setIsGoogleLoading(false);
    if (!isAuthModalOpen) {
      setSignupSuccess(false);
      setForgotSuccess(false);
    }
  }, [authModalView, isAuthModalOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginEmail.trim() || !loginPassword) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    const res = await login({ email: loginEmail.trim(), password: loginPassword });
    setIsLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || "Login failed.");
    }
  };

  // Handle Signup Submit
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (signupPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);
    const res = await signup({
      name: signupName.trim(),
      email: signupEmail.trim(),
      password: signupPassword,
    });
    setIsLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || "Signup failed.");
    } else {
      setSignupEmailSentTo(signupEmail.trim());
      setSignupSuccess(true);
    }
  };

  // Handle Forgot Password Submit
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!forgotEmail.trim()) {
      setErrorMessage("Please enter your registered email address.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      setIsLoading(false);

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Failed to process forgot password request.");
      } else {
        setForgotSuccess(true);
      }
    } catch {
      setIsLoading(false);
      setErrorMessage("Network error. Please try again.");
    }
  };

  // Handle Google Sign-in Popup
  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsGoogleLoading(true);
    const res = await loginWithGooglePopup();
    setIsGoogleLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || "Google sign-in could not be completed.");
    }
  };

  // Password strength calculation
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

  const strength = getPasswordStrength(signupPassword);

  return (
    <div
      className="tap-auth-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="tap-auth-card">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="tap-auth-close-btn"
          aria-label="Close authentication modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Brand Header */}
        <div className="tap-auth-header">
          <h2 className="tap-auth-title">
            {authModalView === "login" && "Welcome back"}
            {authModalView === "signup" && "Create your account"}
            {authModalView === "forgot" && "Reset your password"}
          </h2>
          <p className="tap-auth-subtitle">
            {authModalView === "login" && "Log in to manage your smart NFC & QR stands, analytics and orders."}
            {authModalView === "signup" && "Join Pakistan's leading smart business presence platform today."}
            {authModalView === "forgot" && "Enter your email address and we will send you a secure reset link."}
          </p>
        </div>

        {/* View Switcher Tabs (Only if not in forgot view) */}
        {authModalView !== "forgot" && !signupSuccess && (
          <div className="tap-auth-tabs">
            <button
              type="button"
              className={`tap-auth-tab ${authModalView === "login" ? "is-active" : ""}`}
              onClick={() => {
                setErrorMessage(null);
                setAuthModalView("login");
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`tap-auth-tab ${authModalView === "signup" ? "is-active" : ""}`}
              onClick={() => {
                setErrorMessage(null);
                setAuthModalView("signup");
              }}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Global Error Banner */}
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

        {/* -------------------- 1. LOGIN VIEW -------------------- */}
        {authModalView === "login" && (
          <div className="tap-auth-body">
            {/* Google One-Click Button */}
            <button
              type="button"
              className="tap-google-btn"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isLoading}
            >
              {isGoogleLoading ? (
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
              <span>{isGoogleLoading ? "Connecting with Google..." : "Continue with Google"}</span>
            </button>

            <div className="tap-auth-divider">
              <span>or sign in with email</span>
            </div>

            <form onSubmit={handleLoginSubmit} className="tap-auth-form">
              <div className="tap-form-group">
                <label className="tap-form-label" htmlFor="login-email">
                  Email Address
                </label>
                <div className="tap-input-wrap">
                  <svg className="tap-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="you@business.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="tap-input"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="tap-form-group">
                <div className="tap-form-label-row">
                  <label className="tap-form-label" htmlFor="login-password">
                    Password
                  </label>
                  <button
                    type="button"
                    className="tap-forgot-link"
                    onClick={() => {
                      setErrorMessage(null);
                      setAuthModalView("forgot");
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="tap-input-wrap">
                  <svg className="tap-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="login-password"
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="tap-input"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="tap-password-toggle"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    aria-label={showLoginPassword ? "Hide password" : "Show password"}
                  >
                    {showLoginPassword ? (
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
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading ? <div className="tap-spinner" /> : "Sign In to TapScan"}
              </button>
            </form>
          </div>
        )}

        {/* -------------------- 2. SIGN UP VIEW -------------------- */}
        {authModalView === "signup" && !signupSuccess && (
          <div className="tap-auth-body">
            {/* Google One-Click Button */}
            <button
              type="button"
              className="tap-google-btn"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isLoading}
            >
              {isGoogleLoading ? (
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
              <span>{isGoogleLoading ? "Connecting with Google..." : "Sign up with Google"}</span>
            </button>

            <div className="tap-auth-divider">
              <span>or sign up with email</span>
            </div>

            <form onSubmit={handleSignupSubmit} className="tap-auth-form">
              <div className="tap-form-group">
                <label className="tap-form-label" htmlFor="signup-name">
                  Full Name / Business Name
                </label>
                <div className="tap-input-wrap">
                  <svg className="tap-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    id="signup-name"
                    type="text"
                    placeholder="Ali Hassan"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="tap-input"
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="tap-form-group">
                <label className="tap-form-label" htmlFor="signup-email">
                  Work Email
                </label>
                <div className="tap-input-wrap">
                  <svg className="tap-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="ali@company.pk"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="tap-input"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="tap-form-group">
                <label className="tap-form-label" htmlFor="signup-password">
                  Create Password
                </label>
                <div className="tap-input-wrap">
                  <svg className="tap-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="signup-password"
                    type={showSignupPassword ? "text" : "password"}
                    placeholder="Minimum 8 characters"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="tap-input"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="tap-password-toggle"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    aria-label={showSignupPassword ? "Hide password" : "Show password"}
                  >
                    {showSignupPassword ? (
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

                {/* Password strength indicator */}
                {signupPassword && (
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
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading ? <div className="tap-spinner" /> : "Create TapScan Account"}
              </button>
            </form>
          </div>
        )}

        {/* -------------------- 2b. SIGNUP CONFIRMATION SCREEN -------------------- */}
        {authModalView === "signup" && signupSuccess && (
          <div className="tap-auth-success-screen">
            <div className="tap-success-icon-wrap">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0b69b3" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="tap-success-title">Verify your email address</h3>
            <p className="tap-success-desc">
              We&apos;ve sent a verification link to:
              <br />
              <strong style={{ color: "#0b69b3" }}>{signupEmailSentTo}</strong>
            </p>
            <p className="tap-success-subdesc">
              Please click the link in that email to activate your account. You can then log in and manage your smart stands!
            </p>
            <button
              type="button"
              className="tap-btn-primary"
              style={{ marginTop: 20 }}
              onClick={() => {
                setSignupSuccess(false);
                setAuthModalView("login");
              }}
            >
              Back to Sign In
            </button>
          </div>
        )}

        {/* -------------------- 3. FORGOT PASSWORD VIEW -------------------- */}
        {authModalView === "forgot" && !forgotSuccess && (
          <div className="tap-auth-body">
            <form onSubmit={handleForgotSubmit} className="tap-auth-form">
              <div className="tap-form-group">
                <label className="tap-form-label" htmlFor="forgot-email">
                  Registered Email Address
                </label>
                <div className="tap-input-wrap">
                  <svg className="tap-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    id="forgot-email"
                    type="email"
                    placeholder="you@example.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="tap-input"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="tap-btn-primary"
                disabled={isLoading}
              >
                {isLoading ? <div className="tap-spinner" /> : "Send Reset Link"}
              </button>

              <button
                type="button"
                className="tap-back-btn"
                onClick={() => {
                  setErrorMessage(null);
                  setAuthModalView("login");
                }}
              >
                ← Back to Sign In
              </button>
            </form>
          </div>
        )}

        {/* -------------------- 3b. FORGOT SUCCESS SCREEN -------------------- */}
        {authModalView === "forgot" && forgotSuccess && (
          <div className="tap-auth-success-screen">
            <div className="tap-success-icon-wrap">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0b69b3" strokeWidth="2.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h3 className="tap-success-title">Password reset link sent</h3>
            <p className="tap-success-desc">
              If an account exists with <strong style={{ color: "#0b69b3" }}>{forgotEmail}</strong>, we have sent instructions to reset your password.
            </p>
            <p className="tap-success-subdesc">
              The link is valid for 1 hour. Please check your spam folder if you do not see it in a few minutes.
            </p>
            <button
              type="button"
              className="tap-btn-primary"
              style={{ marginTop: 20 }}
              onClick={() => {
                setForgotSuccess(false);
                setAuthModalView("login");
              }}
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
