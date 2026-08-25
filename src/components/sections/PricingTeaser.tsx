import { plans } from "@/content/pricing";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** One row of the three-fee breakdown inside a plan card. */
function FeeRow({
  label,
  value,
  note,
  featured,
  emphasis = false,
}: {
  label: string;
  value: string;
  note: string;
  featured: boolean;
  emphasis?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 border-b py-3.5 last:border-0",
        featured ? "border-navy-700" : "border-navy-900/10",
      )}
    >
      <span className="min-w-0">
        <span
          className={cn(
            "block font-display text-sm font-semibold",
            featured ? "text-white" : "text-navy-900",
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            "block text-xs leading-snug",
            featured ? "text-mist-300" : "text-mist-700",
          )}
        >
          {note}
        </span>
      </span>
      <span
        className={cn(
          "shrink-0 font-display font-bold whitespace-nowrap tabular-nums",
          emphasis ? "text-2xl" : "text-lg",
          featured
            ? emphasis
              ? "text-white"
              : "text-accent"
            : emphasis
              ? "text-navy-900"
              : "text-accent-ink",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function PricingTeaser() {
  return (
    <Section
      id="pricing"
      tone="light"
      className="relative overflow-hidden"
      containerClassName="relative"
      decoration={
        <>
          {/* Full-bleed, so the tint starts at the section's real top edge.
              Inside the Container it began below the vertical padding, which
              left an untinted near-white strip against the navy above. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-accent-ink/[0.07] to-transparent"
          />
          {/* Carries the navy edge a few pixels into the light panel so the
              two sections meet deliberately rather than as a hard line. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-navy-900/12 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
          />
          {/* Matching fade on the way back out to the dark section below */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy-900/12 to-transparent"
          />
        </>
      }
    >
      <SectionHeading
        tone="light"
        align="center"
        eyebrow="Straightforward pricing"
        title="Two packages. Three clear fees."
        lead="A one-off fee to build it, a small monthly to keep it running, and edits quoted only when you actually need them — approved by you before any work starts."
      />

      {/* items-stretch (the default) so both cards share the taller card's
          height. With items-start they sized to their own content, and the
          Professional plan has one more feature row than Starter. */}
      <ul className="mx-auto mt-10 grid max-w-4xl gap-6 lg:grid-cols-2">
        {plans.map((plan, index) => (
          <Reveal as="li" key={plan.id} delay={index * 70}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-250 ease-out sm:p-8",
                plan.featured
                  ? "border-navy-900 bg-navy-900 text-mist-200 shadow-xl"
                  : "border-navy-900/10 bg-white hover:-translate-y-1 hover:shadow-lg",
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-accent px-3.5 py-1 font-display text-xs font-bold tracking-wider text-navy-950 uppercase">
                  Most popular
                </span>
              )}

              <h3
                className={cn(
                  "font-display text-xl font-bold",
                  plan.featured ? "text-white" : "text-navy-900",
                )}
              >
                {plan.name}
              </h3>
              <p
                className={cn(
                  "mt-1.5 text-xs font-medium tracking-wide uppercase",
                  plan.featured ? "text-accent" : "text-accent-ink",
                )}
              >
                {plan.bestFor}
              </p>
              <p
                className={cn(
                  "mt-3 min-h-[4.5rem] text-body leading-relaxed",
                  plan.featured ? "text-mist-300" : "text-mist-700",
                )}
              >
                {plan.blurb}
              </p>

              {/* The three fees, itemised */}
              <div
                className={cn(
                  "mt-5 border-t pt-2",
                  plan.featured ? "border-navy-700" : "border-navy-900/10",
                )}
              >
                <FeeRow
                  label="Initial fee"
                  note="One-off, to build the site"
                  value={plan.initialFee}
                  featured={plan.featured}
                  emphasis
                />
                <FeeRow
                  label="Monthly fee"
                  note="Hosting and running the site"
                  value={`${plan.monthlyFee}/mo`}
                  featured={plan.featured}
                />
                <FeeRow
                  label="Edit fee"
                  note={plan.editNote}
                  value={plan.editFee}
                  featured={plan.featured}
                />
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={cn(
                      "flex gap-3 text-body leading-relaxed",
                      plan.featured ? "text-mist-300" : "text-navy-900/85",
                    )}
                  >
                    <Icon
                      name="check"
                      className={cn(
                        "mt-1 size-3.5 shrink-0",
                        plan.featured ? "text-accent" : "text-accent-ink",
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <ButtonLink
                  href="/contact"
                  variant={plan.featured ? "primary" : "light"}
                  className="w-full"
                  icon="arrowRight"
                >
                  {plan.cta}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={140} className="mt-12 text-center">
        <ButtonLink href="/services" variant="light" icon="arrowRight">
          Full breakdown of what&rsquo;s included
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
