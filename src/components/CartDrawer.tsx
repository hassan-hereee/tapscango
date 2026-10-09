"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalItems, subtotal } =
    useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  const handleWhatsAppCheckout = () => {
    const orderLines = items.map((item, idx) => {
      const variants = item.selectedVariants
        ? Object.entries(item.selectedVariants)
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ")
        : "";
      const custom = item.customBusinessName ? ` [Custom: ${item.customBusinessName}]` : "";
      return `${idx + 1}. ${item.title} (Qty: ${item.quantity}) - Rs. ${item.price * item.quantity}${variants ? ` (${variants})` : ""}${custom}`;
    });

    const message = `Hello TapScan.pk! I want to place an order:\n\n${orderLines.join("\n")}\n\n*Total Amount:* Rs. ${subtotal.toLocaleString()}\n*Payment:* Cash on Delivery\n\nPlease confirm my order details!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923274780117?text=${encoded}`, "_blank");
  };

  return (
    <div
      className={`t4s-drawer-overlay ${isCartOpen ? "is-cart-open is-open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsCartOpen(false);
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="t4s-cart-drawer" style={{ display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div className="t4s-cart-header" style={{ padding: "18px 24px", borderBottom: "1px solid #ebebeb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="t4s-cart-title" style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
            Shopping Cart ({totalItems})
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="t4s-drawer-close"
            style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "#f3f4f6" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{ backgroundColor: "#f0f7fc", padding: "12px 24px", borderBottom: "1px solid #e0effa" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#08497e", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
            <span>🚚</span>
            {subtotal >= 5000 ? (
              <span style={{ color: "#059669" }}>You qualify for <strong>FREE Nationwide Express Shipping!</strong></span>
            ) : (
              <span>
                Add <strong>Rs. {(5000 - subtotal).toLocaleString()}</strong> more to get <strong>FREE Express Shipping</strong>!
              </span>
            )}
          </div>
          <div style={{ height: 6, background: "#dbeafe", borderRadius: 4, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                background: subtotal >= 5000 ? "#059669" : "#0b69b3",
                width: `${Math.min(100, (subtotal / 5000) * 100)}%`,
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Cart Content */}
        {items.length === 0 ? (
          <div className="t4s-cart-empty" style={{ flex: 1, padding: "40px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <div className="t4s-cart-empty-title" style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
              Your cart is empty
            </div>
            <p className="t4s-cart-empty-text" style={{ fontSize: 13, color: "#6b7280", marginBottom: 24, maxWidth: 280 }}>
              Discover Pakistan&apos;s best smart NFC & QR review stands to grow your business today.
            </p>
            <Link
              href="/products"
              onClick={() => setIsCartOpen(false)}
              className="t4s-btn-primary"
              style={{ backgroundColor: "#0b69b3", color: "#ffffff", padding: "12px 28px", borderRadius: 8, fontWeight: 600, fontSize: 14 }}
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: 14,
                  paddingBottom: 16,
                  borderBottom: "1px solid #f3f4f6",
                  position: "relative",
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    position: "relative",
                    width: 76,
                    height: 76,
                    borderRadius: 8,
                    overflow: "hidden",
                    backgroundColor: "#f9fafb",
                    flexShrink: 0,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="76px"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={() => setIsCartOpen(false)}
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#111827",
                      lineHeight: 1.35,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      marginBottom: 4,
                    }}
                  >
                    {item.title}
                  </Link>

                  {/* Variants */}
                  {item.selectedVariants && (
                    <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>
                      {Object.entries(item.selectedVariants).map(([k, v]) => (
                        <span key={k} style={{ marginRight: 8 }}>
                          {k}: <strong>{v}</strong>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Customization label */}
                  {item.customBusinessName && (
                    <div style={{ fontSize: 11, color: "#08497e", fontWeight: 600, marginBottom: 4 }}>
                      Custom: &ldquo;{item.customBusinessName}&rdquo;
                    </div>
                  )}

                  {/* Price & Quantity Stepper */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #d1d5db", borderRadius: 6, background: "#ffffff" }}>
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#374151" }}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span style={{ minWidth: 26, textAlign: "center", fontSize: 12, fontWeight: 600 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#374151" }}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#08497e" }}>
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </div>
                      {item.compareAtPrice > item.price && (
                        <div style={{ fontSize: 11, color: "#9ca3af", textDecoration: "line-through" }}>
                          Rs. {(item.compareAtPrice * item.quantity).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    color: "#9ca3af",
                    padding: 4,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid #ebebeb", backgroundColor: "#f9fafb" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 14, color: "#4b5563" }}>Subtotal:</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontSize: 13, color: "#6b7280" }}>Shipping:</span>
              <span style={{ fontSize: 13, color: subtotal >= 5000 ? "#059669" : "#4b5563", fontWeight: 600 }}>
                {subtotal >= 5000 ? "FREE" : "Rs. 250 (Calculated at checkout)"}
              </span>
            </div>

            {/* Quick Order via WhatsApp Button */}
            <button
              onClick={handleWhatsAppCheckout}
              style={{
                width: "100%",
                backgroundColor: "#25D366",
                color: "#ffffff",
                padding: "13px 16px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginBottom: 10,
                boxShadow: "0 4px 12px rgba(37, 211, 102, 0.25)",
                transition: "all 0.2s ease",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Fast Order via WhatsApp (COD)
            </button>

            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              style={{
                width: "100%",
                backgroundColor: "#0b69b3",
                color: "#ffffff",
                padding: "13px 16px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 14,
                display: "block",
                textAlign: "center",
                transition: "all 0.2s ease",
              }}
            >
              Proceed to Checkout
            </Link>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 12, fontSize: 11, color: "#6b7280" }}>
              <span>🇵🇰 Cash on Delivery</span>
              <span>•</span>
              <span>🛡️ 1-Year Chip Warranty</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
