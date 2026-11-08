import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PriceLine } from "@/components/sections/PriceLine";
import { ImageBand } from "@/components/ui/ImageBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * The brand name is written out in full here on purpose: without it the
 * home page would be the one page that never named the business in its
 * title.
 *
 * `absolute` is what stops the root layout's "%s | Sandpaper Sites"
 * template appending the brand a second time. It was not needed while this
 * file was app/page.tsx, because a template skips the page sharing its own
 * segment — but the page now sits in the (site) route group, which makes it
 * a child segment, and the template started applying. Hence
 * "Sandpaper Sites | Websites for Shropshire & Cheshire | Sandpaper Sites".
 */
export const metadata: Metadata = {
  /* Kept near 60 characters: Google truncates beyond that, and at 83 the
     counties — the part doing the local-search work — were being cut off. */
  title: {
    absolute: "Sandpaper Sites | Websites for Shropshire & Cheshire",
  },
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
      <PriceLine />
      <Testimonials />
      <FinalCta />
    </>
  );
}
