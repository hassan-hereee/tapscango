export interface ProductReview {
  id: string;
  author: string;
  businessName: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductVariantGroup {
  name: string;
  options: {
    label: string;
    value: string;
    priceModifier?: number;
    colorCode?: string;
  }[];
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Product {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  price: number;
  compareAtPrice: number;
  badge?: string;
  rating: number;
  reviewsCount: number;
  stockCount: number;
  images: string[];
  image?: string;
  description: string;
  highlights: string[];
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  variants: ProductVariantGroup[];
  specs: ProductSpec[];
  boxContents: string[];
  faqs: ProductFAQ[];
  reviews: ProductReview[];
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "google-review-qr-code-standee",
    title: "Smart NFC Google Review QR Code Standee | Premium edition",
    tagline: "Turn every happy customer into a 5-star Google review in 3 seconds with a single tap.",
    category: "Google Review Stands",
    price: 2700,
    compareAtPrice: 3000,
    badge: "-10% OFF",
    rating: 4.9,
    reviewsCount: 48,
    stockCount: 8,
    images: [
      "/products/product-1.jpg",
      "/showcase.jpg",
      "/products/product-3.jpg",
      "/products/product-2.jpg",
    ],
    description:
      "Eliminate customer friction and skyrocket your local Google business ranking. The TapScan Premium Google Review Standee combines high-speed contactless NFC technology with an ultra-sharp high-contrast QR code. With one simple tap of an iPhone or Android, your customers are redirected straight to your 5-star review submission window. Handcrafted from heavy cast acrylic with beveled edges and UV-protected vibrant print.",
    highlights: [
      "Instant 1-Tap NFC Review Launch (No app download needed)",
      "Universal QR backup for 100% device compatibility",
      "Grade-A heavy cast acrylic with diamond-polished edges",
      "Custom programmed with your exact Google Maps review URL",
      "Lifetime chip durability with passive wireless induction",
      "Delivered ready-to-use out of the box with zero monthly fees",
    ],
    features: [
      {
        icon: "⚡",
        title: "Frictionless 3-Second Tap",
        description: "Customers simply hold their smartphone near the NFC icon. No searching your business name or mistyping URLs.",
      },
      {
        icon: "💎",
        title: "Cast Acrylic Luxury Build",
        description: "Heavyweight 4mm shatter-resistant cast acrylic that complements premium boutique counters, clinics, and cafes.",
      },
      {
        icon: "📱",
        title: "100% Universal Compatibility",
        description: "Built-in NTAG215 wireless microchip works with iOS and Android. High-contrast QR code works on all smartphone cameras.",
      },
      {
        icon: "🛡️",
        title: "1-Year Chip Warranty",
        description: "Waterproof, scratch-resistant back-printing and industrial-grade NFC components backed by full 12-month replacement guarantee.",
      },
    ],
    variants: [
      {
        name: "Finish & Style",
        options: [
          { label: "Matte Jet Black", value: "matte-black", colorCode: "#111111" },
          { label: "High-Gloss Pearl White", value: "pearl-white", colorCode: "#ffffff" },
          { label: "Crystal Clear Glass-Look", value: "crystal-clear", colorCode: "#d4e6f1" },
        ],
      },
      {
        name: "Counter Size",
        options: [
          { label: "Standard Counter (15 × 10 cm)", value: "standard", priceModifier: 0 },
          { label: "Executive Counter (20 × 14 cm)", value: "executive", priceModifier: 400 },
        ],
      },
      {
        name: "Technology Configuration",
        options: [
          { label: "Dual NFC + High-Contrast QR (Recommended)", value: "dual-nfc-qr", priceModifier: 0 },
          { label: "High-Contrast QR Only", value: "qr-only", priceModifier: -300 },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "Grade-A Cast Acrylic (4mm thickness)" },
      { label: "NFC Chipset", value: "Original NXP NTAG215 Contactless Chip" },
      { label: "Scan Distance", value: "2 cm – 4 cm Instant Proximity" },
      { label: "Print Process", value: "UV Back-Printed (Scratch & Fade Proof)" },
      { label: "Base Support", value: "Slanted Stable Acrylic Foot Base (Anti-tip)" },
      { label: "Power Source", value: "Zero Battery / Passive Wireless Induction" },
      { label: "Compatibility", value: "All iPhones (XS & newer) and Android NFC devices" },
      { label: "Origin", value: "Proudly Engineered & Printed in Pakistan 🇵🇰" },
    ],
    boxContents: [
      "1× Pre-configured Smart NFC Google Review Standee",
      "1× Heavyweight Slanted Acrylic Display Base",
      "1× Quick-Start Setup & Placement Guide",
      "1× Google Review Tips & QR Verification Certificate",
    ],
    faqs: [
      {
        question: "How does the NFC stand open my Google review page?",
        answer: "We pre-program an embedded NTAG215 microchip with your verified Google Business Place Review URL. When a customer brings their phone within 3cm of the stand, their phone reads the wireless signal and opens the Google review page automatically.",
      },
      {
        question: "Do customers need to install any app to use it?",
        answer: "No app or software is required at all. Modern iPhones and Androids have built-in NFC and camera QR readers that launch the link instantly.",
      },
      {
        question: "How do I give you my business name and review link?",
        answer: "You can enter your Business Name and Google Maps link directly in the fields on this page before ordering, or our customer support team will contact you via WhatsApp right after your order to configure your link.",
      },
      {
        question: "Can I pay with Cash on Delivery (COD)?",
        answer: "Yes! We offer Cash on Delivery (COD) across all cities in Pakistan, as well as advance payment via JazzCash, EasyPaisa, and Bank Transfer.",
      },
      {
        question: "How long does delivery take?",
        answer: "Orders are processed, printed, and programmed within 24 hours. Delivery takes 2-3 business days across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, and other cities via Trax/TCS.",
      },
    ],
    reviews: [
      {
        id: "r1",
        author: "Hamza Tariq",
        businessName: "Roasters Coffee House",
        city: "Lahore",
        rating: 5,
        date: "2 weeks ago",
        title: "Gathered over 140 reviews in just 20 days!",
        comment:
          "We placed one at the cash counter and one at the pickup point. Customers find the tap feature fascinating. Our reviews jumped from 82 to over 220 in less than a month. Build quality is top-notch acrylic.",
        verified: true,
      },
      {
        id: "r2",
        author: "Dr. Ayesha Malik",
        businessName: "Malik Aesthetics & Dental Clinic",
        city: "Islamabad",
        rating: 5,
        date: "1 month ago",
        title: "Clean, professional, and very effective",
        comment:
          "Patients love tapping their phone while settling the bill. The team reached out on WhatsApp to verify my Google link before sending. Delivered in 2 days to Islamabad.",
        verified: true,
      },
      {
        id: "r3",
        author: "Zubair Ahmed",
        businessName: "Apex Auto Care",
        city: "Karachi",
        rating: 5,
        date: "3 weeks ago",
        title: "Solid acrylic build, not cheap plastic",
        comment:
          "Was worried about the print peeling off, but it's back-printed acrylic with polished edges. Looks very premium on our reception desk.",
        verified: true,
      },
    ],
  },
  {
    id: 2,
    slug: "smart-nfc-4-in-1-qr-code-standee",
    title: "Smart NFC 4-in-1 Qr code Standee With 3D Cut Acrylic Icons",
    tagline: "The ultimate front-desk centerpiece: Google Review, Instagram, WhatsApp, and Scan-to-Pay in one stand.",
    category: "Multi-Link Stands",
    price: 3999,
    compareAtPrice: 4999,
    badge: "-20% OFF",
    rating: 5.0,
    reviewsCount: 62,
    stockCount: 5,
    images: [
      "/products/product-2.jpg",
      "/showcase.jpg",
      "/products/product-1.jpg",
      "/products/product-4.jpg",
    ],
    description:
      "Consolidate your entire digital footprint into one breathtaking, high-impact counter display. The 4-in-1 Standee features 3D laser-cut raised acrylic icons for Google Reviews, Instagram Followers, WhatsApp Chat, and Instant Bank/QR Payment. Engineered with multi-chip contactless NFC technology and sharp precision QR codes.",
    highlights: [
      "4 Distinct Actions: Google Reviews, Instagram, WhatsApp & Payment",
      "Stunning 3D Raised Laser-Cut Acrylic Icon Accents",
      "Integrated Contactless NFC Sensor & High-Definition QR codes",
      "Reduces counter clutter by replacing 4 separate paper printouts",
      "High-end weighted acrylic construction with stable angled base",
      "Full custom personalization with your brand name & logos",
    ],
    features: [
      {
        icon: "🌟",
        title: "4-in-1 Powerhouse",
        description: "Google Reviews for ranking, Instagram for community, WhatsApp for repeat inquiries, and payment QR for seamless checkout.",
      },
      {
        icon: "✨",
        title: "3D Cut Acrylic Elements",
        description: "Multi-layered acrylic with 3D tactile icon cutouts that instantly catch your customer's eye at the checkout counter.",
      },
      {
        icon: "💳",
        title: "Easy Scan-to-Pay Integration",
        description: "Accept payments via Raast, JazzCash, EasyPaisa, or Meezan/Bank QR without awkward account number sharing.",
      },
      {
        icon: "🛡️",
        title: "Heavyweight Counter Stability",
        description: "Solid dual-layer acrylic base prevents tipping even on busy counters and bustling retail tables.",
      },
    ],
    variants: [
      {
        name: "Finish & Style",
        options: [
          { label: "Glossy Jet Black with Gold 3D Accents", value: "black-gold", colorCode: "#111111" },
          { label: "Pure Frost White with Colorful 3D Icons", value: "white-icons", colorCode: "#ffffff" },
          { label: "Smoked Grey Minimalist", value: "smoked-grey", colorCode: "#444444" },
        ],
      },
      {
        name: "Counter Size",
        options: [
          { label: "Desk Edition (18 × 13 cm)", value: "desk-edition", priceModifier: 0 },
          { label: "Deluxe Executive (24 × 16 cm)", value: "deluxe-edition", priceModifier: 500 },
        ],
      },
      {
        name: "Technology Configuration",
        options: [
          { label: "Multi-NFC + 4 Dynamic QRs (Recommended)", value: "multi-nfc", priceModifier: 0 },
          { label: "4 High-Contrast QRs Only", value: "qr-only", priceModifier: -400 },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "Dual-Layer Premium Cast Acrylic (5mm total)" },
      { label: "Accent Detailing", value: "Laser-cut 3D Raised Acrylic Appliques" },
      { label: "NFC Chipsets", value: "Dual NXP Contactless Microchips" },
      { label: "QR Capacity", value: "4 Distinct High-Resolution Vector QR codes" },
      { label: "Dimensions", value: "18 cm (H) × 13 cm (W) × 6 cm (Base depth)" },
      { label: "Maintenance", value: "Wipe clean with micro-fiber cloth (waterproof)" },
      { label: "Warranty", value: "1-Year Chip & Structural Warranty" },
    ],
    boxContents: [
      "1× 4-in-1 Smart NFC & QR Standee with 3D Icons",
      "1× Dual-Layer Acrylic Weighted Stand Base",
      "1× Custom QR Verification Certificate",
      "1× Setup & Digital Link Transfer Guide",
    ],
    faqs: [
      {
        question: "Can I customize which 4 services appear on the stand?",
        answer: "Yes! While Google Review, Instagram, WhatsApp, and Payment are standard, you can swap any icon for TikTok, Facebook, Snapchat, WiFi connect, or your custom website.",
      },
      {
        question: "How do I setup my payment QR (Raast / JazzCash / EasyPaisa)?",
        answer: "Simply send us your QR screenshot or account IBAN/number via WhatsApp after checkout, and our graphics team will format it into a vector QR code with crisp contrast.",
      },
      {
        question: "Will the 3D acrylic icons peel off over time?",
        answer: "No. The 3D icons are laser-cut from high-grade solid acrylic and bonded using industrial chemical acrylic bonding that fuses the layers permanently.",
      },
    ],
    reviews: [
      {
        id: "r4",
        author: "Kashif Riaz",
        businessName: "Luxe Barber Lounge",
        city: "Karachi",
        rating: 5,
        date: "1 week ago",
        title: "Best investment for our salon front desk",
        comment:
          "Replaced three messy laminated paper stands. Clients tap for Instagram and pay using EasyPaisa right away. The 3D cut icons look super classy.",
        verified: true,
      },
      {
        id: "r5",
        author: "Sarah Sheikh",
        businessName: "Pastry Palette Bakery",
        city: "Lahore",
        rating: 5,
        date: "3 weeks ago",
        title: "Customers love taking photos of it!",
        comment:
          "Very stylish. The black acrylic with 3D icons matches our cafe vibe. Customer service on WhatsApp guided us through getting our Google link.",
        verified: true,
      },
    ],
  },
  {
    id: 3,
    slug: "smart-nfc-3-in-1-qr-code-standee",
    title: "Smart NFC 3-in-1 QR Code Standee with 3D Cut Acrylic Icons | Vertical Premium edition",
    tagline: "Streamline Google Reviews, Instagram, and EasyPaisa/JazzCash payments in one elegant vertical display.",
    category: "Multi-Link Stands",
    price: 3700,
    compareAtPrice: 4500,
    badge: "-18% OFF",
    rating: 4.9,
    reviewsCount: 35,
    stockCount: 11,
    images: [
      "/products/product-3.jpg",
      "/showcase.jpg",
      "/products/product-2.jpg",
      "/products/product-5.webp",
    ],
    description:
      "Vertical elegance meets cutting-edge retail convenience. The 3-in-1 Vertical Standee is tailored for counters with limited surface space, offering clear vertical hierarchy for Google Reviews, Instagram engagement, and cashless payment. High-gloss acrylic with vibrant 3D acrylic icons.",
    highlights: [
      "Vertical space-saving design ideal for POS counters and cash registers",
      "3 High-impact channels: Review + Social Media + Digital Payment",
      "Interactive NFC contactless sensor + triple QR matrix",
      "Vibrant 3D acrylic badges with scratch-resistant coating",
      "Fast 24-48h custom production in Pakistan",
    ],
    features: [
      {
        icon: "📐",
        title: "Space-Saving Footprint",
        description: "Optimized vertical layout occupies minimal counter space while remaining immediately noticeable to customers.",
      },
      {
        icon: "📲",
        title: "NFC + 3 Precision QRs",
        description: "Top NFC badge activates instant Google Review, while high-contrast QRs connect Instagram and Payment.",
      },
      {
        icon: "💎",
        title: "Sleek Vertical Acrylic Pillar",
        description: "Constructed with 4.5mm high-tensile cast acrylic for maximum durability in high-traffic commercial environments.",
      },
    ],
    variants: [
      {
        name: "Finish & Style",
        options: [
          { label: "Piano Black Gloss", value: "piano-black", colorCode: "#111111" },
          { label: "Frost White Satin", value: "frost-white", colorCode: "#ffffff" },
        ],
      },
      {
        name: "Counter Size",
        options: [
          { label: "Vertical Standard (17 × 10 cm)", value: "vertical-std", priceModifier: 0 },
          { label: "Vertical Grand (22 × 13 cm)", value: "vertical-grand", priceModifier: 350 },
        ],
      },
      {
        name: "Technology Configuration",
        options: [
          { label: "Smart NFC + 3 QRs (Recommended)", value: "nfc-3qr", priceModifier: 0 },
          { label: "3 QRs Only", value: "3qr-only", priceModifier: -300 },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "Solid Cast Acrylic (4.5mm thickness)" },
      { label: "Channels", value: "3 (Google Review, Instagram / Social, Payment QR)" },
      { label: "NFC Range", value: "3 cm Contactless NFC Response" },
      { label: "Dimensions", value: "17 cm (H) × 10 cm (W) × 5 cm (D)" },
      { label: "Warranty", value: "12 Months Chip Guarantee" },
    ],
    boxContents: [
      "1× Smart NFC 3-in-1 Vertical Standee",
      "1× Angled Acrylic Stable Base",
      "1× Setup Guide & QR Linking Documentation",
    ],
    faqs: [
      {
        question: "Can I choose which social media platform is featured?",
        answer: "Yes, you can choose Instagram, Facebook, TikTok, or YouTube alongside Google Reviews and Payment.",
      },
    ],
    reviews: [
      {
        id: "r6",
        author: "Bilal Farooq",
        businessName: "Farooq Opticals",
        city: "Faisalabad",
        rating: 5,
        date: "2 weeks ago",
        title: "Perfect fit for our small reception desk",
        comment:
          "Because of our tight counter space, the vertical stand was the best option. Looks very neat and payment QR works flawlessly.",
        verified: true,
      },
    ],
  },
  {
    id: 4,
    slug: "smart-nfc-qr-standee-3d-acrylic",
    title: "Smart NFC 2-in-1 Qr code Standee With 3D Cut Acrylic Icons",
    tagline: "Dual-action compact stand: Pair Google Review with Instagram or WhatsApp for fast front-desk engagement.",
    category: "Compact Stands",
    price: 3700,
    compareAtPrice: 4000,
    badge: "-8% OFF",
    rating: 4.8,
    reviewsCount: 29,
    stockCount: 14,
    images: [
      "/products/product-4.jpg",
      "/showcase.jpg",
      "/products/product-1.jpg",
      "/products/product-3.jpg",
    ],
    description:
      "Simplicity meets maximum conversion. The 2-in-1 Smart NFC Standee is crafted for businesses that want laser focus on their two most vital channels: generating Google reviews and growing their Instagram following or WhatsApp clientele. Features two prominent 3D cut icons and high-speed NFC integration.",
    highlights: [
      "Focused 2-Channel Design for maximum customer clarity",
      "Choice of Google Review + Instagram OR WhatsApp",
      "3D Cut Raised Acrylic Icons with gold or silver mirror accents",
      "Contactless NFC tap + High-Contrast QR scanning",
      "Compact footprint suited for bedside, reception, and billing tables",
    ],
    features: [
      {
        icon: "🎯",
        title: "High Customer Focus",
        description: "Fewer choices lead to higher conversion. Customers either leave a review or follow your social profile.",
      },
      {
        icon: "✨",
        title: "Mirror 3D Accents",
        description: "Eye-catching raised mirror acrylic accents capture indoor ambient lighting beautifully.",
      },
    ],
    variants: [
      {
        name: "Finish & Style",
        options: [
          { label: "Glossy Black Acrylic", value: "black", colorCode: "#111111" },
          { label: "Clean Gloss White", value: "white", colorCode: "#ffffff" },
        ],
      },
      {
        name: "Action Pair",
        options: [
          { label: "Google Review + Instagram (Most Popular)", value: "google-insta" },
          { label: "Google Review + WhatsApp", value: "google-whatsapp" },
          { label: "Google Review + Scan-to-Pay", value: "google-pay" },
        ],
      },
      {
        name: "Technology Configuration",
        options: [
          { label: "NFC + Dual QR Codes", value: "nfc-dual-qr", priceModifier: 0 },
          { label: "Dual QR Codes Only", value: "dual-qr-only", priceModifier: -250 },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "Heavyweight 4mm Cast Acrylic" },
      { label: "NFC Chip", value: "NTAG215 High Reliability Chip" },
      { label: "Dimensions", value: "14 cm (H) × 12 cm (W) × 5 cm (Base)" },
      { label: "Warranty", value: "1-Year Chip Warranty" },
    ],
    boxContents: [
      "1× 2-in-1 Smart NFC & QR Standee",
      "1× Weighted Acrylic Foot Base",
      "1× QR Verification Document",
    ],
    faqs: [
      {
        question: "Can I change the links later on?",
        answer: "We use dynamic link redirection so your QR codes can be easily updated in the future without reprinting the standee.",
      },
    ],
    reviews: [
      {
        id: "r7",
        author: "Noman Siddiqui",
        businessName: "Vintage Cuts Salon",
        city: "Karachi",
        rating: 5,
        date: "3 weeks ago",
        title: "Clean and straight to the point",
        comment: "Just Google and Instagram — exactly what we needed. Our clients scan it while waiting.",
        verified: true,
      },
    ],
  },
  {
    id: 5,
    slug: "premium-smart-nfc-3qr-table-top-standee-social-media-theme-edition",
    title: "Premium Smart NFC 3QR Table Top Standee | Social Media Theme Edition",
    tagline: "Explode your social presence: Instagram, TikTok, and Google Reviews crafted for restaurants and boutiques.",
    category: "Social Media Stands",
    price: 4000,
    compareAtPrice: 4500,
    badge: "-11% OFF",
    rating: 4.9,
    reviewsCount: 41,
    stockCount: 7,
    images: [
      "/products/product-5.webp",
      "/showcase.jpg",
      "/products/product-3.jpg",
      "/products/product-2.jpg",
    ],
    description:
      "Specially designed for cafes, restaurants, fashion outlets, and lifestyle brands. The Social Media Theme Edition focuses on turning diners and visitors into active content creators and followers. Features vibrant social media logos, 3 high-contrast QR codes, and smart NFC tap integration.",
    highlights: [
      "Tailored for Cafes, Restaurants, Boutiques, and Salons",
      "Vibrant official brand colors for Instagram, TikTok & Google",
      "Encourages social tagging, reviews, and UGC creation",
      "Waterproof, wipe-clean acrylic resistant to spills and condiments",
      "Includes non-slip silicone feet for slippery tabletops",
    ],
    features: [
      {
        icon: "📸",
        title: "Social Growth Engine",
        description: "Diners follow your Instagram and tag your restaurant in their stories while enjoying their food.",
      },
      {
        icon: "☕",
        title: "Table-Proof & Spill-Proof",
        description: "100% waterproof construction easily cleaned with disinfectant or wet wipe without damaging print.",
      },
    ],
    variants: [
      {
        name: "Base Finish",
        options: [
          { label: "Matte Black Tabletop Base", value: "matte-black", colorCode: "#111111" },
          { label: "Natural Wood Grain Acrylic Base", value: "wood-acrylic", colorCode: "#8b5a2b" },
        ],
      },
      {
        name: "Technology Configuration",
        options: [
          { label: "Full NFC + 3 QR Matrix", value: "nfc-3qr", priceModifier: 0 },
          { label: "3 QR Codes Only", value: "3qr-only", priceModifier: -300 },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "Grade-A Cast Acrylic with Silicone Grips" },
      { label: "Dimensions", value: "16 cm (H) × 11 cm (W) × 5.5 cm (D)" },
      { label: "Resistance", value: "Waterproof, Oil-resistant, Alcohol-wipe friendly" },
      { label: "Warranty", value: "12 Months Replacement" },
    ],
    boxContents: [
      "1× Social Media Theme Tabletop Standee",
      "1× Anti-Slip Silicone Foot Base",
      "1× QR Configuration Sheet",
    ],
    faqs: [
      {
        question: "Can I order 10 or 20 units for restaurant tables?",
        answer: "Yes! For bulk table orders we offer special tiered discounts and customized table numbering. Contact us on WhatsApp for bulk pricing.",
      },
    ],
    reviews: [
      {
        id: "r8",
        author: "Chef Umair",
        businessName: "Burger O'Clock",
        city: "Islamabad",
        rating: 5,
        date: "1 month ago",
        title: "Customers love posting stories",
        comment: "Placed one on each booth. Instagram followers grew by 450 in 3 weeks. Great quality.",
        verified: true,
      },
    ],
  },
  {
    id: 6,
    slug: "premium-dental-tooth-shaped-nfc-single-qr-standee-google-review-instagram",
    title: "Premium - Dental Tooth Shaped NFC Single QR Standee - Google Review | Instagram",
    tagline: "Custom laser-cut tooth silhouette designed exclusively for dental clinics, orthodontists, and oral healthcare.",
    category: "Specialty Industry Stands",
    price: 4000,
    compareAtPrice: 4300,
    badge: "-7% OFF",
    rating: 5.0,
    reviewsCount: 22,
    stockCount: 6,
    images: [
      "/products/product-6.webp",
      "/showcase.jpg",
      "/products/product-1.jpg",
      "/products/product-4.jpg",
    ],
    description:
      "A statement piece engineered specifically for dental professionals. Sculpted in the exact silhouette of a pristine tooth, this custom standee creates an unforgettable impression in patient waiting rooms and consultation desks. Combines high-speed NFC review tap with dental clinic branding.",
    highlights: [
      "Custom Laser-Contoured Tooth Silhouette Shape",
      "Designed specifically for Dentists, Orthodontists, and Dental Clinics",
      "Pristine medical-grade high-gloss white acrylic with blue accents",
      "1-Tap Google Review collection right after patient appointments",
      "Reassures patients with high-tech, modern clinic aesthetics",
    ],
    features: [
      {
        icon: "🦷",
        title: "Distinctive Dental Silhouette",
        description: "Instantly recognizable shape that reinforces your clinic's specialized professional identity.",
      },
      {
        icon: "🩺",
        title: "Clinic & Sanitizer Friendly",
        description: "Seamless non-porous acrylic compatible with medical-grade surface sanitizers.",
      },
    ],
    variants: [
      {
        name: "Silhouette Finish",
        options: [
          { label: "Pristine Gloss Dental White with Blue Accents", value: "white-blue", colorCode: "#ffffff" },
          { label: "Frosted Translucent White", value: "frosted-translucent", colorCode: "#e8f4f8" },
        ],
      },
      {
        name: "Primary Function",
        options: [
          { label: "Google Review Stand (NFC + QR)", value: "google-review" },
          { label: "Instagram Follower Stand (NFC + QR)", value: "instagram" },
          { label: "Dual Review & Social", value: "dual-action", priceModifier: 300 },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "Medical-Grade High-Gloss Acrylic (5mm thickness)" },
      { label: "Shape", value: "Precision Laser Contoured Molar Tooth Silhouette" },
      { label: "Dimensions", value: "16.5 cm (H) × 12 cm (W) × 5 cm (Base depth)" },
      { label: "Sanitization", value: "Resistant to isopropyl alcohol and clinic disinfectants" },
      { label: "Warranty", value: "1-Year Chip & Material Warranty" },
    ],
    boxContents: [
      "1× Tooth-Shaped Custom Dental Standee",
      "1× Weighted Stability Base",
      "1× Setup & QR Guide",
    ],
    faqs: [
      {
        question: "Can our clinic logo and doctor's name be printed on it?",
        answer: "Yes! We print your clinic name, logo, and custom doctor title at no extra charge.",
      },
    ],
    reviews: [
      {
        id: "r9",
        author: "Dr. Kamran Qureshi",
        businessName: "Pearl Dental Associates",
        city: "Lahore",
        rating: 5,
        date: "2 weeks ago",
        title: "Patients adore the tooth design!",
        comment:
          "The shape is brilliant. Patients smile when they see it at the reception and tap happily on their way out. We gained 38 new 5-star Google reviews in 2 weeks.",
        verified: true,
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getRelatedProducts(currentSlug: string, count: number = 3): Product[] {
  return PRODUCTS.filter((p) => p.slug !== currentSlug).slice(0, count);
}
