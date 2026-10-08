"use client";

import Image from "next/image";
import Link from "next/link";

export default function FeatureShowcase() {
  return (
    <section style={{ padding: "80px 0", backgroundColor: "#ffffff" }}>
      <div className="t4s-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 48,
            alignItems: "center",
          }}
        >
          {/* Left: Showcase Image */}
          <div
            style={{
              position: "relative",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 12px 36px rgba(0, 0, 0, 0.1)",
              aspectRatio: "1 / 1",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Image
              src="/showcase.jpg"
              alt="TapScan 3-in-1 Smart Standee"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Right: Content */}
          <div>
            <span
              style={{
                color: "#d9a114",
                fontWeight: 700,
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: 1,
                display: "inline-block",
                marginBottom: 8,
              }}
            >
              Grow Reviews, Followers &amp; Customers
            </span>

            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#08497e",
                lineHeight: 1.25,
                marginBottom: 18,
              }}
            >
              More Reviews, More Followers, More Trust
            </h2>

            <p style={{ fontSize: 15, color: "#555555", lineHeight: 1.7, marginBottom: 20 }}>
              <strong>TapScan</strong>, a Pakistan-based online business operating from Lahore,
              delivers ready-to-use NFC &amp; QR stands that help businesses connect with customers
              instantly. One tap or scan on our smart stands lets your customers leave 5-star Google
              reviews, follow your Instagram, and like your Facebook page — in seconds with zero apps required.
            </p>

            {/* Checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {[
                "100% Plug-and-Play convenience (NFC Tap + QR Scan)",
                "Custom printed with your exact brand logo, QR code, and colors",
                "Ideal for checkout counters, cafés, clinics, and salon receptions",
                "Nationwide cash on delivery & express shipping across Pakistan",
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      backgroundColor: "#0b69b3",
                      color: "#ffffff",
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span style={{ fontSize: 14.5, color: "#333333", fontWeight: 500 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/collections/all"
              style={{
                display: "inline-block",
                backgroundColor: "#0b69b3",
                color: "#ffffff",
                padding: "14px 32px",
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                boxShadow: "0 4px 14px rgba(11, 105, 179, 0.3)",
                transition: "all 0.25s ease",
              }}
            >
              Shop All Standees &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
