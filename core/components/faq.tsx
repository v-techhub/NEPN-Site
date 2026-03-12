"use client";

/**
 * FAQ.jsx
 *
 * Dependencies:
 *   npm install gsap
 *
 * Usage:
 *   import FAQ from "@/components/FAQ";
 *   <FAQ />
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    id: 1,
    question: "What is NEPN's primary area of operation?",
    answer:
      "NEPN's primary operational area is the Qua Iboe field in OML 13, Akwa Ibom State. Our field office is at 5 Terminal Road, Inua Eyet Ikot, Ibeno LGA.",
  },
  {
    id: 2,
    question: "Is NEPN open to joint venture partnerships?",
    answer:
      "Yes. NEPN actively seeks strategic joint ventures with companies that share our commitment to responsible energy development, technical excellence, and community impact across Nigeria.",
  },
  {
    id: 3,
    question: "How does NEPN approach environmental responsibility?",
    answer:
      "We operate a zero-incident HSE culture and are committed to our net zero 2050 roadmap. This includes flaring reduction programmes, community environmental monitoring, and alignment with international sustainability frameworks.",
  },
  {
    id: 4,
    question: "What community initiatives does NEPN run?",
    answer:
      "NEPN invests in education, healthcare, and infrastructure in our host communities across Akwa Ibom State. Our community liaison team works directly with local leaders to co-design meaningful, lasting programmes.",
  },
  {
    id: 5,
    question: "How do I apply for a position at NEPN?",
    answer:
      "Open roles are posted on our Careers page. You can also send a speculative application to careers@nepn.com.ng — we welcome talent across engineering, operations, finance, and community development.",
  },
];

// ── Accordion Item ────────────────────────────────────────────────────────────
function AccordionItem({ faq, isOpen, onToggle, itemRef, index }) {
  const bodyRef = useRef(null);
  const innerRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const body = bodyRef.current;
    const inner = innerRef.current;
    if (!body || !inner) return;

    if (isOpen) {
      // Measure natural height
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

        {/* +/× icon */}
        <div
          ref={iconRef}
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors duration-200"
          style={{
            borderColor: isOpen ? "#006633" : "rgba(0,102,51,0.4)",
            background: isOpen ? "#006633" : "transparent",
          }}
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

      {/* Answer body */}
      <div
        ref={bodyRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div ref={innerRef} className="pb-5 pr-12">
          <p
            className="text-[14.5px] leading-relaxed"
            style={{ color: "#555", fontFamily: "'Barlow', sans-serif" }}
          >
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function FAQ() {
  const [openId, setOpenId] = useState(1); // first open by default

  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const cardRef = useRef(null);
  const rightRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 78%", once: true };

      // Left column slide in
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

      // Left content stagger
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

      // Right column slide in
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

      // FAQ rows stagger in
      gsap.fromTo(
        itemRefs.current,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 lg:py-24"
      style={{ background: "#f0ede6", fontFamily: "'Barlow', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-20 xl:gap-24">
          {/* ── LEFT column ───────────────────────────────────────────────── */}
          <div ref={leftRef} className="flex flex-col">
            {/* Eyebrow */}
            <div ref={eyebrowRef} className="flex items-center gap-3 mb-4">
              <span className="block w-6 h-[2.5px] bg-red-600 rounded-full flex-shrink-0" />
              <span
                className="text-[10.5px] font-bold tracking-[0.24em] uppercase text-gray-500"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                FAQ
              </span>
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="font-black leading-tight mb-5"
              style={{
                fontSize: "clamp(32px, 3.8vw, 52px)",
                fontFamily: "'Barlow Condensed', sans-serif",
                color: "#111",
              }}
            >
              Frequently Asked{" "}
              <span className="block" style={{ color: "#006633" }}>
                Questions
              </span>
            </h2>

            {/* Subtitle */}
            <p
              ref={subRef}
              className="text-[15px] leading-relaxed mb-8"
              style={{ color: "#666", maxWidth: "360px" }}
            >
              Quick answers to common enquiries about our operations,
              partnerships, and more.
            </p>

            {/* Have More Questions card */}
            <div
              ref={cardRef}
              className="flex flex-col p-8 lg:p-9 mt-auto"
              style={{ background: "#006633" }}
            >
              <h3
                className="font-bold text-white mb-3 leading-tight"
                style={{
                  fontSize: "clamp(20px, 2vw, 26px)",
                  fontFamily: "'Barlow Condensed', sans-serif",
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
              <button
                className="group self-start inline-flex items-center gap-3 px-6 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase text-white border border-white/50 transition-all duration-200 hover:bg-white hover:text-[#006633]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                GET IN TOUCH
              </button>
            </div>
          </div>

          {/* ── RIGHT column: Accordion ────────────────────────────────────── */}
          <div ref={rightRef} className="pt-1">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                itemRef={(el) => (itemRefs.current[i] = el)}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800;900&display=swap');
      `}</style>
    </section>
  );
}
