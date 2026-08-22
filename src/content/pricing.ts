/**
 * Pricing. Edit the numbers here and they update on the home page teaser
 * and the full Services page table.
 */

export type Plan = {
  id: string;
  name: string;
  blurb: string;
  buildFee: string;
  monthly: string;
  featured: boolean;
  features: string[];
  cta: string;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    blurb: "For sole traders who need to exist online, properly.",
    buildFee: "£495",
    monthly: "£25",
    featured: false,
    cta: "Book a call",
    features: [
      "Up to 3 pages",
      "Mobile-first custom design",
      "Contact form and click-to-call",
      "Hosting, SSL and domain management",
      "Unlimited small content edits",
      "Google Business Profile setup",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    blurb: "For established local businesses that need to win the search result.",
    buildFee: "£895",
    monthly: "£35",
    featured: true,
    cta: "Book a call",
    features: [
      "Up to 8 pages",
      "Everything in Starter",
      "Copywriting for every page",
      "Photo gallery or portfolio section",
      "Local SEO setup and structured data",
      "Reviews and testimonials section",
      "Priority same-day edits",
    ],
  },
  {
    id: "bespoke",
    name: "Bespoke",
    blurb: "Booking systems, online ordering, multi-location — anything bigger.",
    buildFee: "From £1,500",
    monthly: "£45+",
    featured: false,
    cta: "Discuss your project",
    features: [
      "Unlimited pages",
      "Everything in Professional",
      "Online booking or ordering integration",
      "Multi-location or multi-service structure",
      "Custom integrations (CRM, payments, stock)",
      "Ongoing strategy calls",
    ],
  },
];

export const pricingNotes = [
  "The build fee is a one-off. The monthly covers hosting, domain, SSL, backups and unlimited small edits.",
  "No contract — cancel any time with 30 days' notice.",
  "You own your domain and your content. If you leave, they come with you.",
];
