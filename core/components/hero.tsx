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
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import { gsap } from "gsap";

// ─── Slide Data ────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    image: "/slides/slide-1.jpg",
    badge: "NIGERIA'S INDIGENOUS ENERGY PIONEER",
    headingWhite: "Powering\nProgress\nThrough",
    headingGreen: "Exploration",
    body: "At NEPN, we discover and harness energy responsibly to fuel economies and empower communities across Nigeria, driven by excellence, sustainability, and lasting impact.",
  },
  {
    id: 2,
    image: "/slides/slide-2.jpg",
    badge: "SUSTAINABLE ENERGY FOR TOMORROW",
    headingWhite: "Building\nA Greener\nFuture",
    headingGreen: "Together",
    body: "We are committed to responsible resource management, reducing our environmental footprint while maximising value for communities and stakeholders across the Niger Delta.",
  },
  {
    id: 3,
    image: "/slides/slide-3.jpg",
    badge: "COMMUNITY. INNOVATION. EXCELLENCE.",
    headingWhite: "Driving\nNational\nGrowth",
    headingGreen: "Through Oil & Gas",
    body: "With world-class expertise and a deep local knowledge, NEPN continues to set the standard for indigenous energy exploration and production in Nigeria.",
  },
];

// ─── Stats Data ────────────────────────────────────────────────────────────────
const STATS = [
  { value: 20, suffix: "+", label: "YEARS OF EXCELLENCE" },
  { value: 12, suffix: " +", label: "ACTIVE PROJECTS" },
  { value: 150, suffix: "+", label: "DEDICATED EMPLOYEES" },
];

