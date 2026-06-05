"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

import { usePosts } from "@/core/hooks/queries/usePosts";
import { getImageUrl } from "@/core/api/client";

gsap.registerPlugin(ScrollTrigger);

interface NewsArticle {
    category: "OPERATIONS" | "COMMUNITY" | "SUSTAINABILITY";
    title: string;
    excerpt: string;
    image: string;
    date: string;
    readTime: string;
    isGreenTitle?: boolean;
}

const ITEMS_PER_PAGE = 3;

function getPostCategory(title: string, content: string): "OPERATIONS" | "COMMUNITY" | "SUSTAINABILITY" {
    const text = `${title} ${content}`.toLowerCase();
    if (
        text.includes("scholarship") ||
        text.includes("community") ||
        text.includes("youth") ||
        text.includes("town hall") ||
        text.includes("leaders") ||
        text.includes("traditional")
    ) {
        return "COMMUNITY";
    }
    if (
        text.includes("carbon") ||
        text.includes("emission") ||
        text.includes("sustainability") ||
        text.includes("green") ||
        text.includes("net zero") ||
        text.includes("environmental") ||
        text.includes("leak")
    ) {
        return "SUSTAINABILITY";
    }
    return "OPERATIONS";
}

function formatDate(dateStr: string): string {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    } catch {
        return "March 2026";
    }
}

function getReadTime(content: string): string {
    const words = content ? content.split(/\s+/).length : 100;
    const min = Math.max(1, Math.ceil(words / 200));
    return `${min} min read`;
}

const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-neutral-100/90 overflow-hidden flex flex-col justify-between animate-pulse">
        <div className="h-[190px] bg-neutral-200" />
        <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
                <div className="w-16 h-4 bg-neutral-200 rounded mb-4" />
                <div className="w-full h-6 bg-neutral-200 rounded mb-3" />
                <div className="w-3/4 h-6 bg-neutral-200 rounded mb-4" />
                <div className="w-full h-4 bg-neutral-200 rounded mb-2" />
                <div className="w-5/6 h-4 bg-neutral-200 rounded mb-6" />
            </div>
            <div className="w-1/2 h-4 bg-neutral-200 rounded pt-4 border-t border-neutral-100" />
        </div>
    </div>
);

