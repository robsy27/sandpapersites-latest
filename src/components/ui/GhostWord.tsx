import { cn } from "@/lib/cn";

/**
 * An enormous, barely-there word set behind a section — the signature device
 * in the Prabhu reference, where WORK, PROGRESS and IMPACT sit ghosted behind
 * the content.
 *
 * It does real work rather than being ornament. The brief asked for content
 * that fills the page: these occupy the empty right-hand and lower thirds
 * that a text column leaves behind, without adding anything a reader has to
 * process. They also label the section at a glance while you scroll past.
 *
 * Cheap: one text node, no image, no canvas. It scales with the viewport via
 * clamp, so it fills the space at any width rather than being sized for one.
 *
 * aria-hidden, because the word always duplicates a heading that is already
 * in the section — a screen reader announcing "WORK work" helps nobody.
 */
export function GhostWord({
  children,
  position = "right",
  className,
}: {
  children: string;
  /** Where it anchors. Right and left bleed off that edge deliberately. */
  position?: "right" | "left" | "centre";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-0 font-poster leading-[0.78] whitespace-nowrap select-none uppercase",
        /* Large enough to read as a graphic rather than as text, and low
           enough in contrast to never compete with the copy over it. */
        "text-[clamp(7rem,19vw,19rem)] text-white/[0.035]",
        position === "right" && "top-1/2 -right-10 -translate-y-1/2",
        position === "left" && "top-1/2 -left-10 -translate-y-1/2",
        position === "centre" &&
          "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        className,
      )}
    >
      {children}
    </span>
  );
}
