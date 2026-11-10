"use client";

import Link from "next/link";
import { ENVIRONMENT_INTRO, COMMUNITY_INTRO } from "@/core/content/corporate";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useGallery } from "@/core/hooks/queries/useGallery";
import { getImageUrl } from "@/core/api/client";

const CsrSkeletonCard = () => (
  <div className="group relative h-[250px] sm:h-[270px] rounded-2xl overflow-hidden shadow-sm border border-neutral-200/50 bg-neutral-200 animate-pulse" />
);

gsap.registerPlugin(ScrollTrigger);

const EHS_CARDS = [
  {
    image: "/images/safety.jpg",
    title: "Safety First",
    body: "Zero-harm workplace culture with comprehensive safety training and protocols.",
      },
  {
    image: "/images/sick_bed.jpg",
    title: "Health & Wellbeing",
    body: "Comprehensive health programs for employees and host communities.",
      },
  {
    image: "/images/environment.jpg",
    title: "Environmental Protection",
    body: "Rigorous environmental management and monitoring systems.",
      },
];

const CSR_CARDS = [
  {
    image: "/images/corporate_1.jpg",
    text: "Construction and Furnishing of existing Town Hall Phase 1 at Okoritak Host Community",
  },
  {
    image: "/images/corporate_2.jpg",
    text: "Skill Acquisition Training for 40 Beneficiaries (Short Courses in Computer Engineering Programs)",
  },
  {
    image: "/images/corporate_3.jpg",
    text: "Industrial Certification (BOSIET & OSP) for the Host community youth",
  },
  {
    image: "/images/corporate_4.jpg",
    text: "Procure and install 1Nos 100kva Electricity Stepdown Transformer in a section of Iuoachang Host Community.",
  },
  {
    image: "/images/corporate_5.jpg",
    text: "HOST COMMUNITY TRADITIONAL LEADERS AND REGULATORS INAUGURATION OF NOJI HCDT BOT MEMBERS",
  },
  {
    image: "/images/corporate_6.jpg",
    text: "Maintenance of Toilet Facility for Ibuildwuokpom community, Ibeno LGA",
  },
];

const COMPLIANCE_ITEMS = [
  "Environmental compliance and monitoring",
  "Greenhouse gas emissions monitoring",
  "Waste management and responsible resource utilization",
  "Asset integrity and process safety",
  "Continuous improvement in operational practices"
];



