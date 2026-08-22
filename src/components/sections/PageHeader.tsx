import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

/** Shared hero band for inner pages. */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
      <AmbientBackground intensity="soft" />

      <Container className="relative">
        <Reveal className="max-w-3xl">
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-accent uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-4xl font-bold text-white sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-mist-400">{lead}</p>
        </Reveal>
      </Container>
    </section>
  );
}
