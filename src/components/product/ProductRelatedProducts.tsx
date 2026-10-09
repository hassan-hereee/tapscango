"use client";

import Image from "next/image";
import Link from "next/link";
import { getRelatedProducts, Product } from "@/data/products";

interface ProductRelatedProductsProps {
  currentProduct: Product;
}

export default function ProductRelatedProducts({ currentProduct }: ProductRelatedProductsProps) {
  const related = getRelatedProducts(currentProduct.slug, 3);

  if (related.length === 0) return null;

  return (
    <section style={{ padding: "70px 0 80px", backgroundColor: "#f8fafc", borderTop: "1px solid #edf2f7" }}>
      <div className="t4s-container">
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
            Explore More Options
          </span>
          <h2 style={{ fontSize: "clamp(24px, 3.2vw, 32px)", fontWeight: 800, color: "#08497e", margin: 0 }}>
            You May Also Like
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 28,
          }}
        >
          {related.map((prod) => (
            <div
              key={prod.id}
              className="t4s-product-card"
              style={{
                background: "#ffffff",
                borderRadius: 14,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                position: "relative",
              }}
            >
              {/* Badge */}
              {prod.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    backgroundColor: "#0b69b3",
                    color: "#ffffff",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 8px",
                    borderRadius: 4,
                    zIndex: 3,
                  }}
                >
                  {prod.badge}
                </span>
              )}

              {/* Image Link */}
              <Link
                href={`/products/${prod.slug}`}
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "100%",
                  backgroundColor: "#f8fafc",
                  display: "block",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={prod.images[0] || prod.image || "/products/product-1.jpg"}
                  alt={prod.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                  className="t4s-prod-img"
                />
              </Link>

              {/* Content */}
              <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                  <span style={{ color: "#d9a114", fontSize: 13 }}>★★★★★</span>
                  <span style={{ fontSize: 12, color: "#64748b" }}>({prod.reviewsCount})</span>
                </div>

                <Link
                  href={`/products/${prod.slug}`}
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#1e293b",
                    lineHeight: 1.35,
                    marginBottom: 10,
                    flex: 1,
                  }}
                >
                  {prod.title}
                </Link>

                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "#08497e" }}>
                    Rs. {prod.price.toLocaleString()}
                  </span>
                  {prod.compareAtPrice > prod.price && (
                    <span style={{ fontSize: 13, color: "#94a3b8", textDecoration: "line-through" }}>
                      Rs. {prod.compareAtPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <Link
                  href={`/products/${prod.slug}`}
                  style={{
                    backgroundColor: "#0b69b3",
                    color: "#ffffff",
                    textAlign: "center",
                    padding: "10px 16px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 700,
                    display: "block",
                    transition: "all 0.2s ease",
                  }}
                >
                  View Product Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
