import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { WorkTeaser } from "@/components/sections/WorkTeaser";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Concept builds for small local businesses — cafés, trades, salons, trainers, garages and landscapers. See the thinking behind each one.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Sites built the way local businesses actually get found."
        lead="Real work for a real business, with the reasoning behind every decision. Click through to see what the brief was and what got built."
      />

      {/* The same treatment that was briefly on the home page. It belongs
          here: this is the work section, and it gives the one project the
          room it deserves before the card grid below. */}
      <WorkTeaser />

      {/* The card grid that used to sit here showed the same single project
          the teaser above already covers — Dan's Cafe twice on one page. With
          one client the teaser is the better of the two, so only the note
          survives. Restore a grid here when there is a second project. */}
      <Section tone="deep" className="py-12 sm:py-14">
        <Reveal>
          <p className="mx-auto max-w-2xl rounded-2xl border border-navy-700 bg-navy-800/40 p-6 text-center text-body leading-relaxed text-mist-300">
            One client so far, and it is a real one you can go and look at.
            I&rsquo;d rather show you a single site that is live and working
            than a portfolio padded with work nobody paid for.
          </p>
        </Reveal>
      </Section>

      <FinalCta
        title="Want yours next?"
        lead="Whatever your trade, the approach is the same: work out what your customers need to see, then build the shortest path to them getting in touch."
      />
    </>
  );
}
