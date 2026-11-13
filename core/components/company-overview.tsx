"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CORPORATE_INTRO } from "@/core/content/corporate";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCompanyData } from "@/core/hooks/queries/useCompanyData";
import { useAbout } from "@/core/hooks/queries/useAbout";

gsap.registerPlugin(ScrollTrigger);

function parseParagraphs(text: string | undefined | null): string[] {
  if (!text) return [];
  const normalized = text
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n");

  // Split on double newlines (paragraphs); fall back to single newlines if no double exists
  const hasDoubleNewline = /\n\s*\n/.test(normalized);
  const parts = hasDoubleNewline
    ? normalized.split(/\n\s*\n/)
    : normalized.split(/\n+/);

  return parts.map((p) => p.trim()).filter(Boolean);
}

const DEFAULT_TABS = [
  {
    id: "history",
    label: "HISTORY",
    paragraphs: [
      ...CORPORATE_INTRO,
      "Our ambition is to transition from a single-asset producer into a diversified, multi-asset upstream company.",
    ],
  },
  {
    id: "mission",
    label: "MISSION",
    paragraphs: [
      "To explore, develop, and produce hydrocarbon resources in Nigeria with the highest levels of technical expertise, safety, and environmental stewardship, creating sustainable value for shareholders, employees, host communities, and Nigeria.",
      "To create sustainable value through safe, efficient, and responsible oil and gas operations while upholding the highest standards of environmental and community stewardship",
    ],
  },
  {
    id: "vision",
    label: "VISION",
    paragraphs: [
      "To be the preeminent indigenous E&P company in Nigeria, a globally respected operator known for technical excellence, transparent governance, and transformative community impact.",
      "To deliver energy with excellence, innovation, and responsibility, powering Nigeria's growth today while enabling a sustainable future",
    ],
  },
];

const FACTS = [
  { label: "Founded", value: "2001" },
  { label: "Headquarters", value: "Ikoyi, Lagos State" },
  { label: "Primary Asset", value: "Qua Ibo Field, PML 13" },
  { label: "Field Office", value: "Ibeno, Akwa Ibom State" },
];

