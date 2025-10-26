import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["example.com"],
    qualities: [75, 100],
  }
};

export default nextConfig;
