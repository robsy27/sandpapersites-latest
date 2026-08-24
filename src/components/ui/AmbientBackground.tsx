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
              "absolute rounded-full bg-accent/14 blur-[120px] animate-drift-a",
              "-top-44 -right-36 size-[42rem]",
              intensity === "soft" && "opacity-70",
            )}
          />
          <div
            className={cn(
              "absolute rounded-full bg-sky-500/12 blur-[130px] animate-drift-b",
              "-bottom-60 -left-44 size-[38rem]",
              intensity === "soft" && "opacity-70",
            )}
          />
          <div
            className={cn(
              "absolute rounded-full bg-indigo-500/10 blur-[140px] animate-drift-c",
              "top-1/3 left-1/2 size-[32rem] -translate-x-1/2",
              intensity === "soft" && "opacity-60",
            )}
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
