import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [90],
    // AVIF where the browser supports it (about half the size of WebP at the
    // same clarity), WebP otherwise.
    formats: ["image/avif", "image/webp"],
    // Widths the browser can pick from. 2560 keeps full-width photos sharp on
    // a 1440px retina screen; the default 3840 step was the heaviest download.
    deviceSizes: [640, 828, 1080, 1440, 1920, 2560],
    // Every photo is a hashed static import, so optimised copies can be kept.
    minimumCacheTTL: 2678400,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
