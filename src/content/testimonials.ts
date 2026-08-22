/**
 * PLACEHOLDER testimonials — replace with real, attributable quotes before
 * launch. Never publish invented reviews as if they were genuine.
 *
 * Set `placeholder: false` on a quote once it is real; the site labels the
 * section honestly until then.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  placeholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Example placeholder quote — swap this for a real customer's words about the build process and what changed for their business afterwards.",
    name: "Client name",
    role: "Trade, Town",
    initials: "CN",
    placeholder: true,
  },
  {
    quote:
      "Example placeholder quote — a good one mentions a specific result: more enquiries, better calls, less time spent on admin.",
    name: "Client name",
    role: "Trade, Town",
    initials: "CN",
    placeholder: true,
  },
  {
    quote:
      "Example placeholder quote — this slot works well for a customer talking about the ongoing edits and support.",
    name: "Client name",
    role: "Trade, Town",
    initials: "CN",
    placeholder: true,
  },
];

/** Flips the section heading/label once you have real quotes in place. */
export const hasRealTestimonials = testimonials.some((t) => !t.placeholder);
