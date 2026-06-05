"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Target, Users, TrendingUp, X, ArrowRight } from "lucide-react";
import { useLeadership } from "@/core/hooks/queries/useLeadership";
import { getImageUrl } from "@/core/api/client";

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

const OUR_VALUES = [
    {
        icon: Award,
        title: "Integrity",
        body: "We conduct our business with the highest ethical standards and transparency in all our operations.",
    },
    {
        icon: Target,
        title: "Excellence",
        body: "We pursue operational excellence and continuous improvement in everything we do.",
    },
    {
        icon: Users,
        title: "Community Focus",
        body: "We are committed to creating positive impacts in the communities where we operate.",
    },
    {
        icon: TrendingUp,
        title: "Innovation",
        body: "We embrace innovative technologies and solutions to drive sustainable growth.",
    },
];

interface LeaderMember {
    name: string;
    role: string;
    roleColor: string;
    body: string;
    fullBio: string[];
    initials: string;
    initialsColor: string;
    gradientFrom: string;
    gradientTo: string;
    image?: string;
}

const LeadershipSkeletonCard = () => (
    <div className="bg-white rounded-xl border border-neutral-100 flex flex-col overflow-hidden animate-pulse">
        <div className="h-[248px] sm:h-[258px] lg:h-[252px] bg-neutral-200" />
        <div className="flex flex-col justify-between flex-1 px-[20px] pb-[20px] pt-[18px]">
            <div>
                <div className="w-1/2 h-5 bg-neutral-200 rounded mb-2" />
                <div className="w-1/3 h-3 bg-neutral-200 rounded mb-4" />
                <div className="w-full h-4 bg-neutral-200 rounded mb-2" />
                <div className="w-5/6 h-4 bg-neutral-200 rounded mb-2" />
            </div>
            <div className="mt-6 pt-3 border-t border-neutral-100 flex justify-end">
                <div className="w-16 h-4 bg-neutral-200 rounded" />
            </div>
        </div>
    </div>
);

