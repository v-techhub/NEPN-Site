"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useGallery } from "@/core/hooks/queries/useGallery";
import { getImageUrl } from "@/core/api/client";

gsap.registerPlugin(ScrollTrigger);

// Categories supported in the layout
const CATEGORIES = ["ALL", "OPERATIONS", "FACILITIES", "COMMUNITY", "EVENTS"];

// Curated list of fallback gallery items using local public images
const FALLBACK_ITEMS = [
  {
    id: 1,
    title: "NEPN OML 13 Production Crew",
    description: "Our dedicated team on site at the OML 13 oil fields Nigeria.",
    image: "/images/workers.jpg",
    category: "operations",
  },
  {
    id: 2,
    title: "Processing Facility Gate",
    description:
      "Entrance gate to our primary processing facility in Akwa Ibom.",
    image: "/images/facility.jpg",
    category: "facilities",
  },
  {
    id: 3,
    title: "Onsite Flow Station Operations",
    description:
      "Continuous monitoring of our active oil pipelines and structures.",
    image: "/images/operations.jpg",
    category: "operations",
  },
  {
    id: 4,
    title: "Crude Storage Tanks",
    description:
      "High-capacity storage tanks for processed crude oil at terminal.",
    image: "/images/production.jpg",
    category: "facilities",
  },
  {
    id: 5,
    title: "Community Health Outreach",
    description:
      "Free medical screening event organized for our host community.",
    image: "/images/sustainability.jpg",
    category: "community",
  },
  {
    id: 6,
    title: "Seismic Exploration Survey",
    description:
      "Mapping underground structures for prospective drilling sites.",
    image: "/images/exploration.jpg",
    category: "operations",
  },
  {
    id: 7,
    title: "Flow Control Valve Systems",
    description:
      "State-of-the-art flow control valves maintaining pipeline safety.",
    image: "/images/machine.jpg",
    category: "facilities",
  },
  {
    id: 8,
    title: "Annual Stakeholders Meeting",
    description:
      "Reviewing our corporate performance and strategic roadmap with partners.",
    image: "/slides/slide-2.jpg",
    category: "events",
  },
  {
    id: 9,
    title: "Safety Milestone Ceremony",
    description:
      "Celebrating 5 million hours without Lost Time Injury (LTI) in field operations.",
    image: "/slides/slide-3.jpg",
    category: "events",
  },
  {
    id: 10,
    title: "Akwa Ibom Office Headquarter",
    description: "Our regional command hub supporting field operations.",
    image: "/slides/slide-1.jpg",
    category: "facilities",
  },
];

// Helper to assign categories to CMS items based on title or description keywords
const getCategoryForCmsItem = (
  title: string = "",
  description: string = "",
  index: number = 0,
): string => {
  const t = title.toLowerCase();
  const d = (description || "").toLowerCase();

  if (
    t.includes("operation") ||
    d.includes("operation") ||
    t.includes("exploration") ||
    d.includes("exploration") ||
    t.includes("oml") ||
    d.includes("oml") ||
    t.includes("drill") ||
    d.includes("drill") ||
    t.includes("crew") ||
    d.includes("crew")
  ) {
    return "operations";
  }
  if (
    t.includes("facility") ||
    d.includes("facility") ||
    t.includes("valve") ||
    d.includes("valve") ||
    t.includes("tank") ||
    d.includes("tank") ||
    t.includes("station") ||
    d.includes("station") ||
    t.includes("gate") ||
    d.includes("gate") ||
    t.includes("office") ||
    d.includes("office") ||
    t.includes("headquarter") ||
    d.includes("headquarter") ||
    t.includes("plant") ||
    d.includes("plant")
  ) {
    return "facilities";
  }
  if (
    t.includes("community") ||
    d.includes("community") ||
    t.includes("outreach") ||
    d.includes("outreach") ||
    t.includes("csr") ||
    d.includes("csr") ||
    t.includes("medical") ||
    d.includes("medical") ||
    t.includes("people") ||
    d.includes("people") ||
    t.includes("host") ||
    d.includes("host")
  ) {
    return "community";
  }
  if (
    t.includes("event") ||
    d.includes("event") ||
    t.includes("meeting") ||
    d.includes("meeting") ||
    t.includes("ceremony") ||
    d.includes("ceremony") ||
    t.includes("milestone") ||
    d.includes("milestone") ||
    t.includes("anniversary") ||
    d.includes("anniversary")
  ) {
    return "events";
  }

  // Falling back to a cyclic distribution if no keywords match
  const fallbackCategories = [
    "operations",
    "facilities",
    "community",
    "events",
  ];
  return fallbackCategories[index % fallbackCategories.length];
};

