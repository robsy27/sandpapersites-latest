import { plans } from "@/content/pricing";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The price, once, on the home page.
 *
 * The full pricing block used to appear here and again on Services — the
 * same component, the same two cards, the same Stripe buttons, under an
 * identical heading. Repeating the whole thing made the site feel like it
 * was padding.
 *
 * Services owns pricing now. This states the entry figures so a visitor
 * never has to hunt for "what does it cost", then sends them to the page
 * that answers properly. Figures are read from the same `plans` data the
 * Services page uses, so they cannot drift apart.
 */
export function PriceLine() {
  const starter = plans[0];
  if (!starter) return null;

  return (
    <Section tone="raised" className="py-12 sm:py-14 lg:py-16">
      <Reveal>
        <div className="flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div>
            <p className="font-display text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              What it costs
            </p>
            <p className="mt-4 font-display text-2xl leading-snug font-bold text-white sm:text-3xl">
              From{" "}
              <span className="text-accent tabular-nums">
                {starter.initialFee}
              </span>{" "}
              to build, then{" "}
              <span className="text-accent tabular-nums">
                {starter.monthlyFee}
              </span>{" "}
              a month.
            </p>
            <p className="mt-3 max-w-xl text-body leading-relaxed text-mist-300">
              Two packages, three clear fees, and edits quoted before any work
              starts. No retainer, no contract.
            </p>
          </div>

          <ButtonLink
            href="/services"
            size="lg"
            variant="secondary"
            icon="arrowRight"
            className="shrink-0"
          >
            See the full pricing
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
