"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STORY_FACTS = [
  { label: "Founded", value: "2001", color: "#14874f" },
  { label: "Headquarters", value: "Ikoyi, Lagos", color: "#ef3b3b" },
  { label: "Field Office", value: "Ibeno, Akwa Ibom", color: "#2647ff" },
  { label: "Primary Asset", value: "Qua Iboe, OML 13", color: "#14874f" },
];

const MILESTONES = [
  {
    year: "2001",
    title: "Company Founded",
    body: "NEPN incorporated as a fully indigenous Nigerian oil and gas company committed to responsible energy development.",
    color: "#14874f",
  },
  {
    year: "2005",
    title: "Qua Iboe Exploration Begins",
    body: "First seismic surveys commenced in the Qua Iboe field, OML 13, Akwa Ibom State.",
    color: "#ef3b3b",
  },
  {
    year: "2012",
    title: "Field Office Established",
    body: "Operational field office opened at 5 Terminal Road, Inua Eyet Ikot, Ibeno LGA, Akwa Ibom State.",
    color: "#2647ff",
  },
  {
    year: "2018",
    title: "Production Growth",
    body: "Significant production milestones achieved, cementing NEPN as a credible indigenous operator.",
    color: "#14874f",
  },
  {
    year: "2024+",
    title: "Net Zero Commitment",
    body: "Net zero roadmap formalised; expanded community development and environmental management deployed.",
    color: "#ef3b3b",
  },
];

const FEATURE_SPLITS = [
  {
    image: "/images/production.jpg",
    alt: "NEPN production infrastructure",
    eyebrow: "OUR MISSION",
    title: "Responsible Energy Development",
    body: "To explore, develop, and produce hydrocarbon resources in Nigeria with the highest levels of technical expertise, safety, and environmental stewardship - creating sustainable value for shareholders, employees, host communities, and the nation of Nigeria.",
    panelColor: "#168441",
    eyebrowAccent: "rgba(255,255,255,0.75)",
    textColor: "rgba(255,255,255,0.84)",
    titleWidth: "max-w-[340px]",
  },
  {
    image: "/images/machine.jpg",
    alt: "NEPN team working around gas oil separation equipment",
    eyebrow: "OUR VISION",
    title: "Nigeria's Preeminent Indigenous Operator",
    body: "To be the preeminent indigenous exploration and production company in Nigeria - a globally respected operator known for technical excellence, transparent governance, and transformative community impact that leaves a lasting legacy for future generations.",
    panelColor: "#1b1cff",
    eyebrowAccent: "rgba(255,255,255,0.78)",
    textColor: "rgba(255,255,255,0.84)",
    titleWidth: "max-w-[420px]",
  },
];

const LEADERSHIP = [
  {
    image: "/slides/slide-3.jpg",
    alt: "Executive leadership team",
    name: "Executive Director",
    role: "OIL AND GAS VISIONARY",
    body: "Visionary leadership driving NEPN's strategic growth and regional influence, backed by over 25 years in the sector.",
  },
  {
    image: "/images/operation director.png",
    alt: "Operations director supervising field personnel",
    name: "Operations Director",
    role: "UPSTREAM SPECIALIST",
    body: "Engineering excellence and operational safety, overseeing all field operations and drilling programmes in OML 13.",
  },
  {
    image: "/images/finance director.png",
    alt: "Finance director reviewing field instrumentation",
    name: "Finance Director",
    role: "RESOURCE STRATEGIST",
    body: "Ensuring financial discipline, investor confidence, and capital allocation efficiency to support long-term growth.",
  },
];

