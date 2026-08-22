import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const proofPoints = [
  { icon: "clock" as const, label: "Live in 2–3 weeks" },
  { icon: "wallet" as const, label: "From £495 + £25/mo" },
  { icon: "refresh" as const, label: "Unlimited edits included" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      {/* Decorative background: grid texture + accent glow */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 size-[38rem] rounded-full bg-accent/12 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 -left-40 size-[34rem] rounded-full bg-sky-500/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-navy-900"
      />

      <Container className="relative">
        <div className="grid items-center gap-16 py-20 sm:py-24 lg:grid-cols-12 lg:gap-12 lg:py-32">
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
                the agency price <span className="text-highlight">tag</span>.
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist-400">
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
                  href={site.bookingUrl}
                  external
                  variant="secondary"
                  size="lg"
                  icon="calendar"
                >
                  Book a 15-min call
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

          {/* Decorative browser mock — communicates the product visually */}
          <Reveal delay={200} className="lg:col-span-5">
            <div
              aria-hidden="true"
              className="relative rounded-2xl border border-navy-700 bg-navy-800/70 p-2.5 shadow-2xl shadow-navy-950/60 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 px-2.5 py-2">
                <span className="size-2.5 rounded-full bg-red-400/50" />
                <span className="size-2.5 rounded-full bg-amber-400/50" />
                <span className="size-2.5 rounded-full bg-accent/60" />
                <div className="ml-3 h-5 flex-1 rounded-md bg-navy-900/80" />
              </div>

              <div className="space-y-4 rounded-xl bg-navy-950/80 p-6">
                <div className="h-2.5 w-1/3 rounded-full bg-accent/70" />
                <div className="space-y-2.5">
                  <div className="h-4 w-11/12 rounded-md bg-mist-200/25" />
                  <div className="h-4 w-3/4 rounded-md bg-mist-200/15" />
                </div>
                <div className="flex gap-2.5 pt-1">
                  <div className="h-8 w-28 rounded-full bg-accent/80" />
                  <div className="h-8 w-24 rounded-full border border-mist-400/25" />
                </div>
                <div className="grid grid-cols-3 gap-3 pt-3">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className="space-y-2 rounded-lg border border-navy-700 bg-navy-800/60 p-3"
                    >
                      <div className="size-6 rounded-md bg-accent/25" />
                      <div className="h-2 w-full rounded-full bg-mist-200/20" />
                      <div className="h-2 w-2/3 rounded-full bg-mist-200/10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
