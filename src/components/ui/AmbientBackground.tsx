import { cn } from "@/lib/cn";

/**
 * Decorative animated backdrop for dark sections.
 *
 * Purely presentational — hidden from assistive tech and non-interactive.
 * All motion is transform/opacity on the compositor, so it costs no layout
 * work, and the global prefers-reduced-motion rule freezes it.
 *
 * Four layers, back to front: a lit top edge, drifting colour, a fading dot
 * matrix, and a vignette. Together they give a flat navy panel somewhere for
 * the eye to travel.
 *
 * `intensity` controls how much the backdrop asserts itself:
 *   full   — hero and closing CTA, where the page should feel alive
 *   soft   — inner page headers
 *   subtle — long content sections, where it must stay out of the way
 */
export function AmbientBackground({
  intensity = "soft",
  className,
}: {
  intensity?: "full" | "soft" | "subtle";
  className?: string;
}) {
  const showOrbs = intensity !== "subtle";
  const showSheen = intensity === "full";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* light source at the top edge */}
      <div
        className={cn(
          "bg-toplight absolute inset-0",
          intensity === "subtle" && "opacity-50",
        )}
      />

      {/* drifting colour */}
      {showOrbs && (
        <>
          <div
            className={cn(
              "absolute rounded-full bg-accent/25 blur-[110px] animate-drift-a",
              "-top-52 -right-40 size-[52rem]",
              intensity === "soft" && "opacity-70",
            )}
          />
          <div
            className={cn(
              "absolute rounded-full bg-sky-500/16 blur-[120px] animate-drift-b",
              "-bottom-64 -left-48 size-[46rem]",
              intensity === "soft" && "opacity-70",
            )}
          />
          <div
            className={cn(
              "absolute rounded-full bg-teal-400/18 blur-[120px] animate-drift-c",
              "top-1/4 left-1/2 size-[40rem] -translate-x-1/2",
              intensity === "soft" && "opacity-60",
            )}
          />
          {/* a fourth, low and slow, so the field never settles into a
              recognisable three-blob arrangement */}
          <div
            className={cn(
              "absolute rounded-full bg-cyan-400/14 blur-[130px] animate-drift-b",
              "right-1/4 -bottom-44 size-[36rem]",
              intensity === "soft" && "opacity-60",
            )}
            style={{ animationDuration: "38s", animationDirection: "reverse" }}
          />
        </>
      )}

      {/* dot matrix, drifting slowly and fading out before any edge */}
      <div
        className={cn(
          "bg-dots absolute -inset-x-32 -inset-y-32 animate-grid-pan",
          intensity === "subtle" ? "opacity-40" : "opacity-80",
        )}
      />

      {/* slow light sweep — the one obviously moving element, kept rare */}
      {showSheen && (
        <div className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-sheen" />
      )}

      {/* settles the composition and keeps text contrast high at the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,15,31,0.6)_100%)]" />
    </div>
  );
}
