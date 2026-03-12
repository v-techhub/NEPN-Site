"use client";

/**
 * Dependencies:
 *   npm install gsap
 *
 * Usage:
 *   import CTABanner from "@/core/components/call-to-action";
 *   <CTABanner />
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const lineRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const btnsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 82%", once: true };

      // Section scale-up reveal
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: st,
        },
      );

      // Decorative circles drift in
      gsap.fromTo(
        circle1Ref.current,
        { x: -60, opacity: 0, scale: 0.7 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: st,
        },
      );
      gsap.fromTo(
        circle2Ref.current,
        { x: 60, opacity: 0, scale: 0.7 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: st,
        },
      );

      // Slow rotation on circles
      gsap.to(circle1Ref.current, {
        rotation: 360,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
      gsap.to(circle2Ref.current, {
        rotation: -360,
        duration: 50,
        ease: "none",
        repeat: -1,
      });

      // Content stagger
      gsap.fromTo(
        [lineRef.current, eyebrowRef.current],
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.3,
          scrollTrigger: st,
        },
      );

      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.4,
          scrollTrigger: st,
        },
      );

      gsap.fromTo(
        bodyRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.55,
          scrollTrigger: st,
        },
      );

      gsap.fromTo(
        btnsRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          delay: 0.68,
          scrollTrigger: st,
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-20 lg:py-24"
      style={{ background: "#0e8a42" }}
    >
      {/* ── Decorative ghost circles ──────────────────────────────────────── */}
      {/* Left circle */}
      <div
        ref={circle1Ref}
        className="absolute pointer-events-none"
        style={{
          left: "-80px",
          top: "80%",
          transform: "translateY(-50%)",
          width: "340px",
          height: "340px",
        }}
      >
        <div
          className="w-full h-full rounded-full border-[2.5px]"
          style={{ borderColor: "rgba(255,255,255,0.10)" }}
        />
        <div
          className="absolute rounded-full border-[2px]"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            inset: "28px",
          }}
        />
      </div>

      {/* Right circle */}
      <div
        ref={circle2Ref}
        className="absolute pointer-events-none"
        style={{
          right: "-90px",
          top: "20%",
          transform: "translateY(-50%)",
          width: "300px",
          height: "300px",
        }}
      >
        <div
          className="w-full h-full rounded-full border-[2.5px]"
          style={{ borderColor: "rgba(255,255,255,0.09)" }}
        />
        <div
          className="absolute rounded-full border-[2px]"
          style={{
            borderColor: "rgba(255,255,255,0.05)",
            inset: "32px",
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span
            ref={lineRef}
            className="block h-[2px] w-8 rounded-full"
            style={{
              background: "rgba(255,255,255,0.5)",
              transformOrigin: "left",
            }}
          />
          <span
            ref={eyebrowRef}
            className="text-[10.5px] font-bold tracking-[0.25em] uppercase"
            style={{
              color: "rgba(255,255,255,0.75)",
              fontFamily: "'Barlow Condensed', sans-serif",
              transformOrigin: "left",
            }}
          >
            THE NEPN DIFFERENCE
          </span>
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-black text-white leading-tight mb-5"
          style={{
            fontSize: "clamp(30px, 5.5vw, 68px)",
            fontFamily: "'Barlow Condensed', sans-serif",
            letterSpacing: "-0.01em",
          }}
        >
          Nigeria's Leading Indigenous
          <br className="hidden sm:block" /> Oil &amp; Gas Company
        </h2>

        {/* Body */}
        <p
          ref={bodyRef}
          className="text-[15.5px] leading-relaxed mb-10 mx-auto"
          style={{
            color: "rgba(255,255,255,0.78)",
            maxWidth: "480px",
            fontWeight: 400,
          }}
        >
          100% Nigerian-owned, proven track record in the Qua Iboe field, and a
          vision extending far beyond the barrel.
        </p>

        {/* Buttons */}
        <div
          ref={btnsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            className="group inline-flex items-center gap-3 px-8 py-4 text-[11.5px] font-bold tracking-[0.18em] uppercase text-white transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
            style={{
              background: "#CC1F1F",
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            CONTACT US TODAY
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
            className="group inline-flex items-center gap-3 px-8 py-4 text-[11.5px] font-bold tracking-[0.18em] uppercase text-white border border-white/50 transition-all duration-200 hover:bg-white hover:text-[#0e8a42] active:scale-[0.97]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            ABOUT NEPN
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@600;700;800;900&display=swap');
      `}</style>
    </section>
  );
}
