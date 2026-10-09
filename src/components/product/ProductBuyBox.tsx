"use client";

import { useState, useMemo } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductBuyBoxProps {
  product: Product;
  onReviewsClick?: () => void;
}

export default function ProductBuyBox({ product, onReviewsClick }: ProductBuyBoxProps) {
  const { addToCart } = useCart();

  // Initialize variants state with the first option of each group
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variants?.forEach((group) => {
      if (group.options.length > 0) {
        initial[group.name] = group.options[0].label;
      }
    });
    return initial;
  });

  const [quantity, setQuantity] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [reviewLink, setReviewLink] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [showAddedCheck, setShowAddedCheck] = useState(false);

  // Calculate dynamic price based on variant price modifiers
  const finalPrice = useMemo(() => {
    let price = product.price;
    product.variants?.forEach((group) => {
      const selectedLabel = selectedVariants[group.name];
      const match = group.options.find((opt) => opt.label === selectedLabel);
      if (match?.priceModifier) {
        price += match.priceModifier;
      }
    });
    return price;
  }, [product.price, product.variants, selectedVariants]);

  const finalComparePrice = useMemo(() => {
    return product.compareAtPrice > product.price
      ? product.compareAtPrice + (finalPrice - product.price)
      : finalPrice;
  }, [product.compareAtPrice, product.price, finalPrice]);

  const discountAmount = finalComparePrice - finalPrice;
  const discountPercent = Math.round((discountAmount / finalComparePrice) * 100);

  // Bundle calculations
  const bundleDiscountPercent = quantity >= 3 ? 15 : quantity === 2 ? 10 : 0;
  const totalPrice = Math.round(finalPrice * quantity * (1 - bundleDiscountPercent / 100));

  const handleVariantSelect = (groupName: string, optionLabel: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [groupName]: optionLabel,
    }));
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: finalPrice,
      compareAtPrice: finalComparePrice,
      image: product.images[0] || product.image || "/products/product-1.jpg",
      quantity,
      selectedVariants,
      customBusinessName: businessName.trim() || undefined,
      customReviewLink: reviewLink.trim() || undefined,
    });

    setTimeout(() => {
      setIsAdding(false);
      setShowAddedCheck(true);
      setTimeout(() => setShowAddedCheck(false), 2500);
    }, 350);
  };

  const handleWhatsAppOrder = () => {
    const variantSummary = Object.entries(selectedVariants)
      .map(([k, v]) => `• *${k}:* ${v}`)
      .join("\n");

    const customText = businessName.trim()
      ? `\n• *Business Name:* ${businessName.trim()}`
      : "";
    const linkText = reviewLink.trim()
      ? `\n• *Google Link:* ${reviewLink.trim()}`
      : "";

    const message = `Salam TapScan.pk! I want to order this product with Cash on Delivery:\n\n*Product:* ${product.title}\n*Quantity:* ${quantity}\n${variantSummary}${customText}${linkText}\n\n*Total Amount:* Rs. ${totalPrice.toLocaleString()}\n\nPlease confirm availability and dispatch!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923274780117?text=${encoded}`, "_blank");
  };

  return (
    <div className="t4s-product-buybox" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Category & Rating */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#0b69b3",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
            }}
          >
            {product.category}
          </span>
          <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            In Stock — Dispatches Tomorrow
          </span>
        </div>

        {/* Product Title */}
        <h1
          style={{
            fontSize: "clamp(22px, 3vw, 28px)",
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1.25,
            marginBottom: 8,
          }}
        >
          {product.title}
        </h1>

        {/* Tagline */}
        <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.5, marginBottom: 12 }}>
          {product.tagline}
        </p>

        {/* Reviews Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ color: "#d9a114", fontSize: 16 }}>★★★★★</div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1f2937" }}>
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span style={{ color: "#cbd5e1" }}>•</span>
          <button
            type="button"
            onClick={onReviewsClick}
            style={{
              fontSize: 13,
              color: "#0b69b3",
              fontWeight: 600,
              textDecoration: "underline",
              padding: 0,
            }}
          >
            {product.reviewsCount} Verified Customer Reviews
          </button>
        </div>
      </div>

      {/* Pricing Block */}
      <div
        style={{
          padding: "16px 20px",
          backgroundColor: "#f8fafc",
          borderRadius: 12,
          border: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#08497e" }}>
              Rs. {finalPrice.toLocaleString()}
            </span>
            {finalComparePrice > finalPrice && (
              <span style={{ fontSize: 16, color: "#94a3b8", textDecoration: "line-through" }}>
                Rs. {finalComparePrice.toLocaleString()}
              </span>
            )}
          </div>
          {discountAmount > 0 && (
            <div style={{ fontSize: 12, color: "#059669", fontWeight: 700, marginTop: 2 }}>
              Save Rs. {discountAmount.toLocaleString()} ({discountPercent}% OFF Special Offer)
            </div>
          )}
        </div>

        {/* Live Viewers Indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            color: "#475569",
            backgroundColor: "#ffffff",
            padding: "6px 12px",
            borderRadius: 20,
            border: "1px solid #e2e8f0",
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
          <span><strong>24 people</strong> viewing right now</span>
        </div>
      </div>

      {/* Stock Urgency Bar */}
      <div style={{ padding: "12px 16px", backgroundColor: "#fffbeb", borderRadius: 10, border: "1px solid #fef3c7" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>
          <span>🔥 Limited Stock Available</span>
          <span>Only {product.stockCount} left at this discounted price</span>
        </div>
        <div style={{ height: 6, backgroundColor: "#fde68a", borderRadius: 3, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              backgroundColor: "#d97706",
              width: `${(product.stockCount / 15) * 100}%`,
              borderRadius: 3,
            }}
          />
        </div>
      </div>

      {/* Variant Selectors */}
      {product.variants?.map((group) => (
        <div key={group.name} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1f2937" }}>
              {group.name}: <span style={{ fontWeight: 500, color: "#0b69b3" }}>{selectedVariants[group.name]}</span>
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {group.options.map((opt) => {
              const isSelected = selectedVariants[group.name] === opt.label;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleVariantSelect(group.name, opt.label)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: isSelected ? 700 : 500,
                    backgroundColor: isSelected ? "#08497e" : "#ffffff",
                    color: isSelected ? "#ffffff" : "#334155",
                    border: isSelected ? "2px solid #08497e" : "1px solid #cbd5e1",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "all 0.15s ease",
                    boxShadow: isSelected ? "0 2px 6px rgba(8, 73, 126, 0.25)" : "none",
                  }}
                >
                  {opt.colorCode && (
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        backgroundColor: opt.colorCode,
                        border: "1px solid #94a3b8",
                        display: "inline-block",
                      }}
                    />
                  )}
                  <span>{opt.label}</span>
                  {opt.priceModifier !== undefined && opt.priceModifier !== 0 && (
                    <span style={{ fontSize: 11, opacity: 0.85 }}>
                      ({opt.priceModifier > 0 ? `+Rs. ${opt.priceModifier}` : `-Rs. ${Math.abs(opt.priceModifier)}`})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Customization Inputs */}
      <div
        style={{
          padding: "16px 18px",
          backgroundColor: "#f0f7fc",
          borderRadius: 12,
          border: "1px solid #d4e8f7",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#08497e" }}>
          <span>✨</span>
          <span>Free Custom Branding & Pre-Programming</span>
        </div>

        <div>
          <label
            htmlFor="business-name-input"
            style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 4 }}
          >
            Your Business Name / Store / Clinic (Optional):
          </label>
          <input
            id="business-name-input"
            type="text"
            placeholder="e.g. Roasters Cafe Lahore"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: 6,
              border: "1px solid #cbd5e1",
              fontSize: 13,
              backgroundColor: "#ffffff",
              color: "#1e293b",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="review-link-input"
            style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 4 }}
          >
            Google Maps Link or Instagram Handle (Optional):
          </label>
          <input
            id="review-link-input"
            type="text"
            placeholder="e.g. https://maps.app.goo.gl/... or @yourhandle"
            value={reviewLink}
            onChange={(e) => setReviewLink(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 12px",
              borderRadius: 6,
              border: "1px solid #cbd5e1",
              fontSize: 13,
              backgroundColor: "#ffffff",
              color: "#1e293b",
              outline: "none",
            }}
          />
          <span style={{ fontSize: 11, color: "#64748b", marginTop: 4, display: "block" }}>
            Don&apos;t have it handy? No worries! Our team will verify your link on WhatsApp after order.
          </span>
        </div>
      </div>

      {/* Quantity & Bundle Incentives */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1f2937" }}>Quantity:</span>
          {bundleDiscountPercent > 0 && (
            <span style={{ fontSize: 12, fontWeight: 700, color: "#059669" }}>
              🎉 {bundleDiscountPercent}% Bundle Discount Applied!
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Stepper */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1.5px solid #cbd5e1",
              borderRadius: 8,
              backgroundColor: "#ffffff",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              style={{
                width: 40,
                height: 42,
                fontSize: 18,
                fontWeight: 600,
                color: "#334155",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f8fafc",
              }}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span
              style={{
                minWidth: 44,
                textAlign: "center",
                fontSize: 15,
                fontWeight: 700,
                color: "#1e293b",
              }}
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              style={{
                width: 40,
                height: 42,
                fontSize: 18,
                fontWeight: 600,
                color: "#334155",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f8fafc",
              }}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Bundle incentive pills */}
          <div style={{ display: "flex", gap: 8, flex: 1 }}>
            <button
              type="button"
              onClick={() => setQuantity(2)}
              style={{
                flex: 1,
                padding: "8px 10px",
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 600,
                backgroundColor: quantity === 2 ? "#e0f2fe" : "#f8fafc",
                color: quantity === 2 ? "#0369a1" : "#475569",
                border: quantity === 2 ? "1.5px solid #0284c7" : "1px solid #e2e8f0",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <div>Buy 2 Stands</div>
              <div style={{ color: "#0284c7", fontWeight: 700 }}>Save 10%</div>
            </button>
            <button
              type="button"
              onClick={() => setQuantity(3)}
              style={{
                flex: 1,
                padding: "8px 10px",
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 600,
                backgroundColor: quantity >= 3 ? "#e0f2fe" : "#f8fafc",
                color: quantity >= 3 ? "#0369a1" : "#475569",
                border: quantity >= 3 ? "1.5px solid #0284c7" : "1px solid #e2e8f0",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <div>Buy 3+ Stands</div>
              <div style={{ color: "#0284c7", fontWeight: 700 }}>Save 15%</div>
            </button>
          </div>
        </div>
      </div>

      {/* Call To Action Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Add to Cart Primary Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdding}
          style={{
            width: "100%",
            backgroundColor: showAddedCheck ? "#059669" : "#0b69b3",
            color: "#ffffff",
            padding: "16px 24px",
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxShadow: "0 4px 14px rgba(11, 105, 179, 0.35)",
            transition: "all 0.2s ease",
            cursor: "pointer",
          }}
        >
          {showAddedCheck ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>Added to Cart!</span>
            </>
          ) : isAdding ? (
            <span>Adding to Cart...</span>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span>Add to Cart — Rs. {totalPrice.toLocaleString()}</span>
            </>
          )}
        </button>

        {/* WhatsApp Fast Order (Cash on Delivery) Button */}
        <button
          type="button"
          onClick={handleWhatsAppOrder}
          style={{
            width: "100%",
            backgroundColor: "#25D366",
            color: "#ffffff",
            padding: "15px 24px",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxShadow: "0 4px 14px rgba(37, 211, 102, 0.28)",
            transition: "all 0.2s ease",
            cursor: "pointer",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span>Order via WhatsApp (Cash on Delivery)</span>
        </button>
      </div>

      {/* Trust Checklist */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
          padding: "16px",
          backgroundColor: "#f8fafc",
          borderRadius: 12,
          border: "1px solid #edf2f7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#334155" }}>
          <span>🇵🇰</span>
          <span><strong>Cash on Delivery</strong> across Pakistan</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#334155" }}>
          <span>🚚</span>
          <span><strong>2-3 Days</strong> Trax/TCS Express Shipping</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#334155" }}>
          <span>🛡️</span>
          <span><strong>1-Year Chip Warranty</strong> included</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#334155" }}>
          <span>⚡</span>
          <span><strong>Zero Subscriptions</strong> or apps needed</span>
        </div>
      </div>
    </div>
  );
}
