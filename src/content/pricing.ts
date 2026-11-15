/**
 * Pricing — two tiers, three separate fees.
 *
 * All figures live here. Change a number and it updates on the home page
 * teaser and the Services page together.
 *
 *   initialFee — one-off, covers design and build
 *   monthlyFee — hosting, domain, SSL, backups, monitoring
 *   editFee    — quoted per request, always agreed before any work starts
 */

export type Plan = {
  id: string;
  name: string;
  blurb: string;
  bestFor: string;
  initialFee: string;
  monthlyFee: string;
  editFee: string;
  editNote: string;
  featured: boolean;
  features: string[];
  cta: string;
  /**
   * Stripe payment link for the build fee. Opens in a new tab, so the site
   * stays put behind the checkout. The build fee is payable in full upfront
   * (Section 2 of public/terms.html), which is what these collect.
   */
  checkoutUrl: string;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    blurb:
      "A proper presence for sole traders and small teams who need to be found, look credible and get the phone ringing.",
    bestFor: "Sole traders and one-location businesses",
    initialFee: "£495",
    monthlyFee: "£25",
    editFee: "From £25",
    editNote: "Quoted per request before any work begins",
    featured: false,
    cta: "Pay and get started",
    checkoutUrl: "https://buy.stripe.com/28E28t2wKbRXar2gC15wI05",
    features: [
      "Up to 4 pages",
      "Mobile-first custom design",
      "Contact form and click-to-call",
      "Hosting, SSL and domain management",
      "Daily backups and uptime monitoring",
      "Google Business Profile setup",
      "Edits quoted and turned around in 2 working days",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    blurb:
      "For established local businesses that need to win the search result, show their work and convert visitors into enquiries.",
    bestFor: "Established businesses competing on local search",
    initialFee: "£995",
    monthlyFee: "£39",
    editFee: "From £25",
    editNote: "Priority turnaround, quoted before any work begins",
    featured: true,
    cta: "Pay and get started",
    checkoutUrl: "https://buy.stripe.com/28E14pefs1dj9mYfxX5wI04",
    features: [
      "Up to 10 pages",
      "Everything in Starter",
      "Copywriting for every page",
      "Photo gallery or portfolio section",
      "Local SEO setup and structured data",
      "Reviews and testimonials section",
      "Booking or enquiry integration",
      "Priority same-working-day edits",
    ],
  },
];

/** The three fees, explained once and reused. */
export const feeExplainer = [
  {
    icon: "layers" as const,
    label: "Initial fee",
    summary: "One-off, covers the build",
    body: "Design, build, copy and launch. Fixed before work starts — agreed on the first call and it does not move.",
  },
  {
    icon: "server" as const,
    label: "Monthly fee",
    summary: "Keeps the site running",
    body: "Hosting, domain, SSL, daily backups, uptime monitoring and security updates. No contract; 30 days' notice.",
  },
  {
    icon: "refresh" as const,
    label: "Edit fee",
    summary: "Quoted per request",
    body: "Changes are priced on exactly what's needed and quoted upfront. You approve the figure before I touch anything, so there is never a surprise invoice.",
  },
];

/**
 * Three balanced one-liners under the fee breakdown.
 *
 * Keep them to roughly a sentence each. These render as a three-up grid,
 * and the third used to carry the whole leaving-and-hosting explanation —
 * three times the length of its neighbours, which left one card towering
 * over the other two and broke the row. That detail is answered properly
 * by "What happens if I want to leave?" in the FAQs, which is where
 * someone asking it will actually look, so it lives there and not here.
 */
export const pricingNotes = [
  "Three separate fees, so you only ever pay for what you actually use — no padded retainer covering edits you never ask for.",
  "Every edit is quoted and approved before work begins. Nothing gets billed that you have not agreed to first.",
  "No contract. The monthly rolls on 30 days' notice, and the domain stays registered in your name throughout.",
];
