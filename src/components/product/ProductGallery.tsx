"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  title: string;
  badge?: string;
}

export default function ProductGallery({ images, title, badge }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const currentImage = images[selectedIndex] || images[0] || "/products/product-1.jpg";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="t4s-product-gallery" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Main Preview Image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "100%",
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
          cursor: isZoomed ? "zoom-out" : "zoom-in",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
        }}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Discount Badge */}
        {badge && (
          <span
            style={{
              position: "absolute",
              top: 18,
              left: 18,
              backgroundColor: "#0b69b3",
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 700,
              padding: "6px 12px",
              borderRadius: 6,
              zIndex: 4,
              letterSpacing: "0.5px",
              boxShadow: "0 2px 8px rgba(11, 105, 179, 0.3)",
            }}
          >
            {badge}
          </span>
        )}

        {/* Guaranteed NFC Tag */}
        <span
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            color: "#08497e",
            fontSize: 11,
            fontWeight: 700,
            padding: "5px 10px",
            borderRadius: 6,
            zIndex: 4,
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(8, 73, 126, 0.15)",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span style={{ fontSize: 13 }}>⚡</span> NTAG215 Inside
        </span>

        {/* Regular Image */}
        <Image
          src={currentImage}
          alt={`${title} - View ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: "cover",
            transition: isZoomed ? "none" : "transform 0.3s ease",
            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
            transform: isZoomed ? "scale(1.75)" : "scale(1)",
          }}
        />

        {/* Hover Hint */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            right: 14,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#ffffff",
            fontSize: 11,
            padding: "4px 8px",
            borderRadius: 4,
            zIndex: 3,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          Hover to zoom
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(images.length, 5)}, 1fr)`,
            gap: 12,
          }}
        >
          {images.map((img, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "100%",
                  borderRadius: 10,
                  overflow: "hidden",
                  backgroundColor: "#ffffff",
                  border: isActive ? "2px solid #0b69b3" : "1px solid #e2e8f0",
                  boxShadow: isActive ? "0 0 0 2px rgba(11, 105, 179, 0.2)" : "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  opacity: isActive ? 1 : 0.75,
                }}
                aria-label={`Select product image ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  sizes="100px"
                  style={{ objectFit: "cover" }}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Feature Icons below gallery */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          padding: "14px 12px",
          backgroundColor: "#f8fafc",
          borderRadius: 12,
          border: "1px solid #edf2f7",
          textAlign: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 16, marginBottom: 2 }}>💎</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>4mm Cast Acrylic</div>
          <div style={{ fontSize: 10, color: "#64748b" }}>Diamond polished</div>
        </div>
        <div>
          <div style={{ fontSize: 16, marginBottom: 2 }}>⚡</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>Instant NFC Tap</div>
          <div style={{ fontSize: 10, color: "#64748b" }}>No app required</div>
        </div>
        <div>
          <div style={{ fontSize: 16, marginBottom: 2 }}>🇵🇰</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>Cash on Delivery</div>
          <div style={{ fontSize: 10, color: "#64748b" }}>All over Pakistan</div>
        </div>
      </div>
    </div>
  );
}