export default function Sustainability() {
  const { data: galleryItems, isLoading } = useGallery();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const heroOverlayRef = useRef<HTMLDivElement | null>(null);
  const commitmentRef = useRef<HTMLElement | null>(null);

  const currentCsrCards =
    Array.isArray(galleryItems) && galleryItems.length > 0
      ? galleryItems.map((item) => ({
          image: getImageUrl(item.image),
          text: item.description
            ? `${item.title} - ${item.description}`
            : item.title,
        }))
      : CSR_CARDS;

  // GSAP animations for parallax and entrance reveals
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
      const commitCopy =
        rootRef.current?.querySelectorAll("[data-commit-copy]");
      const ehsHeader = rootRef.current?.querySelectorAll("[data-ehs-header]");
      const ehsGrid = rootRef.current?.querySelectorAll(
        "[data-ehs-grid] > div",
      );
      const safetyCopy =
        rootRef.current?.querySelectorAll("[data-safety-copy]");
      const safetyCard =
        rootRef.current?.querySelectorAll("[data-safety-card]");
      const csrHeader = rootRef.current?.querySelectorAll("[data-csr-header]");
      const csrGrid = rootRef.current?.querySelectorAll(
        "[data-csr-grid] > div",
      );
const statsBar = rootRef.current?.querySelectorAll(
        "[data-stats-bar] > div",
      );

      const targets: Element[] = [];
      if (heroCopy) heroCopy.forEach((el) => targets.push(el));
      if (commitCopy) commitCopy.forEach((el) => targets.push(el));
      if (ehsHeader) ehsHeader.forEach((el) => targets.push(el));
      if (ehsGrid) ehsGrid.forEach((el) => targets.push(el));
      if (safetyCopy) safetyCopy.forEach((el) => targets.push(el));
      if (safetyCard) safetyCard.forEach((el) => targets.push(el));
      if (csrHeader) csrHeader.forEach((el) => targets.push(el));
      if (csrGrid) csrGrid.forEach((el) => targets.push(el));
if (statsBar) statsBar.forEach((el) => targets.push(el));

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
      if (commitCopy?.length) {
        animateReveal(commitCopy, commitmentRef.current);
      }

      if (ehsHeader?.length) {
        animateReveal(
          ehsHeader,
          rootRef.current?.querySelector("[data-ehs-trigger]"),
        );
      }

      if (ehsGrid?.length) {
        animateReveal(
          ehsGrid,
          rootRef.current?.querySelector("[data-ehs-trigger]"),
          { delay: 0.2 },
        );
      }

      if (safetyCopy?.length) {
        animateReveal(
          safetyCopy,
          rootRef.current?.querySelector("[data-safety-trigger]"),
        );
      }

      if (safetyCard?.length) {
        animateReveal(
          safetyCard,
          rootRef.current?.querySelector("[data-safety-trigger]"),
          { delay: 0.25 },
        );
      }

      if (csrHeader?.length) {
        animateReveal(
          csrHeader,
          rootRef.current?.querySelector("[data-csr-trigger]"),
        );
      }

      if (csrGrid?.length) {
        animateReveal(
          csrGrid,
          rootRef.current?.querySelector("[data-csr-trigger]"),
          { delay: 0.25 },
        );
      }




    }, rootRef);

    return () => ctx.revert();
  }, [isLoading]);

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
              src="/images/sustainability_bg.jpg"
              alt="NEPN clean oil and gas processing infrastructure"
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
                  <span className="text-white/50">Sustainability</span>
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
                  Sustainability at{" "}
                  <span
                    className="italic text-[#82E8B4]"
                    style={{
                      fontWeight: 700,
                      fontSize: "clamp(30px, 7.5vw, 51.2px)",
                      lineHeight: "1.15",
                      letterSpacing: "0%",
                    }}
                  >
                    NEPN
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section ref={commitmentRef} className="bg-[#f4f4f4] py-16 sm:py-24">
        <div className="mx-auto max-w-[980px] px-5 text-center">
          <div
            data-commit-copy
            className="mb-3 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em]"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            <span className="h-[2px] w-4 rounded-full bg-[#ef3b3b]" />
            <span className="text-[#0f8f55]">Our Commitment</span>
          </div>

          <h2
            data-commit-copy
            className="font-black leading-[0.98] tracking-[-0.03em] text-[#1f2724]"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "clamp(2.25rem, 4.9vw, 4.05rem)",
            }}
          >
            Greener and More{" "}
            <span className="italic text-[#14874f]">Responsible Operations</span>
          </h2>

          {ENVIRONMENT_INTRO.map((paragraph) => (<p key={paragraph}
            data-commit-copy
            className="mt-6 text-[#3a4340] text-[15px] sm:text-base leading-[1.8] max-w-3xl mx-auto font-sans font-medium"
          >{paragraph}</p>))}
        </div>
      </section>

      {/* EHS Excellence Section */}
      <section data-ehs-trigger className="bg-[#ededed] py-16 sm:py-24">
        <div className="mx-auto max-w-[980px] px-5">
          <h2
            data-ehs-header
            className="font-black leading-[0.98] tracking-[-0.03em] text-[#1f2724] mb-6"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "clamp(2rem, 4.6vw, 3.6rem)",
            }}
          >
            Environmental, Health, and Safety <br />
            <span className="italic text-[#14874f]">(EHS) Excellence</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-[#3a4340] text-[15px] leading-[1.8] font-sans font-medium mb-12">
            <p data-ehs-header>
              NEPN demonstrates a strong commitment to Environment, Health &
              Safety (EHS) through approved regulatory compliance and proactive
              environmental management. It successfully obtained Environmental
              Impact Assessment (EIA) approval for the Qua Ibo Field Development
              Project from the Department of Petroleum Resources (DPR) and the
              Federal Ministry of Environment (FMENV), based on a study
              conducted by the University of Uyo Consultancy Limited. To
              minimize environmental and community impact, all development wells
              are directionally drilled from a single location situated away
              from villages, while production facilities are placed
              approximately 800 meters from the wellheads. Even as future
              operations may require additional drilling locations for optimal
              reservoir performance, environmental protection and community
              safety remain key priorities.
            </p>
            <p data-ehs-header>
              NEPN operates a structured HSE Management System that identifies
              hazards, evaluates and prioritizes risks, and implements
              mitigation measures, with continuous monitoring and improvement
              built into all operations. This system protects employees,
              contractors, equipment, host communities, the public, and the
              environment, while ensuring compliance with industry standards
              across facility design, asset lifecycle, and operational
              activities. Safe operations are supported by continuous risk assessment, monitoring and improvement.
            </p>
          </div>

          <div data-ehs-grid className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {EHS_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default group"
              >
                <div className="relative h-[180px] overflow-hidden bg-neutral-100">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#1e2620] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[13px] sm:text-[13.5px] text-neutral-600 leading-relaxed font-sans font-medium mb-4">
                      {card.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Compliance Section */}
      <section data-safety-trigger className="bg-[#f4f4f4] py-16 sm:py-24">
        <div className="mx-auto max-w-[980px] px-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
            {/* Checklist */}
            <div>
              <h2
                data-safety-copy
                className="font-black leading-[1.02] text-[#1b1cff] mb-6"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: "clamp(2rem, 4.4vw, 3.45rem)",
                }}
              >
                Safety & Compliance
              </h2>

              <p
                data-safety-copy
                className="text-[#3a4340] text-[15px] sm:text-[15px] leading-relaxed mb-8 font-sans font-medium"
              >
                Safety is our top priority. Every operation is conducted in
                strict adherence to international safety standards and Nigerian
                regulatory requirements.
              </p>

              <ul
                data-safety-copy
                className="space-y-4 font-sans text-xs sm:text-sm text-[#4a5550]"
              >
                {COMPLIANCE_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#14874f] shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Caution Sign Card */}
            <div
              data-safety-card
              className="relative rounded-[24px] overflow-hidden aspect-square w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-end p-8 sm:p-10 md:p-12 group cursor-default"
            >
              <Image
                src="/images/safety_sign.jpg"
                alt="NEPN Operations Warning Shield"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              {/* Stats & Description Overlay */}
              <div className="relative z-10 flex flex-col items-start text-left">

                <p
                  className="text-white font-semibold leading-snug text-sm sm:text-base max-w-[85%]"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Protecting people, communities and the environment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Social Responsibility Section */}
      <section data-csr-trigger className="bg-[#ededed] py-16 sm:py-24">
        <div className="mx-auto max-w-[980px] px-5">
          <div className="text-center mb-12 sm:mb-16">
            <h2
              data-csr-header
              className="font-black leading-[0.98] tracking-[-0.03em] text-[#ef3b3b] mb-4"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(2.25rem, 4.9vw, 4.05rem)",
              }}
            >
              Host Community Development
            </h2>
            {COMMUNITY_INTRO.map((paragraph) => (<p key={paragraph}
              data-csr-header
              className="mt-3 text-[15px] sm:text-base text-[#3a4340] max-w-3xl mx-auto leading-[1.8] font-sans font-medium"
            >{paragraph}</p>))}
          </div>

          {/* CSR Image cards grid */}
          <div data-csr-grid className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isLoading ? (
              <>
                <CsrSkeletonCard />
                <CsrSkeletonCard />
                <CsrSkeletonCard />
              </>
            ) : currentCsrCards.length === 0 ? (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                <p className="text-neutral-500 font-semibold text-sm">
                  No CSR projects found.
                </p>
              </div>
            ) : (
              currentCsrCards.map((card, index) => (
                <div
                  key={index}
                  className="group relative h-[250px] sm:h-[270px] rounded-2xl overflow-hidden shadow-sm border border-neutral-200/50 cursor-default"
                >
                  <Image
                    src={card.image}
                    alt="NEPN Corporate Social Responsibility Project"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />

                  {/* Thickens/Darkens on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-all duration-500 ease-out group-hover:from-black/95 group-hover:via-black/55" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <p className="text-[11px] sm:text-[12px] text-white leading-relaxed font-sans max-w-[95%] opacity-90 group-hover:opacity-100 transition-opacity duration-500 font-semibold">
                      {card.text}
                    </p>
                  </div>
                </div>
              ))
            )}
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
                  Our Sustainability Journey
                </h3>
                <p className="mt-[6px] text-white/75 text-xs sm:text-[13px] leading-relaxed font-sans">
                  Learn more about our environmental and community commitments.
                </p>
              </div>

              {/* Button */}
              <div className="md:ml-auto flex items-center">
                <Link
                  href="/contact"
                  className="inline-flex h-[46px] items-center justify-center gap-[10px] rounded-[2px] border-2 border-white bg-transparent transition-all duration-200 hover:bg-white hover:text-[#ED1D24] px-6 font-bold tracking-[0.08em] uppercase text-white text-xs"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span>Get In Touch</span>
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
