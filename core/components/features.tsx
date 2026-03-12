"use client";

/**
 * FeaturesBar.jsx
 *
 * Dependencies:
 *   npm install gsap
 *
 * Usage:
 *   import FeaturesBar from "@/core/components/features";
 *   <FeaturesBar />
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    id: 1,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="w-6 h-6"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    accent: "#006633",
    title: "EXPLORATION & PRODUCTION",
    subtitle: "OML 13 / Qua Iboe field, Akwa Ibom State",
  },
  {
    id: 2,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="w-6 h-6"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    accent: "#CC1F1F",
    title: "SAFETY & SUSTAINABILITY",
    subtitle: "Zero-incident culture & net zero 2050 roadmap",
  },
  {
    id: 3,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="w-6 h-6"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    accent: "#1a3fa8",
    title: "STRATEGIC PARTNERSHIPS",
    subtitle: "NNPC, NUPRC, financial & technical partners",
  },
];

export default function FeaturesBar() {
  const sectionRef = useRef(null);
  const topBarRef = useRef(null);
  const itemRefs = useRef([]);
  const dividerRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Top color bar segments animate in ──────────────────────────────────
      const bars = topBarRef.current?.querySelectorAll("[data-bar]");
      if (bars) {
        gsap.fromTo(
          bars,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.inOut",
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // ── Section slide up + fade in ──────────────────────────────────────────
      gsap.fromTo(
        sectionRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );

      // ── Each feature card staggers in ──────────────────────────────────────
      gsap.fromTo(
        itemRefs.current,
        { x: -32, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.14,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            once: true,
          },
        },
      );

      // ── Dividers scale in ───────────────────────────────────────────────────
      gsap.fromTo(
        dividerRefs.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.15,
          delay: 0.45,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            once: true,
          },
        },
      );

      // ── Icon accent box pulse on enter ─────────────────────────────────────
      itemRefs.current.forEach((el, i) => {
        const iconBox = el?.querySelector("[data-icon]");
        if (!iconBox) return;
        gsap.fromTo(
          iconBox,
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.55,
            ease: "back.out(1.7)",
            delay: 0.35 + i * 0.14,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hover: subtle lift on each card
  const handleMouseEnter = (el) => {
    gsap.to(el, { x: 4, duration: 0.25, ease: "power2.out" });
  };
  const handleMouseLeave = (el) => {
    gsap.to(el, { x: 0, duration: 0.3, ease: "power2.inOut" });
  };

  return (
    <>
      {/* ── Top tricolor bar ────────────────────────────────────────────────── */}
      <div ref={topBarRef} className="flex w-full h-[3px]">
        {[
          ["#006633", "55%"],
          ["#CC1F1F", "25%"],
          ["#1a3fa8", "20%"],
        ].map(([color, width], i) => (
          <div key={i} data-bar style={{ background: color, width }} />
        ))}
      </div>

      {/* ── Main bar ────────────────────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        className="w-full opacity-0"
        style={{ background: "#111214" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0">
            {FEATURES.map((feat, i) => (
              <div key={feat.id} className="relative flex items-stretch">
                {/* Vertical divider between items */}
                {i > 0 && (
                  <div
                    ref={(el) => (dividerRefs.current[i - 1] = el)}
                    className="hidden md:block absolute left-0 top-[18%] bottom-[18%] w-px"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />
                )}

                {/* Card */}
                <div
                  ref={(el) => (itemRefs.current[i] = el)}
                  className="flex items-center gap-5 px-8 xl:px-10 py-7 w-full cursor-pointer group"
                  onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  style={{ opacity: 0 }} // GSAP will fade in
                >
                  {/* Icon box */}
                  <div
                    data-icon
                    className="flex-shrink-0 w-12 h-12 rounded flex items-center justify-center text-white"
                    style={{ background: feat.accent, opacity: 0 }}
                  >
                    {feat.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[12.5px] font-bold tracking-[0.14em] text-white mb-1.5 truncate"
                      //   style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {feat.title}
                    </p>
                    <p
                      className="text-[13px] leading-snug truncate"
                      style={{
                        color: "rgba(255,255,255,0.45)",
                        // fontFamily: "'Barlow', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {feat.subtitle}
                    </p>
                  </div>

                  {/* Chevron */}
                  <svg
                    className="flex-shrink-0 w-3.5 h-3.5 ml-2 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 18l6-6-6-6"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500&family=Barlow+Condensed:wght@600;700;800&display=swap');
      `}</style>
    </>
  );
}
