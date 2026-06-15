"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useNewsletter } from "@/core/hooks/queries/useNewsletter";

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Who We Are", href: "/about" },
    { label: "Operations", href: "/operations" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Partners", href: "/partners" },
    { label: "Gallery", href: "/gallery" },
    { label: "News & Insights", href: "/news" },
    { label: "Contact Us", href: "/contact" },
  ];

  const [email, setEmail] = useState("");
  const newsletterMutation = useNewsletter();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    newsletterMutation.mutate(
      { email: email.trim() },
      {
        onSuccess: () => {
          setEmail("");
        },
        onError: (err: unknown) => {
          // Handled via inline error display
        },
      },
    );
  };

  return (
    <footer className="bg-[#070707] text-gray-400">
      <div className="max-w-[1250px] mx-auto px-6 py-20">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {/* COMPANY INFO */}
          <div>
            <Image
              src="/logo.png"
              alt="NEPN Logo"
              width={70}
              height={70}
              className="mb-5"
            />

            <h3 className="text-white text-2xl font-semibold mb-4">NEPN</h3>

            <p className="leading-7 text-[15px]">
              A leading indigenous oil and gas company established in 2001,
              dedicated to responsibly harnessing Nigeria&apos;s energy
              resources with a proven track record in PML 13.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-[#31c48d] tracking-[3px] text-sm font-semibold mb-6">
              QUICK LINKS
            </h4>

            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.label} className="flex items-center gap-3 group">
                  <span className="text-red-500">—</span>

                  <Link
                    href={item.href}
                    className="group-hover:text-white transition cursor-pointer text-gray-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-[#31c48d] tracking-[3px] text-sm font-semibold mb-6">
              CONTACT
            </h4>

            <div className="space-y-6">
              {/* PHONE */}
              <div className="flex gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[#0d1f18] text-[#31c48d]">
                  <Phone size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-500 tracking-wide">PHONE</p>
                  <p className="text-[15px] text-gray-300">09088855012</p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[#0d1f18] text-[#31c48d]">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-500 tracking-wide">EMAIL</p>
                  <p className="text-[15px] text-gray-300">
                    Info@networkeandp.com
                  </p>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[#0d1f18] text-[#31c48d]">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-500 tracking-wide">
                    HEAD OFFICE
                  </p>
                  <p className="text-[15px] text-gray-300">
                    14 Ademola Street, SW Ikoyi, Lagos
                  </p>
                </div>
              </div>

              {/* NEWSLETTER */}
              <form onSubmit={handleSubscribe} className="pt-4">
                <p className="text-[#31c48d] tracking-[3px] text-sm mb-3 font-semibold uppercase">
                  NEWSLETTER
                </p>

                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={newsletterMutation.isPending}
                    className="flex-1 bg-[#111] border border-[#222] px-4 py-3 text-sm outline-none text-white disabled:opacity-50"
                    required
                  />

                  <button
                    type="submit"
                    disabled={newsletterMutation.isPending}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 px-6 text-white text-sm font-semibold transition cursor-pointer flex items-center justify-center min-w-[70px]"
                  >
                    {newsletterMutation.isPending ? "..." : "GO"}
                  </button>
                </div>
                {newsletterMutation.isSuccess && (
                  <p className="text-xs text-[#31c48d] mt-2 font-medium">
                    Thank you for subscribing!
                  </p>
                )}
                {newsletterMutation.isError && (
                  <p className="text-xs text-red-500 mt-2 font-medium">
                    {newsletterMutation.error?.message ||
                      "Subscription failed. Try again."}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-[#1a1a1a] mt-16 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
          <p>© 2026 Network E&P Nigeria Limited. All rights reserved.</p>

          <div className="flex gap-8 mt-3 md:mt-0">
            <Link href="/" className="hover:text-white transition">
              Site Map
            </Link>
            <Link href="/" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
