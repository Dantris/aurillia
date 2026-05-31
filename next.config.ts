import type { NextConfig } from "next";

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  // (optional) leave this OFF if you want TS to still block bad types
  // typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
