"use client";

/**
 * Testimonials.jsx
 *
 * Dependencies:
 *   npm install gsap
 *
 * Usage:
 *   import Testimonials from "@/components/Testimonials";
 *   <Testimonials />
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "NEPN operates with a strong sense of responsibility and financial discipline. Clear, structured, and dependable — a benchmark for indigenous operators.",
    name: "Soname Gbemiga",
    role: "Senior Accountant",
    initials: "SG",
    avatarBg: "#006633",
    roleColor: "#006633",
  },
  {
    id: 2,
    quote:
      "Working with NEPN has shown a consistent commitment to accountability and operational excellence. They embody what Nigerian energy leadership should look like.",
    name: "Ewere Uzah",
    role: "AGMO, Field Operations",
    initials: "EU",
    avatarBg: "#CC1F1F",
    roleColor: "#CC1F1F",
  },
  {
    id: 3,
    quote:
      "NEPN isn't just a partner — they are a value-driven ally committed to community development and the highest environmental standards.",
    name: "Adebayo Okonkwo",
    role: "Community Liaison Officer",
    initials: "AO",
    avatarBg: "#1a1aee",
    roleColor: "#1a1aee",
  },
  {
    id: 4,
    quote:
      "Our partnership with NEPN has been built on mutual respect, transparency, and shared ambition for Nigeria's energy future. A truly professional organization.",
    name: "Chidi Festus",
    role: "Strategic Partner Representative",
    initials: "CF",
    avatarBg: "#006633",
    roleColor: "#006633",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);
  const quoteIconRefs = useRef([]);
  const avatarRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 80%", once: true };

      // Eyebrow
      gsap.fromTo(
        eyebrowRef.current,
        { y: -16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: st,
        },
      );

      // Heading
      gsap.fromTo(
        headingRef.current,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: st,
        },
      );

      // Cards: stagger in 2×2 grid pattern
      // Top row (0,1) → bottom row (2,3)
      const topRow = [cardRefs.current[0], cardRefs.current[1]];
      const botRow = [cardRefs.current[2], cardRefs.current[3]];

      gsap.fromTo(
        topRow,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.13,
          delay: 0.22,
          scrollTrigger: st,
        },
      );

      gsap.fromTo(
        botRow,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.13,
          delay: 0.42,
          scrollTrigger: st,
        },
      );

      // Quote icons drift in from top-right
      gsap.fromTo(
        quoteIconRefs.current,
        { x: 12, y: -12, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.5,
          scrollTrigger: st,
        },
      );

      // Avatar pop
      gsap.fromTo(
        avatarRefs.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.8)",
          stagger: 0.1,
          delay: 0.55,
          scrollTrigger: st,
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hover: card lift + quote icon accent
  const handleEnter = (i) => {
    gsap.to(cardRefs.current[i], {
      y: -5,
      boxShadow: "0 18px 44px rgba(0,0,0,0.09)",
      borderColor: "rgba(0,102,51,0.25)",
      duration: 0.28,
      ease: "power2.out",
    });
    gsap.to(quoteIconRefs.current[i], {
      color: "#006633",
      opacity: 0.35,
      duration: 0.25,
    });
  };

  const handleLeave = (i) => {
    gsap.to(cardRefs.current[i], {
      y: 0,
      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      borderColor: "rgba(0,0,0,0.09)",
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(quoteIconRefs.current[i], {
      color: "#d1d5db",
      opacity: 1,
      duration: 0.25,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-16 lg:py-24"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 xl:px-10">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="flex items-center gap-3 mb-4">
            <span className="block w-6 h-[2.5px] bg-red-600 rounded-full" />
            <span
              className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-gray-500"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              TESTIMONIALS
            </span>
          </div>

          {/* Heading */}
          <h2
            ref={headingRef}
            className="font-black leading-tight"
            style={{
              fontSize: "clamp(28px, 4vw, 54px)",
              fontFamily: "'Barlow Condensed', sans-serif",
              color: "#111",
            }}
          >
            What Our People &amp;{" "}
            <span style={{ color: "#006633" }}>Partners Say</span>
          </h2>
        </div>

        {/* ── 2×2 Grid ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              ref={(el) => (cardRefs.current[i] = el) as any}
              className="relative flex flex-col justify-between p-8 lg:p-9 border rounded-sm cursor-pointer"
              style={{
                borderColor: "rgba(0,0,0,0.09)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                background: "#fff",
              }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
            >
              {/* Quote icon — top right */}
              <div
                ref={(el) => (quoteIconRefs.current[i] = el) as any}
                className="absolute top-6 right-7 select-none pointer-events-none"
                style={{
                  color: "#d1d5db",
                  fontSize: "42px",
                  lineHeight: 1,
                  fontFamily: "Georgia, serif",
                  fontWeight: 700,
                }}
                aria-hidden
              >
                &#8220;
              </div>

              {/* Quote text */}
              <p
                className="text-[15px] leading-[1.75] mb-8"
                style={{ color: "#333", fontWeight: 400, paddingRight: "32px" }}
              >
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3.5">
                {/* Avatar circle */}
                <div
                  ref={(el) => (avatarRefs.current[i] = el) as any}
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-[12px] font-bold select-none"
                  style={{
                    background: t.avatarBg,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: "0.04em",
                  }}
                >
                  {t.initials}
                </div>

                <div className="flex flex-col leading-tight">
                  <span
                    className="text-[14px] font-bold text-gray-900"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {t.name}
                  </span>
                  <span
                    className="text-[12.5px] font-medium mt-0.5"
                    style={{
                      color: t.roleColor,
                      fontFamily: "'Barlow', sans-serif",
                    }}
                  >
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800;900&display=swap');
      `}</style>
    </section>
  );
}
