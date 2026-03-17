"use client";

/**
 * LatestNews.jsx
 *
 * Dependencies:
 *   npm install gsap
 *
 * Usage:
 *   import LatestNews from "@/components/LatestNews";
 *   <LatestNews />
 *
 * Images: Place in /public/images/news/
 *   news-1.jpg, news-2.jpg, news-3.jpg
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NEWS = [
  {
    id: 1,
    image: "/images/operations.jpg",
    category: "OPERATIONS",
    categoryBg: "#006633",
    title: "NEPN Advances Qua Iboe Field Development in OML 13",
    date: "March 2026",
    readTime: "4 min read",
  },
  {
    id: 2,
    image: "/images/production.jpg",
    category: "COMMUNITY",
    categoryBg: "#CC1F1F",
    title: "NEPN Launches Scholarship Programme for Akwa Ibom Students",
    date: "February 2026",
    readTime: "3 min read",
  },
  {
    id: 3,
    image: "/images/workers.jpg",
    category: "SUSTAINABILITY",
    categoryBg: "#1a1aee",
    title: "NEPN Commits to Net Zero Roadmap Ahead of 2030 Milestone",
    date: "January 2026",
    readTime: "5 min read",
  },
];

export default function LatestNews() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const ctaRef = useRef(null);
  const cardRefs = useRef([]);
  const imgRefs = useRef([]);
  const imgWrapRefs = useRef([]);
  const badgeRefs = useRef([]);
  const metaRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 80%", once: true };

      // Eyebrow
      gsap.fromTo(
        eyebrowRef.current,
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
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

      // CTA button
      gsap.fromTo(
        ctaRef.current,
        { x: 36, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: st,
        },
      );

      // Cards rise with stagger
      gsap.fromTo(
        cardRefs.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.25,
          scrollTrigger: st,
        },
      );

      // Image clip-reveal per card
      imgWrapRefs.current.forEach((wrap, i) => {
        gsap.fromTo(
          wrap,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.0,
            ease: "power4.out",
            delay: 0.3 + i * 0.15,
            scrollTrigger: st,
          },
        );

        // Ken Burns
        gsap.fromTo(
          imgRefs.current[i],
          { scale: 1.1 },
          {
            scale: 1,
            duration: 8,
            ease: "power1.out",
            scrollTrigger: st,
          },
        );
      });

      // Badges pop in
      gsap.fromTo(
        badgeRefs.current,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          ease: "back.out(1.7)",
          stagger: 0.13,
          delay: 0.65,
          scrollTrigger: st,
        },
      );

      // Meta (date + read time) fade
      gsap.fromTo(
        metaRefs.current,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.75,
          scrollTrigger: st,
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Card hover ────────────────────────────────────────────────────────────
  const handleEnter = (i) => {
    gsap.to(imgRefs.current[i], {
      scale: 1.06,
      duration: 0.55,
      ease: "power2.out",
    });
    gsap.to(cardRefs.current[i], {
      y: -5,
      boxShadow: "0 18px 44px rgba(0,0,0,0.10)",
      duration: 0.28,
      ease: "power2.out",
    });
  };

  const handleLeave = (i) => {
    gsap.to(imgRefs.current[i], {
      scale: 1,
      duration: 0.6,
      ease: "power2.inOut",
    });
    gsap.to(cardRefs.current[i], {
      y: 0,
      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      duration: 0.32,
      ease: "power2.inOut",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-16 lg:py-24"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 xl:px-10">
        {/* ── Header row ──────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 lg:mb-14">
          <div>
            {/* Eyebrow */}
            <div ref={eyebrowRef} className="flex items-center gap-3 mb-4">
              <span className="block w-6 h-[2.5px] bg-red-600 rounded-full flex-shrink-0" />
              <span
                className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-gray-500"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                NEWS &amp; INSIGHTS
              </span>
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="font-black leading-tight"
              style={{
                fontSize: "clamp(30px, 4vw, 54px)",
                fontFamily: "'Barlow Condensed', sans-serif",
                color: "#111",
              }}
            >
              Latest from <span style={{ color: "#006633" }}>NEPN</span>
            </h2>
          </div>

          {/* ALL NEWS button */}
          <div ref={ctaRef} className="flex-shrink-0">
            <button
              className="group inline-flex items-center gap-3 px-7 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase border-2 transition-all duration-200 hover:bg-[#006633] hover:text-white"
              style={{
                borderColor: "#006633",
                color: "#006633",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              ALL NEWS
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

        {/* ── News cards grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEWS.map((item, i) => (
            <article
              key={item.id}
              ref={(el) => (cardRefs.current[i] = el) as any}
              className="flex flex-col bg-white border border-gray-100 cursor-pointer overflow-hidden"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
            >
              {/* Image */}
              <div
                ref={(el) => (imgWrapRefs.current[i] = el) as any}
                className="relative overflow-hidden"
                style={{ height: "clamp(200px, 22vw, 280px)" }}
              >
                <div
                  ref={(el) => (imgRefs.current[i] = el) as any}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 px-6 pt-6 pb-7">
                {/* Category badge */}
                <div className="mb-4">
                  <span
                    ref={(el) => (badgeRefs.current[i] = el) as any}
                    className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase text-white"
                    style={{
                      background: item.categoryBg,
                      fontFamily: "'Barlow Condensed', sans-serif",
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-bold leading-snug mb-5 flex-1"
                  style={{
                    fontSize: "clamp(15px, 1.5vw, 18px)",
                    color: "#111",
                    fontFamily: "'Barlow', sans-serif",
                  }}
                >
                  {item.title}
                </h3>

                {/* Meta */}
                <div
                  ref={(el) => (metaRefs.current[i] = el) as any}
                  className="flex items-center gap-2.5 mt-auto"
                >
                  <span
                    className="block w-5 h-[2px] rounded-full flex-shrink-0"
                    style={{ background: "#CC1F1F" }}
                  />
                  <span
                    className="text-[12.5px]"
                    style={{
                      color: "#888",
                      fontFamily: "'Barlow', sans-serif",
                    }}
                  >
                    {item.date} · {item.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800;900&display=swap');
      `}</style>
    </section>
  );
}
