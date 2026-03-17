"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Who We Are", href: "/about" },
  { label: "Operations", href: "/operations" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Partners", href: "/partners" },
  { label: "News", href: "/news" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    // Set initial state immediately
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent render until mounted to avoid hydration glitch
  if (!mounted) return null;

  return (
    <header
      className={[
        "top-0 z-50 font-sans transition-all duration-300",
        scrolled
          ? "sticky bg-white shadow-[0_1px_0_rgba(0,0,0,0.08),0_2px_10px_rgba(0,0,0,0.04)]"
          : "absolute w-full bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-6 xl:px-10 flex items-center justify-between h-[72px]">

        {/* Logo + Wordmark */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/logo-brand.png"
            alt="NEPN"
            className="h-11 w-auto object-contain"
          />
          <div className={[
            "flex flex-col leading-tight transition-colors duration-300",
            scrolled ? "text-gray-900" : "text-white",
          ].join(" ")}>
            <span className="text-[11px] font-bold tracking-widest uppercase">
              Network Exploration
            </span>
            <span className="text-[11px] font-bold tracking-widest uppercase">
              &amp; Production
            </span>
            <span className="text-[10px] font-medium tracking-wider uppercase opacity-80">
              Nigeria <span className="font-normal italic">Limited</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center h-full">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={label}
                href={href}
                className={[
                  "relative h-full inline-flex items-center px-5 text-[13.5px] font-semibold tracking-wide transition-colors duration-150",
                  "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:rounded-t-sm after:transition-all after:duration-200",
                  isActive
                    ? scrolled
                      ? "text-[#006633] after:bg-[#006633]"
                      : "text-white after:bg-white"           // ← fix: white when transparent
                    : scrolled
                      ? "text-gray-800 hover:text-[#006633] after:bg-transparent hover:after:bg-[#006633]/30"
                      : "text-white/80 hover:text-white after:bg-transparent hover:after:bg-white/40",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="ml-6 inline-flex items-center px-5 py-2.5 bg-[#CC1F1F] hover:bg-[#b31a1a] active:bg-[#9e1818] text-white text-[13.5px] font-bold tracking-wide rounded transition-colors duration-150 whitespace-nowrap"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          {[
            menuOpen ? "rotate-45 translate-y-2" : "",
            menuOpen ? "opacity-0 scale-x-0" : "",
            menuOpen ? "-rotate-45 -translate-y-2" : "",
          ].map((transform, i) => (
            <span
              key={i}
              className={`block w-6 h-0.5 transition-all duration-200 ${
                scrolled ? "bg-gray-800" : "bg-white"
              } ${transform}`}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col bg-white border-t border-gray-100 px-6 py-2">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={[
                  "py-3.5 text-[14px] font-semibold tracking-wide border-b border-gray-100 last:border-0 transition-colors duration-150",
                  isActive ? "text-[#006633]" : "text-gray-800 hover:text-[#006633]",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 mb-3 inline-flex justify-center items-center px-5 py-2.5 bg-[#CC1F1F] hover:bg-[#b31a1a] text-white text-[14px] font-bold tracking-wide rounded transition-colors duration-150"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}