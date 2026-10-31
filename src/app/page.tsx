import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PriceLine } from "@/components/sections/PriceLine";
import { ImageBand } from "@/components/ui/ImageBand";
import { Marquee } from "@/components/ui/Marquee";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * The brand name is written out in full here on purpose. Next's
 * `title.template` in the root layout applies to *child* segments only, not
 * to the page sharing that segment — so this string is used verbatim and
 * "| Sandpaper Sites" is never appended. Without the brand spelled out, the
 * home page was the one page that never named the business in its title.
 */
export const metadata: Metadata = {
  /* Kept near 60 characters: Google truncates beyond that, and at 83 the
     counties — the part doing the local-search work — were being cut off. */
  title: "Sandpaper Sites | Websites for Shropshire & Cheshire",
  description:
    "Affordable custom websites for small businesses across Shropshire and Cheshire. Built, hosted and maintained by one person — a one-off build fee from £495, hosting from £25 a month, and edits quoted before any work starts.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <ImageBand
        src="/images/band-highstreet.jpg"
        alt="A British high street at dusk seen from above, shop windows lit and the wet road reflecting the sky"
        eyebrow="Who this is for"
        title="The businesses on your high street."
        body="Cafés, trades, salons, garages, instructors — the ones people find by searching a trade and a town. That search is the whole job, and it is what every site I build is pointed at."
      />
      <Marquee
        items={[
          "Built once, looked after for good",
          "No contract",
          "Your domain stays yours",
          "Edits quoted, never guessed",
          "One person, start to finish",
          "Live in 2–3 weeks",
        ]}
      />
      <PriceLine />
      <Testimonials />
      <FinalCta />
    </>
  );
}
