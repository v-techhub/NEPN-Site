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
import { useTestimonials } from "@/core/hooks/queries/useTestimonials";
import { TestimonialItem } from "@/core/api/types";

gsap.registerPlugin(ScrollTrigger);

const SkeletonTestimonialCard = () => (
  <div className="relative flex flex-col justify-between p-8 lg:p-9 border rounded-sm animate-pulse h-64 bg-white border-neutral-100/90 shadow-sm">
    <div className="w-10 h-10 bg-neutral-200 rounded mb-4 self-end animate-pulse" />
    <div className="space-y-2.5 flex-1 mb-8">
      <div className="w-full h-4 bg-neutral-200 rounded animate-pulse" />
      <div className="w-5/6 h-4 bg-neutral-200 rounded animate-pulse" />
      <div className="w-3/4 h-4 bg-neutral-200 rounded animate-pulse" />
    </div>
    <div className="flex items-center gap-3.5 pt-4">
      <div className="w-10 h-10 rounded-full bg-neutral-200 animate-pulse" />
      <div className="space-y-1.5 flex-1">
        <div className="w-24 h-4 bg-neutral-200 rounded animate-pulse" />
        <div className="w-16 h-3 bg-neutral-200 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const { data: cmsTestimonials, isLoading } = useTestimonials();

  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const quoteIconRefs = useRef<Array<HTMLDivElement | null>>([]);
  const avatarRefs = useRef<Array<HTMLDivElement | null>>([]);

  const rawTestimonials: TestimonialItem[] =
    cmsTestimonials && Array.isArray(cmsTestimonials.testimonials)
      ? cmsTestimonials.testimonials
      : [];

  const testimonials = rawTestimonials.map((item, idx) => {
    const initials = item.name
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    const colors = ["#006633", "#CC1F1F", "#1a1aee"];
    const avatarBg = colors[idx % colors.length];
    const roleParts = [item.job_title, item.company_name].filter(Boolean);

    return {
      id: item.id,
      quote: item.description,
      name: item.name,
      role: roleParts.join(", "),
      initials,
      avatarBg,
      roleColor: avatarBg,
    };
  });

  useEffect(() => {
    if (isLoading) return;

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

      // Cards: stagger in 2×2 grid pattern, filtering out undefined values
      const topRow = [cardRefs.current[0], cardRefs.current[1]].filter(Boolean);
      const botRow = [cardRefs.current[2], cardRefs.current[3]].filter(Boolean);

      if (topRow.length > 0) {
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
      }

      if (botRow.length > 0) {
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
      }

      // Quote icons drift in from top-right
      const activeQuotes = quoteIconRefs.current.filter(Boolean);
      if (activeQuotes.length > 0) {
        gsap.fromTo(
          activeQuotes,
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
      }

      // Avatar pop
      const activeAvatars = avatarRefs.current.filter(Boolean);
      if (activeAvatars.length > 0) {
        gsap.fromTo(
          activeAvatars,
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, testimonials.length]);

  // Hover: card lift + quote icon accent
  const handleEnter = (i: number) => {
    if (!cardRefs.current[i] || !quoteIconRefs.current[i]) return;
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

  const handleLeave = (i: number) => {
    if (!cardRefs.current[i] || !quoteIconRefs.current[i]) return;
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
              className="text-[10.5px] font-bold tracking-[0.26em] uppercase text-gray-600"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
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
              fontFamily: "'Clash Display', sans-serif",
              color: "#111",
            }}
          >
            What Our People &amp;{" "}
            <span style={{ color: "#006633" }}>Partners Say</span>
          </h2>
        </div>

        {/* ── 2×2 Grid ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <SkeletonTestimonialCard key={i} />
            ))
          ) : testimonials.length === 0 ? (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
              <p className="text-neutral-500 font-semibold text-sm">
                No testimonial content available in the CMS.
              </p>
            </div>
          ) : (
            testimonials.map((t, i) => (
              <div
                key={t.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
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
                  ref={(el) => {
                    quoteIconRefs.current[i] = el;
                  }}
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
                  style={{
                    color: "#333",
                    fontWeight: 400,
                    paddingRight: "32px",
                  }}
                >
                  {t.quote}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3.5">
                  {/* Avatar circle */}
                  <div
                    ref={(el) => {
                      avatarRefs.current[i] = el;
                    }}
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-[12px] font-bold select-none"
                    style={{
                      background: t.avatarBg,
                      fontFamily: "'Clash Display', sans-serif",
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
            ))
          )}
        </div>
      </div>
    </section>
  );
}
