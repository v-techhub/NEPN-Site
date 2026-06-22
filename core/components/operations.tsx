"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const OPERATIONAL_STAGES = [
  {
    num: "01 / EXPLORATION",
    title: "Exploration",
    body: "Advanced 3D seismic analysis and geological mapping driving discovery across PML 13, Qua Iboe field.",
    details: "The Qua Ibo Marginal Field, discovered by Shell Petroleum Development Company (SPDC) in 1960, is located within a 14 km² farm-out area in PML 13, onshore Akwa Ibom State. A Farm-out Agreement was executed on 29 April 2004 between NEPN, SPDC, and its joint venture partners, granting NEPN development rights to the field.",
    image: "/images/exploration_home.jpg",
  },
  {
    num: "02 / DRILLING",
    title: "Well Drilling & Completion",
    body: "Precision drilling programmes using best-in-class technology to maximise recovery with highest safety standards.",
    details: "Five wells have been drilled in the field: Qua Ibo–1, Qua Ibo–2, Qua Ibo–3, Qua Ibo–3ST, and Qua Ibo–4. Qua Ibo–1, drilled in 1960, was plugged and abandoned after inconclusive testing. The appraisal well, Qua Ibo–2 (1971), confirmed the presence of oil in five horizons and gas in five zones at depths between 3,310 and 7,100 feet subsea. The reservoirs contain light crude oil with gravities ranging from 20° to over 40° API. NEPN continues to leverage the field’s proven hydrocarbon potential through efficient and professionally managed upstream operations.",
    image: "/images/operation_bg.jpg",
  },
  {
    num: "03 / PRODUCTION",
    title: "Production Management",
    body: "Safe, efficient production from established wells with continuous optimisation programmes year-on-year.",
    details: "Network Exploration and Production Limited is leveraging advanced digitalization technologies to maintain low operating costs and strengthen profitability in a lower-for-longer oil price environment. The company is assessing the impact of these technologies on sustainable operations while exploring innovative solutions to optimize recovery from the Qua Ibo field. In pursuit of cost efficiency, NEPN collaborates with research firms, data analytics providers, consultants, and industry stakeholders, alongside partnerships with the Nigerian government, to drive effective and sustainable digital transformation in oil and gas production.",
    image: "/images/production_home.jpg",
  },
  {
    num: "04 / HSE",
    title: "Environmental & HSE Management",
    body: "Rigorous HSE management systems embedded into every phase of operational activity at all sites.",
    details: "The company operates a proactive HSE Management System that identifies hazards, assesses risks, and implements mitigation measures while ensuring continuous monitoring and improvement. HSE risks are systematically analyzed to protect employees, contractors, assets, host communities, the environment, and the public, with risk management embedded in all operations.",
    image: "/images/sustainability_home.jpg",
  },
];

const TECH_CARDS = [
  {
    title: "Enhanced Oil Recovery (EOR)",
    body: "Advanced techniques to maximize resource extraction",
  },
  {
    title: "SCADA Systems",
    body: "Supervisory Control and Data Acquisition for real-time operations",
  },
  {
    title: "Digital Twin Technology",
    body: "Virtual replicas of physical assets for optimization",
  },
  {
    title: "AI-Powered Analytics",
    body: "Machine learning for predictive maintenance and efficiency",
  },
  {
    title: "Automated Safety Systems",
    body: "Emergency shutdown and response automation",
  },
  {
    title: "Environmental Monitoring",
    body: "Continuous tracking of emissions and environmental impact",
  },
];

const SPEC_ROWS = [
  { label: "Field Name", value: "Qua Iboe Field" },
  { label: "License Block", value: "PML 13" },
  { label: "Location", value: "Akwa Ibom State, Nigeria" },
  { label: "Operations Since", value: "2001" },
  { label: "Head Office", value: "Ikoyi, Lagos State" },
  { label: "Ownership", value: "100% Indigenous Nigerian" },
];

