"use client";

import { useState } from "react";
import { Product } from "@/data/products";

interface ProductFaqAccordionProps {
  product: Product;
}

export default function ProductFaqAccordion({ product }: ProductFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = product.faqs || [];

  if (faqs.length === 0) return null;

  return (
    <section style={{ padding: "70px 0", backgroundColor: "#ffffff" }}>
      <div className="t4s-container">
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#d9a114",
                textTransform: "uppercase",
                letterSpacing: "1px",
                display: "inline-block",
                marginBottom: 6,
              }}
            >
              Got Questions?
            </span>
            <h2 style={{ fontSize: "clamp(24px, 3.2vw, 32px)", fontWeight: 800, color: "#08497e", margin: 0 }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    overflow: "hidden",
                    backgroundColor: isOpen ? "#f8fafc" : "#ffffff",
                    transition: "all 0.2s ease",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "18px 24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      textAlign: "left",
                      fontSize: 15,
                      fontWeight: 700,
                      color: isOpen ? "#08497e" : "#1e293b",
                      cursor: "pointer",
                      background: "none",
                    }}
                  >
                    <span>{faq.question}</span>
                    <span
                      style={{
                        fontSize: 20,
                        fontWeight: 400,
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        color: "#08497e",
                        flexShrink: 0,
                      }}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: "0 24px 20px 24px",
                        fontSize: 14,
                        color: "#475569",
                        lineHeight: 1.65,
                      }}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
