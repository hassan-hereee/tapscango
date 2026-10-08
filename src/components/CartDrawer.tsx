"use client";

import { useEffect } from "react";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
}

export default function CartDrawer({ isOpen, onClose, cartCount }: CartDrawerProps) {
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
      className={`t4s-drawer-overlay ${isOpen ? "is-cart-open is-open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="t4s-cart-drawer">
        <div className="t4s-cart-header">
          <div className="t4s-cart-title">Shopping Cart ({cartCount})</div>
          <button onClick={onClose} aria-label="Close cart" className="t4s-drawer-close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="t4s-cart-empty">
          <svg className="t4s-cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <div className="t4s-cart-empty-title">Your cart is empty</div>
          <p className="t4s-cart-empty-text">
            Before proceeding to checkout you must add some products to your shopping cart.
          </p>
          <Link href="/collections/all" onClick={onClose} className="t4s-btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
