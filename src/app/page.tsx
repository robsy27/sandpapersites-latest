import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { ImageBand } from "@/components/ui/ImageBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Affordable Custom Websites for Small Local Businesses",
  description:
    "Sandpaper Sites builds, hosts and maintains custom websites for small local businesses. A one-off build fee, a small monthly cost, and edits quoted only when you need them.",
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
      <PricingTeaser />
      <Testimonials />
      <FinalCta />
    </>
  );
}
