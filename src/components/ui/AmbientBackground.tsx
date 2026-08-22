import { cn } from "@/lib/cn";

/**
 * Decorative animated backdrop for dark sections.
 *
 * Purely presentational — hidden from assistive tech and non-interactive.
 * All motion is transform/opacity on the compositor, so it costs no layout
 * work, and the global prefers-reduced-motion rule freezes it entirely.
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
      {/* Drifting grid texture. Oversized so the crawl never exposes an edge. */}
      <div
        className={cn(
          "bg-grid absolute -inset-x-32 -inset-y-32 animate-grid-pan",
          intensity === "subtle" ? "opacity-30" : "opacity-60",
        )}
      />

      {showOrbs && (
        <>
          <div
            className={cn(
              "absolute rounded-full bg-accent/12 blur-[110px] animate-drift-a",
              "-top-40 -right-32 size-[38rem]",
              intensity === "soft" && "opacity-70",
            )}
          />
          <div
            className={cn(
              "absolute rounded-full bg-sky-500/10 blur-[120px] animate-drift-b",
              "-bottom-56 -left-40 size-[34rem]",
              intensity === "soft" && "opacity-70",
            )}
          />
          <div
            className={cn(
              "absolute rounded-full bg-teal-300/8 blur-[130px] animate-drift-c",
              "top-1/3 left-1/2 size-[28rem] -translate-x-1/2",
              intensity === "soft" && "opacity-60",
            )}
          />
        </>
      )}

      {/* Slow light sweep — the one obviously "moving" element, kept rare */}
      {showSheen && (
        <div className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/[0.035] to-transparent animate-sheen" />
      )}

      {/* Settles the composition and keeps text contrast high at the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(6,15,31,0.55)_100%)]" />
    </div>
  );
}
