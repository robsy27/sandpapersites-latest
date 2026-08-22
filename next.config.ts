import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export: emits a plain HTML/CSS/JS site into `out/`, which any
   * static host (Hostinger, cPanel, S3) can serve without running Node.
   * The site has no server-side features, so nothing is lost.
   */
  output: "export",

  /**
   * Emits `about/index.html` rather than `about.html`, so Apache/LiteSpeed
   * resolves /about without extra rewrite rules.
   */
  trailingSlash: true,

  /**
   * next/image's optimiser needs a server. Static export serves the
   * original files instead.
   */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
