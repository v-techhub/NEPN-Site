"use client";

/**
 * ShowcaseGrid.jsx
 *
 * Dependencies:
 *   npm install gsap
 *
 * Images needed (place in /public/images/):
 *   exploration.jpg, production.jpg, sustainability.jpg
 *   commitment.jpg, oml13.jpg
 *
 * Usage:
 *   import ShowcaseGrid from "@/components/ShowcaseGrid";
 *   <ShowcaseGrid />
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Data ─────────────────────────────────────────────────────────────────────
const TOP_CARDS = [
  {
    num: "01",
    category: "EXPLORATION",
    title: "Exploration & Surveys",
    image: "/images/exploration.jpg",
    gradient:
      "linear-gradient(180deg, rgba(17, 126, 67, 0.09) 0%, rgba(17, 126, 67, 0.09) 30%, rgba(17, 126, 67, 0.36) 75%)",
  },
  {
    num: "02",
    category: "PRODUCTION",
    title: "Production Management",
    image: "/images/production.jpg",
    gradient:
      "linear-gradient(180deg, rgba(237, 29, 36, 0.1) 0%, rgba(237, 29, 36, 0.1) 30%, rgba(200, 17, 23, 0.4) 75%)",
  },
  {
    num: "03",
    category: "SUSTAINABILITY",
    title: "HSE & Environment",
    image: "/images/sustainability.jpg",
    gradient:
      "linear-gradient(180deg, rgba(0, 0, 254, 0.1) 0%, rgba(0, 0, 254, 0.1) 30%, rgba(0, 0, 200, 0.4) 75%)",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function ShowcaseGrid() {
  const wrapRef = useRef(null);

  // Top card refs
  const topCardRefs = useRef([]);
  const topImgRefs = useRef([]);
  const topOverlayRefs = useRef([]);

  // Middle row refs
  const midImgRef = useRef(null);
  const midPanelRef = useRef(null);
  const midContentRef = useRef(null);

  // Bottom row refs
  const botImgRef = useRef(null);
  const botPanelRef = useRef(null);
  const botContentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── TOP ROW: cards clip-reveal upward ──────────────────────────────────
      topCardRefs.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.05,
            ease: "power4.out",
            delay: i * 0.13,
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          },
        );

        // Ken Burns on each top image
        gsap.fromTo(
          topImgRefs.current[i],
          { scale: 1.1 },
          {
            scale: 1,
            duration: 7,
            ease: "power1.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          },
        );
      });

      // ── MIDDLE ROW ─────────────────────────────────────────────────────────
      // Left image slide in from left
      gsap.fromTo(
        midImgRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: midImgRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );

      // Ken Burns on mid image
      gsap.fromTo(
        midImgRef.current?.querySelector("img"),
        { scale: 1.08 },
        {
          scale: 1,
          duration: 8,
          ease: "power1.out",
          scrollTrigger: {
            trigger: midImgRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );

      // Right panel slides in from right
      gsap.fromTo(
        midPanelRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: midPanelRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );

      // Mid content stagger
      const midEls = midContentRef.current?.querySelectorAll("[data-anim]");
      if (midEls) {
        gsap.fromTo(
          midEls,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.25,
            scrollTrigger: {
              trigger: midPanelRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      // ── BOTTOM ROW ─────────────────────────────────────────────────────────
      // Left image
      gsap.fromTo(
        botImgRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: botImgRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        botImgRef.current?.querySelector("img"),
        { scale: 1.08 },
        {
          scale: 1,
          duration: 8,
          ease: "power1.out",
          scrollTrigger: {
            trigger: botImgRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      // Right panel
      gsap.fromTo(
        botPanelRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: botPanelRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      // Bot content stagger
      const botEls = botContentRef.current?.querySelectorAll("[data-anim]");
      if (botEls) {
        gsap.fromTo(
          botEls,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.25,
            scrollTrigger: {
              trigger: botPanelRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  // ── Top card hover ────────────────────────────────────────────────────────
  const handleCardEnter = (i) => {
    gsap.to(topImgRefs.current[i], {
      scale: 1.06,
      duration: 0.5,
      ease: "power2.out",
    });
  };
  const handleCardLeave = (i) => {
    gsap.to(topImgRefs.current[i], {
      scale: 1,
      duration: 0.55,
      ease: "power2.inOut",
    });
  };

  return (
    <div ref={wrapRef} style={{ fontFamily: "'Barlow', sans-serif" }}>
      {/* ══ ROW 1: Three equal image cards ════════════════════════════════════ */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 w-full"
        style={{ height: "clamp(220px, 28vw, 340px)" }}
      >
        {TOP_CARDS.map((card, i) => (
          <div
            key={card.num}
            ref={(el) => (topCardRefs.current[i] = el) as any}
            className="relative overflow-hidden cursor-pointer"
            onMouseEnter={() => handleCardEnter(i)}
            onMouseLeave={() => handleCardLeave(i)}
          >
            {/* Image */}
            <div
              ref={(el) => (topImgRefs.current[i] = el) as any}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover object-center"
                sizes="33vw"
              />
            </div>

            {/* Card-specific gradient overlay */}
            <div
              ref={(el) => (topOverlayRefs.current[i] = el) as any}
              className="absolute inset-0"
              style={{ background: card.gradient }}
            />

            {/* Card text */}
            <div className="absolute bottom-0 left-0 right-0 px-6 py-5">
              <p
                className="text-[10px] font-bold tracking-[0.2em] mb-2"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                {card.num} / {card.category}
              </p>
              <h3
                className="font-bold text-white leading-tight"
                style={{
                  fontSize: "clamp(15px, 1.8vw, 21px)",
                  fontFamily: "'Barlow', sans-serif",
                }}
              >
                {card.title}
              </h3>
            </div>

            {/* Thin border between cards */}
            {i < TOP_CARDS.length - 1 && (
              <div
                className="absolute top-0 right-0 bottom-0 w-px"
                style={{ background: "rgba(255,255,255,0.12)" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ══ ROW 2: Image left + Green panel right ═════════════════════════════ */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{ minHeight: "clamp(340px, 42vw, 520px)" }}
      >
        {/* Left image */}
        <div
          ref={midImgRef}
          className="relative overflow-hidden"
          style={{ minHeight: "320px" }}
        >
          <Image
            src="/slides/slide-3.jpg"
            alt="NEPN team commitment"
            fill
            className="object-cover object-center"
            sizes="50vw"
          />
        </div>

        {/* Right green panel */}
        <div
          ref={midPanelRef}
          className="flex items-center"
          style={{ background: "#006633" }}
        >
          <div
            ref={midContentRef}
            className="px-10 lg:px-14 xl:px-16 py-14 lg:py-0"
          >
            {/* Eyebrow */}
            <div data-anim className="flex items-center gap-3 mb-6">
              <span
                className="block w-8 h-[2px] rounded-full"
                style={{ background: "rgba(255,255,255,0.45)" }}
              />
              <span
                className="text-[10.5px] font-bold tracking-[0.22em] uppercase"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                OUR COMMITMENT
              </span>
            </div>

            {/* Heading */}
            <h2
              data-anim
              className="font-bold leading-tight text-white mb-5"
              style={{
                fontSize: "clamp(26px, 3vw, 40px)",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
              }}
            >
              More Than a Goal —<br />
              Who We Are
            </h2>

            {/* Divider */}
            <div
              data-anim
              className="w-10 h-[3px] rounded-full mb-6"
              style={{ background: "rgba(255,255,255,0.3)" }}
            />

            {/* Body */}
            <p
              data-anim
              className="text-[15px] leading-relaxed mb-8 max-w-[440px]"
              style={{ color: "rgba(255,255,255,0.8)", fontWeight: 400 }}
            >
              At NEPN, sustainability is fundamental to how we operate —
              delivering zero-incident operations, investing in communities, and
              working toward net zero because our responsibility extends far
              beyond the barrel.
            </p>

            {/* CTA */}
            <div data-anim>
              <button
                className="group inline-flex items-center gap-3 px-6 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase text-white border border-white/50 transition-all duration-200 hover:bg-white hover:text-[#006633]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                OUR APPROACH
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
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
        </div>
      </div>

      {/* ══ ROW 3: Image left + Blue panel right ══════════════════════════════ */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{ minHeight: "clamp(340px, 42vw, 520px)" }}
      >
        {/* Left image */}
        <div
          ref={botImgRef}
          className="relative overflow-hidden order-2 lg:order-1"
          style={{ minHeight: "320px" }}
        >
          <Image
            src="/images/banner.jpg"
            alt="OML 13 Qua Iboe field aerial view"
            fill
            className="object-cover object-center"
            sizes="50vw"
          />
        </div>

        {/* Right blue panel */}
        <div
          ref={botPanelRef}
          className="flex items-center order-1 lg:order-2"
          style={{ background: "#1a1aee" }}
        >
          <div
            ref={botContentRef}
            className="px-10 lg:px-14 xl:px-16 py-14 lg:py-0"
          >
            {/* Eyebrow */}
            <div data-anim className="flex items-center gap-3 mb-6">
              <span
                className="block w-8 h-[2px] rounded-full"
                style={{ background: "rgba(255,255,255,0.4)" }}
              />
              <span
                className="text-[10.5px] font-bold tracking-[0.22em] uppercase"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                QUA IBOE FIELD
              </span>
            </div>

            {/* Heading */}
            <h2
              data-anim
              className="font-bold leading-tight text-white mb-5"
              style={{
                fontSize: "clamp(26px, 3vw, 40px)",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
              }}
            >
              OML 13 — Our
              <br />
              Primary Asset
            </h2>

            {/* Divider */}
            <div
              data-anim
              className="w-10 h-[3px] rounded-full mb-6"
              style={{ background: "rgba(255,255,255,0.3)" }}
            />

            {/* Body */}
            <p
              data-anim
              className="text-[15px] leading-relaxed mb-8 max-w-[440px]"
              style={{ color: "rgba(255,255,255,0.8)", fontWeight: 400 }}
            >
              Nigeria's Qua Iboe field in OML 13, Akwa Ibom State, has been our
              flagship operational asset since 2001 — a prolific basin that
              underpins our production strategy and long-term growth ambitions.
            </p>

            {/* CTA */}
            <div data-anim>
              <button
                className="group inline-flex items-center gap-3 px-6 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase text-white border border-white/50 transition-all duration-200 hover:bg-white hover:text-[#1a1aee]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                EXPLORE OPERATIONS
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
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
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800;900&display=swap');
      `}</style>
    </div>
  );
}
