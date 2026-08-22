import { cn } from "@/lib/cn";
import { Scene, type SceneName } from "./Scene";

/**
 * A miniature, realistic-looking website inside browser chrome.
 *
 * Deliberately not a wireframe: it shows a finished site — imagery, real
 * words, a visible call to action — because it is the proof of what gets
 * built. Text is rendered small rather than as grey bars.
 */

export type PreviewTheme = {
  scene: SceneName;
  /** Tailwind classes for the mini-site's accent (button, links). */
  accent: string;
  accentText: string;
  business: string;
  domain: string;
  headline: string;
  blurb: string;
  cta: string;
  nav: string[];
  cards: { title: string; line: string }[];
};

export const previewThemes: Record<string, PreviewTheme> = {
  cafe: {
    scene: "cafe",
    accent: "bg-amber-500",
    accentText: "text-amber-700",
    business: "The Harbour Café",
    domain: "harbourcafe.co.uk",
    headline: "Fresh coffee, proper breakfast, harbour views.",
    blurb: "Open 7 days a week from 8am. Dogs and muddy boots welcome.",
    cta: "Book a table",
    nav: ["Menu", "Book", "Find us"],
    cards: [
      { title: "Breakfast", line: "Served until 11.30" },
      { title: "Lunch", line: "Daily specials" },
      { title: "Takeaway", line: "Order ahead" },
    ],
  },
  trades: {
    scene: "trades",
    accent: "bg-blue-600",
    accentText: "text-blue-700",
    business: "Kerr Plumbing & Heating",
    domain: "kerrplumbing.co.uk",
    headline: "Gas Safe engineers, out to you the same day.",
    blurb: "Boilers, leaks and emergencies across the county. No call-out fee.",
    cta: "Call now",
    nav: ["Services", "Areas", "Contact"],
    cards: [
      { title: "Boilers", line: "Repair & install" },
      { title: "Emergencies", line: "24/7 callout" },
      { title: "Servicing", line: "From £70" },
    ],
  },
  salon: {
    scene: "salon",
    accent: "bg-rose-500",
    accentText: "text-rose-700",
    business: "Wren & Co.",
    domain: "wrenandco.co.uk",
    headline: "Colour, cuts and quiet Sunday appointments.",
    blurb: "A small studio on Bridge Street. Booking online, seven days ahead.",
    cta: "Book online",
    nav: ["Prices", "Gallery", "Book"],
    cards: [
      { title: "Cut & finish", line: "From £38" },
      { title: "Colour", line: "Consultation free" },
      { title: "Gallery", line: "Recent work" },
    ],
  },
};

export function SitePreview({
  theme,
  className,
  compact = false,
}: {
  theme: PreviewTheme;
  className?: string;
  /** Trims the lower content — used for small portfolio tiles. */
  compact?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "overflow-hidden rounded-xl border border-navy-700 bg-navy-800/70 shadow-2xl shadow-navy-950/60",
        className,
      )}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-navy-700 bg-navy-900/80 px-3 py-2">
        <span className="size-2 rounded-full bg-red-400/50" />
        <span className="size-2 rounded-full bg-amber-400/50" />
        <span className="size-2 rounded-full bg-accent/60" />
        <span className="ml-2 flex-1 truncate rounded bg-navy-950/70 px-2 py-1 text-[7px] text-mist-400">
          {theme.domain}
        </span>
      </div>

      {/* The mini site */}
      <div className="bg-white">
        {/* its own nav */}
        <div className="flex items-center justify-between border-b border-black/5 px-3 py-2">
          <span className="text-[8px] font-bold tracking-tight text-navy-900">
            {theme.business}
          </span>
          <span className="flex gap-2">
            {theme.nav.map((item) => (
              <span key={item} className="text-[6.5px] text-navy-900/55">
                {item}
              </span>
            ))}
          </span>
        </div>

        {/* hero with imagery */}
        <div className="relative h-24 sm:h-28">
          <Scene name={theme.scene} className="absolute inset-0" />
          {/* Scrim strong enough to keep the headline legible over every scene
              palette, including the lighter rose and amber ones. */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
          <div className="absolute inset-0 flex flex-col justify-center gap-1.5 p-3">
            <p className="max-w-[70%] text-[10px] leading-tight font-bold text-white">
              {theme.headline}
            </p>
            <p className="max-w-[62%] text-[6.5px] leading-snug text-white/80">
              {theme.blurb}
            </p>
            <span
              className={cn(
                "mt-0.5 w-fit rounded-full px-2 py-1 text-[6.5px] font-semibold text-white",
                theme.accent,
              )}
            >
              {theme.cta}
            </span>
          </div>
        </div>

        {/* content cards */}
        {!compact && (
          <div className="grid grid-cols-3 gap-1.5 p-3">
            {theme.cards.map((card) => (
              <div
                key={card.title}
                className="rounded-md border border-black/5 bg-mist-50 p-1.5"
              >
                <p className="text-[7px] font-semibold text-navy-900">
                  {card.title}
                </p>
                <p className={cn("text-[6px]", theme.accentText)}>{card.line}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
