"use client";

/**
 * Dependencies:
 *   npm install gsap
 *
 * Usage:
 *   import Partnerships from "@/core/components/partnerships";
 *   <Partnerships />
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARTNERS = [
  {
    id: "seplat",
    logo: "/images/partners/seplat.jpg",
    logoAlt: "Seplat Energy logo",
    name: "Seplat",
    description:
      "Strategic joint venture supporting Nigeria's national oil infrastructure and production goals.",
  },
  {
    id: "nuprc",
    logo: "/images/partners/nuprc.jpg",
    logoAlt: "NUPRC logo",
    name: "NUPRC",
    description:
      "Regulatory partnership ensuring full compliance in Nigeria's upstream petroleum sector.",
  },
  {
    id: "oando",
    logo: "/images/partners/oando.jpg",
    logoAlt: "Oando logo",
    name: "Oando",
    description:
      "Leading Nigerian and international financial institutions funding our exploration and growth.",
  },
];

export default function Partnerships() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const ctaRef = useRef(null);
  const cardRefs = useRef([]);
  const logoRefs = useRef([]);
  const hoverLineRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 80%", once: true };

      // Eyebrow line + text
      gsap.fromTo(
        eyebrowRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: st,
        },
      );

      // Heading word-by-word feel via y
      gsap.fromTo(
        headingRef.current,
        { y: 38, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: st,
        },
      );

      // CTA button slides in from right
      gsap.fromTo(
        ctaRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          delay: 0.18,
          scrollTrigger: st,
        },
      );

      // Cards rise up with stagger
      gsap.fromTo(
        cardRefs.current,
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.14,
          delay: 0.25,
          scrollTrigger: st,
        },
      );

      // Logos pop in with bounce
      gsap.fromTo(
        logoRefs.current,
        { scale: 0.55, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.6)",
          stagger: 0.14,
          delay: 0.48,
          scrollTrigger: st,
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Card hover ────────────────────────────────────────────────────────────
  const handleEnter = (i) => {
    gsap.to(cardRefs.current[i], {
      y: -6,
      boxShadow: "0 16px 40px rgba(0,0,0,0.10)",
      duration: 0.28,
      ease: "power2.out",
    });
    gsap.to(hoverLineRefs.current[i], {
      scaleX: 1,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleLeave = (i) => {
    gsap.to(cardRefs.current[i], {
      y: 0,
      boxShadow: "0 2px 14px rgba(0,0,0,0.05)",
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(hoverLineRefs.current[i], {
      scaleX: 0,
      duration: 0.28,
      ease: "power2.inOut",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 lg:py-24"
      style={{ background: "#f0ede6", fontFamily: "'Barlow', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 xl:px-10">
        {/* ── Header row ──────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 lg:mb-14">
          <div>
            {/* Eyebrow */}
            <div ref={eyebrowRef} className="flex items-center gap-3 mb-4">
              <span className="block w-6 h-[2.5px] bg-[#006633] rounded-full flex-shrink-0" />
              <span
                className="text-[11px] font-bold tracking-[0.22em] uppercase"
                style={{
                  color: "#006633",
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                OUR PARTNERSHIPS
              </span>
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="font-black leading-tight"
              style={{
                fontSize: "clamp(30px, 4.2vw, 58px)",
                fontFamily: "'Barlow Condensed', sans-serif",
                color: "#111",
              }}
            >
              Built on{" "}
              <span style={{ color: "#006633" }}>
                Trust &amp; Collaboration
              </span>
            </h2>
          </div>

          {/* ALL PARTNERS button */}
          <div ref={ctaRef} className="flex-shrink-0">
            <button
              className="group inline-flex items-center gap-3 px-7 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase border-2 transition-all duration-200 hover:bg-[#CC1F1F] hover:border-[#CC1F1F] hover:text-white"
              style={{
                borderColor: "#CC1F1F",
                color: "#CC1F1F",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              ALL PARTNERS
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

        {/* ── Partner cards ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PARTNERS.map((partner, i) => (
            <div
              key={partner.id}
              ref={(el) => (cardRefs.current[i] = el) as any}
              className="relative bg-white flex flex-col items-center text-center px-8 pt-10 pb-10 cursor-pointer overflow-hidden"
              style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.05)" }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
            >
              {/* Green top accent line on hover */}
              <div
                ref={(el) => (hoverLineRefs.current[i] = el) as any}
                className="absolute top-0 left-0 right-0 h-[3px] bg-[#006633]"
                style={{
                  transformOrigin: "left center",
                  transform: "scaleX(0)",
                }}
              />

              {/* Logo */}
              <div
                ref={(el) => (logoRefs.current[i] = el) as any}
                className="flex items-center justify-center mb-7"
                style={{ height: "80px" }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.logoAlt}
                  width={120}
                  height={72}
                  className="object-contain max-h-[72px] w-auto"
                />
              </div>

              {/* Divider */}
              <div className="w-10 h-px bg-gray-200 mb-5" />

              {/* Name */}
              <h3
                className="font-bold text-gray-900 mb-3"
                style={{ fontSize: "16px", fontFamily: "'Barlow', sans-serif" }}
              >
                {partner.name}
              </h3>

              {/* Description */}
              <p
                className="text-[14px] leading-relaxed"
                style={{ color: "#666", fontWeight: 400, maxWidth: "320px" }}
              >
                {partner.description}
              </p>
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
