import type { SceneName } from "@/components/ui/Scene";

/**
 * Portfolio entries.
 *
 * These are CONCEPT builds, not past clients — labelled as such on the page
 * and on each detail view, so nothing here implies work that wasn't done.
 * Replace one with a real project by filling in `liveUrl` and setting
 * `concept: false`.
 */

export type Project = {
  slug: string;
  name: string;
  sector: string;
  scene: SceneName;
  /** Key used to look up the mini-site preview, if one exists. */
  preview?: "cafe" | "trades" | "salon";
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
    slug: "harbour-cafe",
    name: "The Harbour Café",
    sector: "Café & hospitality",
    scene: "cafe",
    preview: "cafe",
    summary:
      "Menu, opening hours and a booking link — the three things a hungry visitor actually wants.",
    concept: true,
    tags: ["5 pages", "Bookings", "Local SEO"],
    accent: "text-amber-300",
    brief:
      "A harbourside café doing strong summer trade and quiet winters, relying entirely on a Facebook page. Visitors couldn't find opening hours without scrolling a feed, and the kitchen was fielding the same three questions by phone all day.",
    decisions: [
      {
        title: "Hours and menu above everything",
        body: "Both sit in the first screen on mobile. Most visits are someone standing outside deciding whether to come in, so the site answers that first.",
      },
      {
        title: "Booking without an account",
        body: "A single form, no login, no app. Anything heavier and a table booking becomes a phone call instead.",
      },
      {
        title: "Seasonal menu the owner can change",
        body: "Menu items live in one editable list. A price change is an email, live the same day, included in the monthly.",
      },
    ],
  },
  {
    slug: "kerr-plumbing",
    name: "Kerr Plumbing & Heating",
    sector: "Plumbing & heating",
    scene: "trades",
    preview: "trades",
    summary:
      "Service areas, Gas Safe credentials and a click-to-call button that never scrolls out of reach.",
    concept: true,
    tags: ["4 pages", "Click-to-call", "Reviews"],
    accent: "text-sky-300",
    brief:
      "A two-van heating firm competing against national callout services in local search. Most enquiries arrive as emergencies from a phone, where the decision is made in under a minute.",
    decisions: [
      {
        title: "A phone number that follows you",
        body: "A sticky call bar on mobile, present on every page. In an emergency the visitor should never have to look for it.",
      },
      {
        title: "Credentials stated plainly",
        body: "Gas Safe registration number, insurance and areas covered, in text rather than a badge image, so search engines read them too.",
      },
      {
        title: "Built around towns, not services",
        body: "Pages match how people actually search — trade plus town — which is where a local firm can outrank a national one.",
      },
    ],
  },
  {
    slug: "wren-and-co",
    name: "Wren & Co.",
    sector: "Hair & beauty",
    scene: "salon",
    preview: "salon",
    summary:
      "Price list, gallery and online booking, built to look as good as the work does.",
    concept: true,
    tags: ["6 pages", "Gallery", "Booking"],
    accent: "text-rose-300",
    brief:
      "A small independent studio whose work is genuinely photogenic, previously represented by a booking-platform profile that looked identical to every competitor in town.",
    decisions: [
      {
        title: "Photography leads",
        body: "The gallery is the hero, not an afterthought page. In this trade the portfolio is the pitch.",
      },
      {
        title: "Prices published",
        body: "Full price list, no 'from' hedging. It filters enquiries down to people who already know what they'll pay.",
      },
      {
        title: "Booking that keeps the brand",
        body: "Booking sits on the studio's own site rather than sending customers to a marketplace full of rivals.",
      },
    ],
  },
  {
    slug: "ironworks-fitness",
    name: "Ironworks Personal Training",
    sector: "Personal training",
    scene: "fitness",
    summary:
      "Packages, results gallery and an enquiry form that filters out time-wasters.",
    concept: true,
    tags: ["5 pages", "Packages", "Forms"],
    accent: "text-teal-300",
    brief:
      "An independent trainer spending hours a week replying to enquiries that were never going to convert, mostly because pricing was never stated up front.",
    decisions: [
      {
        title: "Packages priced openly",
        body: "Three clear tiers. The enquiries that arrive afterwards are from people who have already accepted the cost.",
      },
      {
        title: "A qualifying form",
        body: "Goal, availability and budget range asked before the first reply, which turns a long email thread into one message.",
      },
    ],
  },
  {
    slug: "eastgate-motors",
    name: "Eastgate Motors",
    sector: "Motor repair",
    scene: "garage",
    summary:
      "Services, MOT reminders and directions — everything findable in two taps.",
    concept: true,
    tags: ["4 pages", "Maps", "Local SEO"],
    accent: "text-slate-300",
    brief:
      "An independent garage losing MOT repeat business to chains with automated reminders, and hard to find on a map despite being on a main road.",
    decisions: [
      {
        title: "MOT reminder signup",
        body: "A single field on the homepage. Repeat trade is the cheapest trade a garage can get.",
      },
      {
        title: "Directions that work in a car",
        body: "Address, what to look for and a maps link — no embedded widget that eats mobile data.",
      },
    ],
  },
  {
    slug: "thorne-landscaping",
    name: "Thorne Landscaping",
    sector: "Landscaping",
    scene: "landscaping",
    summary:
      "A portfolio-led build where the photography does the selling.",
    concept: true,
    tags: ["6 pages", "Gallery", "Quote form"],
    accent: "text-green-300",
    brief:
      "A landscaper with years of striking before-and-after photography sitting unused on a phone, and a website that showed none of it.",
    decisions: [
      {
        title: "Before and after, paired",
        body: "The transformation is the product. Showing the pair together does more than any amount of description.",
      },
      {
        title: "Quote form that sets expectations",
        body: "Garden size, access and rough budget captured up front, so the first site visit is already qualified.",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
