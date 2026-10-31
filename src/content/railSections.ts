/**
 * The "on this page" list in the side rail, per route.
 *
 * Declared here rather than scraped from the DOM at runtime. Scraping meant
 * the rail rendered empty and then filled in, and it put the section list
 * behind JavaScript. This way the list is server-rendered with the page.
 *
 * `id` must match the id on the section element — it is the anchor target and
 * the ScrollTrigger selector. Add a section, add a line here.
 */

export type RailSection = { id: string; label: string };

const HOME: RailSection[] = [
  { id: "top", label: "Start" },
  { id: "services", label: "What I do" },
  { id: "why", label: "Why me" },
  { id: "testimonials", label: "Trust" },
  { id: "get-started", label: "Get started" },
];

export const railSections: Record<string, RailSection[]> = {
  "/": HOME,
};

/** Exact match first, then the longest matching prefix for nested routes. */
export function sectionsFor(pathname: string): RailSection[] {
  if (railSections[pathname]) return railSections[pathname];
  const prefix = Object.keys(railSections)
    .filter((key) => key !== "/" && pathname.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];
  return prefix ? railSections[prefix] : [];
}
