import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Logo */}
      <div className="animate-pulse">
        <Image
          src="/logo.png"
          alt="Company Logo"
          width={90}
          height={90}
          priority
        />
      </div>

      {/* Loader */}
      <div className="mt-6 w-12 h-12 border-4 border-gray-200 border-t-[#006633] rounded-full animate-spin"></div>

      {/* Loading Text */}
      <p className="mt-4 text-sm text-gray-500 tracking-wide">
        Loading experience...
      </p>
    </div>
  );
}
