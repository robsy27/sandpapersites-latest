import { booking } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { Spotlight } from "@/components/ui/Spotlight";
import { LaptopHero } from "@/components/ui/LaptopHero";

const proofPoints = [
  { icon: "clock" as const, label: "Live in 2–3 weeks" },
  { icon: "wallet" as const, label: "From £495 + £25/mo" },
  { icon: "refresh" as const, label: "Edits quoted, never guessed" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <AmbientBackground intensity="full" />
      <Spotlight />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-navy-900"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 py-14 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-display text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                <Icon name="spark" className="size-3.5" />
                Websites for local business
              </p>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="mt-7 font-display text-[2.6rem] leading-[1.06] font-bold text-white sm:text-5xl lg:text-[3.4rem] xl:text-[3.75rem]">
                The website your business{" "}
                <span className="text-gradient-accent">deserves</span>, without
                the agency price tag.
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist-300">
                Custom-built, properly hosted and kept up to date for you. One
                clear build fee, one small monthly cost, and a real person who
                answers the phone when something needs changing.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/contact" size="lg" icon="arrowRight">
                  Get a free quote
                </ButtonLink>
                <ButtonLink
                  href={booking.href}
                  external={booking.external}
                  variant="secondary"
                  size="lg"
                  icon="calendar"
                >
                  {booking.label}
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <ul className="mt-12 flex flex-wrap gap-x-7 gap-y-3.5">
                {proofPoints.map((point) => (
                  <li
                    key={point.label}
                    className="flex items-center gap-2.5 text-sm font-medium text-mist-300"
                  >
                    <Icon name={point.icon} className="size-4 text-accent" />
                    {point.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* A real interface on a real photograph — the AI never renders
              the screen, so nothing here is a hallucinated UI. */}
          <Reveal delay={200} className="lg:col-span-5">
            <LaptopHero />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
