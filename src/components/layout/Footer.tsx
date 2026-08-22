import Link from "next/link";
import { booking, navLinks, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-navy-700 bg-navy-950">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2.5 text-white transition-opacity hover:opacity-85"
            >
              <Logo className="size-8 text-accent" />
              <span className="font-display text-lg font-bold tracking-tight">
                {site.name}
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-body leading-relaxed text-mist-300">
              Custom-built, properly hosted websites for small local businesses.
              Built once, looked after for good.
            </p>
            <p className="mt-5 text-sm text-mist-300">{site.location}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
              Pages
            </h2>
            <ul className="mt-5 space-y-1">
              <li>
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center text-sm text-mist-300 transition-colors hover:text-accent"
                >
                  Home
                </Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-mist-300 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-1">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center gap-2.5 text-sm text-mist-300 transition-colors hover:text-accent break-anywhere"
                >
                  <Icon name="mail" className="size-4 shrink-0" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="inline-flex min-h-11 items-center gap-2.5 text-sm text-mist-300 transition-colors hover:text-accent"
                >
                  <Icon name="phone" className="size-4 shrink-0" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={booking.href}
                  {...(booking.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex min-h-11 items-center gap-2.5 text-sm text-mist-300 transition-colors hover:text-accent"
                >
                  <Icon name="calendar" className="size-4 shrink-0" />
                  {booking.label}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-navy-700/70 py-7 text-sm text-mist-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Built and hosted in-house — like yours would be.</p>
        </div>
      </Container>
    </footer>
  );
}
