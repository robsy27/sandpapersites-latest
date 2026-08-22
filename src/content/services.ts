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
};

export const services: Service[] = [
  {
    id: "build",
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
    icon: "refresh",
    title: "Edit",
    summary:
      "Prices changed? New photos? Email me and it's live — usually the same day.",
    details: [
      "Unlimited small content edits included in your monthly fee",
      "Text, images, prices, opening hours, staff changes",
      "New pages and larger changes quoted upfront, no surprises",
      "Direct line to me — no ticket queue, no account manager",
      "Typical turnaround: same working day",
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
