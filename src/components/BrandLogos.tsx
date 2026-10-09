"use client";

import Image from "next/image";

const BRANDS = [
  { name: "Honda", logo: "/brands/honda.webp" },
  { name: "Domino's Pizza", logo: "/brands/dominos.jpg" },
  { name: "Kababjees Bakers", logo: "/brands/kababjees.png" },
  { name: "Depilex Beauty Clinic", logo: "/brands/depilex.png" },
];

export default function BrandLogos() {
  return (
    <section style={{ padding: "50px 0 60px", backgroundColor: "#f8fafc", borderTop: "1px solid #edf2f7" }}>
      <div className="t4s-container">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#08497e",
              marginBottom: 8,
            }}
          >
            Brands That Believe in Us
          </h2>
          <p style={{ fontSize: 14, color: "#666666" }}>
            Powering instant reviews and customer loyalty across 3,000+ businesses in Pakistan
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(14px, 3vw, 40px)",
          }}
        >
          {BRANDS.map((brand, idx) => (
            <div
              key={idx}
              style={{
                width: "clamp(125px, 40vw, 150px)",
                height: 70,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#ffffff",
                padding: "10px 16px",
                borderRadius: 10,
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                border: "1px solid #e8edf2",
                transition: "all 0.25s ease",
              }}
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                sizes="140px"
                style={{
                  objectFit: "contain",
                  padding: "8px",
                  filter: "grayscale(100%)",
                  opacity: 0.8,
                  transition: "all 0.3s ease",
                }}
                className="t4s-brand-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
