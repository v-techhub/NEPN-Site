"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFaqs } from "@/core/hooks/queries/useFaqs";
import Link from "next/link";
import { FaqItem } from "@/core/api/types";

gsap.registerPlugin(ScrollTrigger);

function AccordionItem({
  faq,
  isOpen,
  onToggle,
  itemRef,
}: {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  itemRef: (el: HTMLDivElement | null) => void;
}) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const body = bodyRef.current;
    const inner = innerRef.current;
    if (!body || !inner) return;

    if (isOpen) {
      gsap.set(body, { height: "auto", opacity: 1 });
      const h = inner.offsetHeight;
      gsap.fromTo(
        body,
        { height: 0, opacity: 0 },
        { height: h, opacity: 1, duration: 0.42, ease: "power3.out" },
      );
      gsap.to(iconRef.current, {
        rotation: 45,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(body, {
        height: 0,
        opacity: 0,
        duration: 0.32,
        ease: "power3.inOut",
      });
      gsap.to(iconRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      className="border-b last:border-b-0"
      style={{ borderColor: "rgba(0,0,0,0.1)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span
          className="text-[15px] font-bold leading-snug transition-colors duration-150"
          style={{
            fontFamily: "'Barlow', sans-serif",
            color: isOpen ? "#006633" : "#111",
          }}
        >
          {faq.question}
        </span>

        <div
          ref={iconRef}
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors duration-200"
          style={{
            borderColor: isOpen ? "#006633" : "rgba(0,102,51,0.4)",
            background: isOpen ? "#006633" : "transparent",
          }}
          aria-hidden
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke={isOpen ? "#fff" : "#006633"}
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14M5 12h14"
            />
          </svg>
        </div>
      </button>

      <div
        ref={bodyRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div ref={innerRef} className="pb-5 pr-12">
          <p
            className="text-[14.5px] leading-relaxed"
            style={{ color: "#444", fontFamily: "'Barlow', sans-serif" }}
          >
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { data: cmsFaqs, isLoading } = useFaqs();
  const [openId, setOpenId] = useState<number | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const faqs: FaqItem[] =
    cmsFaqs && Array.isArray(cmsFaqs.faqs) ? cmsFaqs.faqs : [];
  const activeOpenId = openId;

  useEffect(() => {
    if (!isLoading && faqs.length > 0 && !hasInitialized) {
      setOpenId(faqs[0].id);
      setHasInitialized(true);
    }
  }, [isLoading, faqs, hasInitialized]);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 78%", once: true };

      gsap.fromTo(
        leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: st,
        },
      );
      gsap.fromTo(
        [
          eyebrowRef.current,
          headingRef.current,
          subRef.current,
          cardRef.current,
        ],
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.15,
          scrollTrigger: st,
        },
      );
      gsap.fromTo(
        rightRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: st,
        },
      );

      const activeFAQRows = itemRefs.current.filter(Boolean);
      if (activeFAQRows.length > 0) {
        gsap.fromTo(
          activeFAQRows,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.09,
            delay: 0.3,
            scrollTrigger: st,
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, faqs.length]);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 lg:py-24"
      style={{ background: "#f0ede6", fontFamily: "'Barlow', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-20 xl:gap-24">
          <div ref={leftRef} className="flex flex-col">
            <div ref={eyebrowRef} className="flex items-center gap-3 mb-4">
              <span className="block w-6 h-[2.5px] bg-red-600 rounded-full flex-shrink-0" />
              <span
                className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-gray-600"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                FAQ
              </span>
            </div>

            <h2
              ref={headingRef}
              className="font-black leading-tight mb-5"
              style={{
                fontSize: "clamp(32px, 3.8vw, 52px)",
                fontFamily: "'Clash Display', sans-serif",
                color: "#111",
              }}
            >
              Frequently Asked{" "}
              <span className="block" style={{ color: "#006633" }}>
                Questions
              </span>
            </h2>

            <p
              ref={subRef}
              className="text-[15px] leading-relaxed mb-8"
              style={{ color: "#444", maxWidth: "360px" }}
            >
              Quick answers to common enquiries about our operations,
              partnerships, and more.
            </p>

            <div
              ref={cardRef}
              className="flex flex-col p-8 lg:p-9 mt-auto"
              style={{ background: "#006633" }}
            >
              <h3
                className="font-bold text-white mb-3 leading-tight"
                style={{
                  fontSize: "clamp(20px, 2vw, 26px)",
                  fontFamily: "'Clash Display', sans-serif",
                }}
              >
                Have More Questions?
              </h3>
              <p
                className="text-[14px] leading-relaxed mb-7"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                Our team is ready to help with any enquiry about operations,
                investment opportunities, or community programmes.
              </p>
              <Link
                href="/contact"
                className="group self-start inline-flex items-center gap-3 px-6 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase text-white border border-white/50 transition-all duration-200 hover:bg-white hover:text-[#006633] text-center"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                GET IN TOUCH
              </Link>
            </div>
          </div>

          <div ref={rightRef} className="pt-1">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="py-5 border-b border-black/10 animate-pulse flex justify-between items-center"
                  >
                    <div className="w-2/3 h-5 bg-neutral-200 rounded animate-pulse" />
                    <div className="w-7 h-7 rounded-full bg-neutral-200 animate-pulse" />
                  </div>
                ))}
              </div>
            ) : faqs.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-neutral-500 font-semibold text-sm">
                  FAQ content has not been published yet.
                </p>
              </div>
            ) : (
              faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.id}
                  faq={faq}
                  isOpen={activeOpenId === faq.id}
                  onToggle={() =>
                    setOpenId(activeOpenId === faq.id ? null : faq.id)
                  }
                  itemRef={(el) => {
                    itemRefs.current[i] = el;
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
