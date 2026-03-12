"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
      {/* Animated 404 */}
      <h1 className="text-[120px] md:text-[160px] font-extrabold text-[#006633] animate-pulse">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
        Page Not Found
      </h2>

      <p className="text-gray-500 max-w-md mb-8">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or may have
        been moved.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          href="/"
          className="px-6 py-3 bg-[#006633] text-white font-semibold rounded-md hover:bg-[#00512a] transition"
        >
          Go Back Home
        </Link>

        <Link
          href="/contact"
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:border-[#006633] hover:text-[#006633] transition"
        >
          Contact Support
        </Link>
      </div>

      {/* Decorative animation */}
      <div className="mt-16 relative">
        <div className="w-32 h-32 rounded-full bg-[#006633]/10 animate-bounce"></div>
      </div>
    </div>
  );
}
