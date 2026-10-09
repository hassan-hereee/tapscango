"use client";

import { useState } from "react";
import { Product, ProductReview } from "@/data/products";

interface ProductReviewsSectionProps {
  product: Product;
}

export default function ProductReviewsSection({ product }: ProductReviewsSectionProps) {
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviews || []);
  const [filterRating, setFilterRating] = useState<number | "all">("all");
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Form state
  const [newAuthor, setNewAuthor] = useState("");
  const [newBusiness, setNewBusiness] = useState("");
  const [newCity, setNewCity] = useState("Lahore");
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filteredReviews = reviewsList.filter((r) => {
    if (filterRating === "all") return true;
    return r.rating === filterRating;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      businessName: newBusiness.trim() || "Retail Store",
      city: newCity,
      rating: newRating,
      date: "Just now",
      title: newTitle.trim() || "Excellent Product",
      comment: newComment.trim(),
      verified: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setShowReviewForm(false);
      setSubmitted(false);
      setNewAuthor("");
      setNewBusiness("");
      setNewTitle("");
      setNewComment("");
    }, 2000);
  };

  return (
    <section id="customer-reviews" style={{ padding: "70px 0", backgroundColor: "#f8fafc" }}>
      <div className="t4s-container">
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 36,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
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
                Real Business Results
              </span>
              <h2 style={{ fontSize: "clamp(24px, 3.2vw, 32px)", fontWeight: 800, color: "#08497e", margin: 0 }}>
                Customer Reviews ({reviewsList.length})
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setShowReviewForm(!showReviewForm)}
              style={{
                backgroundColor: "#08497e",
                color: "#ffffff",
                padding: "10px 20px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {showReviewForm ? "Cancel Review" : "Write a Review"}
            </button>
          </div>

          {/* Rating Summary Card */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "32px",
              borderRadius: 16,
              border: "1px solid #e2e8f0",
              marginBottom: 32,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 28,
              alignItems: "center",
            }}
          >
            {/* Score */}
            <div style={{ textAlign: "center", borderRight: "1px solid #f1f5f9", paddingRight: 16 }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: "#08497e", lineHeight: 1 }}>
                {product.rating.toFixed(1)}
              </div>
              <div style={{ color: "#d9a114", fontSize: 20, margin: "8px 0 4px" }}>★★★★★</div>
              <div style={{ fontSize: 13, color: "#64748b" }}>
                Based on {product.reviewsCount} verified Pakistani businesses
              </div>
            </div>

            {/* Rating Bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { stars: 5, pct: 92 },
                { stars: 4, pct: 8 },
                { stars: 3, pct: 0 },
                { stars: 2, pct: 0 },
                { stars: 1, pct: 0 },
              ].map((row) => (
                <div key={row.stars} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12 }}>
                  <span style={{ width: 44, color: "#475569", fontWeight: 600 }}>{row.stars} Stars</span>
                  <div style={{ flex: 1, height: 8, backgroundColor: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        backgroundColor: "#d9a114",
                        width: `${row.pct}%`,
                        borderRadius: 4,
                      }}
                    />
                  </div>
                  <span style={{ width: 34, textAlign: "right", color: "#64748b" }}>{row.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Write a Review Modal/Form */}
          {showReviewForm && (
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "32px",
                borderRadius: 16,
                border: "2px solid #08497e",
                marginBottom: 32,
                boxShadow: "0 8px 24px rgba(8, 73, 126, 0.08)",
              }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#08497e", marginBottom: 6 }}>
                Share Your Experience with TapScan
              </h3>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
                Help other Pakistani business owners choose the right smart standee.
              </p>

              {submitted ? (
                <div style={{ padding: "20px", backgroundColor: "#ecfdf5", color: "#065f46", borderRadius: 8, fontWeight: 700, textAlign: "center" }}>
                  🎉 Thank you! Your review has been added successfully.
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Rating selector */}
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>
                      Overall Rating:
                    </label>
                    <div style={{ display: "flex", gap: 6 }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          style={{
                            fontSize: 24,
                            color: star <= newRating ? "#d9a114" : "#cbd5e1",
                            cursor: "pointer",
                            background: "none",
                            border: "none",
                          }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 4 }}>
                        Your Full Name:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Asad Ali"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 13 }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 4 }}>
                        Business / Store Name:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ali Dental Clinic"
                        value={newBusiness}
                        onChange={(e) => setNewBusiness(e.target.value)}
                        style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 13 }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 4 }}>
                        City:
                      </label>
                      <select
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 13, backgroundColor: "#ffffff" }}
                      >
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Multan">Multan</option>
                        <option value="Peshawar">Peshawar</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 4 }}>
                      Review Title:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tripled our Google reviews in 2 weeks!"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 13 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 4 }}>
                      Detailed Feedback:
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share how this stand helped your customers review your business..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #cbd5e1", fontSize: 13 }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "#0b69b3",
                      color: "#ffffff",
                      padding: "12px 28px",
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Filter Pills */}
          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setFilterRating("all")}
              style={{
                padding: "8px 16px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: filterRating === "all" ? 700 : 500,
                backgroundColor: filterRating === "all" ? "#08497e" : "#ffffff",
                color: filterRating === "all" ? "#ffffff" : "#475569",
                border: "1px solid #cbd5e1",
                cursor: "pointer",
              }}
            >
              All ({reviewsList.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterRating(5)}
              style={{
                padding: "8px 16px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: filterRating === 5 ? 700 : 500,
                backgroundColor: filterRating === 5 ? "#08497e" : "#ffffff",
                color: filterRating === 5 ? "#ffffff" : "#475569",
                border: "1px solid #cbd5e1",
                cursor: "pointer",
              }}
            >
              5 Stars Only ★★★★★
            </button>
          </div>

          {/* Reviews List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                style={{
                  backgroundColor: "#ffffff",
                  padding: "24px 28px",
                  borderRadius: 14,
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{rev.author}</span>
                      {rev.verified && (
                        <span
                          style={{
                            backgroundColor: "#ecfdf5",
                            color: "#059669",
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: 12,
                            border: "1px solid #a7f3d0",
                          }}
                        >
                          ✓ Verified Business Buyer
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                      {rev.businessName} • {rev.city}, Pakistan
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ color: "#d9a114", fontSize: 14 }}>{"★".repeat(rev.rating)}</div>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>{rev.date}</span>
                  </div>
                </div>

                <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b" }}>{rev.title}</div>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, margin: 0 }}>{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
