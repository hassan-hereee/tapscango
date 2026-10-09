"use client";

import { useState } from "react";
import { Product } from "@/data/products";

interface ProductSpecsAccordionProps {
  product: Product;
}

export default function ProductSpecsAccordion({ product }: ProductSpecsAccordionProps) {
  const [activeTab, setActiveTab] = useState<"specs" | "box" | "shipping">("specs");

  return (
    <section style={{ padding: "60px 0", backgroundColor: "#ffffff" }}>
      <div className="t4s-container">
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          {/* Tab Navigation */}
          <div
            style={{
              display: "flex",
              borderBottom: "2px solid #e2e8f0",
              gap: 8,
              marginBottom: 32,
              overflowX: "auto",
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              style={{
                padding: "14px 24px",
                fontSize: 15,
                fontWeight: 700,
                color: activeTab === "specs" ? "#08497e" : "#64748b",
                borderBottom: activeTab === "specs" ? "3px solid #08497e" : "3px solid transparent",
                marginBottom: -2,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              Technical Specifications
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("box")}
              style={{
                padding: "14px 24px",
                fontSize: 15,
                fontWeight: 700,
                color: activeTab === "box" ? "#08497e" : "#64748b",
                borderBottom: activeTab === "box" ? "3px solid #08497e" : "3px solid transparent",
                marginBottom: -2,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              What&apos;s in the Box
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("shipping")}
              style={{
                padding: "14px 24px",
                fontSize: 15,
                fontWeight: 700,
                color: activeTab === "shipping" ? "#08497e" : "#64748b",
                borderBottom: activeTab === "shipping" ? "3px solid #08497e" : "3px solid transparent",
                marginBottom: -2,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              Shipping & 1-Year Warranty
            </button>
          </div>

          {/* Tab 1: Specs */}
          {activeTab === "specs" && (
            <div
              style={{
                backgroundColor: "#f8fafc",
                borderRadius: 16,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                {product.specs?.map((spec, idx) => (
                  <div
                    key={idx}
                    className="t4s-pdp-spec-row"
                    style={{
                      padding: "clamp(12px, 2.5vw, 16px) clamp(16px, 3vw, 24px)",
                      borderBottom: idx !== product.specs.length - 1 ? "1px solid #edf2f7" : "none",
                      backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f8fafc",
                      fontSize: 14,
                    }}
                  >
                    <span style={{ fontWeight: 600, color: "#475569" }}>{spec.label}</span>
                    <span style={{ fontWeight: 700, color: "#1e293b" }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Box Contents */}
          {activeTab === "box" && (
            <div
              style={{
                backgroundColor: "#f8fafc",
                borderRadius: 16,
                border: "1px solid #e2e8f0",
                padding: "clamp(20px, 4vw, 32px) clamp(16px, 3.5vw, 28px)",
              }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>
                Everything You Need to Start Collecting Reviews Today:
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 16 }}>
                {product.boxContents?.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "16px 20px",
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span style={{ color: "#10b981", fontSize: 18, fontWeight: 800 }}>✓</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Shipping & Warranty */}
          {activeTab === "shipping" && (
            <div
              style={{
                backgroundColor: "#f8fafc",
                borderRadius: 16,
                border: "1px solid #e2e8f0",
                padding: "clamp(20px, 4vw, 32px) clamp(16px, 3.5vw, 28px)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                gap: 20,
              }}
            >
              <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>🚚</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>
                  Nationwide Express Shipping
                </h4>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, margin: 0 }}>
                  We dispatch within 24 hours. Orders arrive within 2-3 business days across Karachi, Lahore, Islamabad, Rawalpindi, and other major cities via Trax/TCS courier.
                </p>
              </div>

              <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>🛡️</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>
                  1-Year Replacement Warranty
                </h4>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, margin: 0 }}>
                  Each stand comes with a 12-month full hardware warranty covering the embedded NFC microchip and print integrity. If your chip ever fails, we replace it free of charge.
                </p>
              </div>

              <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>🇵🇰</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>
                  Cash on Delivery (COD)
                </h4>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, margin: 0 }}>
                  Order with total confidence. Inspect your parcel and pay the courier cash upon delivery anywhere in Pakistan.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
