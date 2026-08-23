/**
 * The three-part package: build, host, edit.
 * `icon` maps to a key in src/components/ui/Icon.tsx.
 */

export type Service = {
  id: string;
  icon: "layers" | "server" | "refresh" | "search" | "device" | "shield";
  title: string;
  summary: string;
  details: string[];
  /** Photograph under /public shown on the Services page card. */
  image?: string;
  imageAlt?: string;
};

export const services: Service[] = [
  {
    id: "build",
    image: "/images/service-build.jpg",
    imageAlt:
      "A drawing board at dusk covered with technical plans, a ruler and pen beside a closed laptop",
    icon: "layers",
    title: "Build",
    summary:
      "A custom site designed around your business — not a template with your logo dropped in.",
    details: [
      "Discovery call to understand your trade, customers and goals",
      "Custom design, built mobile-first from the ground up",
      "Copywriting help so the words actually sell your service",
      "Contact forms, maps, opening hours, galleries — whatever you need",
      "Two rounds of revisions included before launch",
    ],
  },
  {
    id: "host",
    image: "/images/service-host.jpg",
    imageAlt:
      "A dark server room corridor, rows of racks receding into the distance lit by small indicator lights",
    icon: "server",
    title: "Host",
    summary:
      "Fast, secure hosting handled entirely by me. You never touch a control panel.",
    details: [
      "Global CDN hosting — pages load in under a second",
      "SSL certificate, renewed automatically, forever",
      "Domain setup and management (or bring your own)",
      "Daily backups and uptime monitoring",
      "Security patches applied without you lifting a finger",
    ],
  },
  {
    id: "edit",
    image: "/images/service-edit.jpg",
    imageAlt:
      "A laptop with a blank screen open on a worn workbench in a workshop, notepad and pen alongside",
    icon: "refresh",
    title: "Edit",
    summary:
      "Prices changed? New photos? Email me, I quote the exact job, and it's live once you approve it.",
    details: [
      "Every change quoted upfront — you approve the figure before I start",
      "Text, images, prices, opening hours, staff changes",
      "Small edits from £25; larger work priced the same transparent way",
      "Direct line to me — no ticket queue, no account manager",
      "Turnaround: same working day on Professional, 2 days on Starter",
    ],
  },
];

/** Shown on the Services page as "what's included with every site". */
export const included = [
  {
    icon: "device" as const,
    title: "Mobile-first design",
    body: "Over half your customers will find you on a phone. Every site is designed for that screen first, then scaled up.",
  },
  {
    icon: "search" as const,
    title: "Local SEO foundations",
    body: "Proper page titles, descriptions, structured data and a Google Business Profile setup so you show up in local searches.",
  },
  {
    icon: "shield" as const,
    title: "Secure and maintained",
    body: "SSL, daily backups and monitoring included. If something breaks, I fix it — usually before you notice.",
  },
];