export default function Operations() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const heroOverlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  // Resize handler to adjust carousel visible items
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = isMobile
    ? OPERATIONAL_STAGES.length - 1
    : OPERATIONAL_STAGES.length - 2;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  // GSAP scroll trigger parallax and staggered entry animations
  useEffect(() => {
    if (!rootRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const animateStagger = (
      targets: gsap.TweenTarget,
      trigger: Element | null | undefined,
      vars?: gsap.TweenVars,
    ) => {
      if (!trigger) return;

      gsap.fromTo(
        targets,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger,
            start: "top 82%",
            once: true,
          },
          ...vars,
        },
      );
    };

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const heroCopy = rootRef.current?.querySelectorAll("[data-hero-copy]");
      const introCopy = rootRef.current?.querySelectorAll("[data-intro-copy]");
      const sliderWrap =
        rootRef.current?.querySelectorAll("[data-slider-wrap]");
      const techHeader =
        rootRef.current?.querySelectorAll("[data-tech-header]");
      const techGrid = rootRef.current?.querySelectorAll(
        "[data-tech-grid] > div",
      );
      const assetCopy = rootRef.current?.querySelectorAll("[data-asset-copy]");
      const assetTable =
        rootRef.current?.querySelectorAll("[data-asset-table]");

      const targets: Element[] = [];
      if (heroCopy) heroCopy.forEach((el) => targets.push(el));
      if (introCopy) introCopy.forEach((el) => targets.push(el));
      if (sliderWrap) sliderWrap.forEach((el) => targets.push(el));
      if (techHeader) techHeader.forEach((el) => targets.push(el));
      if (techGrid) techGrid.forEach((el) => targets.push(el));
      if (assetCopy) assetCopy.forEach((el) => targets.push(el));
      if (assetTable) assetTable.forEach((el) => targets.push(el));

      if (targets.length) {
        gsap.set(targets, { willChange: "transform, opacity" });
      }

      // Hero animations
      if (heroCopy?.length) {
        animateStagger(heroCopy, heroRef.current, { delay: 0.2 });
      }

      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { scale: 1.1, opacity: 0.82 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.45,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );

        gsap.to(heroImageRef.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.15,
          },
        });
      }

      if (heroOverlayRef.current) {
        gsap.fromTo(
          heroOverlayRef.current,
          { opacity: 0.68 },
          {
            opacity: 0.88,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.15,
            },
          },
        );
      }

      // Content animations
      if (introCopy?.length) {
        animateStagger(introCopy, contentRef.current);
      }

      if (sliderWrap?.length) {
        animateStagger(sliderWrap, contentRef.current, { delay: 0.25 });
      }

      if (techHeader?.length) {
        animateStagger(
          techHeader,
          rootRef.current?.querySelector("[data-tech-trigger]"),
        );
      }

      if (techGrid?.length) {
        animateStagger(
          techGrid,
          rootRef.current?.querySelector("[data-tech-trigger]"),
          { delay: 0.2 },
        );
      }

      if (assetCopy?.length) {
        animateStagger(
          assetCopy,
          rootRef.current?.querySelector("[data-asset-trigger]"),
        );
      }

      if (assetTable?.length) {
        animateStagger(
          assetTable,
          rootRef.current?.querySelector("[data-asset-trigger]"),
          { delay: 0.2 },
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="w-full bg-[#f4f4f4] overflow-x-hidden"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative isolate w-full overflow-hidden bg-[#0a1210] -mt-[30px]"
      >
        <div className="absolute inset-x-0 bottom-0 z-30 flex h-[3px] md:h-[4px]">
          <span className="h-full basis-[45%] bg-[#1bc7f0]" />
          <span className="h-full basis-[27%] bg-[#ed2a24]" />
          <span className="h-full basis-[28%] bg-[#173fe3]" />
        </div>

        <div className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[330px] lg:min-h-[372px]">
          <div ref={heroImageRef} className="absolute inset-0">
            <Image
              src="/images/operation_bg.jpg"
              alt="NEPN offshore energy production facility"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          <div
            ref={heroOverlayRef}
            className="absolute inset-0"
            style={{
              opacity: 1,
              background:
                "linear-gradient(180deg, rgba(5,10,7,0.28) 0%, rgba(5,10,7,0.36) 24%, rgba(5,10,7,0.54) 60%, rgba(5,10,7,0.78) 100%)",
            }}
          />

          <div className="absolute inset-0 z-20">
            <div className="mx-auto flex h-full w-full max-w-[1250px] items-center justify-center px-5 py-10 text-center sm:px-8 md:px-10 lg:px-10">
              <div className="flex w-full flex-col items-center justify-center translate-y-[28px] sm:translate-y-[34px] md:translate-y-[40px] lg:translate-y-[46px]">
                <div
                  data-hero-copy
                  className="mb-[22px] flex flex-wrap items-center justify-center gap-2 text-[8px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-[9px] md:text-[10px]"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  <Link
                    href="/"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    Home
                  </Link>
                  <span className="text-white/35">/</span>
                  <span className="text-white/50">Operations</span>
                </div>

                <h1
                  data-hero-copy
                  className="text-white"
                  style={{
                    width: "auto",
                    minHeight: "58.875px",
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: "clamp(30px, 7.5vw, 51.2px)",
                    lineHeight: "1.15",
                    letterSpacing: "0%",
                    textShadow: "0 10px 30px rgba(0,0,0,0.28)",
                  }}
                >
                  Our{" "}
                  <span
                    className="italic text-[#82E8B4]"
                    style={{
                      fontWeight: 700,
                      fontSize: "clamp(30px, 7.5vw, 51.2px)",
                      lineHeight: "1.15",
                      letterSpacing: "0%",
                    }}
                  >
                    Operations
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef} className="bg-[#f4f4f4] py-16 sm:py-24">
        <div className="mx-auto max-w-[980px] px-5">
          {/* Section Header */}
          <div className="mb-12">
            <div
              data-intro-copy
              className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em]"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              <span className="h-[2px] w-4 rounded-full bg-[#ef3b3b]" />
              <span className="text-[#ef3b3b]">What We Do</span>
            </div>

            <h2
              data-intro-copy
              className="font-black leading-[0.98] tracking-[-0.03em] text-[#1f2724]"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(2.25rem, 4.9vw, 4.05rem)",
              }}
            >
              Integrated Energy{" "}
              <span className="italic text-[#14874f]">Excellence</span>
            </h2>

            <p
              data-intro-copy
              className="mt-6 text-[#3a4340] text-[15px] sm:text-base leading-relaxed max-w-2xl font-sans font-medium"
            >
              From seismic exploration to production management, guided by
              technical expertise, safety discipline, and commitment to
              Nigeria&apos;s energy future.
            </p>
          </div>

          {/* Sliding Stages Carousel */}
          <div data-slider-wrap className="relative overflow-hidden">
            {/* Slider Container */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (isMobile ? 100 : 50)}%)`,
                }}
              >
                {OPERATIONAL_STAGES.map((stage) => (
                  <div
                    key={stage.num}
                    className="w-full md:w-1/2 shrink-0 px-2 sm:px-3"
                  >
                    <div className="group relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden cursor-default shadow-sm border border-neutral-200/50">
                      {/* Stage Image */}
                      <Image
                        src={stage.image}
                        alt={stage.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />

                      {/* Bottom Gradient Overlay (Thickens/Darkens on Hover) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-all duration-500 ease-out group-hover:from-black/95 group-hover:via-black/55" />

                      {/* Content (Moves Up on Hover) */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <p
                          className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-white/70 uppercase mb-2"
                          style={{ fontFamily: "'Clash Display', sans-serif" }}
                        >
                          {stage.num}
                        </p>

                        <h3
                          className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3"
                          style={{ fontFamily: "'Clash Display', sans-serif" }}
                        >
                          {stage.title}
                        </h3>

                        <p className="text-[13px] text-white/80 leading-relaxed max-w-[90%] opacity-85 group-hover:opacity-100 transition-opacity duration-500">
                          {stage.body}
                        </p>

                        {stage.details && (
                          <div className="max-h-0 opacity-0 group-hover:max-h-[260px] group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden">
                            <p className="text-[12.5px] leading-relaxed text-white/70 font-sans mt-3 border-t border-white/10 pt-3">
                              {stage.details}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center gap-4 bg-neutral-900/90 text-white rounded-full p-2.5 shadow-md">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors border-0 outline-none ${
                    currentIndex === 0
                      ? "text-white/30 cursor-not-allowed"
                      : "text-white hover:bg-neutral-800 cursor-pointer"
                  }`}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="h-4 w-px bg-white/20" />
                <button
                  onClick={handleNext}
                  disabled={currentIndex === maxIndex}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors border-0 outline-none ${
                    currentIndex === maxIndex
                      ? "text-white/30 cursor-not-allowed"
                      : "text-white hover:bg-neutral-800 cursor-pointer"
                  }`}
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Technology Section */}
          <div data-tech-trigger className="mt-24 sm:mt-32">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                data-tech-header
                className="font-black leading-[0.98] tracking-[-0.03em] text-[#1f2724]"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: "clamp(2.25rem, 4.9vw, 4.05rem)",
                }}
              >
                Advanced{" "}
                <span className="italic text-[#14874f]">Technology</span>
              </h2>
              <p
                data-tech-header
                className="mt-3 text-[15px] sm:text-base text-[#3a4340] max-w-lg mx-auto font-sans font-medium"
              >
                Leveraging cutting-edge solutions for operational excellence
              </p>
            </div>

            <div
              data-tech-grid
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {TECH_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] border border-neutral-100 p-8 flex flex-col justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgb(0,0,0,0.045)] hover:border-neutral-200 cursor-default"
                >
                  <h3
                    className="text-lg font-bold text-[#1e2620] mb-3"
                    style={{
                      fontFamily: "'Clash Display', sans-serif",
                      fontSize: "20px",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-[13.5px] sm:text-sm text-[#3a4340] leading-relaxed font-sans font-medium">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Asset Section */}
          <div data-asset-trigger className="mt-24 sm:mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
              {/* Asset Description */}
              <div>
                <div
                  data-asset-copy
                  className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em]"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  <span className="h-[2px] w-4 rounded-full bg-[#ef3b3b]" />
                  <span className="text-[#ef3b3b]">Primary Asset</span>
                </div>

                <h2
                  data-asset-copy
                  className="font-black leading-[1.02] tracking-[-0.03em] text-[#1f2724]"
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: "clamp(2rem, 4.4vw, 3.45rem)",
                  }}
                >
                  Qua Iboe Field,{" "}
                  <span className="italic text-[#14874f]">PML 13</span>
                </h2>

                <p
                  data-asset-copy
                  className="mt-6 text-neutral-600 text-sm sm:text-[14.5px] leading-[1.9] max-w-[500px]"
                >
                  The Qua Iboe field in PML 13, Akwa Ibom State, is NEPN&apos;s
                  flagship operational asset, located in one of Nigeria&apos;s
                  most prolific basins with significant hydrocarbon potential.
                </p>

                <div data-asset-copy className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[2px] bg-[#1b1cff] px-6 transition-all duration-200 hover:bg-[#0000d6] font-bold tracking-[0.08em] text-white uppercase text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span>Discuss a Partnership</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Asset Specifications Table */}
              <div
                data-asset-table
                className="w-full bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden"
              >
                {/* Table Header */}
                <div className="bg-[#14874f] px-6 py-4 flex items-center gap-2.5 text-white">
                  <Clock className="w-5 h-5 shrink-0" />
                  <span
                    className="font-bold tracking-[0.06em] uppercase text-sm"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    Field Specifications
                  </span>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-neutral-100">
                  {SPEC_ROWS.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[1.2fr_1.8fr] gap-4 px-6 py-4 text-xs sm:text-sm"
                    >
                      <span className="text-neutral-500 font-semibold">
                        {row.label}
                      </span>
                      <span className="text-neutral-800 font-bold text-right sm:text-left">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Red Call To Action Banner */}
      <section className="bg-[#ED1D24]">
        <div className="mx-auto flex min-h-[140px] w-full max-w-[1280px] items-center px-[20px]">
          <div className="flex w-full justify-center">
            <div className="flex w-full max-w-[980px] flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:gap-8 md:py-0">
              {/* Text */}
              <div className="w-full max-w-[500px]">
                <h3
                  className="text-white font-bold leading-tight"
                  style={{
                    fontSize: "26px",
                  }}
                >
                  Interested in Our Operations?
                </h3>
                <p className="mt-[6px] text-white/75 text-xs sm:text-[13px] leading-relaxed font-sans">
                  Speak with our technical team about partnership opportunities.
                </p>
              </div>

              {/* Button */}
              <div className="md:ml-auto flex items-center">
                <Link
                  href="/contact"
                  className="inline-flex h-[46px] items-center justify-center gap-[10px] rounded-[2px] border-2 border-white bg-transparent transition-all duration-200 hover:bg-white hover:text-[#ED1D24] px-6 font-bold tracking-[0.08em] uppercase text-white text-xs"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
