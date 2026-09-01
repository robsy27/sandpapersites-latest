import Link from "next/link";
import { booking, navLinks, site } from "@/content/site";
import { areas } from "@/content/areas";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

/**
 * Shared across every page, so this layout applies site-wide.
 *
 * Four columns on desktop: brand, page list, areas served, contact details.
 * The page list previously ran as a full-width strip above the copyright,
 * spread with justify-between — at 1280px that pushed five short links
 * ~150px apart while the band above left ~400px empty down the middle.
 * Giving the pages their own column fills that gap and reads as a group
 * rather than five stranded words.
 *
 * The brand column is set wider (1.5fr) so its blurb wraps over two
 * comfortable lines instead of being capped short by an even split.
 */
export function Footer() {
  return (
    <footer className="border-t border-navy-700 bg-navy-950">
      <Container>
        {/* Brand + Pages + Get in touch */}
        {/* The contact column takes a minmax floor rather than a plain
            fraction. Adding the areas column squeezed it to 222px, which is
            narrower than contact@sandpapersites.co.uk renders — and because
            that link is break-anywhere, it broke mid-word as
            "…sandpapersites.c / o.uk". The 15.5rem floor keeps the address
            on one line; break-anywhere stays as a fallback for widths this
            does not anticipate. */}
        <div className="grid gap-x-12 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_1fr_minmax(15.5rem,1.25fr)] lg:gap-x-12 lg:py-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2.5 text-white transition-opacity hover:opacity-85"
            >
              <Logo className="size-8 text-accent" />
              <span className="font-display text-lg font-bold tracking-tight">
                {site.name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-body leading-relaxed text-mist-300">
              Custom-built, properly hosted websites for small local
              businesses. Built once, looked after for good.
            </p>
            <p className="mt-4 text-body text-mist-300">{site.location}</p>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
              Pages
            </h2>
            <ul className="mt-4 space-y-1">
              <li>
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center text-body text-mist-300 transition-colors hover:text-accent"
                >
                  Home
                </Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-body text-mist-300 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas served. In the footer rather than the main nav: these are
              landing pages for county searches, not part of the journey a
              visitor who is already here needs. Sitewide links also give
              them internal weight, which a new page has none of. */}
          <div>
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
              Areas served
            </h2>
            <ul className="mt-4 space-y-1">
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/${area.slug}`}
                    className="inline-flex min-h-11 items-center text-body text-mist-300 transition-colors hover:text-accent"
                  >
                    Websites in {area.county}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-1">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  /* break-words, not break-anywhere. `overflow-wrap: anywhere`
                     collapses the element's min-content width, so the grid
                     item shrank and wrapped the address mid-word even with
                     room to spare. `break-word` only breaks on real overflow
                     and leaves intrinsic sizing intact. */
                  className="inline-flex min-h-11 items-center gap-2.5 break-words text-body text-mist-300 transition-colors hover:text-accent"
                >
                  <Icon name="mail" className="size-4 shrink-0 text-accent" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="inline-flex min-h-11 items-center gap-2.5 text-body text-mist-300 transition-colors hover:text-accent"
                >
                  <Icon name="phone" className="size-4 shrink-0 text-accent" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={booking.href}
                  {...(booking.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex min-h-11 items-center gap-2.5 text-body text-mist-300 transition-colors hover:text-accent"
                >
                  <Icon
                    name="calendar"
                    className="size-4 shrink-0 text-accent"
                  />
                  {booking.label}
                </a>
              </li>
              {site.social.linkedin && (
                <li>
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2.5 text-body text-mist-300 transition-colors hover:text-accent"
                  >
                    <Icon
                      name="linkedin"
                      className="size-4 shrink-0 text-accent"
                    />
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Copyright, legal links and the sign-off.
            The legal links sit in their own group rather than trailing the
            copyright sentence — run together they read as one long string. */}
        <div className="flex flex-col gap-y-5 border-t border-navy-700/70 py-8 text-body text-mist-300 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-x-6 gap-y-3 sm:flex-row sm:items-center">
            <p>
              &copy; {new Date().getFullYear()} {site.name}. All rights
              reserved.
            </p>
            <p className="flex items-center gap-x-6">
              <a
                href="/terms.html"
                className="underline underline-offset-4 transition-colors hover:text-accent"
              >
                Terms &amp; Conditions
              </a>
              <a
                href="/privacy.html"
                className="underline underline-offset-4 transition-colors hover:text-accent"
              >
                Privacy Policy
              </a>
            </p>
          </div>
          <p>Built and hosted in-house — like yours would be.</p>
        </div>
      </Container>
    </footer>
  );
}
