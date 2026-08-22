/**
 * Global site details. Edit these values to update the header, footer,
 * contact page and SEO metadata everywhere at once.
 */

export const site = {
  name: "Sandpaper Sites",
  tagline: "Custom websites for local business",
  description:
    "Sandpaper Sites builds, hosts and maintains affordable custom websites for small local businesses. A professional site at a fair price — no agency overhead, no DIY builders.",
  /** Used for canonical URLs, sitemap and Open Graph. Update before launch. */
  url: "https://sandpapersites.co.uk",
  email: "contact@sandpapersites.co.uk",
  /** E.164 for tel: links and structured data — no spaces, so dialling works everywhere. */
  phone: "+447706261786",
  /** How it reads on the page. */
  phoneDisplay: "07706 261 786",
  location: "Serving local businesses across the UK",
  /**
   * Booking link for the "Arrange a call" buttons.
   *
   * To use Google Calendar: open Google Calendar, Create > Appointment
   * schedule, set your availability and a 15-minute slot length, then use
   * "Share" > "Copy link". It looks like:
   *
   *   https://calendar.app.google/XXXXXXXXXXXX
   *
   * Paste it below. Bookings then appear straight in that Google account's
   * calendar and inbox — no extra service in between.
   *
   * While this is null, every "Arrange a call" button routes to /contact
   * rather than pointing at a URL that 404s. Setting it also switches the
   * buttons to open in a new tab and relabels them "Book a 15-min call".
   */
  bookingUrl: "https://calendar.app.google/MAJrVk7QHEqhukmcA" as string | null,
  /**
   * Real profile URLs only. These are published in the LocalBusiness
   * structured data, so pointing at pages that don't exist tells search
   * engines about profiles they then fail to find. Add them once the
   * accounts are live.
   */
  social: {
    linkedin: null as string | null,
    facebook: null as string | null,
    instagram: null as string | null,
  },
} as const;

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Where "Book a call" should point.
 *
 * With a real booking URL set it opens that in a new tab; without one it
 * sends people to the contact page, so the call to action is always live.
 */
export const booking = {
  href: site.bookingUrl ?? "/contact",
  external: site.bookingUrl !== null,
  label: site.bookingUrl ? "Book a 15-min call" : "Arrange a call",
} as const;
