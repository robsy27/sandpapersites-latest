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
  keywords: [
    "small business website design",
    "affordable web design",
    "local business website",
    "website hosting and maintenance",
    "custom website builder",
  ],
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
