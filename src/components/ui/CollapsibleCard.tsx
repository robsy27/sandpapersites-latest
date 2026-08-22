import { cn } from "@/lib/cn";
import { glassSurface } from "./GlassCard";
import { Icon, type IconName } from "./Icon";

/**
 * Glassmorphic card whose detail collapses.
 *
 * Built on native <details>/<summary>, which means it works with no
 * JavaScript, is keyboard operable for free, and announces its expanded
 * state to screen readers without any ARIA of our own.
 *
 * The heading and summary line stay visible at all times — only the detail
 * collapses — so the value proposition is never hidden behind a click.
 * Opening it lights the card: accent rim, brighter pane, soft glow.
 */
export function CollapsibleCard({
  icon,
  title,
  summary,
  eyebrow,
  defaultOpen = false,
  className,
  children,
}: {
  icon?: IconName;
  title: string;
  summary?: string;
  eyebrow?: string;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className={cn(
        "group h-full",
        glassSurface({ interactive: true }),
        // The lit state, driven by the element's own open attribute
        "open:border-accent/45 open:bg-white/[0.075]",
        "open:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_36px_-14px_rgba(45,212,191,0.45)]",
        className,
      )}
    >
      <summary
        className={cn(
          "flex cursor-pointer list-none items-start gap-4 p-6 sm:p-7",
          "rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          // Safari renders a disclosure triangle without this
          "[&::-webkit-details-marker]:hidden",
        )}
      >
        {icon && (
          <span
            className={cn(
              "inline-flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
              "border border-accent/25 bg-accent/10 text-accent",
              "group-open:border-accent/50 group-open:bg-accent/20",
            )}
          >
            <Icon name={icon} className="size-5" />
          </span>
        )}

        <span className="min-w-0 flex-1">
          {eyebrow && (
            <span className="mb-1 block font-display text-xs font-semibold tracking-[0.14em] text-accent uppercase">
              {eyebrow}
            </span>
          )}
          <span className="block font-display text-lg font-bold text-white">
            {title}
          </span>
          {summary && (
            <span className="mt-2 block text-body leading-relaxed text-mist-300">
              {summary}
            </span>
          )}
        </span>

        {/* Chevron doubles as the affordance and the state indicator */}
        <span
          aria-hidden="true"
          className={cn(
            "mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full",
            "border border-white/15 text-mist-300 transition-all duration-300",
            "group-hover:border-white/30 group-hover:text-white",
            "group-open:rotate-180 group-open:border-accent/50 group-open:text-accent",
          )}
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-4">
            <path
              d="m6 9 6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </summary>

      <div className="border-t border-white/10 px-6 pt-5 pb-6 sm:px-7 sm:pb-7">
        {children}
      </div>
    </details>
  );
}
