"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Determine if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth expo out curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.15,
      infinite: false,
    });

    // Synchronize GSAP ScrollTrigger with Lenis scroll updates
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });


    // Hook Lenis frame updates into GSAP ticker
    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(updatePhysics);
    gsap.ticker.lagSmoothing(0);

    // Scroll restoration helper
    window.history.scrollRestoration = "manual";

    // Clean up scroll bindings and destroy Lenis instances on unmount
    return () => {
      gsap.ticker.remove(updatePhysics);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
