"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const status = searchParams.get("status");
  const errorMessage = searchParams.get("message");

  const isSuccess = status === "success";

  useEffect(() => {
    if (isSuccess) {
      refreshUser();
    }
  }, [isSuccess, refreshUser]);

  return (
    <div className="tap-auth-card" style={{ maxWidth: "100%", boxShadow: "0 20px 50px -10px rgba(11, 35, 65, 0.12), 0 0 0 1px #e2e8f0" }}>
      {isSuccess ? (
        <div className="tap-auth-success-screen">
          <div className="tap-success-icon-wrap" style={{ background: "#ecfdf5" }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1 className="tap-success-title">Email Verified Successfully!</h1>
          <p className="tap-success-desc">
            Your TapScan account has been verified and activated. You can now access all features, order NFC stands, and manage your smart business profile.
          </p>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            <Link
              href="/account"
              className="tap-btn-primary"
              style={{ textDecoration: "none" }}
            >
              Go to My Account
            </Link>
            <Link
              href="/collections/all"
              className="tap-back-btn"
              style={{ textDecoration: "none" }}
            >
              Browse Smart NFC Stands →
            </Link>
          </div>
        </div>
      ) : (
        <div className="tap-auth-success-screen">
          <div className="tap-success-icon-wrap" style={{ background: "#fef2f2" }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="tap-success-title" style={{ color: "#b91c1c" }}>Verification Failed</h1>
          <p className="tap-success-desc">
            {errorMessage || "The verification link is invalid, has expired, or has already been used."}
          </p>
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            <Link
              href="/auth/login"
              className="tap-btn-primary"
              style={{ textDecoration: "none" }}
            >
              Go to Sign In
            </Link>
            <Link
              href="/"
              className="tap-back-btn"
              style={{ textDecoration: "none" }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AnnouncementBar />
      <Header />

      <main style={{ flex: 1 }} className="tap-auth-page-container">
        <div className="tap-auth-page-box">
          <Suspense fallback={<div className="tap-spinner" style={{ margin: "40px auto" }} />}>
            <VerifyEmailContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
