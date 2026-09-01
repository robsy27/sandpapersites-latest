import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { areas, getArea } from "@/content/areas";
import { PageHeader } from "@/components/sections/PageHeader";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

/**
 * County landing pages, at /websites-shropshire and /websites-cheshire.
 *
 * One route, but the content is written separately per county in
 * `areas.ts` — near-duplicate location pages are treated as doorway pages
 * by Google and can be penalised rather than ranked. The layout is shared
 * because that is what keeps the site consistent; the words are not.
 */

/**
 * This is a root-level dynamic segment, so without this it would render on
 * demand for every unmatched top-level path. Locked to the known slugs:
 * the two pages prerender, anything else is a static 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) return {};

  return {
    title: area.title,
    description: area.description,
    alternates: { canonical: `/${area.slug}` },
    openGraph: {
      title: area.title,
      description: area.description,
      url: `/${area.slug}`,
    },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  return (
    <>
      <PageHeader
        eyebrow={area.eyebrow}
        title={area.heading}
        lead={area.lead}
      />

      {/* The county in its own right — the part that has to be genuinely
          about this place rather than a name swap. */}
      <Section tone="deep">
        <SectionHeading
          eyebrow={`Working in ${area.county}`}
          title={`What ${area.county} businesses are actually up against.`}
        />
        <div className="mt-10 max-w-3xl space-y-6">
          {area.context.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 24)} delay={index * 70}>
              <p className="text-body leading-relaxed text-mist-300">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <SectionHeading
          eyebrow="Who this is for"
          title={`The businesses I build for in ${area.county}.`}
          lead="Not an exhaustive list — but if you recognise yourself here, the fit is usually good."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {area.needs.map((need, index) => (
            <Reveal as="li" key={need.title} delay={index * 70}>
              <GlassCard interactive className="h-full p-6">
                <h3 className="font-display text-lg font-bold text-white">
                  {need.title}
                </h3>
                <p className="mt-2.5 text-body leading-relaxed text-mist-300">
                  {need.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="deep">
        <SectionHeading
          eyebrow="Areas covered"
          title={`Across ${area.county}, and the towns in it.`}
          lead={area.close}
        />
        <ul className="mt-10 flex flex-wrap gap-3">
          {area.towns.map((town, index) => (
            <Reveal as="li" key={town} delay={index * 40}>
              <span className="inline-flex items-center gap-2 rounded-full border border-navy-700 bg-navy-800/50 px-4 py-2 text-body text-mist-300">
                <Icon name="check" className="size-3.5 shrink-0 text-accent" />
                {town}
              </span>
            </Reveal>
          ))}
        </ul>
      </Section>

      <PricingTeaser />

      <FinalCta
        title={`Based in ${area.county}? Let's talk.`}
        lead="Tell me what your business does and roughly what you need. You'll get a straight answer on whether I can help, and what it would cost."
      />
    </>
  );
}
