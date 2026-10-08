"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  id: number;
  title: string;
  desktopSrc: string;
  mobileSrc: string;
  link: string;
  desktopWidth: number;
  desktopHeight: number;
  mobileWidth: number;
  mobileHeight: number;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "Boost Your Business with Pakistan's Smart QR Stand",
    desktopSrc: "/hero-banner-1-desktop.webp",
    mobileSrc: "/hero-banner-1-mobile.webp",
    link: "/collections/all",
    desktopWidth: 1800,
    desktopHeight: 600,
    mobileWidth: 750,
    mobileHeight: 1100,
  },
  {
    id: 2,
    title: "Pakistan's #1 NFC and QR Code Stands",
    desktopSrc: "/hero-banner-2-desktop.png",
    mobileSrc: "/hero-banner-2-mobile.png",
    link: "/collections/all-products",
    desktopWidth: 2200,
    desktopHeight: 732,
    mobileWidth: 750,
    mobileHeight: 1100,
  },
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      // Swiped left
      nextSlide();
    } else if (diff < -50) {
      // Swiped right
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="t4s-hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Promotional Banners"
    >
      <div className="t4s-slideshow-container">
        <div className="t4s-slide-frame">
          {SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`t4s-slide-item ${isActive ? "is-active" : ""}`}
                aria-hidden={!isActive}
              >
                <Link
                  href={slide.link}
                  style={{ display: "block", width: "100%", height: "100%" }}
                  tabIndex={isActive ? 0 : -1}
                >
                  {/* Desktop Banner Image */}
                  <Image
                    src={slide.desktopSrc}
                    alt={slide.title}
                    width={slide.desktopWidth}
                    height={slide.desktopHeight}
                    priority={index === 0}
                    className="t4s-slide-img-desktop"
                    sizes="100vw"
                  />

                  {/* Mobile Banner Image */}
                  <Image
                    src={slide.mobileSrc}
                    alt={slide.title}
                    width={slide.mobileWidth}
                    height={slide.mobileHeight}
                    priority={index === 0}
                    className="t4s-slide-img-mobile"
                    sizes="100vw"
                  />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Previous Button */}
        <button
          className="t4s-slider-arrow t4s-arrow-prev"
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          className="t4s-slider-arrow t4s-arrow-next"
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Pagination Dots */}
        <div className="t4s-dots-container" role="tablist" aria-label="Slideshow pagination">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              className={`t4s-dot ${index === currentSlide ? "is-active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
