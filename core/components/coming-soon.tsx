"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function ComingSoon() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 10,
  });

  // Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => ({
        ...prev,
        seconds: prev.seconds > 0 ? prev.seconds - 1 : 59,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1 },
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.5",
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.5",
      )
      .fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.6",
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden bg-[#050505]"
    >
      {/* Background gradient glow */}
      <div className="absolute w-[700px] h-[700px] bg-green-600/20 blur-[160px] rounded-full animate-pulse" />

      {/* Logo */}
      {/* <div ref={logoRef} className="mb-10">
        <Image
          src="/logo.png"
          alt="Company Logo"
          width={90}
          height={90}
          priority
        />
      </div> */}

      {/* Title */}
      <h1
        ref={titleRef}
        className="text-5xl md:text-7xl font-bold text-white tracking-tight"
      >
        Something Amazing
        <span className="text-green-500"> is Coming</span>
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="mt-6 text-gray-400 max-w-lg text-lg leading-relaxed"
      >
        We're working hard to launch our new experience. Stay tuned for
        something powerful, modern and innovative.
      </p>

      {/* Countdown */}
      {/* <div className="flex gap-8 mt-12 text-white">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="flex flex-col items-center">
            <span className="text-4xl font-bold">{value}</span>
            <span className="text-xs uppercase tracking-widest text-gray-400">
              {label}
            </span>
          </div>
        ))}
      </div> */}

      {/* Email subscribe */}
      {/* <div ref={formRef} className="mt-12 flex gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-5 py-3 rounded-md bg-black/40 border border-gray-700 text-white placeholder-gray-500 focus:outline-none"
        />

        <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold transition">
          Notify Me
        </button>
      </div> */}

      {/* Footer */}
      <p className="absolute bottom-6 text-gray-600 text-sm">
        © {new Date().getFullYear()} All rights reserved
      </p>
    </div>
  );
}