export default function WhoWeAre() {
    const { data: cmsLeaders, isLoading } = useLeadership();
    const rootRef = useRef<HTMLDivElement | null>(null);
    const heroRef = useRef<HTMLElement | null>(null);
    const storyRef = useRef<HTMLElement | null>(null);
    const detailRef = useRef<HTMLElement | null>(null);
    const ctaRef = useRef<HTMLElement | null>(null);
    const heroImageRef = useRef<HTMLDivElement | null>(null);
    const heroOverlayRef = useRef<HTMLDivElement | null>(null);

    const [activeTab, setActiveTab] = useState<"management" | "board">("management");
    const [selectedLeader, setSelectedLeader] = useState<LeaderMember | null>(null);

    const parseCmsLeaders = (list: typeof cmsLeaders) => {
        if (!Array.isArray(list) || list.length === 0) return null;

        return list.map((item, idx) => {
            const initials = item.name.split(" ").map(w => w[0]).join(".").toUpperCase().slice(0, 3);
            const colors = [
                { color: "#117E43", from: "#ecfdf5", to: "#a7f3d0" },
                { color: "#ED1D24", from: "#fef2f2", to: "#fecaca" },
                { color: "#1b1cff", from: "#e0e7ff", to: "#c7d2fe" },
            ];
            const theme = colors[idx % colors.length];

            return {
                id: item.id,
                name: item.name,
                role: item.role,
                roleColor: theme.color,
                initials,
                initialsColor: theme.color,
                gradientFrom: theme.from,
                gradientTo: theme.to,
                body: item.bio.length > 150 ? `${item.bio.slice(0, 147)}...` : item.bio,
                fullBio: [item.bio],
                image: item.image,
            };
        });
    };

    const leaders = parseCmsLeaders(cmsLeaders) ?? [];
    const activeManagement = leaders.filter(
        (l) =>
            !l.role.toLowerCase().includes("director") &&
            !l.role.toLowerCase().includes("board") &&
            !l.role.toLowerCase().includes("chairman"),
    );

    const activeBoard = leaders.filter(
        (l) =>
            l.role.toLowerCase().includes("director") ||
            l.role.toLowerCase().includes("board") ||
            l.role.toLowerCase().includes("chairman"),
    );

    const currentLeaders = activeTab === "management" ? activeManagement : activeBoard;

    useEffect(() => {
        if (selectedLeader) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedLeader]);

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
            const storyRight =
                storyRef.current?.querySelectorAll("[data-story-right]");
            const gridCells = detailRef.current?.querySelectorAll("[data-grid-cell]");
            const leadershipHeader = detailRef.current?.querySelectorAll(
                "[data-leadership-header]",
            );
            const leadershipCards = detailRef.current?.querySelectorAll(
                "[data-leadership-card]",
            );
            const ctaParts = ctaRef.current?.querySelectorAll("[data-cta-part]");

            const targets: Element[] = [];
            if (heroBars) heroBars.forEach((el) => targets.push(el));
            if (heroCopy) heroCopy.forEach((el) => targets.push(el));
            if (storyLeft) storyLeft.forEach((el) => targets.push(el));
            if (storyRight) storyRight.forEach((el) => targets.push(el));
            if (gridCells) gridCells.forEach((el) => targets.push(el));
            if (leadershipHeader) leadershipHeader.forEach((el) => targets.push(el));
            if (leadershipCards) leadershipCards.forEach((el) => targets.push(el));
            if (ctaParts) ctaParts.forEach((el) => targets.push(el));

            if (targets.length) {
                gsap.set(targets, { willChange: "transform, opacity" });
            }

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
            if (storyRight?.length)
                animateStagger(storyRight, storyRef.current, { delay: 0.1 });

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
    }, [activeTab, isLoading]);

    return (
        <div
            ref={rootRef}
            className="w-full bg-[#f4f4f4]"
            style={{ fontFamily: "'Barlow', sans-serif" }}
        >
            <section
                ref={heroRef}
                className="relative isolate w-full overflow-hidden bg-[#0a1210] -mt-[30px]"
            >
                {/* <div
          data-hero-bar
          className="absolute inset-x-0 top-0 z-30 flex h-[3px] md:h-[4px]"
        >
          <span className="h-full basis-[45%] bg-[#179768]" />
          <span className="h-full basis-[29%] bg-[#ea2a2d]" />
          <span className="h-full basis-[26%] bg-[#143fe2]" />
        </div> */}

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
                                    <span className="text-white/50">Who We Are</span>
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
                                    Who We{" "}
                                    <span
                                        style={{
                                            color: "#82E8B4",
                                            fontFamily: "'Poppins', sans-serif",
                                            fontWeight: 700,
                                            fontSize: "clamp(30px, 7.5vw, 51.2px)",
                                            lineHeight: "1.15",
                                            letterSpacing: "0%",
                                        }}
                                    >
                                        Are
                                    </span>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                ref={storyRef}
                className="bg-[#f4f4f4] py-11 sm:py-14 lg:py-[54px]"
            >
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
                                Nigeria&apos;s Leading{" "}
                                <span className="text-[#14874f]">Indigenous</span>
                                <br />
                                <span className="text-[#14874f]">E&amp;P Company</span>
                            </h2>

                            <div
                                data-story-left
                                className="mt-5 h-[3px] w-10 rounded-full bg-[#14874f]"
                            />

                            <div className="mt-7 max-w-[560px] space-y-7 text-[15px] leading-[2.02] text-[#5d6763] sm:text-[16px]">
                                <p data-story-left>
                                    Network E&amp;P Nigeria Limited (NEPN) is a fully
                                    Nigerian-owned oil and gas company dedicated to promoting
                                    sustainable energy solutions throughout Nigeria.
                                </p>
                                <p data-story-left>
                                    Since 2001, we have been at the forefront of exploring and
                                    developing the Qua Iboe field in OML 13, playing a vital role
                                    in meeting the nation&apos;s energy needs.
                                </p>
                                <p data-story-left>
                                    We are proud to be 100% Nigerian-owned and operated, a
                                    testament to the vision that indigenous companies can lead and
                                    excel in one of the world&apos;s most technically demanding
                                    industries.
                                </p>
                            </div>

                            <div className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:max-w-[540px]">
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
                <div className="w-full overflow-hidden">
                    <div>
                        <div className="grid grid-cols-1 lg:grid-cols-[55.556%_44.444%] lg:grid-rows-[480px]">
                            <div
                                data-grid-cell
                                className="relative min-h-[270px] overflow-hidden sm:min-h-[330px] lg:h-[480px] lg:min-h-0"
                            >
                                <Image
                                    src={FEATURE_SPLITS[0].image}
                                    alt={FEATURE_SPLITS[0].alt}
                                    fill
                                    className="object-cover object-center"
                                    sizes="(max-width: 768px) 100vw, 56vw"
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

                        <div className="grid grid-cols-1 lg:grid-cols-[44.444%_55.556%] lg:grid-rows-[480px]">
                            <div
                                data-grid-cell
                                className="relative min-h-[270px] overflow-hidden sm:min-h-[330px] lg:h-[480px] lg:min-h-0"
                            >
                                <Image
                                    src={FEATURE_SPLITS[1].image}
                                    alt={FEATURE_SPLITS[1].alt}
                                    fill
                                    className="object-cover object-center"
                                    sizes="(max-width: 768px) 100vw, 44vw"
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
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Our Values Section */}
                    <div className="px-5 py-12 sm:px-8 sm:py-16 md:px-10 lg:px-12 bg-white/40 border-t border-b border-neutral-200/50">
                        <div className="mx-auto max-w-[980px]">
                            <div className="text-center mb-10 sm:mb-12">
                                <h2
                                    className="text-[32px] sm:text-[40px] font-black leading-tight tracking-[-0.03em] text-[#222a28]"
                                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                >
                                    Our Values
                                </h2>
                                <p
                                    className="mt-3 text-sm sm:text-base text-[#4a5550] max-w-lg mx-auto leading-relaxed"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    The principles that guide our operations and shape our culture
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {OUR_VALUES.map((val) => {
                                    const IconComponent = val.icon;
                                    return (
                                        <div
                                            key={val.title}
                                            className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] border border-neutral-100 p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgb(0,0,0,0.04)] group cursor-default"
                                        >
                                            <div className="w-14 h-14 rounded-full bg-[#2b3cff]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                                <IconComponent className="w-6 h-6 text-[#2b3cff]" />
                                            </div>
                                            <h3
                                                className="text-lg font-bold text-[#1e2620] mb-3"
                                                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "20px" }}
                                            >
                                                {val.title}
                                            </h3>
                                            <p
                                                className="text-[13px] text-[#5d6763] leading-relaxed"
                                                style={{ fontFamily: "'Poppins', sans-serif" }}
                                            >
                                                {val.body}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Interactive Leadership Section */}
                    <div className="px-5 py-12 sm:px-8 sm:py-16 md:px-10 lg:px-12">
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

                            {/* Tabs */}
                            <div className="mt-10 mb-8 border-b border-neutral-200/60 flex justify-center sm:justify-start gap-8">
                                <button
                                    onClick={() => setActiveTab("management")}
                                    className={`pb-3 font-bold text-[10px] sm:text-xs tracking-[0.15em] transition-all relative uppercase cursor-pointer ${activeTab === "management"
                                            ? "text-[#168241]"
                                            : "text-neutral-400 hover:text-neutral-600"
                                        }`}
                                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                >
                                    Senior Management Team
                                    {activeTab === "management" && (
                                        <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ef3b3b]" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab("board")}
                                    className={`pb-3 font-bold text-[10px] sm:text-xs tracking-[0.15em] transition-all relative uppercase cursor-pointer ${activeTab === "board"
                                            ? "text-[#168241]"
                                            : "text-neutral-400 hover:text-neutral-600"
                                        }`}
                                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                >
                                    Board of Directors
                                    {activeTab === "board" && (
                                        <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ef3b3b]" />
                                    )}
                                </button>
                            </div>

                            {/* Dynamic Leaders Grid */}
                            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-[18px]">
                                {isLoading ? (
                                    <>
                                        <LeadershipSkeletonCard />
                                        <LeadershipSkeletonCard />
                                        <LeadershipSkeletonCard />
                                    </>
                                ) : currentLeaders.length === 0 ? (
                                    <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                                        <p className="text-neutral-400 font-medium text-sm">No leadership team members found.</p>
                                    </div>
                                ) : (
                                    currentLeaders.map((member) => (
                                        <article
                                            data-leadership-card
                                            key={member.name}
                                            className="group bg-white rounded-xl shadow-sm hover:shadow-md border border-neutral-100 flex flex-col overflow-hidden transition-all duration-300 cursor-pointer"
                                            onClick={() => setSelectedLeader(member)}
                                        >
                                            <div className="relative h-[248px] sm:h-[258px] lg:h-[252px] w-full overflow-hidden bg-neutral-100">
                                                {member.image ? (
                                                    <Image
                                                        src={getImageUrl(member.image)}
                                                        alt={member.name}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                        sizes="(max-width: 768px) 100vw, 30vw"
                                                    />
                                                ) : (
                                                    <div
                                                        className="w-full h-full flex items-center justify-center bg-gradient-to-tr"
                                                        style={{
                                                            backgroundImage: `linear-gradient(135deg, ${member.gradientFrom} 0%, ${member.gradientTo} 100%)`
                                                        }}
                                                    >
                                                        <span
                                                            className="text-7xl sm:text-8xl font-black tracking-tighter uppercase select-none transition-transform duration-500 group-hover:scale-105"
                                                            style={{ color: member.initialsColor }}
                                                        >
                                                            {member.initials}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-col justify-between flex-1 px-[20px] pb-[20px] pt-[18px]">
                                                <div>
                                                    <h3
                                                        className="font-bold text-[#1E2620]"
                                                        style={{
                                                            fontFamily: "'Poppins', sans-serif",
                                                            fontSize: "17px",
                                                            lineHeight: "1.2",
                                                        }}
                                                    >
                                                        {member.name}
                                                    </h3>
                                                    <p
                                                        className="mt-[4px] uppercase font-bold"
                                                        style={{
                                                            color: member.roleColor,
                                                            fontFamily: "'Poppins', sans-serif",
                                                            fontSize: "10.08px",
                                                            lineHeight: "1.2",
                                                            letterSpacing: "1.01px",
                                                        }}
                                                    >
                                                        {member.role}
                                                    </p>
                                                    <p
                                                        className="mt-3 text-neutral-600 text-[13px] leading-[1.6]"
                                                        style={{
                                                            fontFamily: "'Poppins', sans-serif",
                                                        }}
                                                    >
                                                        {member.body}
                                                    </p>
                                                </div>

                                                <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-end">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedLeader(member);
                                                        }}
                                                        className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 hover:text-[#168241] transition-colors cursor-pointer group/btn"
                                                    >
                                                        <span>Read more</span>
                                                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={ctaRef} className="bg-[#ED1D24]">
                <div className="mx-auto flex min-h-[140.666672px] w-full max-w-[1280px] items-center px-[10px]">
                    <div className="flex w-full justify-center">
                        <div className="flex w-full max-w-[1184px] flex-col gap-6 py-8 md:h-[56.666668px] md:flex-row md:items-center md:justify-between md:gap-8 md:py-0">
                            <div data-cta-part className="w-full max-w-[408.072937px]">
                                <p
                                    className="text-white"
                                    style={{
                                        width: "auto",
                                        minHeight: "40px",
                                        whiteSpace: "nowrap",
                                        fontFamily: "'Poppins', sans-serif",
                                        fontWeight: 700,
                                        fontSize: "26.4px",
                                        lineHeight: "100%",
                                        letterSpacing: "0%",
                                    }}
                                >
                                    Interested in Partnering?
                                </p>
                                <p
                                    className="mt-[6px] max-w-[408px]"
                                    style={{
                                        color: "rgba(255,255,255,0.74)",
                                        fontFamily: "'Poppins', sans-serif",
                                        fontWeight: 400,
                                        fontSize: "12px",
                                        lineHeight: "16px",
                                        letterSpacing: "0%",
                                    }}
                                >
                                    Explore joint venture and collaboration opportunities with
                                    NEPN.
                                </p>
                            </div>

                            <div data-cta-part className="md:ml-auto md:flex md:items-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex h-[46px] w-[157.947922px] items-center justify-center gap-[10px] rounded-[2px] border-2 border-white/55 bg-transparent transition-all duration-200 hover:bg-white hover:text-[#ED1D24]"
                                    style={{
                                        color: "#FFFFFF",
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontWeight: 700,
                                        fontSize: "12px",
                                        lineHeight: "100%",
                                        letterSpacing: "0.84px",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    <span>Contact Us</span>
                                    <Image
                                        src="/images/Vector (4).png"
                                        alt=""
                                        width={8.75}
                                        height={7}
                                        className="h-[7px] w-[8.75px] object-contain"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@700&family=Poppins:wght@400;700&display=swap');
      `}</style>

            {/* Leadership Bio Modal */}
            {selectedLeader && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200"
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm cursor-pointer"
                        onClick={() => setSelectedLeader(null)}
                    />

                    {/* Modal Container */}
                    <div className="relative bg-white w-full max-w-xl rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[85vh] z-10 animate-in zoom-in-95 duration-200 flex flex-col">

                        {/* Close button */}
                        <button
                            onClick={() => setSelectedLeader(null)}
                            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200 transition-all cursor-pointer border-0 outline-none"
                            aria-label="Close modal"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Profile Info Header in Modal */}
                        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center pb-6 border-b border-neutral-100">
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-100 flex items-center justify-center">
                                {selectedLeader.image ? (
                                    <Image
                                        src={getImageUrl(selectedLeader.image)}
                                        alt={selectedLeader.name}
                                        fill
                                        className="object-cover"
                                        sizes="80px"
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl font-black select-none"
                                        style={{
                                            background: `linear-gradient(135deg, ${selectedLeader.gradientFrom} 0%, ${selectedLeader.gradientTo} 100%)`,
                                            color: selectedLeader.initialsColor
                                        }}
                                    >
                                        {selectedLeader.initials}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3
                                    className="text-2xl font-black text-[#1e2620] leading-tight"
                                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                                >
                                    {selectedLeader.name}
                                </h3>
                                <p
                                    className="text-xs uppercase font-bold tracking-wider mt-1"
                                    style={{
                                        color: selectedLeader.roleColor,
                                        fontFamily: "'Poppins', sans-serif"
                                    }}
                                >
                                    {selectedLeader.role}
                                </p>
                            </div>
                        </div>

                        {/* Bio Content */}
                        <div className="mt-6 flex-1 text-sm sm:text-base leading-relaxed text-neutral-600 space-y-4 overflow-y-auto pr-1">
                            {selectedLeader.fullBio.map((paragraph, index) => (
                                <p
                                    key={index}
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
