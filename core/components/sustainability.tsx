"use client";

import Link from "next/link";
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
        image: "/images/workers.jpg",
        title: "Safety First",
        body: "Zero-harm workplace culture with comprehensive safety training and protocols.",
        metric: "0 LTI in 2025",
    },
    {
        image: "/slides/slide-1.jpg",
        title: "Health & Wellbeing",
        body: "Comprehensive health programs for employees and host communities.",
        metric: "2000+ beneficiaries",
    },
    {
        image: "/images/sustainability.jpg",
        title: "Environmental Protection",
        body: "Rigorous environmental management and monitoring systems.",
        metric: "40% emission reduction",
    },
];

const CSR_CARDS = [
    {
        image: "/slides/slide-3.jpg",
        text: "Construction and Furnishing of existing Town Hall Phase 1 at Okoritak Host Community",
    },
    {
        image: "/images/machine.jpg",
        text: "Skill Acquisition Training for 40 Beneficiaries (Short Courses in Computer Engineering Programs)",
    },
    {
        image: "/images/workers.jpg",
        text: "Industrial Certification (BOSIET & OSP) for the Host community youth",
    },
    {
        image: "/images/facility.jpg",
        text: "Procure and install 1Nos 100kva Electricity Stepdown Transformer in a section of Iuoachang Host Community.",
    },
    {
        image: "/images/operations.jpg",
        text: "HOST COMMUNITY TRADITIONAL LEADERS AND REGULATORS INAUGURATION OF NOJI HCDT BOT MEMBERS",
    },
    {
        image: "/images/production.jpg",
        text: "Maintenance of Toilet Facility for Ibuildwuokpom community, Ibeno LGA",
    },
];

const COMPLIANCE_ITEMS = [
    "ISO 45001 Occupational Health & Safety certified",
    "API 510, 570, and 653 compliance",
    "DPR (Department of Petroleum Resources) approved",
    "Regular third-party safety audits",
    "Comprehensive emergency response plans",
];

const PERFORMANCE_METRICS = [
    {
        label: "Complete environmental baseline studies",
        value: "In Progress - 2026",
    },
    {
        label: "Achieve ISO 14001 certification",
        value: "Planned - 2028",
    },
    {
        label: "50% reduction in carbon intensity",
        value: "Target - 2030",
    },
    {
        label: "Compliance Rate",
        value: "100%",
    },
];

