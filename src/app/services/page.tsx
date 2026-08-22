import type { Metadata } from "next";
import { included, services } from "@/content/services";
import { pricingNotes } from "@/content/pricing";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHeader } from "@/components/sections/PageHeader";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { FinalCta } from "@/components/sections/FinalCta";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Build, host and edit — the full package explained. A one-off build fee from £495 plus monthly hosting from £25, including unlimited small content edits.",
  alternates: { canonical: "/services" },
};

const process = [
  {
    step: "01",
    title: "A 15-minute call",
    body: "You tell me what your business does, who you want to reach and what’s not working now. I tell you honestly whether I can help and what it would cost.",
  },
  {
    step: "02",
    title: "Design and build",
    body: "I put together a design based on that conversation, you review it, and we adjust. Two rounds of revisions are included. Typical build time is two to three weeks.",
  },
  {
    step: "03",
    title: "Launch and look after",
    body: "I handle the domain, hosting, SSL and Google setup. Once you’re live, the monthly fee covers everything — including sending me edits whenever you need them.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything a small business site needs. Nothing it doesn’t."
        lead="Three parts, one monthly relationship. Here’s exactly what each one covers and what it costs."
      />

      {/* Build / Host / Edit in full */}
      <Section tone="deep">
        <SectionHeading
          eyebrow="The package"
          title="Build, host, edit."
          lead="You pay once to have it made, then a small monthly amount to have it hosted, secured and kept current."
        />

        <div className="mt-14 space-y-6">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 70}>
              <Card className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                    <Icon name={service.icon} className="size-6" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist-400">
                    {service.summary}
                  </p>
                </div>

                <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2 lg:col-span-8 lg:content-start">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-3 text-sm leading-relaxed text-mist-300"
                    >
                      <Icon
                        name="check"
                        className="mt-1 size-3.5 shrink-0 text-accent"
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What’s included with every site */}
      <Section tone="navy">
        <SectionHeading
          eyebrow="Included as standard"
          title="On every site, at every price."
          lead="These aren’t upsells. They’re the baseline for a site that actually works for a local business."
        />

        <ul className="mt-14 grid gap-x-10 gap-y-11 md:grid-cols-3">
          {included.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 70}>
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-navy-800 text-accent ring-1 ring-navy-700">
                <Icon name={item.icon} className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-mist-400">
                {item.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Pricing */}
      <PricingTeaser />

      {/* Pricing small print */}
      <Section tone="navy" className="py-16 sm:py-20 lg:py-20">
        <Reveal>
          <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            {pricingNotes.map((note) => (
              <li
                key={note}
                className="flex gap-3 rounded-xl border border-navy-700 bg-navy-800/40 p-5 text-sm leading-relaxed text-mist-300"
              >
                <Icon name="check" className="mt-1 size-3.5 shrink-0 text-accent" />
                {note}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* How it works */}
      <Section tone="light">
        <SectionHeading
          tone="light"
          eyebrow="How it works"
          title="Three steps from call to live."
          lead="No lengthy onboarding, no 40-page proposal. Most sites go from first conversation to live in two to three weeks."
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {process.map((item, index) => (
            <Reveal as="li" key={item.step} delay={index * 70}>
              <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-7 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-lg">
                <span className="font-display text-4xl font-bold text-accent-ink/25 tabular-nums">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mist-600">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <FinalCta
        title="Not sure which package fits?"
        lead="Tell me what your business does and roughly what you need. I’ll point you at the right one — even if that turns out to be the cheapest."
      />
    </>
  );
}
