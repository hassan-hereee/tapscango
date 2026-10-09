"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGallery from "./ProductGallery";
import ProductBuyBox from "./ProductBuyBox";
import StickyAddToCartBar from "./StickyAddToCartBar";
import ProductFeaturesGrid from "./ProductFeaturesGrid";
import ProductHowItWorks from "./ProductHowItWorks";
import ProductBeforeAfter from "./ProductBeforeAfter";
import ProductSpecsAccordion from "./ProductSpecsAccordion";
import ProductReviewsSection from "./ProductReviewsSection";
import ProductFaqAccordion from "./ProductFaqAccordion";
import ProductRelatedProducts from "./ProductRelatedProducts";
import { Product } from "@/data/products";

interface ProductLandingPageProps {
  product: Product;
}

export default function ProductLandingPage({ product }: ProductLandingPageProps) {
  const buyBoxRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!buyBoxRef.current) return;
      const rect = buyBoxRef.current.getBoundingClientRect();
      // Show sticky bar once the buybox bottom has scrolled past the top of the viewport
      if (rect.bottom < 100) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToReviews = () => {
    const revEl = document.getElementById("customer-reviews");
    if (revEl) {
      revEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Header with Search, Cart Drawer, Navigation */}
      <Header />

      {/* 3. Main Landing Page Flow */}
      <main id="MainContent" style={{ flex: 1 }}>
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          style={{
            backgroundColor: "#f8fafc",
            borderBottom: "1px solid #edf2f7",
            padding: "12px 0",
            fontSize: 13,
          }}
        >
          <div className="t4s-container">
            <ol
              style={{
                listStyle: "none",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
                padding: 0,
                margin: 0,
                color: "#64748b",
              }}
            >
              <li>
                <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/products" style={{ color: "#64748b", textDecoration: "none" }}>
                  All Products
                </Link>
              </li>
              <li>/</li>
              <li>
                <span style={{ color: "#08497e", fontWeight: 600 }}>{product.category}</span>
              </li>
              <li>/</li>
              <li aria-current="page" style={{ color: "#1e293b", fontWeight: 600, maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {product.title}
              </li>
            </ol>
          </div>
        </nav>

        {/* 4. Hero PDP Section (Gallery + BuyBox) */}
        <section style={{ padding: "clamp(20px, 4vw, 40px) 0 clamp(30px, 5vw, 60px)", backgroundColor: "#ffffff" }}>
          <div className="t4s-container">
            <div ref={buyBoxRef} className="t4s-pdp-hero-grid">
              {/* Left Column: Interactive Media Gallery */}
              <div className="t4s-pdp-gallery-sticky" style={{ minWidth: 0, width: "100%" }}>
                <ProductGallery
                  images={product.images}
                  title={product.title}
                  badge={product.badge}
                />
              </div>

              {/* Right Column: High-Converting Buy Box */}
              <div style={{ minWidth: 0, width: "100%" }}>
                <ProductBuyBox
                  product={product}
                  onReviewsClick={scrollToReviews}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Value Proposition & Features Grid */}
        <ProductFeaturesGrid product={product} />

        {/* 6. How It Works: 3-Step Customer Journey */}
        <ProductHowItWorks />

        {/* 7. Before vs After Comparison */}
        <ProductBeforeAfter />

        {/* 8. Technical Specifications & What's In The Box */}
        <ProductSpecsAccordion product={product} />

        {/* 9. Verified Customer Reviews & Review Form */}
        <ProductReviewsSection product={product} />

        {/* 10. Frequently Asked Questions */}
        <ProductFaqAccordion product={product} />

        {/* 11. Cross-sell / Related Products Carousel */}
        <ProductRelatedProducts currentProduct={product} />

        {/* 12. Direct WhatsApp Assistance Floating Banner */}
        <section style={{ padding: "50px 0", backgroundColor: "#08497e", color: "#ffffff", textAlign: "center" }}>
          <div className="t4s-container" style={{ maxWidth: 760 }}>
            <span
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                color: "#fde047",
                fontSize: 12,
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: 20,
                display: "inline-block",
                marginBottom: 12,
              }}
            >
              Need Custom Branding or Bulk Tables?
            </span>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, marginBottom: 12, lineHeight: 1.3 }}>
              Have Questions Before Ordering? Chat Live on WhatsApp
            </h2>
            <p style={{ fontSize: 15, opacity: 0.9, lineHeight: 1.6, marginBottom: 24 }}>
              Our design team can generate a free 3D digital mockup of your standee with your exact logo and Google review link in 15 minutes!
            </p>
            <a
              href="https://wa.me/923274780117?text=Salam,%20I%20would%20like%20to%20get%20a%20custom%20design%20mockup%20with%20my%20business%20logo."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                backgroundColor: "#25D366",
                color: "#ffffff",
                padding: "clamp(12px, 3vw, 14px) clamp(18px, 4vw, 28px)",
                borderRadius: 10,
                fontSize: "clamp(13px, 3.5vw, 15px)",
                fontWeight: 700,
                boxShadow: "0 4px 16px rgba(37, 211, 102, 0.35)",
                maxWidth: "100%",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Instant WhatsApp Chat with Design Team</span>
            </a>
          </div>
        </section>
      </main>

      {/* 13. Persistent Sticky Add To Cart Bar */}
      <StickyAddToCartBar product={product} visible={showStickyBar} />

      {/* 14. Global Footer */}
      <Footer />
    </div>
  );
}
