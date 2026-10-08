import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSlideshow from "@/components/HeroSlideshow";
import TrustBar from "@/components/TrustBar";
import NewArrivals from "@/components/NewArrivals";
import ExploreCollections from "@/components/ExploreCollections";
import FeatureShowcase from "@/components/FeatureShowcase";
import BrandLogos from "@/components/BrandLogos";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Header (Sticky Navigation) */}
      <Header />

      {/* 3. Main Page Flow */}
      <main id="MainContent" style={{ flex: 1 }}>
        {/* Hero Slideshow Banner */}
        <HeroSlideshow />

        {/* 4 Brand Highlights Bar */}
        <TrustBar />

        {/* Featured Products / New Arrivals */}
        <NewArrivals />

        {/* Explore Our Collections */}
        <ExploreCollections />

        {/* Feature Showcase: More Reviews, More Followers */}
        <FeatureShowcase />

        {/* Client Logos: Brands That Believe in Us */}
        <BrandLogos />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* 4. Complete Footer & Bottom Bar */}
      <Footer />
    </div>
  );
}
