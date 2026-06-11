"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Globe,
  Sparkles,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { useContact } from "@/core/hooks/queries/useContact";
import { useNewsletter } from "@/core/hooks/queries/useNewsletter";

const SUBJECT_MAPPING: Record<string, string> = {
  general: "General Enquiry",
  partnership: "Partnership Proposal",
  career: "Career Question",
  media: "Media & Press",
  sustainability: "Sustainability / CSR Inquiry",
  other: "Other Inquiry",
};

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const heroOverlayRef = useRef<HTMLDivElement | null>(null);
  const mainSectionRef = useRef<HTMLElement | null>(null);
  const locationsRef = useRef<HTMLElement | null>(null);

  const contactMutation = useContact();
  const newsletterMutation = useNewsletter();

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organisation: "",
    enquiryType: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) {
      tempErrors.firstName = "First name is required";
    } else if (/\d/.test(formData.firstName)) {
      tempErrors.firstName = "First name cannot contain numbers";
    }

    if (!formData.lastName.trim()) {
      tempErrors.lastName = "Last name is required";
    } else if (/\d/.test(formData.lastName)) {
      tempErrors.lastName = "Last name cannot contain numbers";
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }

    if (formData.phone.trim() && /[a-zA-Z]/.test(formData.phone)) {
      tempErrors.phone = "Phone number cannot contain letters";
    }

    if (!formData.enquiryType)
      tempErrors.enquiryType = "Please select an enquiry type";
    if (!formData.message.trim())
      tempErrors.message = "Message cannot be empty";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    contactMutation.mutate(
      {
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email,
        subject:
          SUBJECT_MAPPING[formData.enquiryType] ||
          formData.enquiryType ||
          "General Enquiry",
        message: formData.message,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          // Clear form
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            organisation: "",
            enquiryType: "",
            message: "",
          });
        },
        onError: (err: unknown) => {
          // Handled via inline error display
        },
      },
    );
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    newsletterMutation.mutate(
      { email: newsletterEmail.trim() },
      {
        onSuccess: () => {
          setNewsletterEmail("");
        },
        onError: (err: unknown) => {
          // Handled via inline error display
        },
      },
    );
  };

  // GSAP Animations
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
      const leftPanel = rootRef.current?.querySelector("[data-left-panel]");
      const rightPanel = rootRef.current?.querySelector("[data-right-panel]");
      const locEyebrow = rootRef.current?.querySelector("[data-loc-eyebrow]");
      const locTitle = rootRef.current?.querySelector("[data-loc-title]");
      const locCards = rootRef.current?.querySelectorAll(
        "[data-loc-cards] > div",
      );

      const targets: Element[] = [];
      if (heroCopy) heroCopy.forEach((el) => targets.push(el));
      if (leftPanel) targets.push(leftPanel);
      if (rightPanel) targets.push(rightPanel);
      if (locEyebrow) targets.push(locEyebrow);
      if (locTitle) targets.push(locTitle);
      if (locCards) locCards.forEach((el) => targets.push(el));

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

      // Main Sections Entrance
      if (leftPanel) {
        gsap.fromTo(
          leftPanel,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mainSectionRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      if (rightPanel) {
        gsap.fromTo(
          rightPanel,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mainSectionRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      // Locations Redesign
      if (locEyebrow) {
        animateReveal(locEyebrow, locationsRef.current);
      }
      if (locTitle) {
        animateReveal(locTitle, locationsRef.current, { delay: 0.1 });
      }
      if (locCards?.length) {
        animateReveal(locCards, locationsRef.current, { delay: 0.25 });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="w-full bg-[#f8f9fa] overflow-x-hidden">
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
              src="/images/facility.jpg"
              alt="NEPN oil production facility gate backdrop"
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
                "linear-gradient(180deg, rgba(5,10,7,0.3) 0%, rgba(5,10,7,0.4) 24%, rgba(5,10,7,0.55) 60%, rgba(5,10,7,0.8) 100%)",
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
                  <span className="text-white/50">Contact</span>
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
                  Get in{" "}
                  <span
                    className="italic text-[#82E8B4]"
                    style={{
                      fontWeight: 700,
                      fontSize: "clamp(30px, 7.5vw, 51.2px)",
                      lineHeight: "1.15",
                      letterSpacing: "0%",
                    }}
                  >
                    Touch
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Split form and info section */}
      <section
        ref={mainSectionRef}
        className="max-w-[1250px] mx-auto px-6 py-20 lg:py-28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-stretch">
          {/* Left panel - Green info Card */}
          <div
            data-left-panel
            className="lg:col-span-5 bg-[#14874f] text-white rounded-3xl p-8 sm:p-12 flex flex-col justify-between shadow-[0_15px_50px_rgba(20,135,79,0.12)] border border-[#14874f]/20 relative overflow-hidden"
          >
            {/* Soft decorative background patterns */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-[34px] sm:text-[40px] font-bold leading-[1.05] tracking-tight mb-5">
                Let&apos;s Start a Conversation
              </h2>
              <p className="text-white/80 text-[14.5px] sm:text-[15.5px] leading-relaxed mb-12 max-w-sm">
                Whether it&apos;s a general enquiry, partnership proposal, or
                career question — our team is here to help.
              </p>

              {/* Details list */}
              <div className="space-y-7 sm:space-y-8">
                {/* PHONE */}
                <div className="flex gap-4 items-start group">
                  <div className="w-11 h-11 shrink-0 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition duration-300">
                    <Phone
                      size={18}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <p
                      className="text-[9.5px] font-bold text-white/50 tracking-widest uppercase mb-0.5"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      PHONE
                    </p>
                    <a
                      href="tel:09088855012"
                      className="text-[15.5px] sm:text-[16.5px] font-semibold hover:text-white/80 transition"
                    >
                      09088855012
                    </a>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex gap-4 items-start group">
                  <div className="w-11 h-11 shrink-0 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition duration-300">
                    <Mail
                      size={18}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <p
                      className="text-[9.5px] font-bold text-white/50 tracking-widest uppercase mb-0.5"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      EMAIL
                    </p>
                    <a
                      href="mailto:Info@networkeandp.com"
                      className="text-[15.5px] sm:text-[16.5px] font-semibold hover:text-white/80 transition breakdown-all"
                    >
                      Info@networkeandp.com
                    </a>
                  </div>
                </div>

                {/* HEAD OFFICE */}
                <div className="flex gap-4 items-start group">
                  <div className="w-11 h-11 shrink-0 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition duration-300">
                    <MapPin
                      size={18}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <p
                      className="text-[9.5px] font-bold text-white/50 tracking-widest uppercase mb-0.5"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      HEAD OFFICE
                    </p>
                    <p className="text-[14px] sm:text-[14.5px] font-normal leading-relaxed text-white/90">
                      14 Ademola Street, SW Ikoyi, Lagos State
                    </p>
                  </div>
                </div>

                {/* FIELD OFFICE */}
                <div className="flex gap-4 items-start group">
                  <div className="w-11 h-11 shrink-0 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition duration-300">
                    <MapPin
                      size={18}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <p
                      className="text-[9.5px] font-bold text-white/50 tracking-widest uppercase mb-0.5"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      FIELD OFFICE
                    </p>
                    <p className="text-[14px] sm:text-[14.5px] font-normal leading-relaxed text-white/90">
                      5 Terminal Road, Inua Eyet Ikot, Ibeno LGA, Akwa Ibom
                    </p>
                  </div>
                </div>

                {/* BUSINESS HOURS */}
                <div className="flex gap-4 items-start group">
                  <div className="w-11 h-11 shrink-0 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition duration-300">
                    <Clock
                      size={18}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <p
                      className="text-[9.5px] font-bold text-white/50 tracking-widest uppercase mb-0.5"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      BUSINESS HOURS
                    </p>
                    <p className="text-[14px] sm:text-[14.5px] font-normal leading-relaxed text-white/90">
                      Mon–Fri: 8:00am – 5:00pm
                      <br />
                      Saturday: 9:00am – 1:00pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social handles */}
            <div className="relative z-10 flex gap-3 mt-14 pt-8 border-t border-white/10">
              {[
                { name: "Linkedin", icon: <Linkedin size={15} />, href: "#" },
                { name: "Twitter", icon: <Twitter size={15} />, href: "#" },
                { name: "Facebook", icon: <Facebook size={15} />, href: "#" },
                { name: "Youtube", icon: <Youtube size={15} />, href: "#" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="w-10 h-10 rounded-full border border-white/15 text-white/80 hover:border-white hover:text-white hover:bg-white/5 flex items-center justify-center transition duration-300"
                  title={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right panel - Contact Form */}
          <div
            data-right-panel
            className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.02)] border border-neutral-100/90 flex flex-col justify-between min-h-[600px] relative overflow-hidden"
          >
            {/* Dynamic visual overlay when submitted */}
            {submitted ? (
              <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center text-center p-8 sm:p-12 animate-fade-in">
                {/* Success Sparkles Icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-[#14874f] relative z-10 border border-green-100">
                    <CheckCircle2 size={40} className="animate-scale-up" />
                  </div>
                  <div className="absolute -top-1 -right-1 text-yellow-400 animate-bounce">
                    <Sparkles size={20} />
                  </div>
                </div>

                <h3
                  className="text-2xl sm:text-3xl font-black text-[#1e2620] mb-3 leading-tight"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  Message Sent Successfully!
                </h3>
                <p className="text-neutral-500 text-[14.5px] max-w-md leading-relaxed mb-8">
                  Thank you for reaching out to us. We have received your
                  inquiry and our team will get back to you within 2 business
                  days.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[4px] bg-[#14874f] hover:bg-[#0c5c34] text-white px-8 font-bold tracking-[0.08em] uppercase text-xs transition duration-300"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  <span>Send Another Message</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ) : null}

            <div>
              <div
                className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em]"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                <span className="h-[2px] w-4 rounded-full bg-[#ef3b3b]" />
                <span className="text-[#ef3b3b]">SEND A MESSAGE</span>
              </div>

              <h2
                className="font-black leading-[0.98] tracking-[-0.03em] text-[#1f2724] mb-3"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: "clamp(2rem, 4.5vw, 3.45rem)",
                }}
              >
                We&apos;d Love to{" "}
                <span className="italic text-[#14874f]">Hear From You</span>
              </h2>

              <p className="text-neutral-500 text-[14px] leading-relaxed mb-10">
                Fill in the form below and our team will respond to your
                corporate inquiry.
              </p>

              {/* Form markup */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full bg-[#f8f9fa] border px-4 py-3 rounded-lg text-sm text-neutral-800 placeholder-neutral-400 outline-none transition focus:bg-white ${
                        errors.firstName
                          ? "border-red-400 focus:border-red-500"
                          : "border-neutral-200 focus:border-[#14874f]"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500 mt-1.5 font-medium">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full bg-[#f8f9fa] border px-4 py-3 rounded-lg text-sm text-neutral-800 placeholder-neutral-400 outline-none transition focus:bg-white ${
                        errors.lastName
                          ? "border-red-400 focus:border-red-500"
                          : "border-neutral-200 focus:border-[#14874f]"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-500 mt-1.5 font-medium">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-[#f8f9fa] border px-4 py-3 rounded-lg text-sm text-neutral-800 placeholder-neutral-400 outline-none transition focus:bg-white ${
                        errors.email
                          ? "border-red-400 focus:border-red-500"
                          : "border-neutral-200 focus:border-[#14874f]"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1.5 font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+234 000 000 0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full bg-[#f8f9fa] border px-4 py-3 rounded-lg text-sm text-neutral-800 placeholder-neutral-400 outline-none transition focus:bg-white ${
                        errors.phone
                          ? "border-red-400 focus:border-red-500"
                          : "border-neutral-200 focus:border-[#14874f]"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1.5 font-medium">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3: Organisation */}
                <div>
                  <label
                    htmlFor="organisation"
                    className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    Organisation
                  </label>
                  <input
                    type="text"
                    id="organisation"
                    name="organisation"
                    placeholder="Your company or association name"
                    value={formData.organisation}
                    onChange={handleInputChange}
                    className="w-full bg-[#f8f9fa] border border-neutral-200 px-4 py-3 rounded-lg text-sm text-neutral-800 placeholder-neutral-400 outline-none transition focus:bg-white focus:border-[#14874f]"
                  />
                </div>

                {/* Row 4: Enquiry Type */}
                <div>
                  <label
                    htmlFor="enquiryType"
                    className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    Enquiry Type *
                  </label>
                  <div className="relative">
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleInputChange}
                      className={`w-full bg-[#f8f9fa] border px-4 py-3 rounded-lg text-sm text-neutral-800 outline-none transition focus:bg-white appearance-none cursor-pointer ${
                        errors.enquiryType
                          ? "border-red-400 focus:border-red-500"
                          : "border-neutral-200 focus:border-[#14874f]"
                      }`}
                    >
                      <option value="">Select an enquiry type</option>
                      <option value="general">General Enquiry</option>
                      <option value="partnership">Partnership Proposal</option>
                      <option value="career">Career Question</option>
                      <option value="media">Media & Press</option>
                      <option value="sustainability">
                        Sustainability / CSR Inquiry
                      </option>
                      <option value="other">Other Inquiry</option>
                    </select>
                    {/* Custom Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                  {errors.enquiryType && (
                    <p className="text-xs text-red-500 mt-1.5 font-medium">
                      {errors.enquiryType}
                    </p>
                  )}
                </div>

                {/* Row 5: Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Describe your enquiry here in detail..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full bg-[#f8f9fa] border px-4 py-3 rounded-lg text-sm text-neutral-800 placeholder-neutral-400 outline-none transition focus:bg-white resize-y min-h-[120px] ${
                      errors.message
                        ? "border-red-400 focus:border-red-500"
                        : "border-neutral-200 focus:border-[#14874f]"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1.5 font-medium">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Privacy disclaimer */}
                <p className="text-[11.5px] text-neutral-400 leading-normal font-normal pt-2">
                  By submitting, you agree to our{" "}
                  <Link
                    href="/privacy"
                    className="text-[#14874f] font-semibold hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full inline-flex h-[52px] items-center justify-center gap-2.5 rounded-lg bg-[#14874f] hover:bg-[#0c5c34] disabled:bg-[#14874f]/70 text-white font-bold tracking-[0.08em] uppercase text-[12.5px] transition duration-300 cursor-pointer border-0 outline-none focus:ring-2 focus:ring-[#14874f]/20 shadow-md shadow-[#14874f]/10"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                  {contactMutation.isError && (
                    <p className="text-xs text-red-500 mt-2.5 font-medium text-center">
                      {contactMutation.error?.message ||
                        "Failed to send message. Please try again later."}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Find NEPN - Redesigned locations with maps */}
      <section
        ref={locationsRef}
        className="w-full bg-[#f1f3f5] py-20 lg:py-28 border-t border-neutral-200/50"
      >
        <div className="max-w-[1250px] mx-auto px-6">
          {/* Section Headers */}
          <div className="text-center mb-16 lg:mb-20">
            <div
              data-loc-eyebrow
              className="mb-3 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em]"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              <span className="h-[2px] w-4 rounded-full bg-[#14874f]" />
              <span className="text-[#14874f]">OUR LOCATIONS</span>
            </div>

            <h2
              data-loc-title
              className="font-black leading-[0.98] tracking-[-0.03em] text-[#1f2724]"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(2.5rem, 5.2vw, 4.35rem)",
              }}
            >
              Find <span className="italic text-[#14874f]">NEPN</span>
            </h2>
          </div>

          {/* Redesigned 3-Column Layout with Maps */}
          <div
            data-loc-cards
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          >
            {/* Card 1: Lagos Head Office */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.02)] border border-neutral-100/90 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md group">
              <div>
                {/* Embedded Map Container */}
                <div className="relative w-full h-[220px] bg-neutral-100 overflow-hidden">
                  <iframe
                    src="https://maps.google.com/maps?q=14%20Ademola%20Street%2C%20SW%20Ikoyi%2C%20Lagos%2C%20Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="NEPN Lagos Head Office Location Map"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[8.5px] font-bold text-white bg-[#14874f] px-2.5 py-1 tracking-wider rounded uppercase shadow-sm font-sans">
                      HEAD OFFICE
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  {/* Left accent title */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-[22px] w-[3px] rounded-full bg-[#14874f]" />
                    <h3 className="font-bold text-[17px] tracking-wide text-[#1e2620]">
                      Lagos Head Office
                    </h3>
                  </div>

                  <p className="text-neutral-500 text-xs sm:text-[13px] leading-relaxed mb-6 font-sans">
                    14 Ademola Street, SW Ikoyi, Lagos State, Nigeria.
                  </p>
                </div>
              </div>

              <div className="px-7 pb-7 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-semibold font-sans">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#14874f]" />
                  <span>HQ Operations Hub</span>
                </span>
                <span className="text-[#14874f] hover:underline cursor-pointer flex items-center gap-1">
                  <span>Directions</span>
                  <ArrowRight size={10} />
                </span>
              </div>
            </div>

            {/* Card 2: Akwa Ibom Field Office */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.02)] border border-neutral-100/90 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md group">
              <div>
                {/* Embedded Map Container */}
                <div className="relative w-full h-[220px] bg-neutral-100 overflow-hidden">
                  <iframe
                    src="https://maps.google.com/maps?q=5%20Terminal%20Road%2C%20Inua%20Eyet%20Ikot%2C%20Ibeno%20LGA%2C%20Akwa%20Ibom%2C%20Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="NEPN Akwa Ibom Field Office Location Map"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[8.5px] font-bold text-white bg-[#ef3b3b] px-2.5 py-1 tracking-wider rounded uppercase shadow-sm font-sans">
                      FIELD OFFICE
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  {/* Left accent title */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-[22px] w-[3px] rounded-full bg-[#ef3b3b]" />
                    <h3 className="font-bold text-[17px] tracking-wide text-[#1e2620]">
                      Akwa Ibom Office
                    </h3>
                  </div>

                  <p className="text-neutral-500 text-xs sm:text-[13px] leading-relaxed mb-6 font-sans">
                    5 Terminal Road, Inua Eyet Ikot, Ibeno LGA, Akwa Ibom State,
                    Nigeria.
                  </p>
                </div>
              </div>

              <div className="px-7 pb-7 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-semibold font-sans">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#ef3b3b]" />
                  <span>Field Processing Hub</span>
                </span>
                <span className="text-[#ef3b3b] hover:underline cursor-pointer flex items-center gap-1">
                  <span>Directions</span>
                  <ArrowRight size={10} />
                </span>
              </div>
            </div>

            {/* Card 3: Support & Get In Touch Widget */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.02)] border border-neutral-100/90 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md group">
              <div>
                {/* Premium availability widget on top */}
                <div className="relative w-full h-[220px] bg-gradient-to-br from-[#0c1b2f] to-[#123157] overflow-hidden flex flex-col justify-center p-8">
                  {/* Sparkles / grid subtle styles */}
                  <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-blue-500/10 blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-cyan-400/5 blur-xl" />

                  {/* Pulsing Availability Badge */}
                  <div className="flex items-center gap-2.5 mb-4 bg-white/5 border border-white/10 rounded-full py-1 px-3 w-fit">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] text-white/90 font-bold uppercase tracking-wider font-sans">
                      Live Support Active
                    </span>
                  </div>

                  <h4 className="text-white text-lg sm:text-xl font-bold leading-tight mb-2">
                    Corporate Support Channels
                  </h4>
                  <p className="text-white/60 text-xs leading-relaxed font-sans">
                    Have urgent project coordination or business enquiries?
                    Reach our communications desk directly.
                  </p>
                </div>

                <div className="p-7">
                  {/* Left accent title */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="h-[22px] w-[3px] rounded-full bg-[#173fe3]" />
                    <h3 className="font-bold text-[17px] tracking-wide text-[#1e2620]">
                      Get In Touch
                    </h3>
                  </div>

                  {/* Contact anchors */}
                  <div className="space-y-4 font-sans">
                    <a
                      href="mailto:Info@networkeandp.com"
                      className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-600 hover:text-[#173fe3] transition group/item"
                    >
                      <Mail
                        size={16}
                        className="text-[#173fe3] group-hover/item:scale-110 transition duration-200"
                      />
                      <span>Info@networkeandp.com</span>
                    </a>
                    <a
                      href="tel:09088855012"
                      className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-600 hover:text-[#173fe3] transition group/item"
                    >
                      <Phone
                        size={16}
                        className="text-[#173fe3] group-hover/item:scale-110 transition duration-200"
                      />
                      <span>09088855012</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="px-7 pb-7 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-semibold font-sans">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#173fe3]" />
                  <span>Mon-Sat Support</span>
                </span>
                <a
                  href="mailto:Info@networkeandp.com"
                  className="text-[#173fe3] hover:underline flex items-center gap-1"
                >
                  <span>Send Email</span>
                  <ArrowRight size={10} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter subscribe CTA banner (red) */}
      <section className="bg-[#ED1D24]">
        <div className="mx-auto flex min-h-[140px] w-full max-w-[1280px] items-center px-[20px]">
          <div className="flex w-full justify-center">
            <div className="flex w-full max-w-[980px] flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:gap-8 md:py-0">
              {/* Text */}
              <div className="w-full max-w-[500px]">
                <p
                  className="text-white font-bold leading-tight"
                  style={{
                    fontSize: "26px",
                  }}
                >
                  Subscribe to Our Newsletter
                </p>
                <p className="mt-[6px] text-white/75 text-xs sm:text-[13px] leading-relaxed">
                  Stay updated with the latest corporate news and project
                  milestones from NEPN.
                </p>
              </div>

              {/* Form */}
              <div className="md:ml-auto flex flex-col items-start w-full md:w-auto">
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-3 items-stretch w-full"
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    disabled={newsletterMutation.isPending}
                    className="flex-1 min-w-[240px] bg-white/10 border border-white/20 text-white placeholder-white/60 px-4 py-2 text-sm rounded-[2px] outline-none focus:bg-white/15 focus:border-white/50 transition-all disabled:opacity-50"
                    required
                  />
                  <button
                    type="submit"
                    disabled={newsletterMutation.isPending}
                    className="inline-flex h-11.5 items-center justify-center gap-2.5 rounded-xs border-2 border-white bg-white hover:bg-transparent text-[#ED1D24] hover:text-white px-6 font-bold tracking-[0.08em] uppercase text-xs outline-none cursor-pointer"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {newsletterMutation.isPending ? (
                      <span>Subscribing...</span>
                    ) : (
                      <>
                        <span>Subscribe Now</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </>
                    )}
                  </button>
                </form>
                {newsletterMutation.isSuccess && (
                  <p className="text-xs text-white mt-2 font-medium">
                    Thank you for subscribing!
                  </p>
                )}
                {newsletterMutation.isError && (
                  <p className="text-xs text-white/90 mt-2 font-medium">
                    {newsletterMutation.error?.message ||
                      "Subscription failed. Please try again."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styled keyframe animations */}
    </div>
  );
}
