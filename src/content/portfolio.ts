import type { SceneName } from "@/components/ui/Scene";

/**
 * Portfolio entries.
 *
 * The six concept builds that used to live here are gone. They were honest —
 * labelled as concepts throughout — but a real client beats six imagined ones
 * for anyone deciding whether to hire you, and keeping them alongside a real
 * build would only have diluted it.
 *
 * `concept: true` and the labelling around it are kept in the type, so a
 * speculative piece could be added again without pretending it was paid work.
 */

export type Project = {
  slug: string;
  name: string;
  sector: string;
  scene: SceneName;
  /** Key used to look up the mini-site preview, if one exists. */
  preview?: "cafe" | "trades" | "salon";
  /** Photograph under /public. Falls back to the illustrated Scene if absent. */
  image?: string;
  /** Describes the photograph for screen readers and when it fails to load. */
  imageAlt?: string;
  summary: string;
  concept: boolean;
  liveUrl?: string;
  tags: string[];
  /** Shown on the detail page. */
  brief: string;
  decisions: { title: string; body: string }[];
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "dans-cafe",
    name: "Dan's Cafe",
    sector: "Café — Whitchurch, Shropshire",
    scene: "cafe",
    image: "/images/sector-cafe.jpg",
    imageAlt:
      "A café at first light, empty wooden tables and steam rising from the coffee machine",
    preview: "cafe",
    summary:
      "A Whitchurch breakfast and brunch cafe that people could find, read the menu for, and order from — without ringing to ask.",
    concept: false,
    liveUrl: "https://danscafe.co.uk/",
    tags: ["Single page", "Menu", "Collection orders", "Local SEO"],
    accent: "text-amber-300",
    brief:
      "Dan runs a breakfast, brunch and diner cafe on Bridgewater Street in Whitchurch. The food and the regulars were already there; the problem was everyone else. With no website, anyone searching for breakfast in Whitchurch found competitors first, and the questions that should answer themselves — what's on, when are you open, can I order ahead — were arriving by phone during service.",
    decisions: [
      {
        title: "One page, because that is the whole decision",
        body: "Someone deciding where to eat wants the menu, the hours and the address. Splitting those across five pages adds clicks between a hungry person and your door. Everything sits on one page in the order people ask for it, so the answer is always a scroll away rather than a navigation choice.",
      },
      {
        title: "The menu is the main event",
        body: "Not a PDF that downloads sideways on a phone. The full menu is real text on the page — readable one-handed, searchable by Google, and updatable in minutes when a price moves. Allergen information sits with it rather than on a separate sheet nobody finds.",
      },
      {
        title: "Order ahead for collection",
        body: "The single change that takes work off the counter. Collection orders come through the site instead of interrupting service, and people who were never going to ring now order anyway.",
      },
      {
        title: "Built to be found in Whitchurch",
        body: "Structured data tells Google this is a cafe, where it is, and when it is open, so the opening hours show in search results rather than making people click through. Address, phone and hours are consistent everywhere, which is what local search actually rewards.",
      },
      {
        title: "Fast on a phone, in a market town",
        body: "Most visits are someone standing outside deciding, often on patchy signal. The site is static HTML with compressed images and no page builder — it loads before they change their mind.",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
