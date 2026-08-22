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
   * Booking link. Set this to your real Calendly / Cal.com URL once the
   * account exists — bookings then land in whichever inbox that account
   * was created with.
   *
   * Leave it null and every "Book a call" button falls back to the contact
   * page instead of pointing at a URL that 404s.
   */
  bookingUrl: null as string | null,
  social: {
    linkedin: "https://www.linkedin.com/company/sandpapersites",
    instagram: "https://www.instagram.com/sandpapersites",
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
