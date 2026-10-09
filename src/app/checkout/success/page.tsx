"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";

interface OrderDetail {
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province?: string;
  };
  items: {
    productId: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
    selectedVariants?: Record<string, string>;
    customBusinessName?: string;
  }[];
  paymentMethod: "cod" | "bank_transfer" | "easypaisa_jazzcash";
  paymentStatus: string;
  orderStatus: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  notes?: string;
  createdAt: string;
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!orderNumber) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderNumber}`);
        const data = await res.json();
        if (res.ok && data.success && data.order) {
          setOrder(data.order);
        }
      } catch (err) {
        console.error("Failed to fetch order", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  const copyOrderNumber = () => {
    if (order?.orderNumber) {
      navigator.clipboard.writeText(order.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getWhatsAppMessageUrl = () => {
    if (!order) {
      return "https://wa.me/923274780117?text=Salam,%20I%20have%20a%20question%20about%20my%20recent%20order.";
    }

    const msg = `Salam! I just placed order #${order.orderNumber} for Rs. ${order.total.toLocaleString()} on TapScan.pk.\n\nName: ${order.customer.name}\nCity: ${order.customer.city}\nItems: ${order.items.map((it) => `${it.title} (x${it.quantity})`).join(", ")}\n\nPlease confirm my order details and courier dispatch schedule.`;
    return `https://wa.me/923274780117?text=${encodeURIComponent(msg)}`;
  };

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div className="tap-spinner" style={{ width: 44, height: 44, borderTopColor: "#0b69b3", borderColor: "#cbd5e1", margin: "0 auto 16px" }} />
          <p style={{ color: "#64748b", fontSize: 15, fontWeight: 500 }}>Confirming your order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tap-order-success-wrap">
      <div className="tap-success-card">
        {/* Green Success Badge */}
        <div className="tap-success-check-badge">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 800, color: "#0f172a", marginBottom: 8, letterSpacing: "-0.5px" }}>
          Thank You, {order?.customer.name ? order.customer.name.split(" ")[0] : "Customer"}!
        </h1>
        <p style={{ fontSize: 15, color: "#475569", maxWidth: 520, margin: "0 auto 24px", lineHeight: 1.6 }}>
          Your order has been placed successfully and is now being prepared by our technicians for dispatch.
        </p>

        {/* Order Number Badge */}
        {orderNumber && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              backgroundColor: "#f1f5f9",
              border: "1px solid #cbd5e1",
              borderRadius: 30,
              padding: "8px 20px",
              marginBottom: 28,
            }}
          >
            <span style={{ fontSize: 13, color: "#475569" }}>Order Reference:</span>
            <strong style={{ fontSize: 16, color: "#08497e", letterSpacing: 0.5 }}>{orderNumber}</strong>
            <button
              onClick={copyOrderNumber}
              type="button"
              style={{
                background: "none",
                border: "none",
                color: copied ? "#059669" : "#64748b",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                padding: "2px 6px",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>
        )}

        {/* WhatsApp Fast Confirmation CTA */}
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "1.5px solid #86efac",
            borderRadius: 16,
            padding: "22px 20px",
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 700, color: "#166534", marginBottom: 6 }}>
            ⚡ Need Instant Order Confirmation & Tracking?
          </div>
          <p style={{ fontSize: 13, color: "#15803d", maxWidth: 500, margin: "0 auto 16px", lineHeight: 1.5 }}>
            Message our WhatsApp fulfillment desk to verify your address, send logo files, or check shipping speed.
          </p>
          <a
            href={getWhatsAppMessageUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-whatsapp-confirm-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>Confirm Order on WhatsApp (+92 327 4780117)</span>
          </a>
        </div>

        {/* Order Status Timeline */}
        <div style={{ textAlign: "left", marginBottom: 32, padding: "20px", background: "#f8fafc", borderRadius: 16, border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 14 }}>
            Order Fulfillment Progress
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#059669", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>✓</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>Order Placed</div>
                <div style={{ fontSize: 10, color: "#64748b" }}>Confirmed</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#0b69b3", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>2</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>NFC Encoding</div>
                <div style={{ fontSize: 10, color: "#64748b" }}>In Progress</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#cbd5e1", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>3</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}>Courier Dispatch</div>
                <div style={{ fontSize: 10, color: "#94a3b8" }}>TCS / Trax</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#cbd5e1", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>4</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}>Doorstep Delivery</div>
                <div style={{ fontSize: 10, color: "#94a3b8" }}>2-3 Days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details Breakdown */}
        {order && (
          <div style={{ textAlign: "left", borderTop: "1px solid #e2e8f0", paddingTop: 24, marginBottom: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
              Order Summary & Shipping Address
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 24 }}>
              {/* Delivery info */}
              <div style={{ background: "#ffffff", padding: "16px", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>
                  Delivery Address
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{order.customer.name}</div>
                <div style={{ fontSize: 13, color: "#475569", marginTop: 2 }}>{order.customer.address}</div>
                <div style={{ fontSize: 13, color: "#475569" }}>
                  {order.customer.city}, {order.customer.province || "Pakistan"}
                </div>
                <div style={{ fontSize: 13, color: "#0b69b3", fontWeight: 600, marginTop: 4 }}>
                  📱 {order.customer.phone}
                </div>
              </div>

              {/* Payment info */}
              <div style={{ background: "#ffffff", padding: "16px", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>
                  Payment Method
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
                  {order.paymentMethod === "cod"
                    ? "🇵🇰 Cash on Delivery (COD)"
                    : order.paymentMethod === "bank_transfer"
                    ? "⚡ Direct Bank Transfer / Raast"
                    : "📱 EasyPaisa / JazzCash"}
                </div>
                <div style={{ fontSize: 13, color: "#475569", marginTop: 2 }}>
                  Status: <strong style={{ color: order.paymentStatus === "paid" ? "#059669" : "#d97706" }}>{order.paymentStatus.toUpperCase()}</strong>
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#08497e", marginTop: 6 }}>
                  Total: Rs. {order.total.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Items Purchased */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    background: "#f8fafc",
                    borderRadius: 10,
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.title}
                      width={44}
                      height={44}
                      style={{ borderRadius: 8, objectFit: "cover", border: "1px solid #e2e8f0" }}
                    />
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0f172a" }}>
                        {item.title} <span style={{ color: "#64748b", fontWeight: 500 }}>(x{item.quantity})</span>
                      </div>
                      {item.customBusinessName && (
                        <div style={{ fontSize: 11.5, color: "#0b69b3", fontWeight: 600 }}>
                          Custom: {item.customBusinessName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/account"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              background: "#08497e",
              color: "#ffffff",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <span>View Orders in My Account</span>
          </Link>

          <Link
            href="/collections/all"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              color: "#334155",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f8fafc" }}>
      <AnnouncementBar />
      <Header />
      <main style={{ flex: 1, padding: "20px 0" }}>
        <Suspense
          fallback={
            <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="tap-spinner" style={{ width: 40, height: 40, borderTopColor: "#0b69b3", borderColor: "#cbd5e1" }} />
            </div>
          }
        >
          <CheckoutSuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
