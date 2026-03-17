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
import NumberFlow from "@number-flow/react";
import { gsap } from "gsap";

// ─── Background Video ─────────────────────────────────────────────────────────
const HERO_VIDEO = "/slides/hero-video.mov";

// ─── Slide Data (TEXT ONLY NOW) ───────────────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    badge: "NIGERIA'S INDIGENOUS ENERGY PIONEER",
    headingWhite: "Powering\nProgress\nThrough",
    headingGreen: "Exploration",
    body: "At NEPN, we discover and harness energy responsibly to fuel economies and empower communities across Nigeria, driven by excellence, sustainability, and lasting impact.",
  },
  {
    id: 2,
    badge: "SUSTAINABLE ENERGY FOR TOMORROW",
    headingWhite: "Building\nA Greener\nFuture",
    headingGreen: "Together",
    body: "We are committed to responsible resource management, reducing our environmental footprint while maximising value for communities and stakeholders across the Niger Delta.",
  },
  {
    id: 3,
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
  const [animatedStats, setAnimatedStats] = useState(STATS.map(() => 0));

  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const btnsRef = useRef(null);
  const statsRef = useRef(null);
  const timerRef = useRef(null);
  const tl = useRef(null);

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

  // ── Initial mount animations ────────────────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(
      statsRef.current,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.8,
        onComplete: () => {
          setStatsVisible(true);
          setAnimatedStats(STATS.map((s) => s.value));
        },
      },
    );
  }, []);

  // ── Autoplay ────────────────────────────────────────────────────────────────
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timerRef.current);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="relative w-full h-[92vh] min-h-[560px] max-h-[900px] overflow-hidden bg-black">
      {/* ── Background Video ───────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
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

      {/* ── Main content grid ───────────────────────────────────────────── */}
      <div className="relative z-10 w-full h-full flex">
        {/* LEFT CONTENT */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 pb-16 pt-8">
          {/* Badge */}
          <div ref={badgeRef} className="flex items-center gap-2.5 mb-6">
            <span className="block w-2.5 h-2.5 rounded-full bg-red-500" />
            <div
              className="h-[1.5px] flex-1 max-w-[340px]"
              style={{ background: "rgba(255,255,255,0.18)" }}
            />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/85">
              {slide.badge}
            </span>
          </div>

          {/* Heading */}
          <div ref={headingRef} className="mb-5">
            <h1 className="font-black leading-[0.92] tracking-tight">
              {slide.headingWhite.split("\n").map((line, i) => (
                <span
                  key={i}
                  className="block text-white"
                  style={{ fontSize: "clamp(52px,7.5vw,108px)" }}
                >
                  {line}
                </span>
              ))}
              <span
                className="block"
                style={{
                  fontSize: "clamp(52px,7.5vw,108px)",
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
            className="max-w-[520px] text-[15px] leading-relaxed mb-8 text-white/80"
          >
            {slide.body}
          </p>

          {/* Buttons */}
          <div ref={btnsRef} className="flex gap-4">
            <button className="px-6 py-3.5 text-xs font-bold tracking-[0.18em] uppercase text-white bg-[#CC1F1F]">
              DISCOVER NEPN
            </button>

            <button className="px-6 py-3.5 text-xs font-bold tracking-[0.18em] uppercase text-white border border-white/60">
              OUR OPERATIONS
            </button>
          </div>

          {/* Dots */}
          <div className="absolute bottom-8 left-8 flex gap-3">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}>
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

        {/* RIGHT STATS */}
        <div
          ref={statsRef}
          className="hidden lg:flex flex-col justify-center w-[240px]"
          style={{
            background: "rgba(40,40,40,0.72)",
            backdropFilter: "blur(8px)",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col justify-center px-10"
              style={{
                height: "33.333%",
                borderBottom:
                  i < STATS.length - 1
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "none",
              }}
            >
              <div className="flex items-start leading-none mb-2">
                <span className="font-black text-white text-5xl">
                  {statsVisible ? <NumberFlow value={animatedStats[i]} /> : 0}
                </span>
                <span className="text-white font-bold ml-1">{stat.suffix}</span>
              </div>

              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
