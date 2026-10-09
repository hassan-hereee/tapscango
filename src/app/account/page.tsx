"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const { user, isLoading, openLoginModal, logout } = useAuth();

  // Change password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdMessage, setPwdMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Orders State
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setOrdersLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        if (res.ok && data.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Failed to fetch user orders:", err);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMessage(null);

    if (!currentPassword || !newPassword) {
      setPwdMessage({ type: "error", text: "Please enter your current and new password." });
      return;
    }

    if (newPassword.length < 8) {
      setPwdMessage({ type: "error", text: "New password must be at least 8 characters long." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwdMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    setPwdLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      setPwdLoading(false);

      if (!res.ok || !data.success) {
        setPwdMessage({ type: "error", text: data.error || "Failed to update password." });
      } else {
        setPwdMessage({ type: "success", text: "Your password was changed successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setPwdLoading(false);
      setPwdMessage({ type: "error", text: "Network error. Please try again." });
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AnnouncementBar />
      <Header />

      <main style={{ flex: 1, backgroundColor: "#f8fafc", padding: "40px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
              <div className="tap-spinner" style={{ width: 36, height: 36, borderTopColor: "#0b69b3", borderColor: "#cbd5e1" }} />
            </div>
          ) : !user ? (
            <div
              style={{
                background: "#ffffff",
                borderRadius: 20,
                padding: "48px 24px",
                textAlign: "center",
                maxWidth: 480,
                margin: "40px auto",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "#e0f2fe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  color: "#0b69b3",
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>
                Sign In to Your Account
              </h1>
              <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
                Please log in to manage your smart NFC stand orders, update account security, and access exclusive TapScan features.
              </p>
              <button
                type="button"
                className="tap-btn-primary"
                onClick={openLoginModal}
                style={{ maxWidth: 280, margin: "0 auto" }}
              >
                Log In or Register
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* User Welcome Banner */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 20,
                  padding: "32px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #0b69b3 0%, #08497e 100%)",
                      color: "#ffffff",
                      fontSize: 24,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textTransform: "uppercase",
                      boxShadow: "0 6px 16px rgba(11, 105, 179, 0.3)",
                    }}
                  >
                    {user.name ? user.name.charAt(0) : "U"}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>
                        Salam, {user.name}
                      </h1>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 20,
                          background: user.isEmailVerified ? "#dcfce7" : "#fef3c7",
                          color: user.isEmailVerified ? "#15803d" : "#b45309",
                        }}
                      >
                        {user.isEmailVerified ? "✓ Verified Account" : "⚠ Email Unverified"}
                      </span>
                    </div>
                    <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>
                      {user.email} • {user.authProvider === "google" ? "Google Sign-In" : "Email & Password"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 10,
                    border: "1px solid #e2e8f0",
                    background: "#ffffff",
                    color: "#ef4444",
                    fontSize: 13,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Log Out</span>
                </button>
              </div>

              {/* Main Content Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: 24,
                }}
              >
                {/* Orders & Stands Card */}
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: 20,
                    padding: "28px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>
                    My Smart NFC Stands & Orders
                  </h2>
                  <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
                    Track your orders, view shipping status, and manage your live smart stand profiles.
                  </p>

                  {ordersLoading ? (
                    <div style={{ padding: "40px 0", textAlign: "center" }}>
                      <div className="tap-spinner" style={{ width: 30, height: 30, borderTopColor: "#0b69b3", borderColor: "#cbd5e1", margin: "0 auto 10px" }} />
                      <div style={{ fontSize: 13, color: "#64748b" }}>Loading your orders...</div>
                    </div>
                  ) : orders.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      {orders.map((order) => (
                        <div
                          key={order._id || order.orderNumber}
                          style={{
                            border: "1px solid #e2e8f0",
                            borderRadius: 14,
                            padding: "16px 18px",
                            background: "#f8fafc",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <strong style={{ fontSize: 14, color: "#08497e" }}>{order.orderNumber}</strong>
                                <span
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    padding: "2px 8px",
                                    borderRadius: 10,
                                    background:
                                      order.orderStatus === "delivered"
                                        ? "#dcfce7"
                                        : order.orderStatus === "shipped"
                                        ? "#e0e7ff"
                                        : "#fef3c7",
                                    color:
                                      order.orderStatus === "delivered"
                                        ? "#166534"
                                        : order.orderStatus === "shipped"
                                        ? "#3730a3"
                                        : "#92400e",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {order.orderStatus}
                                </span>
                              </div>
                              <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                                {new Date(order.createdAt).toLocaleDateString("en-US", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })} • {order.items.length} {order.items.length === 1 ? "item" : "items"}
                              </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <strong style={{ fontSize: 15, color: "#0f172a" }}>
                                Rs. {order.total.toLocaleString()}
                              </strong>
                              <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase" }}>
                                {order.paymentMethod === "cod" ? "COD" : "Bank Transfer"}
                              </div>
                            </div>
                          </div>

                          {/* Items Preview */}
                          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
                            {order.items.map((it: any, idx: number) => (
                              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: "#334155" }}>
                                {it.image && (
                                  <Image
                                    src={it.image}
                                    alt={it.title}
                                    width={32}
                                    height={32}
                                    style={{ borderRadius: 6, objectFit: "cover", border: "1px solid #e2e8f0" }}
                                  />
                                )}
                                <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  {it.title} (x{it.quantity})
                                </span>
                                <span style={{ fontWeight: 600 }}>Rs. {(it.price * it.quantity).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>

                          {/* Quick Actions */}
                          <div style={{ display: "flex", gap: 10, borderTop: "1px solid #e2e8f0", paddingTop: 10 }}>
                            <Link
                              href={`/checkout/success?orderNumber=${order.orderNumber}`}
                              style={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#0b69b3",
                                textDecoration: "none",
                              }}
                            >
                              View Details →
                            </Link>
                            <a
                              href={`https://wa.me/923274780117?text=Salam!%20Inquiry%20regarding%20Order%20${order.orderNumber}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#15803d",
                                textDecoration: "none",
                                marginLeft: "auto",
                              }}
                            >
                              Track on WhatsApp 💬
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        background: "#f8fafc",
                        border: "1.5px dashed #cbd5e1",
                        borderRadius: 14,
                        padding: "36px 20px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: 32, marginBottom: 8 }}>📦</div>
                      <div style={{ fontWeight: 600, color: "#334155", fontSize: 14 }}>
                        No active orders yet
                      </div>
                      <p style={{ color: "#64748b", fontSize: 12, marginTop: 4, marginBottom: 16 }}>
                        Upgrade your counter or office with Pakistan&apos;s #1 smart NFC stand.
                      </p>
                      <Link
                        href="/collections/all"
                        className="tap-btn-primary"
                        style={{
                          display: "inline-flex",
                          height: 40,
                          padding: "0 20px",
                          fontSize: 13,
                          textDecoration: "none",
                          width: "auto",
                        }}
                      >
                        Browse Collection
                      </Link>
                    </div>
                  )}
                </div>

                {/* Password / Security Card */}
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: 20,
                    padding: "28px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>
                    Security & Password
                  </h2>
                  <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
                    {user.authProvider === "google"
                      ? "Your account is secured via Google OAuth. No password is required."
                      : "Update your password to keep your TapScan account protected."}
                  </p>

                  {user.authProvider === "google" ? (
                    <div
                      style={{
                        background: "#eff6ff",
                        border: "1px solid #bfdbfe",
                        borderRadius: 12,
                        padding: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24">
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
                      <span style={{ fontSize: 13, color: "#1e3a8a", fontWeight: 500 }}>
                        Managed by Google Authentication
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={handleChangePassword} className="tap-auth-form">
                      {pwdMessage && (
                        <div
                          style={{
                            padding: "10px 14px",
                            borderRadius: 10,
                            fontSize: 13,
                            background: pwdMessage.type === "success" ? "#ecfdf5" : "#fef2f2",
                            border: `1px solid ${pwdMessage.type === "success" ? "#a7f3d0" : "#fecaca"}`,
                            color: pwdMessage.type === "success" ? "#065f46" : "#b91c1c",
                          }}
                        >
                          {pwdMessage.text}
                        </div>
                      )}

                      <div className="tap-form-group">
                        <label className="tap-form-label" htmlFor="acc-curr-pwd">
                          Current Password
                        </label>
                        <input
                          id="acc-curr-pwd"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="tap-input"
                          style={{ padding: "0 14px" }}
                          required
                        />
                      </div>

                      <div className="tap-form-group">
                        <label className="tap-form-label" htmlFor="acc-new-pwd">
                          New Password
                        </label>
                        <input
                          id="acc-new-pwd"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="tap-input"
                          style={{ padding: "0 14px" }}
                          placeholder="Min. 8 characters"
                          required
                        />
                      </div>

                      <div className="tap-form-group">
                        <label className="tap-form-label" htmlFor="acc-conf-pwd">
                          Confirm New Password
                        </label>
                        <input
                          id="acc-conf-pwd"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="tap-input"
                          style={{ padding: "0 14px" }}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="tap-btn-primary"
                        disabled={pwdLoading}
                        style={{ height: 44, marginTop: 4 }}
                      >
                        {pwdLoading ? <div className="tap-spinner" /> : "Update Password"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
