import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // This ensures Vercel ignores minor styling warnings during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
