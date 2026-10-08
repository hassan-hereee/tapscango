"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How does the NFC & QR Code Stand work?",
    answer:
      "Customers simply tap their smartphone against the stand (using NFC) or scan the high-contrast QR code with their phone camera. It instantly opens your Google review form or social profile directly in their browser — no app installation needed.",
  },
  {
    question: "Will it work on all smartphones?",
    answer:
      "Yes. Every smartphone with a camera can scan the QR code instantly, and NFC tap is built into virtually all modern Android smartphones and all iPhones (iPhone 7 and newer).",
  },
  {
    question: "What links can I connect to the standee?",
    answer:
      "You can link your Google Business Review page, Instagram profile, Facebook page, WhatsApp Chat, TikTok, EasyPaisa / JazzCash payment link, digital restaurant menu, or custom website URL.",
  },
  {
    question: "Is there any monthly subscription or app required?",
    answer:
      "No! It is a 100% one-time purchase with lifetime access. There are absolutely no monthly recurring charges, no hosting fees, and no third-party app requirements.",
  },
  {
    question: "Can I personalize the stand with my brand logo and colors?",
    answer:
      "Yes! Every order is fully customized with your company logo, preferred accent colors, and custom QR codes crafted by our design team in Lahore before delivery.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section style={{ padding: "70px 0", backgroundColor: "#ffffff" }}>
      <div className="t4s-container" style={{ maxWidth: 860 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#08497e",
              marginBottom: 8,
            }}
          >
            Frequently Asked Questions
          </h2>
          <div
            style={{
              width: 50,
              height: 3,
              backgroundColor: "#d9a114",
              margin: "0 auto 12px",
              borderRadius: 2,
            }}
          />
          <p style={{ fontSize: 14, color: "#666666" }}>
            Got questions? We have got all the answers you need.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  border: "1px solid #e5e9f0",
                  borderRadius: 10,
                  overflow: "hidden",
                  backgroundColor: isOpen ? "#fbfdff" : "#ffffff",
                  transition: "all 0.25s ease",
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    width: "100%",
                    padding: "18px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: 16,
                    color: isOpen ? "#0b69b3" : "#222222",
                    backgroundColor: "transparent",
                  }}
                >
                  <span>{faq.question}</span>
                  <span
                    style={{
                      fontSize: 20,
                      lineHeight: 1,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                      color: isOpen ? "#0b69b3" : "#888888",
                      marginLeft: 12,
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 24px 20px",
                      fontSize: 14.5,
                      color: "#555555",
                      lineHeight: 1.65,
                      borderTop: "1px solid #f0f4f8",
                      paddingTop: 14,
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
    </section>
  );
}
