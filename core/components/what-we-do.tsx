"use client";

/**
 * Dependencies:
 *   npm install gsap
 *
 * Usage:
 *   import WhatWeDo from "@/core/components/what-we-do";
 *   <WhatWeDo />
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    number: "01",
    numberColor: "rgba(0,102,51,0.13)",
    accent: "#006633",
    title: "Exploration & Development",
    body: "Advanced seismic analysis and geological mapping across OML 13, discovering viable hydrocarbon reserves in the Qua Iboe field, Akwa Ibom State.",
    linkColor: "#006633",
  },
  {
    number: "02",
    numberColor: "rgba(204,31,31,0.12)",
    accent: "#CC1F1F",
    title: "Production Operations",
    body: "Safe, efficient hydrocarbon production from established wells with continuous optimization programmes that sustain and grow our output year-on-year.",
    linkColor: "#CC1F1F",
  },
  {
    number: "03",
    numberColor: "rgba(80,80,180,0.13)",
    accent: "#4a4ab8",
    title: "Sustainable Energy",
    body: "Pioneering Nigeria's energy transition through responsible flaring reduction, net zero commitments, and community-centred environmental stewardship.",
    linkColor: "#1a3fa8",
  },
];

export default function WhatWeDo() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const cardRefs = useRef([]);
  const accentRefs = useRef([]);
  const numberRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 78%", once: true };

      // Eyebrow + heading slide up
      gsap.fromTo(
        [eyebrowRef.current, headingRef.current, ctaBtnRef.current],
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: st,
        },
      );

      // Cards rise up with stagger
      gsap.fromTo(
        cardRefs.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.2,
          scrollTrigger: st,
        },
      );

      // Large ghost numbers count up opacity
      gsap.fromTo(
        numberRefs.current,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.15,
          delay: 0.4,
          scrollTrigger: st,
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Card hover: accent top border ────────────────────────────────────────────
  const handleEnter = (i) => {
    gsap.to(accentRefs.current[i], {
      scaleX: 1,
      duration: 0.38,
      ease: "power3.out",
    });
    gsap.to(cardRefs.current[i], {
      y: -4,
      boxShadow: "0 12px 36px rgba(0,0,0,0.10)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = (i) => {
    gsap.to(accentRefs.current[i], {
      scaleX: 0,
      duration: 0.32,
      ease: "power2.inOut",
    });
    gsap.to(cardRefs.current[i], {
      y: 0,
      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 lg:py-24"
      //   style={{ background: "#f0ede6", fontFamily: "'Barlow', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 xl:px-10">
        {/* ── Header row ──────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div>
            {/* Eyebrow */}
            <div ref={eyebrowRef} className="flex items-center gap-3 mb-4">
              <span className="block w-6 h-[2.5px] bg-red-600 rounded-full flex-shrink-0" />
              <span
                className="text-[11px] font-bold tracking-[0.22em] uppercase text-gray-500"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                OUR BUSINESS AREAS
              </span>
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="font-black leading-tight"
              style={{
                fontSize: "clamp(34px, 4vw, 56px)",
                fontFamily: "'Barlow Condensed', sans-serif",
                color: "#111",
              }}
            >
              What We <span style={{ color: "#006633" }}>Do</span>
            </h2>
          </div>

          {/* ALL OPERATIONS button */}
          <div ref={ctaBtnRef}>
            <button
              className="group inline-flex items-center gap-3 px-7 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase border-2 transition-all duration-200 hover:bg-[#006633] hover:text-white"
              style={{
                borderColor: "#006633",
                color: "#006633",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              ALL OPERATIONS
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
          </div>
        </div>

        {/* ── Cards grid ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200 bg-white divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {CARDS.map((card, i) => (
            <div
              key={card.number}
              ref={(el) => (cardRefs.current[i] = el)}
              className="relative flex flex-col px-8 pt-10 pb-10 cursor-pointer overflow-hidden"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
            >
              {/* Accent top border — animated */}
              <div
                ref={(el) => (accentRefs.current[i] = el)}
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{
                  background: card.accent,
                  transformOrigin: "left center",
                  transform: "scaleX(0)",
                }}
              />

              {/* Ghost number */}
              <div
                ref={(el) => (numberRefs.current[i] = el)}
                className="mb-10 select-none leading-none font-black"
                style={{
                  fontSize: "clamp(72px, 8vw, 110px)",
                  color: card.numberColor,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  lineHeight: 1,
                }}
              >
                {card.number}
              </div>

              {/* Title */}
              <h3
                className="font-bold mb-4 leading-snug"
                style={{
                  fontSize: "clamp(18px, 1.8vw, 22px)",
                  color: "#111",
                  fontFamily: "'Barlow', sans-serif",
                }}
              >
                {card.title}
              </h3>

              {/* Body */}
              <p
                className="text-[14.5px] leading-relaxed mb-8 flex-1"
                style={{ color: "#555" }}
              >
                {card.body}
              </p>

              {/* READ MORE */}
              <button
                className="group/link inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase transition-opacity duration-150 hover:opacity-70 w-fit"
                style={{
                  color: card.linkColor,
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                READ MORE
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
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
