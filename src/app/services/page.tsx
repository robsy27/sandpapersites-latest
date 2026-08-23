import type { Metadata } from "next";
import Image from "next/image";
import { included, services } from "@/content/services";
import { feeExplainer, pricingNotes } from "@/content/pricing";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHeader } from "@/components/sections/PageHeader";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { FinalCta } from "@/components/sections/FinalCta";
import { ImageBand } from "@/components/ui/ImageBand";
import { GlassCard } from "@/components/ui/GlassCard";
import { CollapsibleCard } from "@/components/ui/CollapsibleCard";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Build, host and edit — explained. A one-off build fee from £495, monthly hosting from £25, and edits quoted per request so you only pay for what you need.",
  alternates: { canonical: "/services" },
};

const process = [
  {
    step: "01",
    title: "A 30-minute call",
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
    body: "I handle the domain, hosting, SSL and Google setup. Once you’re live, the monthly fee keeps it online and secure, and any change you want is quoted before I start.",
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

        <div className="mt-10 space-y-5">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 70}>
              <CollapsibleCard
                icon={service.icon}
                title={service.title}
                summary={service.summary}
                defaultOpen={index === 0}
                media={
                  service.image ? (
                    <>
                      <Image
                        src={service.image}
                        alt={service.imageAlt ?? ""}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className={
                          service.coolTint
                            ? "object-cover saturate-[0.72] hue-rotate-[8deg] brightness-90"
                            : "object-cover"
                        }
                      />
                      {service.coolTint && (
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-navy-900/45 mix-blend-multiply"
                        />
                      )}
                    </>
                  ) : undefined
                }
              >
                <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-3 text-body leading-relaxed text-mist-300"
                    >
                      <Icon
                        name="check"
                        className="mt-1.5 size-3.5 shrink-0 text-accent"
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CollapsibleCard>
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

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 70}>
              <GlassCard interactive className="group h-full p-6">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-accent/20">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-body leading-relaxed text-mist-300">
                  {item.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </ul>
      </Section>

      <ImageBand
        src="/images/device-phone.jpg"
        alt="A phone held up against a rain-soaked high street at dusk"
        eyebrow="Mobile first, not mobile friendly"
        title="Most people will meet you on a phone."
        body="Standing outside in the rain, deciding whether to come in or ring someone else. Every site is designed for that screen first and scaled up afterwards — never the other way round."
      />

      {/* How the three fees work */}
      <Section tone="deep">
        <SectionHeading
          eyebrow="How the fees work"
          title="Three fees, so you only pay for what you use."
          lead="Most agencies bundle everything into one padded monthly retainer. Splitting it out means you are not paying every month for edits you never ask for."
        />

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {feeExplainer.map((fee, index) => (
            <Reveal as="li" key={fee.label} delay={index * 70}>
              <GlassCard interactive className="h-full p-6 sm:p-7">
                <span className="inline-flex size-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                  <Icon name={fee.icon} className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold text-white">
                  {fee.label}
                </h3>
                <p className="mt-1.5 text-xs font-semibold tracking-wide text-accent uppercase">
                  {fee.summary}
                </p>
                <p className="mt-4 text-body leading-relaxed text-mist-300">
                  {fee.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Pricing */}
      <PricingTeaser />

      {/* Pricing small print */}
      <Section tone="navy" className="py-10 sm:py-12 lg:py-14">
        <Reveal>
          <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            {pricingNotes.map((note) => (
              <li
                key={note}
                className="flex gap-3 rounded-xl border border-navy-700 bg-navy-800/40 p-5 text-body leading-relaxed text-mist-300"
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

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((item, index) => (
            <Reveal as="li" key={item.step} delay={index * 70}>
              <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-7 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-lg">
                <span className="font-display text-4xl font-bold text-accent-ink/25 tabular-nums">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-body leading-relaxed text-mist-700">
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
