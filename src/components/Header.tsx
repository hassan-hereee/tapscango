"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchModal from "./SearchModal";
import CartDrawer from "./CartDrawer";
import MobileDrawer from "./MobileDrawer";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isStuck, setIsStuck] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const { totalItems, setIsCartOpen } = useCart();
  const { user, openLoginModal, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close account menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsStuck(true);
      } else {
        setIsStuck(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`t4s-header-wrapper ${isStuck ? "is-stuck" : ""}`}>
        <div className="t4s-container">
          <div className="t4s-header-inner">
            {/* Mobile Hamburger Button */}
            <button
              className="t4s-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16" fill="currentColor">
                <rect width="30" height="1.5"></rect>
                <rect y="7" width="20" height="1.5"></rect>
                <rect y="14" width="30" height="1.5"></rect>
              </svg>
            </button>

            {/* Logo */}
            <div className="t4s-logo-wrap">
              <Link href="/" className="t4s-logo-link">
                <Image
                  src="/logo.png"
                  alt="TapScan.pk"
                  width={180}
                  height={42}
                  className="t4s-logo-desktop"
                  priority
                />
                <Image
                  src="/logo.png"
                  alt="TapScan.pk"
                  width={115}
                  height={27}
                  className="t4s-logo-mobile"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="t4s-nav-container" aria-label="Main Navigation">
              <ul className="t4s-nav-list">
                <li className="t4s-nav-item">
                  <Link href="/" className="t4s-nav-link">
                    Home
                  </Link>
                </li>

                <li className="t4s-nav-item">
                  <Link href="/collections/all" className="t4s-nav-link">
                    <span>Shop</span>
                    <svg
                      className="t4s-arrow-icon"
                      viewBox="0 0 19 12"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.5 11.4L0.6 2.5C0.2 2.1 0.2 1.5 0.6 1.1L1.1 0.6C1.5 0.2 2.1 0.2 2.5 0.6L9.5 7.6L16.5 0.6C16.9 0.2 17.5 0.2 17.9 0.6L18.4 1.1C18.8 1.5 18.8 2.1 18.4 2.5L9.5 11.4Z" />
                    </svg>
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="t4s-dropdown">
                    <Link href="/collections/all-products" className="t4s-dropdown-item">
                      All Products
                      <span className="t4s-dropdown-badge">Popular</span>
                    </Link>
                    <Link href="/collections/premium-stands" className="t4s-dropdown-item">
                      Smart NFC Review Stands
                    </Link>
                    <Link href="/collections/qr-code-stands-pakistan" className="t4s-dropdown-item">
                      QR Code Stands Pakistan
                    </Link>
                    <Link href="/collections/all" className="t4s-dropdown-item">
                      Multi-link 3D Acrylic Standees
                    </Link>
                    <Link href="/collections/all" className="t4s-dropdown-item">
                      Scan-to-Pay Payment Stands
                    </Link>
                  </div>
                </li>

                <li className="t4s-nav-item">
                  <Link href="/pages/reviews" className="t4s-nav-link">
                    Reviews
                  </Link>
                </li>

                <li className="t4s-nav-item">
                  <Link href="/pages/contact" className="t4s-nav-link">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Header Right Action Icons */}
            <div className="t4s-header-actions" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* WhatsApp Quick Order Link */}
              <a
                href="https://wa.me/923274780117?text=Salam,%20I%20would%20like%20to%20inquire%20about%20your%20smart%20NFC%20and%20QR%20stands."
                target="_blank"
                rel="noopener noreferrer"
                className="t4s-whatsapp-header-badge"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "#25D366",
                  color: "#ffffff",
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(37, 211, 102, 0.25)",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span className="t4s-whatsapp-text">0327-4780117</span>
              </a>

              {/* Search Button */}
              <button
                className="t4s-action-btn"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search site"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 18 19"
                  fill="none"
                  width="22"
                  height="22"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              {/* Account Button (Desktop/Tablet) */}
              <div className="tap-account-dropdown-wrap" ref={accountMenuRef}>
                <button
                  type="button"
                  className="t4s-action-btn t4s-account-btn"
                  onClick={() => {
                    if (mounted && user) {
                      setIsAccountMenuOpen(!isAccountMenuOpen);
                    } else {
                      openLoginModal();
                    }
                  }}
                  aria-label={mounted && user ? `Account menu for ${user.name}` : "Log In or Sign Up"}
                  style={{ position: "relative" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke={mounted && user ? "#0b69b3" : "currentColor"}
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="24"
                    height="24"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {mounted && user && (
                    <span
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "#10b981",
                        border: "1.5px solid #ffffff",
                      }}
                    />
                  )}
                </button>

                {/* Authenticated Dropdown Menu */}
                {mounted && user && isAccountMenuOpen && (
                  <div className="tap-account-menu">
                    <div className="tap-account-menu-header">
                      <div className="tap-account-menu-name">{user.name}</div>
                      <div className="tap-account-menu-email">{user.email}</div>
                    </div>
                    <Link
                      href="/account"
                      className="tap-account-menu-item"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>Dashboard & Account</span>
                    </Link>
                    <button
                      type="button"
                      className="tap-account-menu-item is-danger"
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        logout();
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
                )}
              </div>

              {/* Cart Button with Count Badge */}
              <button
                className="t4s-action-btn"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Cart with ${totalItems} items`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="22"
                  height="22"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span className="t4s-cart-badge">{totalItems}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Modals and Drawers */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer />
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}
