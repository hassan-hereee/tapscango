"use client";

import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="t4s-announcement-bar" role="region" aria-label="Announcement">
      <div className="t4s-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "4px 20px" }}>
        <Link href="/products" className="t4s-announcement-content" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>🇵🇰 Pakistan&apos;s #1 Smart Stands • Free Shipping on Orders Rs. 5,000+</span>
          <svg
            className="t4s-announcement-arrow"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
              fill="currentColor"
            />
          </svg>
        </Link>

        <a
          href="https://wa.me/923274780117?text=Salam,%20I%20would%20like%20to%20inquire%20about%20placing%20an%20order."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#ffffff",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            fontWeight: 600,
            textDecoration: "none",
          }}
          className="t4s-announcement-whatsapp"
        >
          <span>WhatsApp Orders:</span>
          <span style={{ color: "#fde047", fontWeight: 700 }}>+92 327 4780117</span>
        </a>
      </div>
    </div>
  );
}
