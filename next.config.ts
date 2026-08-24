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
         * HTML must never outlive the assets it references. A deploy deletes
         * the previous build's hashed files, so any cached page still asking
         * for them gets a 404 and renders unstyled.
         *
         * The earlier `s-maxage=60, stale-while-revalidate=300` allowed the
         * CDN to serve stale HTML for up to six minutes after a deploy,
         * which is exactly that failure: an old page pointing at a stylesheet
         * that no longer exists.
         *
         * `max-age=0, must-revalidate` means every request revalidates before
         * the page is used. With an ETag that is a cheap 304 rather than a
         * full fetch, and the origin answers in around 20ms, so the cost is
         * negligible against never serving a broken page.
         *
         * The negative lookahead leaves the immutable rule above intact.
         */
        source: "/((?!_next/static|_next/image).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
