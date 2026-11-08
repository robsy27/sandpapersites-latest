import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BrandSchema, StructuredData } from "@/components/layout/StructuredData";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { Aurora } from "@/components/chrome/Aurora";
import { Choreography } from "@/components/chrome/Choreography";
import { ModeWatcher } from "@/components/chrome/ModeWatcher";

/**
 * Everything that makes a page *this* site: the navigation, the footer, the
 * navy aurora, the smooth scrolling and the scroll choreography.
 *
 * This used to live in the root layout, which meant every route in the app
 * wore Sandpaper Sites branding whether it suited it or not. Keeping the
 * chrome one level down means a page that should not look like this site —
 * a standalone landing page, a client mock-up, anything served from this
 * domain that is not Sandpaper Sites — is a matter of putting it outside
 * this group rather than unpicking the root layout.
 *
 * A route group's folder name is in parentheses, so it contributes nothing
 * to the URL: /about is still /about, and nothing about the live site's
 * addresses, canonicals or sitemap changed in the move.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-navy-950"
      >
        Skip to main content
      </a>
      <Aurora />
      <ModeWatcher />
      <SmoothScroll />
      <Choreography />

      <Header />
      {/* Offsets the fixed header so it never overlaps page content. */}
      <main id="main" className="pt-header">
        {children}
      </main>
      <Footer />

      {/* Film grain over the whole viewport. soft-light rather than
          overlay: over a saturated teal, overlay pushed the highlights warm
          and produced a brown cast along the top of the page. Fixed rather
          than per-section so the texture is continuous as you scroll, and
          pointer-events none so it never intercepts a click. Large flat
          fields of navy look digitally flat without it. */}
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-soft-light"
      />

      <StructuredData />
      <BrandSchema />
    </>
  );
}
