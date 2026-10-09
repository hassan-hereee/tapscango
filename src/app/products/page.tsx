"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import { PRODUCTS } from "@/data/products";

export default function ProductsCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const categories = useMemo(() => {
    const set = new Set(PRODUCTS.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchQuery =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.id - b.id;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
      <AnnouncementBar />
      <Header />

      <main style={{ flex: 1 }}>
        {/* Banner */}
        <section
          style={{
            backgroundColor: "#08497e",
            color: "#ffffff",
            padding: "50px 0",
            textAlign: "center",
            backgroundImage: "linear-gradient(135deg, #08497e 0%, #0b69b3 100%)",
          }}
        >
          <div className="t4s-container">
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#fde047",
                textTransform: "uppercase",
                letterSpacing: "1px",
                display: "inline-block",
                marginBottom: 8,
              }}
            >
              Pakistan&apos;s #1 Smart Stands
            </span>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, marginBottom: 12 }}>
              Smart NFC & QR Code Standees
            </h1>
            <p style={{ fontSize: 16, opacity: 0.9, maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
              Choose your custom luxury acrylic standee to collect 5-star Google reviews, gain social media followers, and accept instant QR payments.
            </p>
          </div>
        </section>

        <TrustBar />

        {/* Filter and Search Bar */}
        <section style={{ padding: "40px 0 20px" }}>
          <div className="t4s-container">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              {/* Category Pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: selectedCategory === cat ? 700 : 500,
                      backgroundColor: selectedCategory === cat ? "#08497e" : "#f1f5f9",
                      color: selectedCategory === cat ? "#ffffff" : "#475569",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search & Sort Controls */}
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", width: "100%", maxWidth: 440 }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 8,
                    border: "1px solid #cbd5e1",
                    fontSize: 13,
                    outline: "none",
                    flex: "1 1 180px",
                    minWidth: 150,
                  }}
                />

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "1px solid #cbd5e1",
                    fontSize: 13,
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Showing Count */}
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </div>

            {/* Products Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 270px), 1fr))",
                gap: "clamp(16px, 3vw, 28px)",
                marginBottom: 60,
              }}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
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

                  {/* Thumbnail */}
                  <Link
                    href={`/products/${product.slug}`}
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
                      src={product.images[0] || product.image || "/products/product-1.jpg"}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                      className="t4s-prod-img"
                    />
                  </Link>

                  {/* Details */}
                  <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                      <span style={{ color: "#d9a114", fontSize: 13 }}>★★★★★</span>
                      <span style={{ fontSize: 12, color: "#64748b" }}>({product.reviewsCount})</span>
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#1e293b",
                        lineHeight: 1.35,
                        marginBottom: 8,
                        flex: 1,
                      }}
                    >
                      {product.title}
                    </Link>

                    <p
                      style={{
                        fontSize: 12,
                        color: "#64748b",
                        lineHeight: 1.45,
                        marginBottom: 12,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {product.tagline}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                      <span style={{ fontSize: 18, fontWeight: 800, color: "#08497e" }}>
                        Rs. {product.price.toLocaleString()}
                      </span>
                      {product.compareAtPrice > product.price && (
                        <span style={{ fontSize: 13, color: "#94a3b8", textDecoration: "line-through" }}>
                          Rs. {product.compareAtPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      style={{
                        backgroundColor: "#0b69b3",
                        color: "#ffffff",
                        textAlign: "center",
                        padding: "11px 16px",
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 700,
                        display: "block",
                        transition: "all 0.2s ease",
                      }}
                    >
                      View Product & Customizer →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
