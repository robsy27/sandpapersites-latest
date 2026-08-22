import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Affordable Custom Websites for Small Local Businesses",
  description:
    "Sandpiper Sites builds, hosts and maintains custom websites for small local businesses. One clear build fee, one small monthly cost, unlimited edits included.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <PricingTeaser />
      <Testimonials />
      <FinalCta />
    </>
  );
}