export default function WhoWeAre() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const storyRef = useRef<HTMLElement | null>(null);
  const detailRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const heroOverlayRef = useRef<HTMLDivElement | null>(null);

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

      const heroBars = rootRef.current?.querySelectorAll("[data-hero-bar]");
      const heroCopy = rootRef.current?.querySelectorAll("[data-hero-copy]");
      const storyLeft = storyRef.current?.querySelectorAll("[data-story-left]");
      const storyRight = storyRef.current?.querySelectorAll("[data-story-right]");
      const gridCells = detailRef.current?.querySelectorAll("[data-grid-cell]");
      const leadershipHeader =
        detailRef.current?.querySelectorAll("[data-leadership-header]");
      const leadershipCards =
        detailRef.current?.querySelectorAll("[data-leadership-card]");
      const ctaParts = ctaRef.current?.querySelectorAll("[data-cta-part]");

      gsap.set(
        [
          heroBars,
          heroCopy,
          storyLeft,
          storyRight,
          gridCells,
          leadershipHeader,
          leadershipCards,
          ctaParts,
        ],
        { willChange: "transform, opacity" },
      );

      if (heroBars?.length) {
        gsap.fromTo(
          heroBars,
          { opacity: 0, scaleX: 0.85 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            transformOrigin: "center center",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

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

      if (storyLeft?.length) animateStagger(storyLeft, storyRef.current);
      if (storyRight?.length) animateStagger(storyRight, storyRef.current, { delay: 0.1 });

      const storyLine = storyRef.current?.querySelector("[data-story-line]");
      if (storyLine) {
        gsap.fromTo(
          storyLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.9,
            ease: "power2.out",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      if (gridCells?.length) animateStagger(gridCells, detailRef.current);
      if (leadershipHeader?.length) {
        animateStagger(leadershipHeader, detailRef.current, { delay: 0.18 });
      }
      if (leadershipCards?.length) {
        animateStagger(leadershipCards, detailRef.current, { delay: 0.28 });
      }
      if (ctaParts?.length) animateStagger(ctaParts, ctaRef.current);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="w-full bg-[#f4f4f4]"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      <section
        ref={heroRef}
        className="relative isolate w-full overflow-hidden bg-[#0a1210]"
      >
        <div
          data-hero-bar
          className="absolute inset-x-0 top-0 z-30 flex h-[3px] md:h-[4px]"
        >
          <span className="h-full basis-[45%] bg-[#179768]" />
          <span className="h-full basis-[29%] bg-[#ea2a2d]" />
          <span className="h-full basis-[26%] bg-[#143fe2]" />
        </div>

        <div
          data-hero-bar
          className="absolute inset-x-0 bottom-0 z-30 flex h-[3px] md:h-[4px]"
        >
          <span className="h-full basis-[45%] bg-[#1bc7f0]" />
          <span className="h-full basis-[27%] bg-[#ed2a24]" />
          <span className="h-full basis-[28%] bg-[#173fe3]" />
        </div>

        <div className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[330px] lg:min-h-[372px]">
          <div ref={heroImageRef} className="absolute inset-0">
            <Image
              src="/slides/slide-3.jpg"
              alt="NEPN field operations team"
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

          <div className="absolute inset-x-0 bottom-0 z-20">
            <div className="mx-auto flex w-full max-w-[1250px] items-end px-5 pb-6 pt-20 sm:px-8 sm:pb-8 sm:pt-24 md:px-10 md:pb-9 md:pt-28 lg:px-10 lg:pb-10">
              <div className="max-w-[760px]">
                <div
                  data-hero-copy
                  className="mb-2.5 flex flex-wrap items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:mb-3 sm:text-[9px] md:text-[10px]"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  <Link href="/" className="transition-colors duration-200 hover:text-white">
                    Home
                  </Link>
                  <span className="text-white/35">/</span>
                  <span className="text-white/50">Who We Are</span>
                </div>

                <h1
                  data-hero-copy
                  className="font-black leading-[0.94] tracking-[-0.035em] text-white"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(2.45rem, 6vw, 4.5rem)",
                    textShadow: "0 10px 30px rgba(0,0,0,0.28)",
                  }}
                >
                  Who We <span className="text-[#71f0bc]">Are</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={storyRef} className="bg-[#f4f4f4] py-11 sm:py-14 lg:py-[54px]">
        <div className="mx-auto max-w-[1250px] px-5 sm:px-8 md:px-10 lg:px-8 xl:px-10">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.98fr)] lg:gap-12">
            <div>
              <div
                data-story-left
                className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <span className="h-[2px] w-4 rounded-full bg-[#ef3b3b]" />
                <span className="text-[#0f8f55]">Our Story</span>
              </div>

              <h2
                data-story-left
                className="max-w-[590px] font-black leading-[0.98] tracking-[-0.03em] text-[#1f2724]"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2.25rem, 4.9vw, 4.05rem)",
                }}
              >
                Nigeria&apos;s Leading <span className="text-[#14874f]">Indigenous</span>
                <br />
                <span className="text-[#14874f]">E&amp;P Company</span>
              </h2>

              <div
                data-story-left
                className="mt-5 h-[3px] w-10 rounded-full bg-[#14874f]"
              />

              <div
                className="mt-7 max-w-[560px] space-y-7 text-[15px] leading-[2.02] text-[#5d6763] sm:text-[16px]"
              >
                <p data-story-left>
                  Network E&amp;P Nigeria Limited (NEPN) is a fully Nigerian-owned
                  oil and gas company dedicated to promoting sustainable energy
                  solutions throughout Nigeria.
                </p>
                <p data-story-left>
                  Since 2001, we have been at the forefront of exploring and
                  developing the Qua Iboe field in OML 13, playing a vital role in
                  meeting the nation&apos;s energy needs.
                </p>
                <p data-story-left>
                  We are proud to be 100% Nigerian-owned and operated, a testament
                  to the vision that indigenous companies can lead and excel in one
                  of the world&apos;s most technically demanding industries.
                </p>
              </div>

              <div
                className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:max-w-[540px]"
              >
                {STORY_FACTS.map((fact) => (
                  <div
                    data-story-left
                    key={fact.label}
                    className="border-l-[3px] pl-3"
                    style={{ borderColor: fact.color }}
                  >
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.26em]"
                      style={{
                        color: fact.color,
                        fontFamily: "'Barlow Condensed', sans-serif",
                      }}
                    >
                      {fact.label}
                    </p>
                    <p className="mt-1 text-[14px] leading-relaxed text-[#5b6762]">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div
                data-story-right
                className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <span className="h-[2px] w-4 rounded-full bg-[#0f8f55]" />
                <span className="text-[#ef3b3b]">Our Journey</span>
              </div>

              <h2
                data-story-right
                className="font-black leading-[0.98] tracking-[-0.03em] text-[#1f2724]"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2.15rem, 4.6vw, 3.9rem)",
                }}
              >
                A History of <span className="text-[#14874f]">Milestones</span>
              </h2>

              <div className="relative mt-8 pl-0.5">
                <div
                  data-story-line
                  className="absolute bottom-0 left-[10px] top-[14px] w-px origin-top bg-[#d7dbd8]"
                />

                <div className="space-y-7">
                  {MILESTONES.map((item) => (
                    <div
                      data-story-right
                      key={`${item.year}-${item.title}`}
                      className="relative grid grid-cols-[22px_1fr] gap-x-4"
                    >
                      <div
                        className="relative z-10 mt-[3px] flex h-[22px] w-[22px] items-center justify-center rounded-full text-[8px] font-black text-white"
                        style={{
                          background: item.color,
                          fontFamily: "'Barlow Condensed', sans-serif",
                        }}
                      >
                        {item.year.slice(0, 2)}
                      </div>

                      <div className="pb-0.5">
                        <p
                          className="text-[13px] font-bold tracking-[0.02em]"
                          style={{
                            color: item.color,
                            fontFamily: "'Barlow Condensed', sans-serif",
                          }}
                        >
                          {item.year}
                        </p>
                        <h3 className="mt-1 text-[18px] font-bold leading-tight text-[#28322e]">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 max-w-[470px] text-[14px] leading-[1.75] text-[#6a7570]">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={detailRef} className="bg-[#ededed] py-0">
        <div className="mx-auto max-w-[1280px] overflow-hidden">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-[711.114624px_568.885437px] lg:grid-rows-[480px]">
              <div
                data-grid-cell
                className="relative min-h-[270px] overflow-hidden sm:min-h-[330px] lg:h-[480px] lg:min-h-0"
              >
                <Image
                  src={FEATURE_SPLITS[0].image}
                  alt={FEATURE_SPLITS[0].alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 711px"
                />
              </div>

              <div
                data-grid-cell
                className="flex min-h-[270px] items-center bg-[#168441] px-8 py-10 sm:min-h-[330px] sm:px-10 md:px-11 lg:h-[480px] lg:min-h-0 lg:px-12"
              >
                <div className="max-w-[390px]">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="h-px w-5 rounded-full bg-white/45" />
                    <p
                      className="text-[9px] font-bold uppercase tracking-[0.3em]"
                      style={{
                        color: FEATURE_SPLITS[0].eyebrowAccent,
                        fontFamily: "'Barlow Condensed', sans-serif",
                      }}
                    >
                      {FEATURE_SPLITS[0].eyebrow}
                    </p>
                  </div>
                  <h3
                    className={`${FEATURE_SPLITS[0].titleWidth} text-[28px] font-black leading-[1.04] text-white sm:text-[31px] lg:text-[32px]`}
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {FEATURE_SPLITS[0].title}
                  </h3>
                  <div className="mt-4 h-[2px] w-8 rounded-full bg-white/38" />
                  <p
                    className="mt-5 max-w-[360px] text-[12px] leading-[1.92] sm:text-[12.5px]"
                    style={{ color: FEATURE_SPLITS[0].textColor }}
                  >
                    {FEATURE_SPLITS[0].body}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[568.885437px_711.114624px] lg:grid-rows-[480px]">
              <div
                data-grid-cell
                className="relative min-h-[270px] overflow-hidden sm:min-h-[330px] lg:h-[480px] lg:min-h-0"
              >
                <Image
                  src={FEATURE_SPLITS[1].image}
                  alt={FEATURE_SPLITS[1].alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 569px"
                />
              </div>

              <div
                data-grid-cell
                className="flex min-h-[270px] items-center bg-[#1b1cff] px-8 py-10 sm:min-h-[330px] sm:px-10 md:px-11 lg:h-[480px] lg:min-h-0 lg:px-[40px]"
              >
                <div className="w-full max-w-[607px]">
                  <div className="mb-5 flex w-full max-w-[607.11px] items-center gap-3">
                    <span className="h-px w-5 rounded-full bg-white/45" />
                    <p
                      className="text-[9px] font-bold uppercase tracking-[0.3em]"
                      style={{
                        color: FEATURE_SPLITS[1].eyebrowAccent,
                        fontFamily: "'Barlow Condensed', sans-serif",
                      }}
                    >
                      {FEATURE_SPLITS[1].eyebrow}
                    </p>
                    <span className="h-px flex-1 rounded-full bg-white/45" />
                  </div>
                  <h3
                    className={`${FEATURE_SPLITS[1].titleWidth} text-[28px] font-black leading-[1.04] text-white sm:text-[31px] lg:text-[32px]`}
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {FEATURE_SPLITS[1].title}
                  </h3>
                  <div className="mt-4 h-[2px] w-8 rounded-full bg-white/38" />
                  <p
                    className="mt-5 max-w-[607px]"
                    style={{
                      color: "#FFFFFFB8",
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: "14.4px",
                      lineHeight: "25.63px",
                      letterSpacing: "0%",
                    }}
                  >
                    {FEATURE_SPLITS[1].body}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-12">
            <div className="mx-auto max-w-[980px]">
              <div
                data-leadership-header
                className="mb-2 flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <span className="h-[2px] w-4 rounded-full bg-[#ef3b3b]" />
                <span className="text-[#ef3b3b]">Leadership</span>
              </div>

              <h2
                data-leadership-header
                className="text-center font-black leading-[1.02] tracking-[-0.03em] text-[#222a28]"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2rem, 4.4vw, 3.45rem)",
                }}
              >
                Guided by <span className="text-[#168241]">Experienced Hands</span>
              </h2>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {LEADERSHIP.map((member) => (
                  <article
                    data-leadership-card
                    key={member.name}
                    className="group"
                  >
                    <div className="relative aspect-[1.18/1] overflow-hidden bg-white">
                      <Image
                        src={member.image}
                        alt={member.alt}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                    </div>

                    <div className="pt-3">
                      <h3
                        className="text-[13px] font-black leading-tight text-[#222a28]"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {member.name}
                      </h3>
                      <p
                        className="mt-1 text-[8.5px] font-bold uppercase tracking-[0.24em] text-[#ef3b3b]"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {member.role}
                      </p>
                      <p className="mt-2 max-w-[250px] text-[11px] leading-[1.65] text-[#5c6661]">
                        {member.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="bg-[#eb1f25]">
        <div className="mx-auto flex max-w-[1250px] flex-col gap-5 px-5 py-5 sm:px-8 sm:py-6 md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
          <div data-cta-part>
            <p
              className="text-[17px] font-black tracking-[-0.02em] text-white sm:text-[20px]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Interested in Partnering?
            </p>
            <p className="mt-1 max-w-[520px] text-[12px] leading-[1.7] text-white/75 sm:text-[13px]">
              Speak with our team about operations, partnerships, and long-term
              energy development opportunities.
            </p>
          </div>

          <div data-cta-part>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/35 bg-[#111111] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-all duration-200 hover:bg-white hover:text-[#eb1f25]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800;900&family=Poppins:wght@400&display=swap');
      `}</style>
    </div>
  );
}
