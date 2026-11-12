"use client";

/**
 * Dependencies to install:
 *   npm install gsap @number-flow/react
 *
 * Usage:
 *   import HeroCarousel from "@/core/components/hero";
 *   <HeroCarousel />
 */

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";

// ─── Background Assets ────────────────────────────────────────────────────────
const BACKGROUNDS = [
  {
    type: "video",
    src: "https://bepikg4pccoyqcez.public.blob.vercel-storage.com/3%20-%20Trim.mp4",
  },
  {
    type: "video",
    src: "https://bepikg4pccoyqcez.public.blob.vercel-storage.com/4.1%20Video%20Project%201.mp4",
  },
  {
    type: "image",
    src: "/images/hero_image.jpg",
  },
];

// ─── Slide Data (TEXT ONLY NOW) ───────────────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    badge: "Powering Progress Through Exploration",
    headingWhite: "Powering\nProgress\nThrough",
    headingGreen: "Exploration",
    body: "At NEPN, we discover and harness energy responsibly to fuel economies and empower communities across Nigeria, driven by excellence, sustainability, and lasting impact.",
  },
  {
    id: 2,
    badge: "Transforming Resources Into Opportunities",
    headingWhite: "Building\nA Greener\nFuture",
    headingGreen: "Together",
    body: "We are committed to responsible resource management, reducing our environmental footprint while maximising value for communities and stakeholders across the Niger Delta.",
  },
  {
    id: 3,
    badge: "Exploring Energy Exploring Progress",
    headingWhite: "Driving\nNational\nGrowth",
    headingGreen: "Through Oil & Gas",
    body: "With world-class expertise and a deep local knowledge, NEPN continues to set the standard for indigenous energy exploration and production in Nigeria.",
  },
];

// ─── Stats Data ────────────────────────────────────────────────────────────────

const AUTO_PLAY_INTERVAL = 6000;

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const btnsRef = useRef(null);
  const timerRef = useRef(null);
  const tl = useRef(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // ── Animate content in ──────────────────────────────────────────────────────
  const animateContentIn = useCallback(() => {
    if (tl.current) tl.current.kill();

    const targets = [
      badgeRef.current,
      headingRef.current,
      bodyRef.current,
      btnsRef.current,
    ];

    gsap.set(targets, { opacity: 0, y: 40 });

    tl.current = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => setAnimating(false),
    });

    tl.current
      .to(targets[0], { opacity: 1, y: 0, duration: 0.55, delay: 0.15 })
      .to(targets[1], { opacity: 1, y: 0, duration: 0.7 }, "-=0.35")
      .to(targets[2], { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .to(targets[3], { opacity: 1, y: 0, duration: 0.5 }, "-=0.35");
  }, []);

  // ── Slide transition (TEXT ONLY) ────────────────────────────────────────────
  const goTo = useCallback(
    (index) => {
      if (animating || index === current) return;
      setAnimating(true);

      gsap.to(
        [
          badgeRef.current,
          headingRef.current,
          bodyRef.current,
          btnsRef.current,
        ],
        {
          opacity: 0,
          y: -30,
          duration: 0.35,
          ease: "power2.in",
          stagger: 0.05,
          onComplete: () => {
            setCurrent(index);
          },
        },
      );
    },
    [animating, current],
  );

  useEffect(() => {
    animateContentIn();
  }, [current, animateContentIn]);

  // ── Play/Pause background videos ──────────────────────────────────────────
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === current) {
        video.play().catch((err) => {
          console.warn("Video autoplay failed or interrupted:", err);
        });
      } else {
        video.pause();
      }
    });
  }, [current]);

  // ── Autoplay ────────────────────────────────────────────────────────────────
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timerRef.current);
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section className="relative w-full h-dvh min-h-[600px] overflow-hidden bg-black">
      {/* ── Background Media Slideshow ─────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {BACKGROUNDS.map((bg, index) => {
          if (bg.type === "video") {
            return (
              <video
                key={index}
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={bg.src}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out"
                style={{
                  opacity: current === index ? 1 : 0,
                  zIndex: current === index ? 2 : 1,
                  pointerEvents: "none",
                }}
              />
            );
          } else {
            return (
              <img
                key={index}
                src={bg.src}
                alt="Background slide"
                className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out"
                style={{
                  opacity: current === index ? 1 : 0,
                  zIndex: current === index ? 2 : 1,
                  pointerEvents: "none",
                }}
              />
            );
          }
        })}
      </div>

      {/* Dark gradient + Green tint overlay for enhanced readability & text contrast */}
      <div
        className="absolute inset-0 z-5 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.22) 45%, rgba(0, 0, 0, 0) 80%), linear-gradient(105deg, rgba(0, 50, 25, 0.35) 0%, rgba(0, 75, 35, 0.2) 38%, rgba(0, 50, 25, 0.08) 65%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      {/* ── Main content grid ───────────────────────────────────────────── */}
      <div className="relative z-10 w-full h-full flex">
        {/* LEFT CONTENT */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 pt-[88px] sm:pt-[96px] lg:pt-[104px] pb-16 sm:pb-20">
          {/* Badge */}
          <div ref={badgeRef} className="flex items-center gap-3 mb-4 sm:mb-5">
            <span className="block w-6 h-[2.5px] rounded-full bg-[#CC1F1F] shrink-0" />
            <span
              className="text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-white/90"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {slide.badge}
            </span>
            <div
              className="h-[1.5px] w-12 sm:w-20 hidden sm:block"
              style={{ background: "rgba(255,255,255,0.2)" }}
            />
          </div>

          {/* Heading */}
          <div ref={headingRef} className="mb-4 sm:mb-5">
            <h1
              className="font-black leading-[0.94] tracking-tight"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {slide.headingWhite.split("\n").map((line, i) => (
                <span
                  key={i}
                  className="block text-white"
                  style={{ fontSize: "clamp(32px, 5.2vw, 82px)" }}
                >
                  {line}
                </span>
              ))}
              <span
                className="block"
                style={{
                  fontSize: "clamp(32px, 5.2vw, 82px)",
                  color: "#22c55e",
                }}
              >
                {slide.headingGreen}
              </span>
            </h1>
          </div>

          {/* Body */}
          <p
            ref={bodyRef}
            className="max-w-[540px] text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-8 text-white/80"
          >
            {slide.body}
          </p>

          {/* Buttons */}
          <div ref={btnsRef} className="flex flex-wrap gap-3.5 sm:gap-4">
            <Link
              href="/about"
              className="px-6 py-3.5 text-xs font-bold tracking-[0.18em] uppercase text-white bg-[#CC1F1F] hover:bg-[#a01818] transition-colors duration-200 text-center inline-block"
            >
              DISCOVER NEPN
            </Link>

            <Link
              href="/operations"
              className="px-6 py-3.5 text-xs font-bold tracking-[0.18em] uppercase text-white border border-white/60 hover:border-white hover:bg-white/10 transition-colors duration-200 text-center inline-block"
            >
              OUR OPERATIONS
            </Link>
          </div>

          {/* Dots */}
          <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-8 sm:left-12 lg:left-16 xl:left-20 flex gap-3 z-20">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="cursor-pointer py-1"
              >
                <span
                  className="block rounded-full transition-all duration-500"
                  style={{
                    width: i === current ? "28px" : "8px",
                    height: "8px",
                    background:
                      i === current ? "#ffffff" : "rgba(255,255,255,0.4)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