export default function News() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const heroRef = useRef<HTMLElement | null>(null);
    const heroImageRef = useRef<HTMLDivElement | null>(null);
    const heroOverlayRef = useRef<HTMLDivElement | null>(null);
    const introRef = useRef<HTMLElement | null>(null);

    const [currentPage, setCurrentPage] = useState(1);

    const { data: postsData, isLoading, isError, error } = usePosts({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        status: "published",
    });

    // Scroll to top of list smoothly when page changes
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        introRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

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
            const introCopy = rootRef.current?.querySelectorAll("[data-intro-copy]");
            const gridItems = rootRef.current?.querySelectorAll("[data-grid-items] > div");
            const pageControls = rootRef.current?.querySelectorAll("[data-page-controls]");

            const targets: Element[] = [];
            if (heroCopy) heroCopy.forEach((el) => targets.push(el));
            if (introCopy) introCopy.forEach((el) => targets.push(el));
            if (gridItems) gridItems.forEach((el) => targets.push(el));
            if (pageControls) pageControls.forEach((el) => targets.push(el));

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

            if (gridItems?.length) {
                animateReveal(gridItems, introRef.current, { delay: 0.2 });
            }

            if (pageControls?.length) {
                animateReveal(pageControls, introRef.current, { delay: 0.35 });
            }

        }, rootRef);

        return () => ctx.revert();
    }, [currentPage, isLoading]);

    // Parse CMS posts into the card model
    const totalPages = postsData?.pagination.totalPages ?? 0;

    const currentArticles: NewsArticle[] = (postsData?.posts ?? []).map((post, idx) => ({
        category: getPostCategory(post.title, post.content),
        title: post.title,
        excerpt: post.excerpt,
        image: getImageUrl(post.featured_image),
        date: formatDate(post.published_at || post.created_at),
        readTime: getReadTime(post.content),
        isGreenTitle: idx % 3 === 1,
    }));

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
                            src="/images/workers.jpg"
                            alt="NEPN engineering team safety site notices backdrop"
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
                                    <span className="text-white/50">News</span>
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
                                    News &{" "}
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
                                        Insights
                                    </span>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro section */}
            <section
                ref={introRef}
                className="bg-[#f4f4f4] py-16 sm:py-24"
            >
                <div className="mx-auto max-w-[980px] px-5">
                    <div
                        data-intro-copy
                        className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em]"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                        <span className="h-[2px] w-4 rounded-full bg-[#ef3b3b]" />
                        <span className="text-[#ef3b3b]">Latest Updates</span>
                    </div>

                    <h2
                        data-intro-copy
                        className="font-black leading-[0.98] tracking-[-0.03em] text-[#1f2724] mb-6"
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "clamp(2.25rem, 4.9vw, 4.05rem)",
                        }}
                    >
                        Stay Updated with <span className="italic text-[#14874f]">NEPN</span>
                    </h2>

                    <p
                        data-intro-copy
                        className="mt-6 text-[#5d6763] text-sm sm:text-base leading-relaxed max-w-2xl font-sans"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Company announcements, industry trends, project milestones, and thought leadership from Nigeria&apos;s energy sector.
                    </p>

                    {/* Dynamic Paginated Grid */}
                    <div
                        data-grid-items
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
                    >
                        {isLoading ? (
                            <>
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                            </>
                        ) : isError ? (
                            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                                <p className="text-neutral-500 font-medium text-sm">
                                    {(error instanceof Error ? error.message : null) || "We couldn't load the latest news right now."}
                                </p>
                            </div>
                        ) : currentArticles.length === 0 ? (
                            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                                <p className="text-neutral-400 font-medium text-sm">No news articles found in the CMS.</p>
                            </div>
                        ) : (
                            currentArticles.map((article, index) => {
                                const categoryBg =
                                    article.category === "OPERATIONS"
                                        ? "bg-[#14874f]"
                                        : article.category === "COMMUNITY"
                                            ? "bg-[#ef3b3b]"
                                            : "bg-[#1b1cff]";

                                const titleColor = article.isGreenTitle ? "text-[#14874f]" : "text-[#1e2620]";

                                return (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] border border-neutral-100/90 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md cursor-default group"
                                    >
                                        <div className="relative h-[190px] overflow-hidden bg-neutral-100">
                                            {article.image && (
                                                <Image
                                                    src={article.image}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                    sizes="(max-width: 768px) 100vw, 30vw"
                                                />
                                            )}
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex mb-4">
                                                    <span className={`text-[8.5px] font-bold text-white px-2 py-0.5 tracking-wider rounded uppercase ${categoryBg}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                        {article.category}
                                                    </span>
                                                </div>

                                                <h3
                                                    className={`text-[16.5px] font-bold leading-snug mb-3 transition-colors ${titleColor}`}
                                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                                >
                                                    {article.title}
                                                </h3>

                                                <p
                                                    className="text-xs sm:text-[13px] text-neutral-500 leading-relaxed font-sans mb-6"
                                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                                >
                                                    {article.excerpt}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 pt-4 border-t border-neutral-100">
                                                <span className="w-3 h-[2px] bg-[#ef3b3b] rounded-full" />
                                                <span className="text-[10.5px] font-semibold text-neutral-400 font-sans">
                                                    {article.date} · {article.readTime}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Interactive Pagination Controller */}
                    {totalPages > 1 && (
                        <div
                            data-page-controls
                            className="mt-12 flex justify-center items-center gap-3"
                        >
                            <button
                                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                disabled={currentPage === 1}
                                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors border border-neutral-200 bg-white shadow-sm border-0 outline-none ${currentPage === 1
                                        ? "text-neutral-300 cursor-not-allowed"
                                        : "text-neutral-600 hover:bg-[#14874f] hover:text-white cursor-pointer"
                                    }`}
                                aria-label="Previous page"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            {Array.from({ length: totalPages }).map((_, i) => {
                                const pageNum = i + 1;
                                const isActive = pageNum === currentPage;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm tracking-wider transition-colors border border-neutral-200 shadow-sm border-0 outline-none cursor-pointer ${isActive
                                                ? "bg-[#14874f] text-white border-[#14874f]"
                                                : "bg-white text-neutral-600 hover:bg-[#14874f] hover:text-white"
                                            }`}
                                        aria-label={`Page ${pageNum}`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors border border-neutral-200 bg-white shadow-sm border-0 outline-none ${currentPage === totalPages
                                        ? "text-neutral-300 cursor-not-allowed"
                                        : "text-neutral-600 hover:bg-[#14874f] hover:text-white cursor-pointer"
                                    }`}
                                aria-label="Next page"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                </div>
            </section>

            {/* Red Subscribe Newsletter CTA Banner */}
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
                                    Subscribe to Our Newsletter
                                </p>
                                <p
                                    className="mt-[6px] text-white/75 text-xs sm:text-[13px] leading-relaxed"
                                    style={{
                                        fontFamily: "'Poppins', sans-serif",
                                    }}
                                >
                                    Stay updated with the latest news and insights from NEPN.
                                </p>
                            </div>

                            {/* Button */}
                            <div className="md:ml-auto flex items-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex h-[46px] items-center justify-center gap-[10px] rounded-[2px] border-2 border-white bg-transparent transition-all duration-200 hover:bg-white hover:text-[#ED1D24] px-6 font-bold tracking-[0.08em] uppercase text-white text-xs"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    <span>Subscribe Now</span>
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
