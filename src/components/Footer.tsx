"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer style={{ backgroundColor: "#1a1f26", color: "#d1d5db", paddingTop: 60 }}>
      <div className="t4s-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 40,
            paddingBottom: 50,
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Column 1: About TapScan */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <Image
                src="/logo.png"
                alt="TapScan.pk"
                width={160}
                height={37}
                style={{
                  filter: "brightness(0) invert(1)",
                  objectFit: "contain",
                }}
              />
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#9ca3af", marginBottom: 16 }}>
              TapScan is a Pakistan-based online business operating from Lahore, specializing in
              premium NFC and QR code standees. We empower brands to unlock instant Google reviews,
              social media follows, and digital scan-to-pay payments nationwide.
            </p>
            <div style={{ fontSize: 13, lineHeight: 1.8, color: "#cbd5e1" }}>
              <p>📍 B3 Second Floor, 28 Band Road, Lahore 54000, Pakistan</p>
              <p>📞 Phone / WhatsApp: <a href="https://wa.me/923274780117" target="_blank" rel="noopener noreferrer" style={{ color: "#38bdf8" }}>+92 327 4780117</a></p>
              <p>✉️ Email: <a href="mailto:support@tapscan.pk" style={{ color: "#38bdf8" }}>support@tapscan.pk</a></p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: 18,
                letterSpacing: 0.5,
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { name: "Home", href: "/" },
                { name: "All Products", href: "/collections/all-products" },
                { name: "Premium NFC Stands", href: "/collections/premium-stands" },
                { name: "QR Code Stands Pakistan", href: "/collections/qr-code-stands-pakistan" },
                { name: "Customer Reviews", href: "/pages/reviews" },
                { name: "Contact Us", href: "/pages/contact" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    style={{ fontSize: 14, color: "#9ca3af", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies */}
          <div>
            <h4
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: 18,
                letterSpacing: 0.5,
              }}
            >
              Policies & Support
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { name: "Privacy Policy", href: "/policies/privacy-policy" },
                { name: "Refund & Returns Policy", href: "/policies/refund-policy" },
                { name: "Terms of Service", href: "/policies/terms-of-service" },
                { name: "Shipping & Delivery Info", href: "/policies/shipping-policy" },
                { name: "Track Your Order", href: "/pages/contact" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    style={{ fontSize: 14, color: "#9ca3af", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: 18,
                letterSpacing: 0.5,
              }}
            >
              Newsletter
            </h4>
            <p style={{ fontSize: 13.5, color: "#9ca3af", lineHeight: 1.6, marginBottom: 16 }}>
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 6,
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "#ffffff",
                  fontSize: 14,
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "12px 18px",
                  borderRadius: 6,
                  backgroundColor: "#0b69b3",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: 14,
                  transition: "background-color 0.2s",
                }}
              >
                {subscribed ? "Subscribed! Thank you" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            padding: "24px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            fontSize: 13,
            color: "#6b7280",
          }}
        >
          <div suppressHydrationWarning>
            © 2026 <strong style={{ color: "#ffffff" }}>TapScan.pk</strong>. Pakistan&apos;s Smart QR & NFC Stand Solution. All Rights Reserved.
          </div>

          {/* Badges / Payment */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>Cash on Delivery</span>
            <span>•</span>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>Bank Transfer</span>
            <span>•</span>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>EasyPaisa / JazzCash</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
