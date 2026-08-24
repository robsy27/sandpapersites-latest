import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    /**
     * The immutable rule below is only safe once filenames are
     * content-hashed, which happens in a production build. The dev server
     * reuses a single filename for the whole session, so caching it for a
     * year told the browser to keep serving stale CSS — and `immutable`
     * means even a normal reload will not revalidate it. That is what made
     * the layout appear to break repeatedly in development.
     */
    const isDev = process.env.NODE_ENV === "development";

    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: isDev
              ? "no-store, must-revalidate"
              : "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        /**
         * Everything else — HTML in particular.
         *
         * Next.js defaults prerendered pages to `s-maxage=31536000`, which
         * told Hostinger's CDN to hold the HTML for a year. After a deploy
         * the CDN kept serving old HTML that referenced hashed assets no
         * longer on the server, so the stylesheet 404'd and the site
         * rendered unstyled.
         *
         * A short shared max-age plus stale-while-revalidate keeps pages
         * fast while letting a deploy go live within a minute.
         *
         * The negative lookahead leaves the immutable rule above intact.
         */
        source: "/((?!_next/static|_next/image).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
