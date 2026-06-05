import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.networkeandp.com",
      },
    ],
  },
};

export default nextConfig;
