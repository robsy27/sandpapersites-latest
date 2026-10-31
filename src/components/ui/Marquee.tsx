import { cn } from "@/lib/cn";

/**
 * A strip of caps scrolling horizontally between sections — the ticker in
 * the Prabhu reference.
 *
 * Pure CSS. The list is rendered twice and the track translated by exactly
 * -50%, so the second copy lands where the first began and the loop is
 * seamless with no JavaScript, no measuring and no resize handling. The
 * duplicate is aria-hidden so a screen reader hears the phrases once.
 *
 * It earns its place by giving the eye somewhere to rest between two dense
 * sections, and by letting the site repeat its promises without another
 * heading and another card grid. Kept to short phrases: anything long enough
 * to need reading is the wrong thing to put in motion.
 */
export function Marquee({
  items,
  /** Seconds for one full pass. Longer is calmer; under ~25s reads frantic. */
  duration = 42,
  reverse = false,
  className,
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  const run = [...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-navy-700/70 bg-navy-950/60 py-5",
        className,
      )}
    >
      {/* Fades the strip into the page at both ends rather than letting the
          text collide with the viewport edge. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-950 to-transparent" />

      <ul
        className="marquee-track flex w-max items-center gap-10"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {run.map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="flex shrink-0 items-center gap-10"
          >
            <span className="font-poster text-[clamp(1.1rem,2.1vw,1.9rem)] tracking-[0.04em] whitespace-nowrap text-mist-200/80 uppercase">
              {item}
            </span>
            {/* The small solid square the reference uses as a separator. */}
            <span
              aria-hidden="true"
              className="size-2 shrink-0 bg-accent"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
