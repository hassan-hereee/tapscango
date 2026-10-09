"use client";

export default function ProductBeforeAfter() {
  const withoutPoints = [
    "Customers forget to search your name after leaving your premises",
    "Paper QR codes easily get wet, torn, stained, or fade under counter lights",
    "Clients mistype your business name and review a competitor instead",
    "Staff feels awkward asking every client for a review during busy rush",
    "Your business stays stuck at 20-30 reviews while competitors rank higher",
  ];

  const withPoints = [
    "Instant 3-second NFC tap directly opens your 5-star review page",
    "Durable, diamond-polished 4mm cast acrylic looks luxurious on any counter",
    "Pre-programmed direct link ensures 100% accuracy every single time",
    "Eye-catching 3D acrylic design prompts customers to tap naturally",
    "Generate 50+ new organic reviews monthly and dominate local Google searches",
  ];

  return (
    <section style={{ padding: "70px 0", backgroundColor: "#f8fafc" }}>
      <div className="t4s-container">
        {/* Section Heading */}
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 48px" }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#0b69b3",
              textTransform: "uppercase",
              letterSpacing: "1px",
              display: "inline-block",
              marginBottom: 8,
            }}
          >
            The Direct Impact On Your Business
          </span>
          <h2
            style={{
              fontSize: "clamp(24px, 3.2vw, 32px)",
              fontWeight: 800,
              color: "#08497e",
              lineHeight: 1.25,
              marginBottom: 12,
            }}
          >
            The Difference TapScan Makes
          </h2>
          <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
            See why over 2,500 Pakistani cafes, aesthetic clinics, salons, and retail stores have replaced paper printouts with TapScan.
          </p>
        </div>

        {/* Side by Side Comparison Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(20px, 3vw, 28px)",
          }}
        >
          {/* Card 1: Without TapScan */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "clamp(24px, 4vw, 36px) clamp(18px, 3.5vw, 30px)",
              borderRadius: 18,
              border: "1.5px solid #fecaca",
              boxShadow: "0 4px 16px rgba(239, 68, 68, 0.05)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "#fee2e2",
                  color: "#ef4444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                ✕
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#991b1b" }}>Without TapScan</h3>
                <span style={{ fontSize: 12, color: "#dc2626" }}>Losing 90% of Potential Reviews</span>
              </div>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {withoutPoints.map((point, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#475569", lineHeight: 1.5 }}>
                  <span style={{ color: "#ef4444", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✕</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: With TapScan */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "clamp(24px, 4vw, 36px) clamp(18px, 3.5vw, 30px)",
              borderRadius: 18,
              border: "2px solid #08497e",
              boxShadow: "0 8px 28px rgba(8, 73, 126, 0.12)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {/* Top Winner Badge */}
            <div
              style={{
                position: "absolute",
                top: -14,
                right: 24,
                backgroundColor: "#08497e",
                color: "#ffffff",
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: 20,
                letterSpacing: "0.5px",
                boxShadow: "0 2px 8px rgba(8, 73, 126, 0.3)",
              }}
            >
              ⭐ Recommended Solution
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "#dbeafe",
                  color: "#08497e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                ✓
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#08497e" }}>With TapScan Standee</h3>
                <span style={{ fontSize: 12, color: "#059669", fontWeight: 700 }}>5x to 10x More 5-Star Reviews</span>
              </div>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {withPoints.map((point, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#1e293b", fontWeight: 500, lineHeight: 1.5 }}>
                  <span style={{ color: "#16a34a", fontWeight: 800, flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
