import { booking, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

export function FinalCta({
  title = "Ready for a website that pulls its weight?",
  lead = "Tell me about your business and I’ll come back with a straight answer on cost and timescale — usually within a working day. No pitch deck, no pressure.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 sm:py-24 lg:py-28">
      <AmbientBackground intensity="full" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-mist-400 sm:text-lg">
            {lead}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
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

          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-mist-400">
            <Icon name="mail" className="size-4 text-accent" />
            Prefer email?
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline break-anywhere"
            >
              {site.email}
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
