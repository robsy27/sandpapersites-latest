import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { AmbientBackground } from "./AmbientBackground";
import { GhostWord } from "./GhostWord";

type Tone = "navy" | "deep" | "light" | "raised";

/**
 * Dark tones go translucent at the full tier so the Aurora canvas behind
 * reads through them. They stay fully opaque everywhere else, where there is
 * no canvas and a flat tone is what is wanted. The light tone is opaque in
 * both: it is meant to be a bright panel cutting through the dark, and
 * letting the aurora bleed into it just muddies it.
 */
const tones: Record<Tone, string> = {
  navy: "bg-navy-900 text-mist-200 full:bg-navy-900/90",
  deep: "bg-navy-950 text-mist-200 full:bg-navy-950/90",
  raised: "bg-navy-800 text-mist-200 full:bg-navy-800/90",
  light: "bg-mist-100 text-navy-900",
};

/**
 * Page section with vertical rhythm and a background tone.
 * `id` doubles as the smooth-scroll anchor target.
 */
export function Section({
  id,
  ghost,
  ghostAt = "right",
  tone = "navy",
  className,
  containerClassName,
  children,
  decoration,
}: {
  id?: string;
  /**
   * An enormous ghosted word behind the section. Keep it to one word — two
   * stop reading as a graphic and start competing with the headline.
   */
  ghost?: string;
  /** Which edge the ghost word anchors to. */
  ghostAt?: "right" | "left" | "centre";
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  /**
   * Full-bleed decoration rendered inside the <section> but outside the
   * padded Container, so `absolute top-0` means the section's real top
   * rather than the top of the content box.
   */
  decoration?: React.ReactNode;
  children: React.ReactNode;
}) {
  /* Light sections keep a clean flat surface — the ambient motion is a
     dark-mode effect and would only muddy them. */
  const ambient = tone !== "light";

  return (
    <section
      id={id}
      className={cn(
        "py-14 sm:py-16 lg:py-20",
        tones[tone],
        /* Light sections are not ambient, so they had neither. A ghost word
           needs both: relative to position against, and clip so it bleeds off
           the edge rather than widening the page. */
        (ambient || ghost) && "relative overflow-hidden",
        className,
      )}
    >
      {ghost && (
        <GhostWord
          position={ghostAt}
          /* Light sections need a dark ghost — white at 3.5% is invisible on
             a near-white panel. */
          className={tone === "light" ? "text-navy-900/[0.055]" : undefined}
        >
          {ghost}
        </GhostWord>
      )}
      {decoration}
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
