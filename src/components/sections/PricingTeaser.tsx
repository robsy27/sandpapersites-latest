import { plans } from "@/content/pricing";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export function PricingTeaser() {
  return (
    <Section id="pricing" tone="light">
      <SectionHeading
        tone="light"
        align="center"
        eyebrow="Straightforward pricing"
        title="One build fee. One small monthly."
        lead="No hourly rates, no hidden extras, no contract. Here’s what it costs — the same figures you’d get on a call."
      />

      <ul className="mt-14 grid items-start gap-6 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <Reveal as="li" key={plan.id} delay={index * 70}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-250 ease-out sm:p-8",
                plan.featured
                  ? "border-navy-900 bg-navy-900 text-mist-200 shadow-xl lg:-mt-4 lg:pb-11"
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
                  "mt-2 min-h-[3rem] text-sm leading-relaxed",
                  plan.featured ? "text-mist-400" : "text-mist-600",
                )}
              >
                {plan.blurb}
              </p>

              <div
                className={cn(
                  "mt-6 border-t pt-6",
                  plan.featured ? "border-navy-700" : "border-navy-900/10",
                )}
              >
                <p className="flex flex-wrap items-baseline gap-x-1.5">
                  <span
                    className={cn(
                      "font-display text-4xl font-bold whitespace-nowrap tabular-nums",
                      plan.featured ? "text-white" : "text-navy-900",
                    )}
                  >
                    {plan.buildFee}
                  </span>
                  <span
                    className={cn(
                      "text-sm whitespace-nowrap",
                      plan.featured ? "text-mist-400" : "text-mist-600",
                    )}
                  >
                    one-off build
                  </span>
                </p>
                <p
                  className={cn(
                    "mt-1.5 text-sm font-medium tabular-nums",
                    plan.featured ? "text-accent" : "text-accent-ink",
                  )}
                >
                  then {plan.monthly}/month — hosting, edits and support
                </p>
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={cn(
                      "flex gap-3 text-sm leading-relaxed",
                      plan.featured ? "text-mist-300" : "text-navy-900/80",
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
          Full breakdown of what’s included
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
