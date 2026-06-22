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
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePartners } from "@/core/hooks/queries/usePartners";
import { getImageUrl } from "@/core/api/client";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_PARTNERS = [
  {
    id: "seplat",
    logo: "/images/partners/seplat.jpg",
    logoAlt: "Seplat logo",
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
  const { data: cmsPartners, isLoading } = usePartners();

  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const ctaRef = useRef(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const logoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hoverLineRefs = useRef<Array<HTMLDivElement | null>>([]);

  const rawPartners =
    cmsPartners && Array.isArray(cmsPartners.partners)
      ? cmsPartners.partners
      : [];

  const partners = [
    rawPartners.find((p) => p.title.toLowerCase().includes("seplat")),
    rawPartners.find((p) => p.title.toLowerCase().includes("nuprc")),
    rawPartners.find((p) => p.title.toLowerCase().includes("oando")),
  ].map((p, idx) => {
    const fallback = DEFAULT_PARTNERS[idx];
    if (!p) return fallback;
    return {
      id: String(p.id),
      logo: getImageUrl(p.logo) || fallback.logo,
      logoAlt: `${p.title} logo`,
      name: p.title,
      description: p.description || fallback.description,
    };
  });

  useEffect(() => {
    if (isLoading) return;

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
  }, [isLoading, partners.length]);

  // ── Card hover ────────────────────────────────────────────────────────────
  const handleEnter = (i: number) => {
    if (!cardRefs.current[i] || !hoverLineRefs.current[i]) return;
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

  const handleLeave = (i: number) => {
    if (!cardRefs.current[i] || !hoverLineRefs.current[i]) return;
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
                  fontFamily: "'Clash Display', sans-serif",
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
                fontFamily: "'Clash Display', sans-serif",
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
            <Link
              href="/partners"
              className="group inline-flex items-center gap-3 px-7 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase border-2 transition-all duration-200 hover:bg-[#CC1F1F] hover:border-[#CC1F1F] hover:text-white"
              style={{
                borderColor: "#CC1F1F",
                color: "#CC1F1F",
                fontFamily: "'Clash Display', sans-serif",
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
            </Link>
          </div>
        </div>

        {/* ── Partner cards ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white flex flex-col items-center px-8 pt-10 pb-10 shadow-[0_2px_14px_rgba(0,0,0,0.05)] animate-pulse h-[330px]"
              >
                <div className="w-36 h-20 bg-neutral-200 rounded mb-7 animate-pulse" />
                <div className="w-10 h-px bg-gray-200 mb-5" />
                <div className="w-3/4 h-5 bg-neutral-200 rounded mb-3" />
                <div className="w-5/6 h-4 bg-neutral-200 rounded" />
              </div>
            ))
          ) : partners.length === 0 ? (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
              <p className="text-neutral-500 font-semibold text-sm">
                No partner content available in the CMS.
              </p>
            </div>
          ) : (
            partners.map((partner, i) => (
              <div
                key={partner.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="relative bg-white flex flex-col items-center text-center px-8 pt-10 pb-10 cursor-pointer overflow-hidden"
                style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.05)" }}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
              >
                {/* Green top accent line on hover */}
                <div
                  ref={(el) => {
                    hoverLineRefs.current[i] = el;
                  }}
                  className="absolute top-0 left-0 right-0 h-[3px] bg-[#006633]"
                  style={{
                    transformOrigin: "left center",
                    transform: "scaleX(0)",
                  }}
                />

                {/* Logo */}
                <div
                  ref={(el) => {
                    logoRefs.current[i] = el;
                  }}
                  className="flex items-center justify-center mb-7"
                  style={{ height: "120px" }}
                >
                  <Image
                    src={partner.logo}
                    alt={partner.logoAlt}
                    width={200}
                    height={120}
                    className="object-contain max-h-[110px] w-auto"
                  />
                </div>

                {/* Divider */}
                <div className="w-10 h-px bg-gray-200 mb-5" />

                {/* Name */}
                <h3
                  className="font-bold text-gray-900 mb-3"
                  style={{
                    fontSize: "16px",
                    fontFamily: "'Barlow', sans-serif",
                  }}
                >
                  {partner.name}
                </h3>

                {/* Description */}
                {partner.description ? (
                  <p
                    className="text-[14.5px] leading-relaxed"
                    style={{
                      color: "#444",
                      fontWeight: 500,
                      maxWidth: "320px",
                    }}
                  >
                    {partner.description}
                  </p>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
