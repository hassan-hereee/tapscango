"use client";

import Image from "next/image";
import Link from "next/link";

interface CollectionItem {
  id: number;
  title: string;
  link: string;
  image: string;
  count: string;
}

const COLLECTIONS: CollectionItem[] = [
  {
    id: 1,
    title: "Premium Stands",
    link: "/collections/premium-stands",
    image: "/collections/premium-stands.png",
    count: "Multi-link & 3D Cut Acrylic",
  },
  {
    id: 2,
    title: "Simple Stands",
    link: "/collections/qr-code-stands-pakistan",
    image: "/collections/simple-stands.png",
    count: "Countertop Quick Scanners",
  },
];

export default function ExploreCollections() {
  return (
    <section style={{ padding: "50px 0 60px", backgroundColor: "#f9fafb" }}>
      <div className="t4s-container">
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#08497e",
              marginBottom: 8,
              letterSpacing: "-0.3px",
            }}
          >
            Explore Our Collections
          </h2>
          <div
            style={{
              width: 50,
              height: 3,
              backgroundColor: "#d9a114",
              margin: "0 auto",
              borderRadius: 2,
            }}
          />
        </div>

        {/* Collection Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 28,
          }}
        >
          {COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              href={col.link}
              className="t4s-collection-card"
              style={{
                position: "relative",
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
                display: "block",
                aspectRatio: "16 / 10",
                backgroundColor: "#eef2f6",
              }}
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: "cover",
                  transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="t4s-col-img"
              />

              {/* Gradient Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)",
                }}
              />

              {/* Label & CTA */}
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  right: 24,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  color: "#ffffff",
                }}
              >
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#ffffff" }}>
                    {col.title}
                  </h3>
                  <p style={{ fontSize: 13, opacity: 0.9 }}>{col.count}</p>
                </div>

                <span
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#0b69b3",
                    padding: "8px 16px",
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  View
                  <span>&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
