/**
 * Trust signals shown where testimonials will eventually live.
 *
 * Until there are real, attributable client quotes, the section shows
 * commitments that can actually be stood behind today rather than three
 * cards announcing that nobody has said anything yet. Never publish invented
 * reviews as if they were genuine.
 *
 * When you have real quotes: fill in `testimonials` below and set
 * `hasRealTestimonials` to true. The section swaps over automatically.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

/** Real client quotes. Empty until there are some. */
export const testimonials: Testimonial[] = [];

export const hasRealTestimonials = testimonials.length > 0;

export type Promise_ = {
  icon: "clock" | "wallet" | "refresh" | "shield" | "user" | "check";
  title: string;
  body: string;
};

export const promises: Promise_[] = [
  {
    icon: "clock",
    title: "A reply within one working day",
    body: "Every enquiry comes to me directly. No ticket queue, no chasing, no wondering whether it arrived.",
  },
  {
    icon: "wallet",
    title: "The price you were quoted",
    body: "The build fee is fixed before work starts, and every edit is priced before I touch it. You get a number first — never an invoice after.",
  },
  {
    icon: "refresh",
    title: "Edits quoted before they happen",
    body: "Prices, hours, photos, staff changes. I price the exact job, you approve it, then it goes live — often the same day.",
  },
  {
    icon: "shield",
    title: "Your domain stays yours",
    body: "The domain goes in your name from day one, and I release it whenever you ask — no fee, no argument. The words and photos you gave me are yours to take too.",
  },
  {
    icon: "user",
    title: "One person, start to finish",
    body: "The person who builds your site is the person who answers the phone. Nothing gets lost in a handover.",
  },
  {
    icon: "check",
    title: "No contract to sign",
    body: "The monthly rolls. If it stops being worth it, you stop paying — there's nothing to get out of.",
  },
];
