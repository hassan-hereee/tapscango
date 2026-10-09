"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchModal from "./SearchModal";
import CartDrawer from "./CartDrawer";
import MobileDrawer from "./MobileDrawer";

import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isStuck, setIsStuck] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

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
            <div className="t4s-header-actions">
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
              <Link
                href="/account"
                className="t4s-action-btn t4s-account-btn"
                aria-label="My Account"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24"
                  height="24"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>

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
