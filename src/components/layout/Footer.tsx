import Link from "next/link";
import { booking, navLinks, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

/**
 * Shared across every page, so this layout applies site-wide.
 *
 * Upper band: brand alongside the contact details, which now occupy the
 * column the page list used to sit in.
 * Lower band: the page list spread horizontally across the bottom.
 */
export function Footer() {
  return (
    <footer className="border-t border-navy-700 bg-navy-950">
      <Container>
        {/* Brand + Get in touch */}
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:gap-16 lg:py-14">
          <div>
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

          <div className="md:justify-self-end">
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-1">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-anywhere inline-flex min-h-11 items-center gap-2.5 text-body text-mist-300 transition-colors hover:text-accent"
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

        {/* Page list, spread across the bottom */}
        <nav
          aria-label="Footer"
          className="border-t border-navy-700/70 py-4"
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:justify-between">
            <li>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center px-3 text-body font-medium text-mist-300 transition-colors hover:text-accent"
              >
                Home
              </Link>
            </li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center px-3 text-body font-medium text-mist-300 transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-2 border-t border-navy-700/70 py-6 text-body text-mist-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
            {" "}
            <a
              href="/terms.html"
              className="underline underline-offset-4 transition-colors hover:text-accent"
            >
              Terms &amp; Conditions
            </a>
            {" "}&middot;{" "}
            <a
              href="/privacy.html"
              className="underline underline-offset-4 transition-colors hover:text-accent"
            >
              Privacy Policy
            </a>
          </p>
          <p>Built and hosted in-house — like yours would be.</p>
        </div>
      </Container>
    </footer>
  );
}
