"use client";

import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface StickyAddToCartBarProps {
  product: Product;
  visible: boolean;
}

export default function StickyAddToCartBar({ product, visible }: StickyAddToCartBarProps) {
  const { addToCart } = useCart();

  if (!visible) return null;

  const handleAdd = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: product.images[0] || product.image || "/products/product-1.jpg",
      quantity: 1,
    });
  };

  const handleWhatsApp = () => {
    const message = `Salam, I would like to order the "${product.title}" (Rs. ${product.price.toLocaleString()}). Please guide me with the order confirmation.`;
    window.open(`https://wa.me/923274780117?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <aside
      aria-label="Quick order bar"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(255, 255, 255, 0.96)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid #e2e8f0",
        padding: "12px 16px",
        zIndex: 990,
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className="t4s-container t4s-sticky-bar-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        {/* Left: Product Thumbnail & Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }}>
          <div
            style={{
              position: "relative",
              width: 44,
              height: 44,
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              flexShrink: 0,
              backgroundColor: "#f8fafc",
            }}
          >
            <Image
              src={product.images[0] || product.image || "/products/product-1.jpg"}
              alt={product.title}
              fill
              sizes="44px"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              className="t4s-sticky-bar-title"
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#1e293b",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "clamp(110px, 35vw, 420px)",
              }}
            >
              {product.title}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#08497e" }}>
                Rs. {product.price.toLocaleString()}
              </span>
              {product.compareAtPrice > product.price && (
                <span style={{ fontSize: 11, color: "#94a3b8", textDecoration: "line-through" }}>
                  Rs. {product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {/* WhatsApp Button */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="t4s-sticky-bar-btn"
            style={{
              backgroundColor: "#25D366",
              color: "#ffffff",
              padding: "10px 14px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
            }}
            aria-label="Order on WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span className="t4s-btn-text-desktop">WhatsApp</span>
          </button>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAdd}
            className="t4s-sticky-bar-btn"
            style={{
              backgroundColor: "#0b69b3",
              color: "#ffffff",
              padding: "10px 18px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </aside>
  );
}
