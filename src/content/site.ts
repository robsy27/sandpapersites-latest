/**
 * Global site details. Edit these values to update the header, footer,
 * contact page and SEO metadata everywhere at once.
 */

export const site = {
  name: "Sandpiper Sites",
  tagline: "Custom websites for local business",
  description:
    "Sandpiper Sites builds, hosts and maintains affordable custom websites for small local businesses. A professional site at a fair price — no agency overhead, no DIY builders.",
  /** Used for canonical URLs, sitemap and Open Graph. Update before launch. */
  url: "https://sandpipersites.com",
  email: "hello@sandpipersites.com",
  phone: "+44 7000 000000",
  phoneDisplay: "07000 000 000",
  location: "Serving local businesses across the UK",
  /** Replace with your real Calendly / SavvyCal / Cal.com link. */
  bookingUrl: "https://calendly.com/sandpipersites/intro-call",
  social: {
    linkedin: "https://www.linkedin.com/company/sandpipersites",
    instagram: "https://www.instagram.com/sandpipersites",
  },
} as const;

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
