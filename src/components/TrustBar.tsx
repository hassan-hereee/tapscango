"use client";

import Image from "next/image";

interface TrustItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    id: 1,
    title: "Fully Customizable Designs",
    description: "Your logo, colors, and links — your way.",
    icon: "/trust/customizable.png",
  },
  {
    id: 2,
    title: "Fast Delivery & Seamless Service",
    description: "Quick, smooth, and hassle-free across Pakistan.",
    icon: "/trust/delivery.png",
  },
  {
    id: 3,
    title: "3,000+ Happy Customers",
    description: "Trusted by growing businesses nationwide.",
    icon: "/trust/customers.png",
  },
  {
    id: 4,
    title: "Trusted by Cafés, Salons & Retail",
    description: "Reliable & proven for all storefronts.",
    icon: "/trust/trusted.png",
  },
];

export default function TrustBar() {
  return (
    <section className="t4s-trust-section" aria-label="Brand Highlights">
      <div className="t4s-container">
        <div className="t4s-trust-grid">
          {TRUST_ITEMS.map((item) => (
            <div key={item.id} className="t4s-trust-card">
              <div className="t4s-trust-icon-wrap">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="t4s-trust-icon"
                />
              </div>
              <div className="t4s-trust-info">
                <h3 className="t4s-trust-title">{item.title}</h3>
                <p className="t4s-trust-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
