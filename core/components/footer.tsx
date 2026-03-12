import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    "Home",
    "Who We Are",
    "Operations",
    "Sustainability",
    "Partners",
    "News & Insights",
    "Contact Us",
  ];

  const legalLinks = [
    "Site Map",
    "Terms of Service",
    "Privacy Policy",
    "HSE Policy",
    "Anti-Corruption Policy",
  ];

  return (
    <footer className="bg-[#070707] text-gray-400">
      <div className="max-w-[1250px] mx-auto px-6 py-20">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
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
              resources with a proven track record in OML 13.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-8">
              {["Li", "Tw", "Fb", "Yt"].map((item) => (
                <div
                  key={item}
                  className="w-10 h-10 flex items-center justify-center border border-gray-700 text-sm hover:border-gray-500 hover:text-white transition"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-[#31c48d] tracking-[3px] text-sm font-semibold mb-6">
              QUICK LINKS
            </h4>

            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <span className="text-red-500">—</span>

                  <span className="group-hover:text-white transition">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-[#31c48d] tracking-[3px] text-sm font-semibold mb-6">
              LEGAL
            </h4>

            <ul className="space-y-4">
              {legalLinks.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <span className="text-red-500">—</span>

                  <span className="group-hover:text-white transition">
                    {item}
                  </span>
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
              <div className="pt-4">
                <p className="text-[#31c48d] tracking-[3px] text-sm mb-3">
                  NEWSLETTER
                </p>

                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 bg-[#111] border border-[#222] px-4 py-3 text-sm outline-none"
                  />

                  <button className="bg-red-600 hover:bg-red-700 px-6 text-white text-sm font-semibold transition">
                    GO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-[#1a1a1a] mt-16 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
          <p>© 2026 Network E&P Nigeria Limited. All rights reserved.</p>

          <div className="flex gap-8 mt-3 md:mt-0">
            <span className="hover:text-white cursor-pointer transition">
              Site Map
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Terms
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
