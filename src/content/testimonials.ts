/**
 * Trust signals shown where testimonials live.
 *
 * Never publish invented reviews as if they were genuine.
 *
 * There are two displays, because one quote and twenty quotes want
 * different treatment. Below `GRID_THRESHOLD` the section keeps the
 * promises and features the quotes above them — a single card stranded in
 * a three-column grid advertises how few there are. At or above it, the
 * quotes carry the section on their own.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  /**
   * Where the quote can be read in its original place. A review someone
   * can go and verify is worth considerably more than one that only
   * exists on the website of the person it flatters.
   */
  sourceUrl?: string;
  sourceLabel?: string;
};

/** Real client quotes. Never invented, never edited for flattery. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Working with Tom on my new website was an absolute pleasure from start to finish. From our very first conversation, he took the time to truly listen to what I wanted and talked me through every single step of the process. His personal touch and attention to detail made all the difference. He didn't just build a website — he made it great. I couldn't be happier with the end result and would recommend Tom to anyone looking for a developer who genuinely cares.",
    name: "Bob",
    role: "Google review",
    initials: "B",
    sourceUrl: "https://maps.google.com/?cid=4613831360892109151",
    sourceLabel: "Read it on Google",
  },
];

export const hasRealTestimonials = testimonials.length > 0;

/** Below this many quotes, they are featured above the promises instead
 *  of replacing them. */
export const GRID_THRESHOLD = 3;

export const useQuoteGrid = testimonials.length >= GRID_THRESHOLD;

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
    body: "The domain goes in your name from day one and I release it whenever you ask — no fee, no argument. Your words and photos are yours too. The site itself runs on my hosting, so moving it means having somewhere else to host it.",
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
