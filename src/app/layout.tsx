import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/layout/StructuredData";

/* Display face for headlines, readable sans for body. `swap` avoids FOIT. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Affordable Custom Websites for Small Businesses`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  /* The `keywords` meta tag was dropped here: Google has ignored it since
     2009 and it only invited the temptation to keyword-stuff. Targeting now
     lives in the copy, titles and structured data, which search engines
     actually read. */
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Affordable Custom Websites for Small Businesses`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Affordable Custom Websites for Small Businesses`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1930",
  width: "device-width",
  initialScale: 1,
  /* Zoom is never disabled — users must be able to scale text. */
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-dvh antialiased">
        {/* Scroll-reveal starts hidden and is undone by JS. With JS off it
            would never fire, so show everything. Unlayered, so it beats the
            @layer utilities rule regardless of order. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-navy-950"
        >
          Skip to main content
        </a>
        <Header />
        {/* Offsets the fixed header so it never overlaps page content */}
        <main id="main" className="pt-header">
          {children}
        </main>
        <Footer />

        {/* Stale-HTML safety net.
            A CDN or browser can hold a page from an earlier build, and a
            deploy deletes that build's hashed files — so the stylesheet 404s
            and the page renders with no CSS at all. This checks whether the
            stylesheet actually applied and, if not, reloads once against a
            cache-busting URL to pull fresh HTML. Guarded by sessionStorage so
            it can never loop, and it tidies the marker out of the URL on the
            way back. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
  var KEY='sps_css_recover', MARK='__fresh';
  var applied=getComputedStyle(document.documentElement)
    .getPropertyValue('--color-navy-900').trim()!=='';
  var url=new URL(location.href);
  if(applied){
    sessionStorage.removeItem(KEY);
    if(url.searchParams.has(MARK)){
      url.searchParams.delete(MARK);
      history.replaceState(null,'',url.pathname+url.search+url.hash);
    }
    return;
  }
  if(sessionStorage.getItem(KEY))return;
  sessionStorage.setItem(KEY,'1');
  url.searchParams.set(MARK,Date.now());
  location.replace(url.toString());
}catch(e){}})();`,
          }}
        />

        {/* Film grain over the whole viewport. Fixed rather than per-section
            so the texture is continuous as you scroll, and pointer-events
            none so it never intercepts a click. Large flat fields of navy
            look digitally flat without it. */}
        <div
          aria-hidden="true"
          className="bg-grain pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay"
        />

        <StructuredData />
      </body>
    </html>
  );
}
