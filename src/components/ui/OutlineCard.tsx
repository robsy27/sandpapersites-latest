import { cn } from "@/lib/cn";

/**
 * A squared, outlined panel with a solid accent block notched into the top
 * corner — the card treatment from the Prabhu reference.
 *
 * It is deliberately a different object from GlassCard. GlassCard is soft:
 * rounded, translucent, blurred, and it recedes. This is the opposite —
 * hard edges, a visible rule, and one piece of solid colour. Used where a
 * card should feel constructed rather than floated, which is most of the
 * places the old design felt generic.
 *
 * The corner block is the smallest possible thing that makes a plain
 * rectangle look designed, and it costs one absolutely positioned span.
 */
export function OutlineCard({
  children,
  interactive = false,
  className,
}: {
  children: React.ReactNode;
  /** Adds hover response. Only for cards that are themselves a link. */
  interactive?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative border border-navy-600/70 bg-navy-900/40 p-6 transition-colors duration-300 sm:p-7",
        interactive && "hover:border-accent/60 hover:bg-navy-800/50",
        className,
      )}
    >
      {/* Corner block. -top/-right by a pixel so it sits over the rule
          rather than inside it, which is what makes it read as notched
          into the card instead of pasted on. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -top-px -right-px size-7 bg-accent transition-transform duration-300",
          interactive && "group-hover:scale-110",
        )}
        style={{ transformOrigin: "top right" }}
      />
      {children}
    </div>
  );
}
