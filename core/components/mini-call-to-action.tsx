"use client";

/**
 * MiniCTA.jsx
 *
 * Dependencies:
 *   npm install gsap
 *
 * Usage:
 *   import MiniCTA from "@/components/MiniCTA";
 *   <MiniCTA />
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MiniCTA() {
  const sectionRef = useRef(null);
  const textGroupRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 90%", once: true };

      // Whole bar scale-in from slight shrink
      gsap.fromTo(
        sectionRef.current,
        { scaleX: 0.96, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: st,
        },
      );

      // Left text group slides from left
      gsap.fromTo(
        textGroupRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          delay: 0.18,
          scrollTrigger: st,
        },
      );

      // Heading + sub stagger
      gsap.fromTo(
        [headingRef.current, subRef.current],
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.28,
          scrollTrigger: st,
        },
      );

      // Button slides from right
      gsap.fromTo(
        btnRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          delay: 0.22,
          scrollTrigger: st,
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hover: arrow nudge via GSAP
  const arrowRef = useRef(null);
  const handleEnter = () =>
    gsap.to(arrowRef.current, { x: 5, duration: 0.22, ease: "power2.out" });
  const handleLeave = () =>
    gsap.to(arrowRef.current, { x: 0, duration: 0.25, ease: "power2.inOut" });

  return (
    <div
      ref={sectionRef}
      className="w-full"
      style={{
        background: "#E8200E",
        fontFamily: "'Barlow', sans-serif",
        transformOrigin: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 xl:px-10 py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        {/* Left: text */}
        <div ref={textGroupRef} className="flex flex-col">
          <h3
            ref={headingRef}
            className="font-bold text-white leading-tight"
            style={{
              fontSize: "clamp(18px, 2vw, 24px)",
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            Ready to Work Together?
          </h3>
          <p
            ref={subRef}
            className="text-[13.5px] mt-1"
            style={{ color: "rgba(255,255,255,0.72)", fontWeight: 400 }}
          >
            Reach out for enquiries, partnerships, or investment discussions.
          </p>
        </div>

        {/* Right: button */}
        <div ref={btnRef} className="flex-shrink-0">
          <button
            className="inline-flex items-center gap-3 px-7 py-3 text-[11px] font-bold tracking-[0.2em] uppercase text-white border border-white/60 transition-colors duration-200 hover:bg-white hover:text-[#E8200E]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            SEND A MESSAGE
            <span ref={arrowRef} className="inline-flex">
              <svg
                className="w-3.5 h-3.5"
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
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800&display=swap');
      `}</style>
    </div>
  );
}
