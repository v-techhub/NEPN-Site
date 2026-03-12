"use client";

/**
 * Dependencies:
 *   npm install gsap
 *
 * Usage:
 *   import WhoWeAre from "@/core/components/who-we-are";
 *   <WhoWeAre />
 *
 * Image: Place your facility photo at /public/images/facility.jpg
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Tab content ──────────────────────────────────────────────────────────────
const TABS = [
  {
    id: "history",
    label: "HISTORY",
    paragraphs: [
      "Founded in 2001, Network Exploration & Production Nigeria Limited (NEPN) was established to champion indigenous participation in Nigeria's oil and gas sector.",
      "From modest beginnings, NEPN has grown into a respected operator with a proven track record across upstream exploration and production activities in the Niger Delta.",
    ],
  },
  {
    id: "mission",
    label: "MISSION",
    paragraphs: [
      "To responsibly explore and produce Nigeria's hydrocarbon resources, generating value for our shareholders, host communities, and the nation through operational excellence and ethical business practices.",
      "We are driven by a commitment to delivering energy security while ensuring the highest standards of health, safety, and environmental stewardship across all operations.",
    ],
  },
  {
    id: "vision",
    label: "VISION",
    paragraphs: [
      "To be the preeminent indigenous E&P company in Nigeria, a globally respected operator known for technical excellence, transparent governance, and trans-formative community impact.",
      "100% Nigerian-owned and operated, proving that indigenous companies can lead in one of the world's most demanding industries.",
    ],
  },
];

const FACTS = [
  { label: "Founded", value: "2001" },
  { label: "Headquarters", value: "Ikoyi, Lagos State" },
  { label: "Primary Asset", value: "Qua Iboe Field, OML 13" },
  { label: "Field Office", value: "Ibeno, Akwa Ibom State" },
];

export default function WhoWeAre() {
  const [activeTab, setActiveTab] = useState("vision");
  const [displayTab, setDisplayTab] = useState("vision");

  const sectionRef = useRef(null);
  const imgWrapRef = useRef(null);
  const badgeRef = useRef(null);
  const estRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const tabBarRef = useRef(null);
  const bodyRef = useRef(null);
  const factsRef = useRef(null);
  const btnRef = useRef(null);
  const tabContentRef = useRef(null);
  const indicatorRef = useRef(null);
  const tabRefs = useRef([]);

  // ── Animate tab indicator position ──────────────────────────────────────────
  const moveIndicator = (index) => {
    const tab = tabRefs.current[index];
    if (!tab || !indicatorRef.current) return;
    gsap.to(indicatorRef.current, {
      x: tab.offsetLeft,
      width: tab.offsetWidth,
      duration: 0.35,
      ease: "power3.inOut",
    });
  };

  // ── Tab switch ───────────────────────────────────────────────────────────────
  const handleTab = (id) => {
    if (id === activeTab) return;
    const idx = TABS.findIndex((t) => t.id === id);
    moveIndicator(idx);

    gsap.to(tabContentRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => {
        setDisplayTab(id);
        setActiveTab(id);
        gsap.fromTo(
          tabContentRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
        );
      },
    });
  };

  // ── Scroll-triggered entrance ────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 78%", once: true };

      // Image reveal — clip from bottom
      gsap.fromTo(
        imgWrapRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: st,
        },
      );

      // EST badge
      gsap.fromTo(
        estRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.6,
          scrollTrigger: st,
        },
      );

      // Right column stagger
      const rightEls = [
        eyebrowRef.current,
        headingRef.current,
        tabBarRef.current,
        tabContentRef.current,
        factsRef.current,
        btnRef.current,
      ];

      gsap.fromTo(
        rightEls,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.25,
          scrollTrigger: st,
        },
      );

      // Facts rows stagger
      const factRows = factsRef.current?.querySelectorAll("[data-fact]");
      if (factRows) {
        gsap.fromTo(
          factRows,
          { x: 24, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
            delay: 0.65,
            scrollTrigger: st,
          },
        );
      }

      // Set initial indicator position
      const activeIdx = TABS.findIndex((t) => t.id === activeTab);
      const tab = tabRefs.current[activeIdx];
      if (tab && indicatorRef.current) {
        gsap.set(indicatorRef.current, {
          x: tab.offsetLeft,
          width: tab.offsetWidth,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentTab = TABS.find((t) => t.id === displayTab);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white overflow-hidden"
      //   style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
        {/* ── LEFT: Image ──────────────────────────────────────────────────── */}
        <div
          ref={imgWrapRef}
          className="relative w-full min-h-[420px] lg:min-h-0 overflow-hidden"
        >
          <Image
            src="/images/facility.jpg"
            alt="NEPN facility – produced water tanks"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          {/* Subtle dark vignette bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 55%)",
            }}
          />

          {/* EST. YEAR badge */}
          <div
            ref={estRef}
            className="absolute bottom-0 left-0 px-7 py-5 flex flex-col"
            style={{ background: "#1a3fa8", minWidth: "120px" }}
          >
            <span
              className="text-white font-black leading-none"
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              2001
            </span>
            <span
              className="text-[11px] font-bold tracking-[0.18em] uppercase mt-1"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              EST. YEAR
            </span>
          </div>
        </div>

        {/* ── RIGHT: Content ───────────────────────────────────────────────── */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-16 py-14 lg:py-16">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="flex items-center gap-3 mb-5">
            <span className="block w-6 h-[2.5px] bg-red-600 rounded-full flex-shrink-0" />
            <span
              className="text-[11px] font-bold tracking-[0.22em] uppercase text-gray-500"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              WHO WE ARE
            </span>
          </div>

          {/* Heading */}
          <h2
            ref={headingRef}
            className="font-black leading-[1.05] mb-8"
            style={{
              fontSize: "clamp(32px, 3.8vw, 52px)",
              //   fontFamily: "'Barlow Condensed', sans-serif",
              color: "#111",
            }}
          >
            Building Nigeria's{" "}
            <span style={{ color: "#006633" }}>
              Energy
              <br />
              Future
            </span>
          </h2>

          {/* Tab bar */}
          <div ref={tabBarRef} className="relative mb-7">
            <div className="flex items-center gap-0 border-b border-gray-200">
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  onClick={() => handleTab(tab.id)}
                  className="relative px-5 pb-3.5 pt-1 text-[11.5px] font-bold tracking-[0.16em] transition-colors duration-150"
                  style={{
                    // fontFamily: "'Barlow Condensed', sans-serif",
                    color: activeTab === tab.id ? "#006633" : "#888",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sliding green underline indicator */}
            <div
              ref={indicatorRef}
              className="absolute bottom-0 left-0 h-[2.5px] rounded-full"
              style={{ background: "#006633", width: 0 }}
            />
          </div>

          {/* Tab content */}
          <div ref={tabContentRef} className="mb-8 space-y-4 min-h-[120px]">
            {currentTab?.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[15px] leading-relaxed"
                style={{ color: "#333", fontWeight: 400 }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Facts table */}
          <div ref={factsRef} className="mb-9 border-t border-gray-100">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                data-fact
                className="flex items-center justify-between py-4 border-b border-gray-100"
              >
                <span
                  className="text-[14.5px] font-bold text-gray-900"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {fact.label}
                </span>
                <span
                  className="text-[14px] text-right"
                  style={{ color: "#555", fontFamily: "'Barlow', sans-serif" }}
                >
                  {fact.value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div ref={btnRef}>
            <button
              className="group inline-flex items-center gap-3 px-8 py-4 text-[11.5px] font-bold tracking-[0.18em] uppercase text-white transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
              style={{
                background: "#006633",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              LEARN MORE
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
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@600;700;800;900&display=swap');
      `}</style>
    </section>
  );
}
