import { booking } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { Spotlight } from "@/components/ui/Spotlight";
import { LaptopHero } from "@/components/ui/LaptopHero";
import { Marquee } from "@/components/ui/Marquee";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy-900 full:bg-navy-900/80">
      <AmbientBackground intensity="full" />
      <Spotlight />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-navy-900"
      />

      <Container className="relative">
        {/* 7/5 left the laptop at roughly 420px floating in the middle of a
            650px text column — small, and with nothing anchoring it. 6/6 with
            the image column stretched gives it real presence and lines its
            top edge up with the headline instead of its centre. */}
        {/* Stacked rather than side by side.
            Two columns could not be made to balance: the copy ran to ~640px
            while the laptop, locked to 16/10 by its measured screen overlay,
            was only ~320px at half width. That 320px difference was the dead
            space. Full width the same image is ~640px tall, so it fills
            instead of floating, and the copy gets a centred measure above
            it. */}
        <div className="py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-display text-xs font-semibold tracking-[0.14em] text-accent uppercase">
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
              {/* The H1 above is deliberately voice-led and carries no search
                  terms. This paragraph is where "websites for small
                  businesses" and the two counties appear — kept natural, so
                  the page reads the same as it always did. */}
              <p className="mx-auto mt-7 max-w-2xl text-justify text-lg leading-relaxed text-mist-300 [hyphens:auto]">
                Affordable websites for small businesses in Shropshire, Cheshire
                and anywhere in the UK — custom-built, properly hosted and kept up to date
                for you. One clear build fee, one small monthly cost, and a
                real person who answers the phone when something needs
                changing.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                <ButtonLink href="/contact" size="lg" icon="arrowRight">
                  Get in touch
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

          </div>

          {/* A real interface on a real photograph — the AI never renders
              the screen, so nothing here is a hallucinated UI. */}
          <Reveal delay={200}>
            <div data-parallax="4" className="mx-auto mt-14 max-w-5xl">
              <LaptopHero />
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Directly under the hero rather than three sections down: it says
          the same things the proof strip used to, so it belongs where that
          was, and it gives the hero a hard bottom edge. */}
      <div className="relative">
        <Marquee
          items={[
            "Live in 2–3 weeks",
            "From £495 + £25/mo",
            "Edits quoted, never guessed",
            "No contract",
            "Your domain stays yours",
            "One person, start to finish",
          ]}
        />
      </div>
    </section>
  );
}
