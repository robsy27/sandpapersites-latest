import { cn } from "@/lib/cn";

/**
 * Frosted-glass surface for dark sections.
 *
 * Relies on the ambient background showing through, so it is only used on
 * navy tones — over a flat light panel there is nothing to frost and it
 * just looks murky.
 *
 * `active` is the lit state: a brighter pane, an accent rim and a soft glow.
 */
export function glassSurface({
  active = false,
  interactive = false,
}: { active?: boolean; interactive?: boolean } = {}) {
  return cn(
    "rounded-2xl border backdrop-blur-xl transition-all duration-300 ease-out",
    // Base pane: barely-there white wash with a top-edge highlight
    "bg-white/[0.045] border-white/10",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
    interactive && "hover:border-white/20 hover:bg-white/[0.06]",
    active &&
      "border-accent/45 bg-white/[0.075] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_36px_-14px_rgba(45,212,191,0.45)]",
  );
}

export function GlassCard({
  active = false,
  interactive = false,
  className,
  children,
}: {
  active?: boolean;
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(glassSurface({ active, interactive }), className)}>
      {children}
    </div>
  );
}
