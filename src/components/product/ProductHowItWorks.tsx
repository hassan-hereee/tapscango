"use client";

export default function ProductHowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Place On Your Counter",
      subtitle: "Zero Setup or Programming Needed",
      desc: "Unbox and set the luxury acrylic stand on your checkout desk, salon counter, dining table, or clinic reception. Pre-programmed and ready to roll.",
      badge: "Instant Setup",
    },
    {
      num: "02",
      title: "Customer Taps Or Scans",
      subtitle: "3-Second Contactless Trigger",
      desc: "Customers simply hold their iPhone or Android phone near the NFC logo, or scan the high-contrast QR code with their camera app. No apps required.",
      badge: "Zero Friction",
    },
    {
      num: "03",
      title: "Google Review Page Opens",
      subtitle: "Pre-loaded with 5 Stars",
      desc: "Their browser opens directly to your official Google review submission screen. They tap submit in seconds, dramatically increasing your total review volume.",
      badge: "10x Conversions",
    },
  ];

  return (
    <section style={{ padding: "70px 0", backgroundColor: "#ffffff" }}>
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
            Frictionless Customer Journey
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
            How It Works in 3 Simple Steps
          </h2>
          <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
            Eliminate awkward requests. Let customers effortlessly leave a positive review before leaving your counter.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(18px, 3vw, 28px)",
            position: "relative",
          }}
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#f8fafc",
                padding: "clamp(24px, 4vw, 36px) clamp(18px, 3.5vw, 28px)",
                borderRadius: 18,
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "all 0.3s ease",
              }}
            >
              {/* Step Number Watermark */}
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  right: 24,
                  fontSize: 42,
                  fontWeight: 900,
                  color: "#e2e8f0",
                  lineHeight: 1,
                  fontFamily: "sans-serif",
                }}
              >
                {step.num}
              </div>

              {/* Step Badge */}
              <div style={{ marginBottom: 16 }}>
                <span
                  style={{
                    backgroundColor: "#08497e",
                    color: "#ffffff",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 20,
                    display: "inline-block",
                  }}
                >
                  {step.badge}
                </span>
              </div>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
                {step.title}
              </h3>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0b69b3", marginBottom: 14 }}>
                {step.subtitle}
              </div>

              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, flex: 1, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
