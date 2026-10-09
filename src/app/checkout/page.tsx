"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const PAKISTAN_CITIES: { name: string; province: string }[] = [
  { name: "Karachi", province: "Sindh" },
  { name: "Lahore", province: "Punjab" },
  { name: "Islamabad", province: "Islamabad Capital Territory" },
  { name: "Rawalpindi", province: "Punjab" },
  { name: "Faisalabad", province: "Punjab" },
  { name: "Multan", province: "Punjab" },
  { name: "Peshawar", province: "Khyber Pakhtunkhwa" },
  { name: "Quetta", province: "Balochistan" },
  { name: "Sialkot", province: "Punjab" },
  { name: "Gujranwala", province: "Punjab" },
  { name: "Hyderabad", province: "Sindh" },
  { name: "Abbottabad", province: "Khyber Pakhtunkhwa" },
  { name: "Bahawalpur", province: "Punjab" },
  { name: "Sargodha", province: "Punjab" },
  { name: "Gujrat", province: "Punjab" },
  { name: "Sheikhupura", province: "Punjab" },
  { name: "Jhelum", province: "Punjab" },
  { name: "Sahiwal", province: "Punjab" },
  { name: "Wah Cantt", province: "Punjab" },
  { name: "Sukkur", province: "Sindh" },
  { name: "Mardan", province: "Khyber Pakhtunkhwa" },
  { name: "Rahim Yar Khan", province: "Punjab" },
  { name: "Larkana", province: "Sindh" },
  { name: "Muzaffarabad", province: "Azad Kashmir" },
  { name: "Mirpur", province: "Azad Kashmir" },
  { name: "Gilgit", province: "Gilgit-Baltistan" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { user, openLoginModal } = useAuth();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "Lahore",
    customCity: "",
    province: "Punjab",
    postalCode: "",
    customBusinessName: "",
    customReviewLink: "",
    deliveryNotes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank_transfer" | "easypaisa_jazzcash">("cod");

  // Discount / Coupon State
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountType: string;
    discountAmount: number;
    message: string;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  // Handle city change and auto-populate province
  const handleCityChange = (cityName: string) => {
    if (cityName === "other") {
      setFormData((prev) => ({ ...prev, city: "other" }));
      return;
    }

    const matched = PAKISTAN_CITIES.find((c) => c.name === cityName);
    setFormData((prev) => ({
      ...prev,
      city: cityName,
      province: matched ? matched.province : prev.province,
    }));
  };

  // Shipping Fee Calculation
  // Free if order >= 3000 or if coupon 'LAUNCHFREE' applied
  const isFreeShippingByAmount = subtotal >= 3000;
  const isFreeShippingByCoupon = appliedCoupon?.discountType === "free_shipping";
  const shippingFee = isFreeShippingByAmount || isFreeShippingByCoupon || subtotal === 0 ? 0 : 250;

  // Discount Calculation
  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  // Apply Coupon Code
  const handleApplyCoupon = async (codeToTry?: string) => {
    const code = (codeToTry || couponCode).trim().toUpperCase();
    if (!code) return;

    setIsValidatingCoupon(true);
    setCouponError("");

    try {
      const res = await fetch("/api/discounts/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, subtotal }),
      });

      const data = await res.json();
      if (!res.ok || !data.valid) {
        setCouponError(data.error || "Invalid coupon code.");
        setAppliedCoupon(null);
      } else {
        setAppliedCoupon({
          code: data.code,
          discountType: data.discountType,
          discountAmount: data.discountAmount,
          message: data.message,
        });
        setCouponCode(data.code);
        setCouponError("");
      }
    } catch {
      setCouponError("Could not validate coupon. Please check connection.");
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  // Submit Order Handler
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate inputs
    const finalCity = formData.city === "other" ? formData.customCity.trim() : formData.city.trim();
    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full recipient name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setErrorMessage("Please enter a valid Pakistani phone/WhatsApp number (e.g. 0321 1234567).");
      return;
    }
    if (!formData.address.trim()) {
      setErrorMessage("Please enter your complete doorstep delivery address.");
      return;
    }
    if (!finalCity) {
      setErrorMessage("Please specify your delivery city.");
      return;
    }
    if (items.length === 0) {
      setErrorMessage("Your cart is empty. Please add items before checking out.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Build order notes including custom review URL / business name if provided
      const customNotesParts: string[] = [];
      if (formData.customBusinessName) {
        customNotesParts.push(`Custom Business Name: ${formData.customBusinessName}`);
      }
      if (formData.customReviewLink) {
        customNotesParts.push(`Google Review Link: ${formData.customReviewLink}`);
      }
      if (formData.deliveryNotes) {
        customNotesParts.push(`Delivery Instructions: ${formData.deliveryNotes}`);
      }

      const payload = {
        customer: {
          name: formData.fullName.trim(),
          email: (formData.email || (user ? user.email : "guest@tapscan.pk")).trim().toLowerCase(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: finalCity,
          province: formData.province,
          postalCode: formData.postalCode.trim(),
        },
        items: items.map((it) => ({
          productId: it.productId,
          slug: it.slug,
          title: it.title,
          price: it.price,
          quantity: it.quantity,
          image: it.image,
          selectedVariants: it.selectedVariants,
          customBusinessName: it.customBusinessName || formData.customBusinessName || undefined,
          customReviewLink: it.customReviewLink || formData.customReviewLink || undefined,
        })),
        paymentMethod,
        notes: customNotesParts.join(" | "),
        discountCode: appliedCoupon?.code,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Unable to place order. Please review your details and retry.");
        setIsSubmitting(false);
        return;
      }

      // Order created successfully! Clear cart & redirect
      clearCart();
      router.push(`/checkout/success?orderNumber=${data.order.orderNumber}`);
    } catch (err: any) {
      setErrorMessage(err.message || "Network error. Please try again or place order via WhatsApp.");
      setIsSubmitting(false);
    }
  };

  // If cart is completely empty, show an inviting empty state
  if (items.length === 0) {
    return (
      <div className="tap-checkout-wrapper">
        <header className="tap-checkout-header">
          <div className="t4s-container tap-checkout-header-inner">
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.5px", color: "#08497e" }}>
                TapScan<span style={{ color: "#d9a114" }}>.pk</span>
              </span>
            </Link>
            <div className="tap-checkout-secure-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>256-Bit SSL Secured</span>
            </div>
          </div>
        </header>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 20px" }}>
          <div
            style={{
              background: "#ffffff",
              borderRadius: 24,
              border: "1px solid #e2e8f0",
              padding: "48px 32px",
              textAlign: "center",
              maxWidth: 480,
              width: "100%",
              boxShadow: "0 10px 35px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "#f1f5f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: "#94a3b8",
              }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>
              Your Cart is Empty
            </h1>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, marginBottom: 26 }}>
              You haven&apos;t added any smart NFC stands or cards to your cart yet. Explore our bestsellers and start collecting 5-star Google reviews effortlessly!
            </p>
            <Link
              href="/collections/all"
              className="tap-checkout-submit-btn"
              style={{ textDecoration: "none", width: "100%" }}
            >
              <span>Explore Smart NFC Products</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tap-checkout-wrapper">
      {/* Checkout Navbar */}
      <header className="tap-checkout-header">
        <div className="t4s-container tap-checkout-header-inner">
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.5px", color: "#08497e" }}>
              TapScan<span style={{ color: "#d9a114" }}>.pk</span>
            </span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div className="tap-checkout-secure-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Checkout Area */}
      <main className="tap-checkout-layout">
        {/* Left Column: Form & Information */}
        <section>
          {/* Error Banner */}
          {errorMessage && (
            <div
              style={{
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#b91c1c",
                borderRadius: 12,
                padding: "14px 18px",
                marginBottom: 20,
                fontSize: 13.5,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Express Account Status Banner */}
          <div
            style={{
              background: user ? "#f0fdf4" : "#f8fafc",
              border: `1px solid ${user ? "#bbf7d0" : "#e2e8f0"}`,
              borderRadius: 14,
              padding: "14px 18px",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#16a34a",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </span>
                <span style={{ fontSize: 13, color: "#166534", fontWeight: 600 }}>
                  Logged in as <strong>{user.name}</strong> ({user.email})
                </span>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>👤</span>
                  <span style={{ fontSize: 13, color: "#475569" }}>
                    Already have an account? <strong>Log in</strong> for fast order tracking.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={openLoginModal}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    color: "#0b69b3",
                    padding: "6px 14px",
                    borderRadius: 8,
                    fontSize: 12.5,
                    fontWeight: 700,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Log In
                </button>
              </>
            )}
          </div>

          <form onSubmit={handleSubmitOrder}>
            {/* Step 1: Customer & Delivery Information */}
            <div className="tap-checkout-card">
              <div className="tap-checkout-card-title">
                <span className="tap-checkout-step-tag">
                  <span className="tap-step-num">1</span>
                  <span>Delivery Details</span>
                </span>
                <span style={{ fontSize: 12, fontWeight: 500, color: "#64748b" }}>
                  Doorstep courier across Pakistan 🇵🇰
                </span>
              </div>

              <div className="tap-checkout-grid">
                {/* Full Name */}
                <div className="tap-checkout-field">
                  <label className="tap-checkout-label" htmlFor="fullName">
                    Full Name <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    placeholder="e.g. Muhammad Hassan"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="tap-checkout-input"
                  />
                </div>

                {/* Email */}
                <div className="tap-checkout-field">
                  <label className="tap-checkout-label" htmlFor="email">
                    Email Address (For Tracking Receipt)
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="hassan@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="tap-checkout-input"
                  />
                </div>

                {/* WhatsApp / Phone Number */}
                <div className="tap-checkout-field full-width">
                  <label className="tap-checkout-label" htmlFor="phone">
                    WhatsApp / Mobile Number <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: 14,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#64748b",
                        pointerEvents: "none",
                      }}
                    >
                      🇵🇰 +92
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="0321 1234567"
                      style={{ paddingLeft: 70 }}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="tap-checkout-input"
                    />
                  </div>
                  <span style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                    TCS/Trax courier driver will call this number before arrival.
                  </span>
                </div>

                {/* Street Address */}
                <div className="tap-checkout-field full-width">
                  <label className="tap-checkout-label" htmlFor="address">
                    Complete Street Address <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    required
                    placeholder="House/Shop #, Street, Plaza or Landmark, Area"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="tap-checkout-input"
                  />
                </div>

                {/* City */}
                <div className="tap-checkout-field">
                  <label className="tap-checkout-label" htmlFor="city">
                    City <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <select
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="tap-checkout-select"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} ({c.province})
                      </option>
                    ))}
                    <option value="other">Other City (Type below)</option>
                  </select>
                </div>

                {/* Province */}
                <div className="tap-checkout-field">
                  <label className="tap-checkout-label" htmlFor="province">
                    Province
                  </label>
                  <select
                    id="province"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="tap-checkout-select"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
                    <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Azad Kashmir">Azad Kashmir</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                  </select>
                </div>

                {/* Custom City input if "other" is selected */}
                {formData.city === "other" && (
                  <div className="tap-checkout-field full-width">
                    <label className="tap-checkout-label" htmlFor="customCity">
                      Type Your City Name <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      id="customCity"
                      type="text"
                      required
                      placeholder="e.g. Kasur, Okara, Kohat"
                      value={formData.customCity}
                      onChange={(e) => setFormData({ ...formData, customCity: e.target.value })}
                      className="tap-checkout-input"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Smart NFC & Google Review Customization (Optional) */}
            <div className="tap-checkout-card">
              <div className="tap-checkout-card-title">
                <span className="tap-checkout-step-tag">
                  <span className="tap-step-num">2</span>
                  <span>Stand Customization (Optional)</span>
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#0b69b3",
                    background: "#e0f2fe",
                    padding: "3px 8px",
                    borderRadius: 12,
                  }}
                >
                  NFC Pre-Configuration
                </span>
              </div>

              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16, lineHeight: 1.5 }}>
                We pre-program your smart chip and print your business details for free! Leave blank if you want to set it up later via WhatsApp.
              </p>

              <div className="tap-checkout-grid">
                <div className="tap-checkout-field">
                  <label className="tap-checkout-label" htmlFor="businessName">
                    Business / Clinic / Restaurant Name
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    placeholder="e.g. Royal Cafe Lahore"
                    value={formData.customBusinessName}
                    onChange={(e) => setFormData({ ...formData, customBusinessName: e.target.value })}
                    className="tap-checkout-input"
                  />
                </div>

                <div className="tap-checkout-field">
                  <label className="tap-checkout-label" htmlFor="reviewLink">
                    Google Review Link / Maps URL
                  </label>
                  <input
                    id="reviewLink"
                    type="url"
                    placeholder="https://g.page/r/... or Maps link"
                    value={formData.customReviewLink}
                    onChange={(e) => setFormData({ ...formData, customReviewLink: e.target.value })}
                    className="tap-checkout-input"
                  />
                </div>

                <div className="tap-checkout-field full-width">
                  <label className="tap-checkout-label" htmlFor="deliveryNotes">
                    Special Delivery Instructions
                  </label>
                  <textarea
                    id="deliveryNotes"
                    placeholder="e.g. Deliver between 2 PM - 6 PM, Call upon arriving at gate"
                    value={formData.deliveryNotes}
                    onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                    className="tap-checkout-textarea"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="tap-checkout-card">
              <div className="tap-checkout-card-title">
                <span className="tap-checkout-step-tag">
                  <span className="tap-step-num">3</span>
                  <span>Payment Method</span>
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#059669" }}>
                  100% Safe & Verified
                </span>
              </div>

              {/* Option 1: Cash on Delivery */}
              <div
                className={`tap-payment-option ${paymentMethod === "cod" ? "is-active" : ""}`}
                onClick={() => setPaymentMethod("cod")}
              >
                <div className="tap-payment-option-header">
                  <div className="tap-payment-radio-wrap">
                    <div className="tap-custom-radio">
                      {paymentMethod === "cod" && <div className="tap-custom-radio-dot" />}
                    </div>
                    <div>
                      <div className="tap-payment-option-title">Cash on Delivery (COD)</div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                        Pay cash when our courier delivers to your address.
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#166534",
                      background: "#dcfce7",
                      padding: "4px 8px",
                      borderRadius: 12,
                    }}
                  >
                    🇵🇰 Most Popular
                  </span>
                </div>

                {paymentMethod === "cod" && (
                  <div className="tap-payment-details-box">
                    <p style={{ margin: 0 }}>
                      ✓ Hand cash directly to the courier delivery rider upon arrival.
                      <br />
                      ✓ Package inspection allowed before receiving.
                    </p>
                  </div>
                )}
              </div>

              {/* Option 2: Bank Transfer / Raast */}
              <div
                className={`tap-payment-option ${paymentMethod === "bank_transfer" ? "is-active" : ""}`}
                onClick={() => setPaymentMethod("bank_transfer")}
              >
                <div className="tap-payment-option-header">
                  <div className="tap-payment-radio-wrap">
                    <div className="tap-custom-radio">
                      {paymentMethod === "bank_transfer" && <div className="tap-custom-radio-dot" />}
                    </div>
                    <div>
                      <div className="tap-payment-option-title">Direct Bank Transfer / Raast Instant</div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                        Meezan Bank, HBL, or instant Raast ID (0% transaction fee).
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#08497e",
                      background: "#e0f2fe",
                      padding: "4px 8px",
                      borderRadius: 12,
                    }}
                  >
                    ⚡ Instant Raast
                  </span>
                </div>

                {paymentMethod === "bank_transfer" && (
                  <div className="tap-payment-details-box">
                    <p style={{ margin: "0 0 8px 0" }}>
                      Please transfer the grand total <strong>Rs. {grandTotal.toLocaleString()}</strong> to our business account and share the payment receipt screenshot on WhatsApp (+92 327 4780117):
                    </p>
                    <div className="tap-bank-info-grid">
                      <div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>Bank Name:</div>
                        <strong style={{ fontSize: 13, color: "#0f172a" }}>Meezan Bank Limited</strong>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>Account Title:</div>
                        <strong style={{ fontSize: 13, color: "#0f172a" }}>Muhammad Hassan</strong>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>Account Number:</div>
                        <strong style={{ fontSize: 13, color: "#0f172a", letterSpacing: 0.5 }}>02840106849201</strong>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>Raast ID (Instant):</div>
                        <strong style={{ fontSize: 13, color: "#0b69b3" }}>03274780117</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Option 3: EasyPaisa / JazzCash */}
              <div
                className={`tap-payment-option ${paymentMethod === "easypaisa_jazzcash" ? "is-active" : ""}`}
                onClick={() => setPaymentMethod("easypaisa_jazzcash")}
              >
                <div className="tap-payment-option-header">
                  <div className="tap-payment-radio-wrap">
                    <div className="tap-custom-radio">
                      {paymentMethod === "easypaisa_jazzcash" && <div className="tap-custom-radio-dot" />}
                    </div>
                    <div>
                      <div className="tap-payment-option-title">EasyPaisa / JazzCash Mobile Wallet</div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                        Pay instantly from your mobile wallet application.
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#b45309",
                      background: "#fef3c7",
                      padding: "4px 8px",
                      borderRadius: 12,
                    }}
                  >
                    📱 Mobile Wallets
                  </span>
                </div>

                {paymentMethod === "easypaisa_jazzcash" && (
                  <div className="tap-payment-details-box">
                    <p style={{ margin: "0 0 8px 0" }}>
                      Send <strong>Rs. {grandTotal.toLocaleString()}</strong> to our official wallet number:
                    </p>
                    <div className="tap-bank-info-grid">
                      <div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>Account Number:</div>
                        <strong style={{ fontSize: 14, color: "#0b69b3" }}>0327-4780117</strong>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>Account Title:</div>
                        <strong style={{ fontSize: 13, color: "#0f172a" }}>Muhammad Hassan</strong>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "#64748b", margin: "10px 0 0 0" }}>
                      Once sent, share the transaction receipt with your Order ID on WhatsApp (+92 327 4780117) to process dispatch.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop / Mobile Submit Button in Form flow */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="tap-checkout-submit-btn"
            >
              {isSubmitting ? (
                <>
                  <div className="tap-spinner" />
                  <span>Securing Your Order...</span>
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  <span>Place Order • Rs. {grandTotal.toLocaleString()}</span>
                </>
              )}
            </button>
          </form>
        </section>

        {/* Right Column: Order Summary (Sticky) */}
        <aside>
          <div className="tap-summary-card">
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
              Order Summary ({items.length} {items.length === 1 ? "item" : "items"})
            </h2>

            {/* Items List */}
            <div className="tap-summary-items-list">
              {items.map((item) => (
                <div key={item.id} className="tap-summary-item">
                  <div className="tap-summary-img-wrap">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.title}
                      width={56}
                      height={56}
                      className="tap-summary-img"
                    />
                    <span className="tap-summary-qty-badge">{item.quantity}</span>
                  </div>

                  <div className="tap-summary-item-info">
                    <div className="tap-summary-item-title" title={item.title}>
                      {item.title}
                    </div>
                    {item.selectedVariants && (
                      <div className="tap-summary-item-meta">
                        {Object.entries(item.selectedVariants)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(" • ")}
                      </div>
                    )}
                    {item.customBusinessName && (
                      <div className="tap-summary-item-meta" style={{ color: "#0b69b3", fontWeight: 600 }}>
                        Custom: {item.customBusinessName}
                      </div>
                    )}
                  </div>

                  <div className="tap-summary-item-price">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Free Shipping Progress Indicator */}
            <div
              style={{
                backgroundColor: isFreeShippingByAmount ? "#ecfdf5" : "#f8fafc",
                border: `1px solid ${isFreeShippingByAmount ? "#a7f3d0" : "#e2e8f0"}`,
                borderRadius: 12,
                padding: "12px 14px",
                marginBottom: 16,
              }}
            >
              {isFreeShippingByAmount ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 700, color: "#065f46" }}>
                  <span>🎉</span>
                  <span>Unlocked FREE Nationwide Express Shipping!</span>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#475569", marginBottom: 6 }}>
                    <span>
                      Add <strong>Rs. {(3000 - subtotal).toLocaleString()}</strong> more for <strong>FREE Delivery</strong>
                    </span>
                    <span style={{ fontWeight: 700 }}>{Math.round((subtotal / 3000) * 100)}%</span>
                  </div>
                  <div style={{ height: 6, backgroundColor: "#e2e8f0", borderRadius: 3, overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        backgroundColor: "#0b69b3",
                        width: `${Math.min(100, (subtotal / 3000) * 100)}%`,
                        borderRadius: 3,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Coupon Code Input */}
            {appliedCoupon ? (
              <div className="tap-coupon-tag">
                <span>🏷️ Coupon: <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.message})</span>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#065f46",
                    cursor: "pointer",
                    fontSize: 14,
                    padding: "0 2px",
                    fontWeight: 800,
                  }}
                  title="Remove coupon"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div>
                <div className="tap-coupon-wrap" style={{ marginTop: 0, paddingTop: 0 }}>
                  <input
                    type="text"
                    placeholder="Discount code (e.g. TAPSCAN10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleApplyCoupon();
                      }
                    }}
                    className="tap-coupon-input"
                  />
                  <button
                    type="button"
                    disabled={isValidatingCoupon || !couponCode.trim()}
                    onClick={() => handleApplyCoupon()}
                    className="tap-coupon-btn"
                  >
                    {isValidatingCoupon ? "..." : "Apply"}
                  </button>
                </div>

                {couponError && (
                  <div style={{ fontSize: 12, color: "#ef4444", marginTop: 4, marginBottom: 8 }}>
                    {couponError}
                  </div>
                )}

                {/* Popular promo suggestion tags */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6, marginBottom: 16 }}>
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon("TAPSCAN10")}
                    style={{
                      background: "#f1f5f9",
                      border: "1px dashed #cbd5e1",
                      borderRadius: 14,
                      padding: "3px 8px",
                      fontSize: 11,
                      color: "#475569",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    TAPSCAN10 (10% OFF)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon("LAUNCHFREE")}
                    style={{
                      background: "#f1f5f9",
                      border: "1px dashed #cbd5e1",
                      borderRadius: 14,
                      padding: "3px 8px",
                      fontSize: 11,
                      color: "#475569",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    LAUNCHFREE
                  </button>
                </div>
              </div>
            )}

            {/* Totals Breakdown */}
            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
              <div className="tap-summary-line">
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>

              <div className="tap-summary-line">
                <span>Nationwide Shipping</span>
                <span
                  style={{
                    fontWeight: 600,
                    color: shippingFee === 0 ? "#059669" : "#0f172a",
                  }}
                >
                  {shippingFee === 0 ? "FREE" : `Rs. ${shippingFee}`}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="tap-summary-line">
                  <span style={{ color: "#059669" }}>Discount ({appliedCoupon?.code})</span>
                  <span style={{ fontWeight: 700, color: "#059669" }}>
                    -Rs. {discountAmount.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="tap-summary-line is-total">
                <div>
                  <div>Total Payable</div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: "#64748b" }}>
                    Inclusive of all local courier charges
                  </div>
                </div>
                <div style={{ fontSize: 20, color: "#08497e" }}>
                  Rs. {grandTotal.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Sidebar Trust Icons */}
            <div className="tap-checkout-trust-grid">
              <div className="tap-checkout-trust-item">
                <span>🇵🇰</span>
                <span>Fast Nationwide Delivery</span>
              </div>
              <div className="tap-checkout-trust-item">
                <span>🛡️</span>
                <span>1-Year Chip Warranty</span>
              </div>
              <div className="tap-checkout-trust-item">
                <span>🔒</span>
                <span>Safe Payment Channels</span>
              </div>
              <div className="tap-checkout-trust-item">
                <span>📞</span>
                <span>WhatsApp Live Support</span>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