export default function Gallery() {
  const { data: galleryItems, isLoading } = useGallery();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const heroOverlayRef = useRef<HTMLDivElement | null>(null);
  const contentSectionRef = useRef<HTMLElement | null>(null);

  const [activeTab, setActiveTab] = useState("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Process data from CMS and assign categories dynamically, fall back to local items if empty
  const items =
    galleryItems && galleryItems.length > 0
      ? galleryItems.map((item, idx) => ({
          id: item.id,
          title: item.title,
          description: item.description || "",
          image: getImageUrl(item.image),
          category: getCategoryForCmsItem(item.title, item.description, idx),
        }))
      : FALLBACK_ITEMS;

  // Filter items based on active tab
  const filteredItems = items.filter(
    (item) => activeTab === "ALL" || item.category.toUpperCase() === activeTab,
  );

  // Lightbox navigation handlers
  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1,
    );
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0,
    );
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  // Prevent scroll when Lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  // GSAP animations for entering elements
  useEffect(() => {
    if (!rootRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const heroCopy = rootRef.current?.querySelectorAll("[data-hero-copy]");
      const sectionElements = rootRef.current?.querySelectorAll(
        "[data-section-fade]",
      );

      // Initial state
      if (heroCopy?.length) {
        gsap.fromTo(
          heroCopy,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            delay: 0.2,
          },
        );
      }

      // Parallax scroll on hero image
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { scale: 1.1, opacity: 0.82 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.45,
            ease: "power3.out",
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
        gsap.to(heroOverlayRef.current, {
          opacity: 0.88,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.15,
          },
        });
      }

      // Fade-in main content elements on scroll
      if (sectionElements?.length) {
        gsap.fromTo(
          sectionElements,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: contentSectionRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="w-full bg-[#f8f9fa] overflow-x-hidden min-h-screen"
    >
      {/* Hero Section Banner */}
      <section
        ref={heroRef}
        className="relative isolate w-full overflow-hidden bg-[#0a1210] -mt-[30px]"
      >
        {/* Colors Accent Bar */}
        <div className="absolute inset-x-0 bottom-0 z-30 flex h-[3px] md:h-[4px]">
          <span className="h-full basis-[45%] bg-[#1bc7f0]" />
          <span className="h-full basis-[27%] bg-[#ed2a24]" />
          <span className="h-full basis-[28%] bg-[#173fe3]" />
        </div>

        <div className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[330px] lg:min-h-[372px]">
          <div ref={heroImageRef} className="absolute inset-0">
            <Image
              src="/images/facility.jpg"
              alt="NEPN Oil and Gas Processing Facility"
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
                "linear-gradient(180deg, rgba(5,10,7,0.35) 0%, rgba(5,10,7,0.45) 24%, rgba(5,10,7,0.6) 60%, rgba(5,10,7,0.85) 100%)",
            }}
          />

          <div className="absolute inset-0 z-20">
            <div className="mx-auto flex h-full w-full max-w-[1250px] items-center justify-center px-5 py-10 text-center sm:px-8 md:px-10">
              <div className="flex w-full flex-col items-center justify-center translate-y-[28px] sm:translate-y-[34px] md:translate-y-[40px]">
                {/* Breadcrumbs */}
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
                  <span className="text-white/50">Gallery</span>
                </div>

                {/* Main Heading */}
                <h1
                  data-hero-copy
                  className="text-white font-bold tracking-tight"
                  style={{
                    fontSize: "clamp(30px, 7.5vw, 51.2px)",
                    lineHeight: "1.15",
                    textShadow: "0 10px 30px rgba(0,0,0,0.28)",
                  }}
                >
                  Media{" "}
                  <span
                    className="italic text-[#82E8B4]"
                    style={{
                      fontWeight: 700,
                    }}
                  >
                    Gallery
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section
        ref={contentSectionRef}
        className="max-w-[1250px] mx-auto px-6 py-20 lg:py-28"
      >
        {/* Visual Stories Headers */}
        <div className="text-center mb-12 lg:mb-16">
          <div
            data-section-fade
            className="mb-3 flex items-center justify-center gap-3 text-[10.5px] font-bold uppercase tracking-[0.32em]"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            <span className="h-[2px] w-4 rounded-full bg-[#EF3B3B]" />
            <span className="text-[#EF3B3B]">VISUAL STORIES</span>
          </div>

          <h2
            data-section-fade
            className="font-black leading-[0.98] tracking-[-0.03em] text-[#1f2724] mb-5"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
            }}
          >
            Explore Our Work{" "}
            <span className="italic text-[#14874f]">in Action</span>
          </h2>

          <p
            data-section-fade
            className="text-neutral-500 text-[14.5px] leading-relaxed max-w-2xl mx-auto"
          >
            Discover moments from our operations, facilities, community
            engagements, and milestones that define NEPN&apos;s commitment to
            excellence.
          </p>
        </div>

        {/* Tab Filters */}
        <div
          data-section-fade
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-14"
        >
          {CATEGORIES.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                "h-[40px] px-6 text-[11px] font-extrabold uppercase tracking-[0.08em] transition-all duration-300 rounded cursor-pointer outline-none border",
                activeTab === tab
                  ? "bg-[#14874f] text-white border-[#14874f] shadow-md shadow-[#14874f]/15"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-[#14874f]/50 hover:text-[#14874f]",
              ].join(" ")}
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-neutral-400">
            <Loader2 className="w-10 h-10 animate-spin text-[#14874f] mb-4" />
            <p className="text-sm font-semibold tracking-wide">
              Loading gallery media...
            </p>
          </div>
        ) : (
          /* Staggered Masonry Grid Layout */
          <div
            data-section-fade
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 w-full animate-fade-in"
          >
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="relative overflow-hidden rounded-2xl bg-neutral-200 group cursor-pointer break-inside-avoid shadow-[0_8px_30px_rgba(0,0,0,0.015)] border border-neutral-100/60 transition-all duration-300 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative w-full aspect-auto min-h-[200px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>

                {/* Dark Vignette and Hover Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 sm:p-7">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Category tag */}
                    <span
                      className="inline-block bg-[#14874f] text-white text-[8px] font-bold tracking-[0.15em] uppercase px-2.5 py-0.5 rounded mb-3"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      {item.category}
                    </span>

                    {/* Image Title */}
                    <h3 className="text-white text-base font-bold leading-snug mb-1">
                      {item.title}
                    </h3>

                    {/* Image Description */}
                    <p className="text-white/70 text-[11px] font-medium leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Maximize Icon */}
                    <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                      <Maximize2 size={13} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-20 border border-dashed border-neutral-200 rounded-3xl bg-neutral-50/50">
            <p className="text-neutral-500 text-sm font-semibold tracking-wide uppercase">
              No media files available in this category
            </p>
          </div>
        )}
      </section>

      {/* Lightbox Modal Dialog */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-[100] bg-black/98 flex flex-col justify-between p-4 sm:p-6 select-none animate-fade-in">
          {/* Top Panel */}
          <div className="flex items-center justify-between text-white/70 text-xs sm:text-sm font-semibold w-full max-w-[1250px] mx-auto z-10 py-2">
            <span>
              {lightboxIndex + 1} / {filteredItems.length}
            </span>

            <button
              onClick={() => setLightboxIndex(null)}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 hover:text-white transition duration-200 cursor-pointer outline-none"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>

          {/* Central Section (Image + Controls) */}
          <div className="relative flex-1 flex items-center justify-center max-w-[1250px] mx-auto w-full group">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="absolute left-0 sm:left-4 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 hover:text-white transition duration-200 cursor-pointer outline-none z-10 opacity-60 hover:opacity-100"
              title="Previous"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Lightbox Image */}
            <div className="relative max-w-full max-h-[72vh] flex items-center justify-center overflow-hidden">
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[72vh] object-contain rounded shadow-2xl animate-scale-up"
              />
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 sm:right-4 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 hover:text-white transition duration-200 cursor-pointer outline-none z-10 opacity-60 hover:opacity-100"
              title="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Panel (Image details) */}
          <div className="text-center text-white w-full max-w-[700px] mx-auto z-10 pb-6 pt-4 animate-scale-up">
            <span
              className="inline-block bg-[#14874f] text-white text-[8px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded mb-3"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {filteredItems[lightboxIndex].category}
            </span>
            <h3 className="text-lg sm:text-xl font-bold mb-1 leading-snug">
              {filteredItems[lightboxIndex].title}
            </h3>
            <p className="text-white/60 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              {filteredItems[lightboxIndex].description}
            </p>
          </div>

          {/* Styled animation keyframes inside Lightbox */}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleUp {
              from { transform: scale(0.96); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            .animate-fade-in {
              animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .animate-scale-up {
              animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
