"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export default function MobileDrawer({ isOpen, onClose, onOpenSearch }: MobileDrawerProps) {
  const [shopOpen, setShopOpen] = useState(false);
  const { user, openLoginModal, logout } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      className={`t4s-drawer-overlay ${isOpen ? "is-open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="t4s-mobile-drawer">
        <div className="t4s-drawer-header">
          <Link href="/" onClick={onClose}>
            <Image
              src="/logo.png"
              alt="TapScan.pk"
              width={115}
              height={27}
              style={{ objectFit: "contain" }}
              priority
            />
          </Link>
          <button onClick={onClose} aria-label="Close menu" className="t4s-drawer-close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="t4s-drawer-body">
          {/* Quick Search In Drawer */}
          <div style={{ padding: "0 20px 16px" }}>
            <button
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                background: "#f1f3f5",
                borderRadius: 8,
                color: "#666",
                fontSize: 14,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 18 19" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z"
                />
              </svg>
              <span>Search products...</span>
            </button>
          </div>

          <div className="t4s-drawer-nav-item">
            <Link href="/" onClick={onClose} className="t4s-drawer-link">
              Home
            </Link>
          </div>

          <div className="t4s-drawer-nav-item">
            <div
              className="t4s-drawer-link"
              onClick={() => setShopOpen(!shopOpen)}
              style={{ cursor: "pointer" }}
            >
              <span>Shop</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 19 12"
                fill="currentColor"
                style={{
                  transform: shopOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease",
                }}
              >
                <path d="M9.5 11.4L0.6 2.5C0.2 2.1 0.2 1.5 0.6 1.1L1.1 0.6C1.5 0.2 2.1 0.2 2.5 0.6L9.5 7.6L16.5 0.6C16.9 0.2 17.5 0.2 17.9 0.6L18.4 1.1C18.8 1.5 18.8 2.1 18.4 2.5L9.5 11.4Z" />
              </svg>
            </div>

            {shopOpen && (
              <div className="t4s-drawer-submenu">
                <Link
                  href="/collections/all-products"
                  onClick={onClose}
                  className="t4s-drawer-sublink"
                >
                  All Products
                </Link>
                <Link
                  href="/collections/premium-stands"
                  onClick={onClose}
                  className="t4s-drawer-sublink"
                >
                  Premium NFC Stands
                </Link>
                <Link
                  href="/collections/qr-code-stands-pakistan"
                  onClick={onClose}
                  className="t4s-drawer-sublink"
                >
                  QR Code Stands Pakistan
                </Link>
                <Link
                  href="/collections/all"
                  onClick={onClose}
                  className="t4s-drawer-sublink"
                >
                  New Arrivals
                </Link>
              </div>
            )}
          </div>

          <div className="t4s-drawer-nav-item">
            <Link href="/pages/reviews" onClick={onClose} className="t4s-drawer-link">
              Reviews
            </Link>
          </div>

          <div className="t4s-drawer-nav-item">
            <Link href="/pages/contact" onClick={onClose} className="t4s-drawer-link">
              Contact
            </Link>
          </div>
        </div>

        <div className="t4s-drawer-footer">
          <div className="t4s-drawer-contact-item">
            <span>🇵🇰</span>
            <span>Pakistan’s #1 Smart Stand Solution</span>
          </div>
          <a
            href="https://wa.me/923274780117"
            target="_blank"
            rel="noopener noreferrer"
            className="t4s-drawer-contact-item"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <span>📞</span>
            <span>WhatsApp: 0327 4780117</span>
          </a>
          <div style={{ marginTop: 12 }}>
            {user ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link
                  href="/account"
                  onClick={onClose}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#0b69b3",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>My Account ({user.name})</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    logout();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#ef4444",
                    textAlign: "left",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openLoginModal();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#0b69b3",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Login / Sign Up</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
