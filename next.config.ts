import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Block on metadata for every user agent so <title> and <meta description> land in <head>, not in the streamed body.
  htmlLimitedBots: /.*/,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280],
    imageSizes: [96, 160, 240, 320],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "radix-ui", "framer-motion"],
  },
};

export default config;
