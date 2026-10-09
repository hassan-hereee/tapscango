"use client";

import { Product } from "@/data/products";

interface ProductFeaturesGridProps {
  product: Product;
}

export default function ProductFeaturesGrid({ product }: ProductFeaturesGridProps) {
  const features = product.features || [];

  return (
    <section style={{ padding: "60px 0", backgroundColor: "#f8fafc" }}>
      <div className="t4s-container">
        {/* Section Heading */}
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 40px" }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#d9a114",
              textTransform: "uppercase",
              letterSpacing: "1px",
              display: "inline-block",
              marginBottom: 8,
            }}
          >
            Built for Maximum Customer Conversions
          </span>
          <h2
            style={{
              fontSize: "clamp(24px, 3.2vw, 32px)",
              fontWeight: 800,
              color: "#08497e",
              lineHeight: 1.25,
              marginBottom: 12,
            }}
          >
            Why Thousands of Pakistani Businesses Choose TapScan
          </h2>
          <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
            Designed to eliminate all friction between a happy customer and a 5-star review.
            Engineered with high-speed contactless NFC and durable cast acrylic.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {features.map((feature, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#ffffff",
                padding: "28px 24px",
                borderRadius: 16,
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  backgroundColor: "#f0f7fc",
                  border: "1px solid #d4e8f7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
              >
                {feature.icon}
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b" }}>
                {feature.title}
              </h3>

              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