export default function Sustainability() {
    const { data: galleryItems, isLoading } = useGallery();
    const rootRef = useRef<HTMLDivElement | null>(null);
    const heroRef = useRef<HTMLElement | null>(null);
    const heroImageRef = useRef<HTMLDivElement | null>(null);
    const heroOverlayRef = useRef<HTMLDivElement | null>(null);
    const commitmentRef = useRef<HTMLElement | null>(null);

    const currentCsrCards = galleryItems && galleryItems.length > 0
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
            const commitCopy = rootRef.current?.querySelectorAll("[data-commit-copy]");
            const ehsHeader = rootRef.current?.querySelectorAll("[data-ehs-header]");
            const ehsGrid = rootRef.current?.querySelectorAll("[data-ehs-grid] > div");
            const safetyCopy = rootRef.current?.querySelectorAll("[data-safety-copy]");
            const safetyCard = rootRef.current?.querySelectorAll("[data-safety-card]");
            const csrHeader = rootRef.current?.querySelectorAll("[data-csr-header]");
            const csrGrid = rootRef.current?.querySelectorAll("[data-csr-grid] > div");
            const impactCopy = rootRef.current?.querySelectorAll("[data-impact-copy]");
            const statsBar = rootRef.current?.querySelectorAll("[data-stats-bar] > div");

            const targets: Element[] = [];
            if (heroCopy) heroCopy.forEach((el) => targets.push(el));
            if (commitCopy) commitCopy.forEach((el) => targets.push(el));
            if (ehsHeader) ehsHeader.forEach((el) => targets.push(el));
            if (ehsGrid) ehsGrid.forEach((el) => targets.push(el));
            if (safetyCopy) safetyCopy.forEach((el) => targets.push(el));
            if (safetyCard) safetyCard.forEach((el) => targets.push(el));
            if (csrHeader) csrHeader.forEach((el) => targets.push(el));
            if (csrGrid) csrGrid.forEach((el) => targets.push(el));
            if (impactCopy) impactCopy.forEach((el) => targets.push(el));
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
                animateReveal(ehsHeader, rootRef.current?.querySelector("[data-ehs-trigger]"));
            }

            if (ehsGrid?.length) {
                animateReveal(ehsGrid, rootRef.current?.querySelector("[data-ehs-trigger]"), { delay: 0.2 });
            }

            if (safetyCopy?.length) {
                animateReveal(safetyCopy, rootRef.current?.querySelector("[data-safety-trigger]"));
            }

            if (safetyCard?.length) {
                animateReveal(safetyCard, rootRef.current?.querySelector("[data-safety-trigger]"), { delay: 0.25 });
            }

            if (csrHeader?.length) {
                animateReveal(csrHeader, rootRef.current?.querySelector("[data-csr-trigger]"));
            }

            if (csrGrid?.length) {
                animateReveal(csrGrid, rootRef.current?.querySelector("[data-csr-trigger]"), { delay: 0.25 });
            }

            if (impactCopy?.length) {
                animateReveal(impactCopy, rootRef.current?.querySelector("[data-impact-trigger]"));
            }

            if (statsBar?.length) {
                animateReveal(statsBar, rootRef.current?.querySelector("[data-stats-trigger]"));
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
                <div
                    className="absolute inset-x-0 bottom-0 z-30 flex h-[3px] md:h-[4px]"
                >
                    <span className="h-full basis-[45%] bg-[#1bc7f0]" />
                    <span className="h-full basis-[27%] bg-[#ed2a24]" />
                    <span className="h-full basis-[28%] bg-[#173fe3]" />
                </div>

                <div className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[330px] lg:min-h-[372px]">
                    <div ref={heroImageRef} className="absolute inset-0">
                        <Image
                            src="/images/sustainability.jpg"
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
                                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
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
                                        fontFamily: "'Poppins', sans-serif",
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
                                            fontFamily: "'Poppins', sans-serif",
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
            <section
                ref={commitmentRef}
                className="bg-[#f4f4f4] py-16 sm:py-24"
            >
                <div className="mx-auto max-w-[980px] px-5 text-center">
                    <div
                        data-commit-copy
                        className="mb-3 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em]"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        <span className="h-[2px] w-4 rounded-full bg-[#ef3b3b]" />
                        <span className="text-[#0f8f55]">Our Commitment</span>
                    </div>

                    <h2
                        data-commit-copy
                        className="font-black leading-[0.98] tracking-[-0.03em] text-[#1f2724]"
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(2.25rem, 4.9vw, 4.05rem)",
                        }}
                    >
                        Building a <span className="italic text-[#14874f]">Sustainable Future</span>
                    </h2>

                    <p
                        data-commit-copy
                        className="mt-6 text-[#5d6763] text-sm sm:text-base leading-[1.8] max-w-3xl mx-auto font-sans"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Sustainability is central to the Company&apos;s long-term value creation, supporting Nigeria&apos;s economic growth through energy supply, job creation, infrastructure development, and government revenue. Its shared value approach ensures benefits for employees, partners, host communities, and society, while promoting high industry standards. The Company emphasizes transparency and accountability, continuously improving its sustainability performance and aligning its reporting with global standards such as the Global Reporting Initiative (GRI) and International Finance Corporation (IFC).
                    </p>
                </div>
            </section>

            {/* EHS Excellence Section */}
            <section data-ehs-trigger className="bg-[#ededed] py-16 sm:py-24">
                <div className="mx-auto max-w-[980px] px-5">

                    <h2
                        data-ehs-header
                        className="font-black leading-[0.98] tracking-[-0.03em] text-[#1f2724] mb-6"
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(2rem, 4.6vw, 3.6rem)",
                        }}
                    >
                        Environmental, Health, and Safety <br />
                        <span className="italic text-[#14874f]">(EHS) Excellence</span>
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-[#5d6763] text-sm leading-[1.8] font-sans mb-12" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        <p data-ehs-header>
                            NEPN demonstrates a strong commitment to Environment, Health & Safety (EHS) through approved regulatory compliance and proactive environmental management. It successfully obtained Environmental Impact Assessment (EIA) approval for the Qua Ibo Field Development Project from the Department of Petroleum Resources (DPR) and the Federal Ministry of Environment (FMENV), based on a study conducted by the University of Uyo Consultancy Limited. To minimize environmental and community impact, all development wells are directionally drilled from a single location situated away from villages, while production facilities are placed approximately 800 meters from the wellheads. Even as future operations may require additional drilling locations for optimal reservoir performance, environmental protection and community safety remain key priorities.
                        </p>
                        <p data-ehs-header>
                            NEPN operates a structured HSE Management System that identifies hazards, evaluates and prioritizes risks, and implements mitigation measures, with continuous monitoring and improvement built into all operations. This system protects employees, contractors, equipment, host communities, the public, and the environment, while ensuring compliance with industry standards across facility design, asset lifecycle, and operational activities. Its effectiveness is reflected in an outstanding safety record, including zero Lost Time Accidents during the NRG 201 rig operations (2008–2009), 700,000 man-hours without incident during Henan drilling operations in 2013, and over 3.3 million cumulative man-hours without a Lost Time Incident, demonstrating a sustained commitment to safety, operational excellence, and responsible energy development.
                        </p>
                    </div>

                    <div
                        data-ehs-grid
                        className="grid grid-cols-1 md:grid-cols-3 gap-5"
                    >
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
                                        <h3
                                            className="text-lg font-bold text-[#1e2620] mb-2"
                                            style={{ fontFamily: "'Poppins', sans-serif" }}
                                        >
                                            {card.title}
                                        </h3>
                                        <p
                                            className="text-xs sm:text-[13px] text-neutral-500 leading-relaxed font-sans mb-4"
                                            style={{ fontFamily: "'Poppins', sans-serif" }}
                                        >
                                            {card.body}
                                        </p>
                                    </div>
                                    <p
                                        className="text-sm font-bold text-[#1b1cff]"
                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                    >
                                        {card.metric}
                                    </p>
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
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: "clamp(2rem, 4.4vw, 3.45rem)",
                                }}
                            >
                                Safety & Compliance
                            </h2>

                            <p
                                data-safety-copy
                                className="text-[#5d6763] text-sm sm:text-[14.5px] leading-relaxed mb-8 font-sans"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                Safety is our top priority. Every operation is conducted in strict adherence to international safety standards and Nigerian regulatory requirements.
                            </p>

                            <ul data-safety-copy className="space-y-4 font-sans text-xs sm:text-sm text-[#4a5550]" style={{ fontFamily: "'Poppins', sans-serif" }}>
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
                            className="relative rounded-2xl overflow-hidden h-[340px] sm:h-[400px] shadow-lg border border-neutral-200/50 flex items-center justify-center p-6 group cursor-default"
                        >
                            <Image
                                src="/images/operations.jpg"
                                alt="NEPN Operations Warning Shield"
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-[2px]" />

                            {/* Caution warning signage board inside card */}
                            <div className="relative bg-white/95 border-l-[6px] border-[#ef3b3b] rounded-xl p-6 sm:p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center">
                                <div className="bg-[#ef3b3b]/10 text-[#ef3b3b] font-black tracking-widest text-[10px] sm:text-xs px-3 py-1 rounded mb-4 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                                    Caution / Warning
                                </div>
                                <h3
                                    className="text-4xl sm:text-5xl font-black text-neutral-800 leading-none"
                                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                >
                                    5M+
                                </h3>
                                <p
                                    className="mt-2 text-xs sm:text-sm font-bold text-neutral-600 leading-snug uppercase tracking-wider max-w-[80%]"
                                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                >
                                    Safe Work Hours Without Lost Time Injury
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
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: "clamp(2.25rem, 4.9vw, 4.05rem)",
                            }}
                        >
                            Corporate Social Responsibility.
                        </h2>
                        <p
                            data-csr-header
                            className="mt-3 text-sm sm:text-base text-[#5d6763] max-w-3xl mx-auto leading-[1.8] font-sans"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            At NEPN, we are committed to responsible oil and gas operations that create positive social, economic, and environmental impact. Through our Corporate Social Responsibility (CSR) initiatives, we support community development, education, healthcare, environmental sustainability, and local empowerment. We strive to operate with integrity, prioritize safety, and build lasting partnerships that contribute to sustainable growth and improved livelihoods in the communities where we operate.
                        </p>
                    </div>

                    {/* CSR Image cards grid */}
                    <div
                        data-csr-grid
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                        {isLoading ? (
                            <>
                                <CsrSkeletonCard />
                                <CsrSkeletonCard />
                                <CsrSkeletonCard />
                            </>
                        ) : currentCsrCards.length === 0 ? (
                            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                                <p className="text-neutral-400 font-medium text-sm">No CSR projects found.</p>
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
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-all duration-500 ease-out group-hover:from-black/95 group-hover:via-black/55"
                                    />

                                    <div
                                        className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out"
                                    >
                                        <p
                                            className="text-[11px] sm:text-[12px] text-white leading-relaxed font-sans max-w-[95%] opacity-90 group-hover:opacity-100 transition-opacity duration-500 font-semibold"
                                            style={{ fontFamily: "'Poppins', sans-serif" }}
                                        >
                                            {card.text}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </section>

            {/* Measurable Impact Section */}
            <section data-impact-trigger className="bg-[#f4f4f4] py-16 sm:py-24">
                <div className="mx-auto max-w-[980px] px-5">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">

                        {/* Worker Image */}
                        <div data-impact-copy className="relative rounded-2xl overflow-hidden h-[340px] sm:h-[420px] shadow-md border border-neutral-200/50 group">
                            <Image
                                src="/images/workers.jpg"
                                alt="NEPN mechanical technician working on site"
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        {/* Performance metrics list */}
                        <div>
                            <div
                                data-impact-copy
                                className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em]"
                                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                            >
                                <span className="h-[2px] w-4 rounded-full bg-[#ef3b3b]" />
                                <span className="text-[#ef3b3b]">Our Performance</span>
                            </div>

                            <h2
                                data-impact-copy
                                className="font-black leading-[1.02] tracking-[-0.03em] text-[#1f2724] mb-6"
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: "clamp(2rem, 4.4vw, 3.45rem)",
                                }}
                            >
                                MEASURABLE <span className="italic text-[#14874f]">IMPACT</span>
                            </h2>

                            <p
                                data-impact-copy
                                className="text-[#5d6763] text-sm sm:text-[14.5px] leading-relaxed mb-8 font-sans"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                We track and report our sustainability performance across environmental, social, and governance metrics to ensure transparency and continuous improvement.
                            </p>

                            <div data-impact-copy className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                {PERFORMANCE_METRICS.map((metric) => (
                                    <div key={metric.label} className="border-l-[3.5px] border-[#14874f] pl-4">
                                        <p
                                            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#14874f]"
                                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                        >
                                            {metric.label}
                                        </p>
                                        <p
                                            className="mt-1 text-sm font-bold text-neutral-800"
                                            style={{ fontFamily: "'Poppins', sans-serif" }}
                                        >
                                            {metric.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Four Column Stats strip */}
            <section data-stats-trigger className="bg-white border-t border-b border-neutral-200/60 py-10 sm:py-12">
                <div className="mx-auto max-w-[980px] px-5">
                    <div data-stats-bar className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 text-center divide-y md:divide-y-0 md:divide-x divide-neutral-200/60">
                        <div className="pt-0 md:pt-0">
                            <p className="text-[34px] sm:text-[40px] font-black text-[#14874f] leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>100%</p>
                            <p className="mt-2 text-[9px] font-bold text-[#14874f] uppercase tracking-widest leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Nigerian Owned</p>
                        </div>
                        <div className="pt-0 md:pt-0">
                            <p className="text-[34px] sm:text-[40px] font-black text-[#ef3b3b] leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Zero</p>
                            <p className="mt-2 text-[9px] font-bold text-[#ef3b3b] uppercase tracking-widest leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Major HSE Incidents</p>
                        </div>
                        <div className="pt-6 md:pt-0">
                            <p className="text-[34px] sm:text-[40px] font-black text-[#1b1cff] leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>2040</p>
                            <p className="mt-2 text-[9px] font-bold text-[#1b1cff] uppercase tracking-widest leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Achieve Net-Zero Operations</p>
                        </div>
                        <div className="pt-6 md:pt-0">
                            <p className="text-[34px] sm:text-[40px] font-black text-[#14874f] leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>30+</p>
                            <p className="mt-2 text-[9px] font-bold text-[#14874f] uppercase tracking-widest leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>CSR Programmes Active</p>
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
                                <p
                                    className="text-white font-bold leading-tight"
                                    style={{
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: "26px",
                                    }}
                                >
                                    Our Sustainability Journey
                                </p>
                                <p
                                    className="mt-[6px] text-white/75 text-xs sm:text-[13px] leading-relaxed"
                                    style={{
                                        fontFamily: "'Poppins', sans-serif",
                                    }}
                                >
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

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@700&family=Poppins:wght@400;500;600;700&display=swap');
      `}</style>
        </div>
    );
}
