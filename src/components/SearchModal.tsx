"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  "Google Review Standee",
  "4-in-1 Social Media Stand",
  "NFC Tap Stand",
  "Dental Tooth Standee",
  "EasyPaisa QR Code",
  "Acrylic NFC Card",
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`t4s-search-overlay ${isOpen ? "is-open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="t4s-search-box">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 17, fontWeight: 600, color: "#111" }}>Search Products</h3>
          <button onClick={onClose} aria-label="Close search" style={{ padding: 4, color: "#666" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="t4s-search-input-wrap">
          <svg width="18" height="18" viewBox="0 0 18 19" fill="none" color="#666">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z"
              fill="currentColor"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="t4s-search-input"
            placeholder="Search stands, NFC cards, review stands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ fontSize: 13, color: "#999" }}>
              Clear
            </button>
          )}
        </div>

        <div className="t4s-search-suggestions">
          <div className="t4s-search-suggestions-title">Popular Searches</div>
          <div className="t4s-tag-list">
            {POPULAR_SEARCHES.map((item) => (
              <button
                key={item}
                className="t4s-search-tag"
                onClick={() => {
                  setQuery(item);
                  inputRef.current?.focus();
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {query.length > 0 && (
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #eee" }}>
            <Link
              href={`/collections/all?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "#0b69b3",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              <span>View all results for &quot;{query}&quot;</span>
              <span>&rarr;</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
