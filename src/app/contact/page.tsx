import type { Metadata } from "next";
import { booking, site } from "@/content/site";
import { faqs } from "@/content/faqs";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { CollapsibleCard } from "@/components/ui/CollapsibleCard";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a free, no-obligation quote for your business website, or book a 30-minute intro call. Replies usually within one working day.",
  alternates: { canonical: "/contact" },
};


export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell me about your business."
        lead="Fill in the form and I’ll come back with a straight answer on cost and timescale — usually within one working day. Or skip ahead and book a call."
      />

      <Section tone="deep">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <GlassCard className="p-6 sm:p-9">
                <h2 className="font-display text-2xl font-bold text-white">
                  Get a free quote
                </h2>
                <p className="mt-3 text-body leading-relaxed text-mist-300">
                  No obligation, no follow-up sequence. Just an honest answer on
                  what I’d build and what it would cost.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </GlassCard>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <Reveal delay={100} className="space-y-6">
              {/* Book a call */}
              <GlassCard active className="p-6 sm:p-8">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon name="calendar" className="size-6" />
                </span>
                <h2 className="mt-6 font-display text-xl font-bold text-white">
                  Rather just talk?
                </h2>
                <p className="mt-3 text-body leading-relaxed text-mist-300">
                  Book a free 30-minute call at a time that suits you. Evenings
                  and weekends are available — I know you’re working days.
                </p>
                <div className="mt-7">
                  <ButtonLink
                    href={booking.href}
                    external={booking.external}
                    size="lg"
                    className="w-full"
                    icon="arrowRight"
                  >
                    {booking.label}
                  </ButtonLink>
                </div>
              </GlassCard>

              {/* Direct details */}
              <GlassCard className="p-6 sm:p-8">
                <h2 className="font-display text-lg font-bold text-white">
                  Direct details
                </h2>
                <ul className="mt-5 space-y-1">
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="flex min-h-11 items-center gap-3 rounded-lg text-sm text-mist-300 transition-colors hover:text-accent break-anywhere"
                    >
                      <Icon name="mail" className="size-4 shrink-0 text-accent" />
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${site.phone}`}
                      className="flex min-h-11 items-center gap-3 rounded-lg text-sm text-mist-300 transition-colors hover:text-accent"
                    >
                      <Icon name="phone" className="size-4 shrink-0 text-accent" />
                      {site.phoneDisplay}
                    </a>
                  </li>
                  <li className="flex min-h-11 items-center gap-3 text-sm text-mist-300">
                    <Icon name="clock" className="size-4 shrink-0 text-accent" />
                    Replies within one working day
                  </li>
                </ul>
              </GlassCard>

              {/* FAQs */}
              <div>
                <h2 className="mb-4 font-display text-lg font-bold text-white">
                  FAQs
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <CollapsibleCard key={faq.question} title={faq.question}>
                      <p className="text-body leading-relaxed text-mist-300">
                        {faq.answer}
                      </p>
                    </CollapsibleCard>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
