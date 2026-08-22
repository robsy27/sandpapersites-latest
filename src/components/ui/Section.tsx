import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { AmbientBackground } from "./AmbientBackground";

type Tone = "navy" | "deep" | "light" | "raised";

const tones: Record<Tone, string> = {
  navy: "bg-navy-900 text-mist-200",
  deep: "bg-navy-950 text-mist-200",
  raised: "bg-navy-800 text-mist-200",
  light: "bg-mist-100 text-navy-900",
};

/**
 * Page section with vertical rhythm and a background tone.
 * `id` doubles as the smooth-scroll anchor target.
 */
export function Section({
  id,
  tone = "navy",
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  /* Light sections keep a clean flat surface — the ambient motion is a
     dark-mode effect and would only muddy them. */
  const ambient = tone !== "light";

  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-24 lg:py-32",
        tones[tone],
        ambient && "relative overflow-hidden",
        className,
      )}
    >
      {ambient && <AmbientBackground intensity="subtle" />}
      {/* Feathers the seam where a dark section meets its neighbour, instead
          of a hard horizontal line between two flat tones. */}
      {ambient && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy-950/45 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950/45 to-transparent"
          />
        </>
      )}
      <Container className={cn("relative", containerClassName)}>
        {children}
      </Container>
    </section>
  );
}
