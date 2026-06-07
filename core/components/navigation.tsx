"use client";

import React, { useState, useEffect } from "react";
import StaggeredMenu from "./staggered-menu";
import { FileSpreadsheet } from "lucide-react";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "Who We Are", ariaLabel: "Learn about who we are", link: "/about" },
  {
    label: "Operations",
    ariaLabel: "View our operations",
    link: "/operations",
  },
  {
    label: "Sustainability",
    ariaLabel: "Read about our sustainability efforts",
    link: "/sustainability",
  },
  { label: "Partners", ariaLabel: "See our partners", link: "/partners" },
  { label: "Gallery", ariaLabel: "View our gallery", link: "/gallery" },
  { label: "News", ariaLabel: "Read our latest news", link: "/news" },
  { label: "Contact Us", ariaLabel: "Get in touch with us", link: "/contact" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={false}
      displayItemNumbering={true}
      menuButtonColor={scrolled ? "#111111" : "#ffffff"}
      openMenuButtonColor="#111111"
      changeMenuColorOnOpen={true}
      colors={["#B497CF", "#5227FF"]}
      logoUrl="/logo-brand.png"
      accentColor="#CC1F1F"
      isFixed={true}
    />
  );
}
