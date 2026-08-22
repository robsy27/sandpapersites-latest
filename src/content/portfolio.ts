/**
 * Portfolio placeholders. Drop a real screenshot into /public/work/ and set
 * `image` to e.g. "/work/harbour-cafe.jpg" to replace the placeholder tile.
 */

export type Project = {
  id: string;
  name: string;
  sector: string;
  summary: string;
  /** Optional screenshot path under /public. Leave undefined for a placeholder. */
  image?: string;
  /** Optional live URL. Leave undefined to render a non-linked card. */
  url?: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "cafe",
    name: "Coming soon",
    sector: "Café & hospitality",
    summary:
      "Menu, opening hours and a booking link — the three things a hungry visitor actually wants.",
    tags: ["5 pages", "Bookings", "Local SEO"],
  },
  {
    id: "trades",
    name: "Coming soon",
    sector: "Plumbing & heating",
    summary:
      "Service areas, gas-safe credentials and a click-to-call button that never scrolls out of reach.",
    tags: ["4 pages", "Click-to-call", "Reviews"],
  },
  {
    id: "salon",
    name: "Coming soon",
    sector: "Hair & beauty",
    summary:
      "Price list, gallery and online booking, built to look as good as the work does.",
    tags: ["6 pages", "Gallery", "Booking"],
  },
  {
    id: "trainer",
    name: "Coming soon",
    sector: "Personal training",
    summary:
      "Packages, transformation gallery and an enquiry form that filters out time-wasters.",
    tags: ["5 pages", "Packages", "Forms"],
  },
  {
    id: "garage",
    name: "Coming soon",
    sector: "Motor repair",
    summary:
      "Services, MOT reminders and directions — everything findable in two taps.",
    tags: ["4 pages", "Maps", "Local SEO"],
  },
  {
    id: "landscaping",
    name: "Coming soon",
    sector: "Landscaping",
    summary:
      "A portfolio-led build where the photography does the selling.",
    tags: ["6 pages", "Gallery", "Quote form"],
  },
];