export default function CompanyOverview() {
  const { data: companyData } = useCompanyData();
  const { data: aboutData } = useAbout();

  const [activeTab, setActiveTab] = useState("history");

  const facts = useMemo(
    () => [
      { label: "Founded", value: aboutData?.founded || "2001" },
      { label: "Headquarters", value: aboutData?.headquarters || "Ikoyi, Lagos State" },
      { label: "Primary Asset", value: aboutData?.primary_asset || "Qua Ibo Field, PML 13" },
      { label: "Field Office", value: aboutData?.field_office || "Ibeno, Akwa Ibom State" },
    ],
    [
      aboutData?.founded,
      aboutData?.headquarters,
      aboutData?.primary_asset,
      aboutData?.field_office,
    ],
  );

  const tabs = useMemo(() => {
    let historyParagraphs = DEFAULT_TABS[0].paragraphs;
    if (companyData?.history) {
      historyParagraphs = parseParagraphs(companyData.history);
    } else if (aboutData) {
      const explicit = [
        aboutData.paragraph_1,
        aboutData.paragraph_2,
        aboutData.paragraph_3,
        aboutData.paragraph_4,
      ]
        .map((p) => p?.trim())
        .filter(Boolean) as string[];

      if (explicit.length > 0) {
        historyParagraphs = explicit;
      } else if (aboutData.content) {
        historyParagraphs = parseParagraphs(aboutData.content);
      }
    }

    return [
      {
        id: "history",
        label: "HISTORY",
        paragraphs: historyParagraphs,
      },
      {
        id: "mission",
        label: "MISSION",
        paragraphs: companyData?.mission
          ? parseParagraphs(companyData.mission)
          : DEFAULT_TABS[1].paragraphs,
      },
      {
        id: "vision",
        label: "VISION",
        paragraphs:
          companyData?.values || companyData?.vision
            ? parseParagraphs(companyData.values || companyData.vision)
            : DEFAULT_TABS[2].paragraphs,
      },
    ];
  }, [
    companyData?.history,
    companyData?.mission,
    companyData?.values,
    companyData?.vision,
    aboutData,
  ]);

  const currentTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  const sectionRef = useRef<HTMLElement | null>(null);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const estRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const tabBarRef = useRef<HTMLDivElement | null>(null);
  const factsRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLDivElement | null>(null);
  const tabContentRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const isInitialMount = useRef(true);

  // ── Move tab indicator (pure GSAP, position-based) ─────────────────────────
  const moveIndicator = useCallback((index: number, immediate = false) => {
    const tab = tabRefs.current[index];
    if (!tab || !indicatorRef.current) return;

    if (immediate) {
      gsap.set(indicatorRef.current, {
        x: tab.offsetLeft,
        width: tab.offsetWidth,
      });
    } else {
      gsap.to(indicatorRef.current, {
        x: tab.offsetLeft,
        width: tab.offsetWidth,
        duration: 0.35,
        ease: "power3.inOut",
      });
    }
  }, []);

  // Sync indicator position on active tab change, resize, font load
  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.id === activeTab);
    const targetIndex = index >= 0 ? index : 0;

    const update = (immediate = false) => {
      moveIndicator(targetIndex, immediate);
    };

    update();
    const rafId = requestAnimationFrame(() => update());
    const timerId = setTimeout(() => update(), 80);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => update()).catch(() => {});
    }

    const handleResize = () => update();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeTab, tabs, moveIndicator]);

  // Animate tab content smoothly on tab switch
  useEffect(() => {
    // Skip on the very first mount so the ScrollTrigger entrance controls initial visibility
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!tabContentRef.current) return;

    gsap.killTweensOf(tabContentRef.current);
    gsap.fromTo(
      tabContentRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        clearProps: "transform",
      },
    );
  }, [activeTab]);

  const handleTab = (id: string) => {
    if (id === activeTab) return;
    setActiveTab(id);
  };

  // ── Entrance animations — runs ONCE on mount only ─────────────────────────
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 78%", once: true };

      // Image clip reveal
      if (imgWrapRef.current) {
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
      }

      // EST badge
      if (estRef.current) {
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
      }

      // Right column stagger
      const staggerTargets = [
        eyebrowRef.current,
        headingRef.current,
        tabBarRef.current,
        tabContentRef.current,
        factsRef.current,
        btnRef.current,
      ].filter(Boolean);

      if (staggerTargets.length) {
        gsap.fromTo(
          staggerTargets,
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
      }

      // Facts rows
      const factRows = factsRef.current?.querySelectorAll("[data-fact]");
      if (factRows?.length) {
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

      // Initial indicator placement
      const initialTabEl = tabRefs.current[0];
      if (initialTabEl && indicatorRef.current) {
        gsap.set(indicatorRef.current, {
          x: initialTabEl.offsetLeft,
          width: initialTabEl.offsetWidth,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []); // ← strictly runs once on mount

  return (
    <section ref={sectionRef} className="w-full overflow-hidden bg-white">
      <div className="grid min-h-[700px] grid-cols-1 lg:grid-cols-2">
        {/* ── LEFT: Image ── */}
        <div
          ref={imgWrapRef}
          className="relative min-h-[420px] w-full overflow-hidden lg:min-h-0"
        >
          <Image
            src="/images/facility.jpg"
            alt="NEPN facility"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 55%)",
            }}
          />
          <div
            ref={estRef}
            className="absolute bottom-0 left-0 flex flex-col px-7 py-5"
            style={{ background: "#1a3fa8", minWidth: "120px" }}
          >
            <span
              className="font-black leading-none text-white"
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              2001
            </span>
            <span
              className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              EST. YEAR
            </span>
          </div>
        </div>

        {/* ── RIGHT: Content ── */}
        <div className="flex flex-col justify-center px-8 py-14 sm:px-12 lg:px-14 lg:py-16 xl:px-16">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="mb-5 flex items-center gap-3">
            <span className="block h-[2.5px] w-6 flex-shrink-0 rounded-full bg-[#CC1F1F]" />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.22em] text-gray-600"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              WHO WE ARE
            </span>
          </div>

          {/* Heading */}
          <h2
            ref={headingRef}
            className="mb-8 font-black leading-[1.05]"
            style={{ fontSize: "clamp(32px, 3.8vw, 52px)", color: "#111" }}
          >
            Building Nigeria&apos;s{" "}
            <span style={{ color: "#006633" }}>
              Energy
              <br />
              Future
            </span>
          </h2>

          {/* Tab bar */}
          <div ref={tabBarRef} className="relative mb-7">
            <div className="relative flex items-center gap-0 border-b border-gray-200">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  type="button"
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  onClick={() => handleTab(tab.id)}
                  className="relative px-5 pb-3.5 pt-1 text-[11.5px] font-bold tracking-[0.16em] transition-colors duration-150 cursor-pointer"
                  style={{ color: activeTab === tab.id ? "#006633" : "#888" }}
                >
                  {tab.label}
                </button>
              ))}
              <div
                ref={indicatorRef}
                className="absolute -bottom-[1px] left-0 h-[2.5px] rounded-full pointer-events-none"
                style={{ background: "#006633", width: 0 }}
              />
            </div>
          </div>

          {/* Tab content */}
          <div ref={tabContentRef} className="mb-8 min-h-[120px] space-y-4">
            {currentTab?.paragraphs?.map((paragraph, idx) => (
              <p
                key={`${activeTab}-${idx}`}
                className="text-[15px] leading-relaxed text-[#333]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Facts */}
          <div ref={factsRef} className="mb-9 border-t border-gray-100">
            {facts.map((fact) => (
              <div
                key={fact.label}
                data-fact
                className="flex items-center justify-between border-b border-gray-100 py-4"
              >
                <span
                  className="text-[14.5px] font-bold text-gray-900"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {fact.label}
                </span>
                <span
                  className="text-right text-[14px]"
                  style={{ color: "#555", fontFamily: "'Barlow', sans-serif" }}
                >
                  {fact.value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div ref={btnRef}>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 px-8 py-4 text-[11.5px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-200 hover:brightness-110 active:scale-[0.97] text-center"
              style={{
                background: "#006633",
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              LEARN MORE
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
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
      </div>
    </section>
  );
}
