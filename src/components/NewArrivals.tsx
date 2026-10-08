"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  compareAtPrice: number;
  image: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Smart NFC Google Review QR Code Standee | Premium edition",
    slug: "google-review-qr-code-standee",
    price: 2700,
    compareAtPrice: 3000,
    image: "/products/product-1.jpg",
    badge: "-10%",
    rating: 5,
    reviewsCount: 48,
  },
  {
    id: 2,
    title: "Smart NFC 4-in-1 Qr code Standee With 3D Cut Acrylic Icons",
    slug: "smart-nfc-4-in-1-qr-code-standee",
    price: 3999,
    compareAtPrice: 4999,
    image: "/products/product-2.jpg",
    badge: "-20%",
    rating: 5,
    reviewsCount: 62,
  },
  {
    id: 3,
    title: "Smart NFC 3-in-1 QR Code Standee with 3D Cut Acrylic Icons | Vertical Premium edition",
    slug: "smart-nfc-3-in-1-qr-code-standee",
    price: 3700,
    compareAtPrice: 4500,
    image: "/products/product-3.jpg",
    badge: "-18%",
    rating: 5,
    reviewsCount: 35,
  },
  {
    id: 4,
    title: "Smart NFC 2-in-1 Qr code Standee With 3D Cut Acrylic Icons",
    slug: "smart-nfc-qr-standee-3d-acrylic",
    price: 3700,
    compareAtPrice: 4000,
    image: "/products/product-4.jpg",
    badge: "-8%",
    rating: 5,
    reviewsCount: 29,
  },
  {
    id: 5,
    title: "Premium Smart NFC 3QR Table Top Standee | Social Media Theme Edition",
    slug: "premium-smart-nfc-3qr-table-top-standee-social-media-theme-edition",
    price: 4000,
    compareAtPrice: 4500,
    image: "/products/product-5.webp",
    badge: "-11%",
    rating: 5,
    reviewsCount: 41,
  },
  {
    id: 6,
    title: "Premium - Dental Tooth Shaped NFC Single QR Standee - Google Review | Instagram",
    slug: "premium-dental-tooth-shaped-nfc-single-qr-standee-google-review-instagram",
    price: 4000,
    compareAtPrice: 4300,
    image: "/products/product-6.webp",
    badge: "-7%",
    rating: 5,
    reviewsCount: 22,
  },
];

export default function NewArrivals() {
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAddToCart = (id: number) => {
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section className="t4s-section-products" style={{ padding: "60px 0 40px", backgroundColor: "#ffffff" }}>
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
            New Arrivals
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

        {/* Product Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 28,
          }}
        >
          {PRODUCTS.map((product) => {
            return (
              <div
                key={product.id}
                className="t4s-product-card"
                style={{
                  background: "#ffffff",
                  borderRadius: 12,
                  border: "1px solid #ebebeb",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
              >
                {/* Discount Badge */}
                {product.badge && (
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
                    {product.badge}
                  </span>
                )}

                {/* Product Image Link */}
                <Link
                  href={`/products/${product.slug}`}
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "100%",
                    display: "block",
                    backgroundColor: "#f7f7f7",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    className="t4s-prod-img"
                  />
                </Link>

                {/* Details */}
                <div style={{ padding: 18, display: "flex", flexDirection: "column", flex: 1 }}>
                  {/* Reviews Stars */}
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                    <span style={{ color: "#d9a114", fontSize: 13 }}>★★★★★</span>
                    <span style={{ fontSize: 12, color: "#888888" }}>
                      ({product.reviewsCount})
                    </span>
                  </div>

                  {/* Title */}
                  <Link
                    href={`/products/${product.slug}`}
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#222222",
                      lineHeight: 1.4,
                      marginBottom: 12,
                      flex: 1,
                    }}
                  >
                    {product.title}
                  </Link>

                  {/* Price */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: "#0b69b3",
                      }}
                    >
                      Rs. {product.price.toLocaleString()}.00
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        color: "#999999",
                        textDecoration: "line-through",
                      }}
                    >
                      Rs. {product.compareAtPrice.toLocaleString()}.00
                    </span>
                  </div>

                  {/* Quick Add CTA */}
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      backgroundColor: addedId === product.id ? "#428445" : "#0b69b3",
                      color: "#ffffff",
                      fontSize: 13.5,
                      fontWeight: 600,
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {addedId === product.id ? (
                      <>
                        <span>✓ Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
