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

        {/* WhatsApp Callout */}
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 12 }}>
            Have a different question about your business link or custom design?
          </p>
          <a
            href="https://wa.me/923274780117?text=Salam,%20I%20have%20a%20few%20questions%20regarding%20the%20smart%20standees.%20Could%20you%20please%20guide%20me?"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#25D366",
              color: "#ffffff",
              padding: "10px 22px",
              borderRadius: 24,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 2px 10px rgba(37, 211, 102, 0.25)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>Ask on WhatsApp (+92 327 4780117)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
