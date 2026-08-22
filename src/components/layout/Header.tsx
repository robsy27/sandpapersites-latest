"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { booking, navLinks, site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Condense the bar once the user leaves the top of the page. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close on route change so the panel never survives navigation.
     Adjusted during render rather than in an effect — no extra pass. */
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  /* Escape route + focus containment while the panel is open. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        scrolled || open
          ? "border-b border-navy-700/80 bg-navy-900/92 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-header items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg py-2 text-white transition-opacity hover:opacity-85"
          >
            <Logo className="size-8 text-accent" />
            <span className="font-display text-lg font-bold tracking-tight">
              {site.name}
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors duration-200",
                  isActive(link.href)
                    ? "text-white"
                    : "text-mist-300 hover:text-white",
                )}
              >
                {link.label}
                {/* Active location marker — not colour alone, it’s a shape too */}
                <span
                  className={cn(
                    "absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-accent transition-transform duration-250 ease-out",
                    isActive(link.href) ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <ButtonLink href="/contact" icon="arrowRight">
              Get a quote
            </ButtonLink>
          </div>

          {/* Mobile toggle — 44px target */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-lg text-mist-200 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </Container>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-navy-700 bg-navy-900 md:hidden"
      >
        <Container>
          <nav aria-label="Mobile" className="flex flex-col gap-1 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "flex min-h-12 items-center justify-between rounded-xl px-4 text-base font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-white/5 text-accent"
                    : "text-mist-200 hover:bg-white/5 hover:text-white",
                )}
              >
                {link.label}
                <Icon name="arrowRight" className="size-4 opacity-50" />
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3 border-t border-navy-700 pt-5 pb-2">
              <ButtonLink href="/contact" size="lg" icon="arrowRight">
                Get a quote
              </ButtonLink>
              <ButtonLink
                href={booking.href}
                external={booking.external}
                variant="secondary"
                size="lg"
                icon="calendar"
              >
                {booking.label}
              </ButtonLink>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
