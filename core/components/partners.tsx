"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { usePartners } from "@/core/hooks/queries/usePartners";
import { getImageUrl } from "@/core/api/client";

gsap.registerPlugin(ScrollTrigger);

// Error-handled premium Typographic Logo fallback loader
function PartnerLogo({ src, name }: { src: string; name: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="h-14 w-full flex items-center justify-center px-4 select-none">
        <span className="font-bold text-[11px] sm:text-xs tracking-wider text-neutral-400 text-center uppercase leading-tight font-sans">
          {name}
        </span>
      </div>
    );
  }

  return (
    <div className="h-14 w-full flex items-center justify-center relative px-4 transition-all duration-300 group-hover:scale-[1.04]">
      <Image
        src={src}
        alt={name}
        width={150}
        height={48}
        className="object-contain max-h-12 max-w-[85%]"
        onError={() => setError(true)}
      />
    </div>
  );
}

export default function Partners() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const heroOverlayRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLElement | null>(null);

  const [activeTab, setActiveTab] = useState<"strategic" | "top" | "jv">(
    "strategic",
  );

  // GSAP scroll trigger parallax and entrance reveals
  useEffect(() => {
    if (!rootRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const animateReveal = (
      targets: gsap.TweenTarget,
      trigger: Element | null | undefined,
      vars?: gsap.TweenVars,
    ) => {
      if (!trigger) return;

      gsap.fromTo(
        targets,
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
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
      const tabHeader = rootRef.current?.querySelectorAll("[data-tab-header]");
      const gridItems = rootRef.current?.querySelectorAll(
        "[data-grid-items] > div",
      );

      const targets: Element[] = [];
      if (heroCopy) heroCopy.forEach((el) => targets.push(el));
      if (introCopy) introCopy.forEach((el) => targets.push(el));
      if (tabHeader) tabHeader.forEach((el) => targets.push(el));
      if (gridItems) gridItems.forEach((el) => targets.push(el));

      if (targets.length) {
        gsap.set(targets, { willChange: "transform, opacity" });
      }

      // Hero animations
      if (heroCopy?.length) {
        animateReveal(heroCopy, heroRef.current, { delay: 0.2 });
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
        animateReveal(introCopy, introRef.current);
      }

      if (tabHeader?.length) {
        animateReveal(
          tabHeader,
          rootRef.current?.querySelector("[data-tab-trigger]"),
        );
      }

      if (gridItems?.length) {
        animateReveal(
          gridItems,
          rootRef.current?.querySelector("[data-tab-trigger]"),
          { delay: 0.2 },
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const { data: cmsPartners, isLoading } = usePartners();

  const rawPartners =
    cmsPartners && Array.isArray(cmsPartners.partners)
      ? cmsPartners.partners
      : [];

  const parseCmsPartners = (list: typeof rawPartners) =>
    list.map((p) => ({
      name: p.title,
      logo: getImageUrl(p.logo),
      description:
        p.description ||
        "Strategic joint venture partnership supporting Nigeria's energy infrastructure and production goals.",
    }));

  const activeStrategic = parseCmsPartners(rawPartners);
  const activeTop = parseCmsPartners(
    rawPartners.filter(
      (p) =>
        p.title.toLowerCase().includes("oando") ||
        p.title.toLowerCase().includes("nuprc") ||
        p.title.toLowerCase().includes("environment"),
    ),
  );
  const activeJv = parseCmsPartners(
    rawPartners.filter((p) => p.title.toLowerCase().includes("oando")),
  );

  const currentPartners =
    activeTab === "strategic"
      ? activeStrategic
      : activeTab === "top"
        ? activeTop
        : activeJv;

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
              src="/images/workers.jpg"
              alt="NEPN engineering team collaborating on pipeline asset"
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
                  <span className="text-white/50">Partners</span>
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
                    Partners
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Collaborations Section */}
      <section ref={introRef} className="bg-[#f4f4f4] py-16 sm:py-24">
        <div className="mx-auto max-w-[980px] px-5">
          <div
            data-intro-copy
            className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em]"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            <span className="h-[2px] w-4 rounded-full bg-[#ef3b3b]" />
            <span className="text-[#ef3b3b]">Strategic Collaborations</span>
          </div>

          <h2
            data-intro-copy
            className="font-black leading-[0.98] tracking-[-0.03em] text-[#1f2724] mb-6"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "clamp(2.25rem, 4.9vw, 4.05rem)",
            }}
          >
            Building Partnerships for{" "}
            <span className="italic text-[#14874f]">
              Nigeria&apos;s Energy Future
            </span>
          </h2>

          <p
            data-intro-copy
            className="mt-6 text-[#5d6763] text-sm sm:text-base leading-relaxed max-w-3xl font-sans"
          >
            At NEPN, we recognize that sustainable success is built on strong
            partnerships. We collaborate with industry leaders, government
            agencies, and local communities to deliver excellence across all our
            operations.
          </p>
        </div>
      </section>

      {/* Interactive Tabs Partners Section */}
      <section
        data-tab-trigger
        className="bg-[#ededed] py-16 sm:py-20 border-t border-neutral-200/50"
      >
        <div className="mx-auto max-w-[980px] px-5">
          {/* Tab buttons switcher */}
          <div className="mb-10 border-b border-neutral-200/60 flex flex-wrap justify-center sm:justify-start gap-x-8 gap-y-4">
            <button
              onClick={() => setActiveTab("strategic")}
              className={`pb-3 font-bold text-[10px] sm:text-xs tracking-[0.15em] transition-all relative uppercase cursor-pointer ${
                activeTab === "strategic"
                  ? "text-[#168241]"
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Strategic Partners
              {activeTab === "strategic" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ef3b3b]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("top")}
              className={`pb-3 font-bold text-[10px] sm:text-xs tracking-[0.15em] transition-all relative uppercase cursor-pointer ${
                activeTab === "top"
                  ? "text-[#168241]"
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Top Partners
              {activeTab === "top" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ef3b3b]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("jv")}
              className={`pb-3 font-bold text-[10px] sm:text-xs tracking-[0.15em] transition-all relative uppercase cursor-pointer ${
                activeTab === "jv"
                  ? "text-[#168241]"
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Joint Venture Partner
              {activeTab === "jv" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ef3b3b]" />
              )}
            </button>
          </div>

          {/* Dynamic grid cards based on activeTab */}
          <div
            data-grid-items
            className={`grid gap-0 ${
              activeTab === "strategic"
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                : activeTab === "top"
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-1 max-w-md"
            }`}
            style={{ border: "1px solid #e0e0e0" }}
          >
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-8 flex flex-col justify-center items-center animate-pulse"
                  style={{ border: "1px solid #e0e0e0", minHeight: "200px" }}
                >
                  <div className="w-16 h-16 bg-neutral-100 rounded-full mb-5" />
                  <div className="w-3/4 h-4 bg-neutral-100 rounded" />
                </div>
              ))
            ) : currentPartners.length === 0 ? (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                <p className="text-neutral-400 font-medium text-sm">
                  No partners found.
                </p>
              </div>
            ) : (
              currentPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="bg-white p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-colors duration-200 hover:bg-[#fafafa] group cursor-default"
                  style={{ border: "1px solid #e0e0e0", minHeight: "200px" }}
                >
                  {/* Logo */}
                  <div className="flex items-center justify-center mb-5 h-[72px]">
                    <PartnerLogo src={partner.logo} name={partner.name} />
                  </div>

                  {/* Name */}
                  <h3
                    className="text-[13px] sm:text-sm font-semibold text-[#333] leading-snug max-w-[240px]"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    {partner.name}
                  </h3>

                  {/* Description — only for non-strategic tabs */}
                  {activeTab !== "strategic" && partner.description && (
                    <p className="mt-3 text-xs text-neutral-400 leading-relaxed font-sans px-2 max-w-[280px]">
                      {partner.description}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Royal Blue Partners CTA Banner */}
      <section className="bg-[#1b1cff] relative overflow-hidden py-16 sm:py-20">
        {/* Background circular decorations */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/5 -translate-x-48 translate-y-48" />

        <div className="mx-auto max-w-[980px] px-5 relative z-10 text-center flex flex-col items-center">
          <div
            className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em] text-white/70"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            <span className="h-[2px] w-4 rounded-full bg-white/45" />
            <span>Work With Us</span>
            <span className="h-[2px] w-4 rounded-full bg-white/45" />
          </div>

          <h2
            className="font-bold leading-snug text-white mb-4 tracking-[-0.01em]"
            style={{
              fontSize: "clamp(2.2rem, 4.4vw, 3.45rem)",
            }}
          >
            Interested in Partnering With NEPN?
          </h2>

          <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl font-sans mb-10">
            We are always open to strategic alliances with organizations that
            share our vision for responsible energy development in Nigeria.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            <Link
              href="/contact"
              className="inline-flex h-[46px] w-full sm:w-[210px] items-center justify-center gap-2 rounded-[2px] bg-[#ED1D24] transition-all duration-200 hover:bg-[#d61920] font-bold tracking-[0.08em] text-white uppercase text-xs shadow-md border-0 outline-none"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex h-[46px] w-full sm:w-[170px] items-center justify-center rounded-[2px] border-2 border-white bg-transparent transition-all duration-200 hover:bg-white hover:text-[#1b1cff] font-bold tracking-[0.08em] text-white uppercase text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span>Learn About NEPN</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