const AUTO_PLAY_INTERVAL = 6000;

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  const slideRefs = useRef([]);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const btnsRef = useRef(null);
  const statsRef = useRef(null);
  const timerRef = useRef(null);
  const tl = useRef(null);

  // ── Animate content in ──────────────────────────────────────────────────────
  const animateContentIn = useCallback((instant = false) => {
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

    if (instant) {
      tl.current
        .to(targets[0], { opacity: 1, y: 0, duration: 0.01 })
        .to(targets[1], { opacity: 1, y: 0, duration: 0.01 }, "-=0.005")
        .to(targets[2], { opacity: 1, y: 0, duration: 0.01 }, "-=0.005")
        .to(targets[3], { opacity: 1, y: 0, duration: 0.01 }, "-=0.005");
    } else {
      tl.current
        .to(targets[0], { opacity: 1, y: 0, duration: 0.55, delay: 0.15 })
        .to(targets[1], { opacity: 1, y: 0, duration: 0.7 }, "-=0.35")
        .to(targets[2], { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(targets[3], { opacity: 1, y: 0, duration: 0.5 }, "-=0.35");
    }
  }, []);

  // ── Animate slide transition ─────────────────────────────────────────────────
  const goTo = useCallback(
    (index) => {
      if (animating || index === current) return;
      setAnimating(true);

      const prevSlide = slideRefs.current[current];
      const nextSlide = slideRefs.current[index];

      // Content exit
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
        },
      );

      // Slide crossfade
      gsap.set(nextSlide, { opacity: 0, zIndex: 2 });
      gsap.set(prevSlide, { zIndex: 1 });

      gsap.to(nextSlide, {
        opacity: 1,
        duration: 1.1,
        ease: "power2.inOut",
        delay: 0.2,
        onComplete: () => {
          gsap.set(prevSlide, { opacity: 0, zIndex: 0 });
          gsap.set(nextSlide, { zIndex: 1 });
          setCurrent(index);
        },
      });

      // Ken Burns on new slide image
      const img = nextSlide.querySelector("img, [data-img]");
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.08 },
          { scale: 1, duration: 7, ease: "power1.out" },
        );
      }
    },
    [animating, current],
  );

  // ── Content re-animate when current changes ──────────────────────────────────
  useEffect(() => {
    animateContentIn();
  }, [current, animateContentIn]);

  // ── Initial mount animations ─────────────────────────────────────────────────
  useEffect(() => {
    // Stats panel slide in
    gsap.fromTo(
      statsRef.current,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.8,
        onComplete: () => setStatsVisible(true),
      },
    );

    // Ken Burns on first slide
    const firstImg = slideRefs.current[0]?.querySelector("img, [data-img]");
    if (firstImg) {
      gsap.fromTo(
        firstImg,
        { scale: 1.08 },
        { scale: 1, duration: 7, ease: "power1.out" },
      );
    }

    // Set all slides to proper initial z-index
    slideRefs.current.forEach((el, i) => {
      if (el)
        gsap.set(el, { opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 });
    });
  }, []);

  // ── Autoplay ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % SLIDES.length;
        goTo(next);
        return prev; // actual update happens inside goTo → setCurrent
      });
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [goTo]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % SLIDES.length;
        goTo(next);
        return prev;
      });
    }, AUTO_PLAY_INTERVAL);
  }, [goTo]);

  const handleDotClick = (i) => {
    goTo(i);
    resetTimer();
  };

  const slide = SLIDES[current];

  return (
    <section className="relative w-full h-[92vh] min-h-[560px] max-h-[900px] overflow-hidden bg-black">
      {/* ── Slide Stack ───────────────────────────────────────────────────────── */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          ref={(el) => (slideRefs.current[i] = el)}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            data-img
          >
            <Image
              src={s.image}
              alt={s.badge}
              fill
              priority={i === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          {/* Green tint overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(0,60,30,0.82) 0%, rgba(0,90,45,0.65) 38%, rgba(0,60,30,0.35) 65%, rgba(0,0,0,0.15) 100%)",
            }}
          />
        </div>
      ))}

      {/* ── Main content grid ─────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full h-full flex">
        {/* LEFT: Hero text (takes ~78% width) */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 pb-16 pt-8">
          {/* Badge */}
          <div ref={badgeRef} className="flex items-center gap-2.5 mb-6">
            <span className="block w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
            <div
              className="h-[1.5px] flex-1 max-w-[340px] rounded-full"
              style={{ background: "rgba(255,255,255,0.18)" }}
            />
            <span
              className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase"
              style={{
                color: "rgba(255,255,255,0.85)",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              {slide.badge}
            </span>
          </div>

          {/* Heading */}
          <div ref={headingRef} className="mb-5">
            <h1
              className="font-black leading-[0.92] tracking-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {slide.headingWhite.split("\n").map((line, i) => (
                <span
                  key={i}
                  className="block text-white"
                  style={{ fontSize: "clamp(52px, 7.5vw, 108px)" }}
                >
                  {line}
                </span>
              ))}
              <span
                className="block"
                style={{
                  fontSize: "clamp(52px, 7.5vw, 108px)",
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
            className="max-w-[520px] text-[14px] sm:text-[15.5px] leading-relaxed mb-8"
            style={{
              color: "rgba(255,255,255,0.82)",
              fontWeight: 400,
            }}
          >
            {slide.body}
          </p>

          {/* Buttons */}
          <div ref={btnsRef} className="flex flex-wrap items-center gap-4">
            <button
              className="group inline-flex items-center gap-3 px-6 py-3.5 text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase text-white transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
              style={{
                background: "#CC1F1F",
                // fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              DISCOVER NEPN
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>

            <button
              className="inline-flex items-center gap-2 px-6 py-3.5 text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase text-white border border-white/60 transition-all duration-200 hover:bg-white/10 active:scale-[0.97]"
              style={
                {
                  //  fontFamily: "'Barlow Condensed', sans-serif"
                }
              }
            >
              OUR OPERATIONS
            </button>
          </div>

          {/* Dots */}
          <div className="absolute bottom-8 left-8 sm:left-12 lg:left-16 xl:left-20 flex items-center gap-3">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative flex items-center justify-center"
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

        {/* RIGHT: Stats panel */}
        <div
          ref={statsRef}
          className="hidden lg:flex flex-col justify-center gap-0 w-[240px] xl:w-[280px] flex-shrink-0"
          style={{
            background: "rgba(40,40,40,0.72)",
            backdropFilter: "blur(12px)",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col justify-center px-10 xl:px-12"
              style={{
                height: "33.333%",
                borderBottom:
                  i < STATS.length - 1
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "none",
              }}
            >
              <div
                className="flex items-start leading-none mb-2"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <span
                  className="font-black text-white"
                  style={{ fontSize: "clamp(42px, 4vw, 68px)", lineHeight: 1 }}
                >
                  {statsVisible ? (
                    <NumberFlow
                      value={stat.value}
                      format={{ notation: "standard" }}
                      transformTiming={{ duration: 1200, easing: "ease-out" }}
                    />
                  ) : (
                    0
                  )}
                </span>
                <span
                  className="font-bold text-white mt-1 ml-0.5"
                  style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
                >
                  {stat.suffix}
                </span>
              </div>
              <p
                className="text-[10px] font-bold tracking-[0.2em] uppercase"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile stats bar */}
      <div
        className="lg:hidden absolute bottom-0 left-0 right-0 z-20 flex"
        style={{
          background: "rgba(30,30,30,0.85)",
          backdropFilter: "blur(10px)",
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center justify-center py-4"
            style={{
              borderRight:
                i < STATS.length - 1
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "none",
            }}
          >
            <div
              className="flex items-start leading-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              <span className="text-white font-black text-3xl leading-none">
                {statsVisible ? (
                  <NumberFlow
                    value={stat.value}
                    format={{ notation: "standard" }}
                    transformTiming={{ duration: 1200, easing: "ease-out" }}
                  />
                ) : (
                  0
                )}
              </span>
              <span className="text-white font-bold text-lg mt-0.5">
                {stat.suffix}
              </span>
            </div>
            <p
              className="text-[8.5px] font-bold tracking-[0.16em] uppercase mt-0.5"
              style={{
                color: "rgba(255,255,255,0.45)",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Google Fonts — Barlow */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@400;600;700;800;900&display=swap');
      `}</style>
    </section>
  );
}
