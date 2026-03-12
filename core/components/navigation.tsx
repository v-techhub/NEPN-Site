"use client";

import { useState } from "react";
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

  return (
    <header className="bg-white shadow-[0_1px_0_rgba(0,0,0,0.08),0_2px_10px_rgba(0,0,0,0.04)] sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 xl:px-10 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="Network Exploration & Production Nigeria Limited"
            className="h-12 w-auto object-contain"
          />
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
                    ? "text-[#006633] after:bg-[#006633]"
                    : "text-gray-800 hover:text-[#006633] after:bg-transparent hover:after:bg-[#006633]/30",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}

          {/* Contact Button */}
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
          <span
            className={`block w-6 h-0.5 bg-gray-800 transition-all duration-200 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-800 transition-all duration-200 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-800 transition-all duration-200 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col border-t border-gray-100 px-6 py-2 bg-white">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={[
                  "py-3.5 text-[14px] font-semibold tracking-wide border-b border-gray-100 last:border-0 transition-colors duration-150",
                  isActive
                    ? "text-[#006633]"
                    : "text-gray-800 hover:text-[#006633]",
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
