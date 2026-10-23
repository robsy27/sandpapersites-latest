"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { booking, navLinks, site } from "@/content/site";
import { areas } from "@/content/areas";
import { sectionsFor, type RailSection } from "@/content/railSections";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";
import { SECTION_EVENT, motion } from "@/lib/motion";
import { isCinema } from "@/lib/mode";
import { cn } from "@/lib/cn";

/**
 * The docking side rail — the redesign's main navigation, cinema layout only.
 *
 * The reference this is modelled on is a single page, so its rail lists that
 * page's sections. This site has thirteen URLs that exist for good reasons
 * (the county pages rank for local searches), so the rail carries both: the
 * site's pages, and the sections of whichever page you are currently reading,
 * with the active section tracked as you scroll.
 *
 * On anything narrower, touch, or reduced-motion, this is not rendered at all
 * and the existing header does the job. Nothing here is the only route to any
 * content — every link also exists in the header or the footer, so losing the
 * rail never strands a visitor.
 */

const PAGES = [{ href: "/", label: "Home" }, ...navLinks];

export function SideRail() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("");
  const sections: RailSection[] = useMemo(
    () => sectionsFor(pathname),
    [pathname],
  );

  /* Track which one is being read. */
  useEffect(() => {
    if (!isCinema() || sections.length === 0) return;
    const { ScrollTrigger } = motion();

    const triggers = sections.map((section) =>
      ScrollTrigger.create({
        trigger: `#${CSS.escape(section.id)}`,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (!self.isActive) return;
          setActiveId(section.id);
          window.dispatchEvent(
            new CustomEvent(SECTION_EVENT, { detail: section }),
          );
        },
      }),
    );

    ScrollTrigger.refresh();
    return () => triggers.forEach((t) => t.kill());
  }, [sections]);

  return (
    <aside
      aria-label="Site"
      className="fixed top-0 right-0 z-50 hidden h-dvh w-[19rem] flex-col gap-7 overflow-y-auto border-l border-navy-700/70 bg-navy-950/80 px-7 py-8 backdrop-blur-xl cinema:flex"
    >
      <Link
        href="/"
        className="group flex items-center gap-2.5 text-white transition-opacity hover:opacity-85"
      >
        <Logo className="size-9 text-accent transition-transform duration-500 group-hover:rotate-[-8deg]" />
        <span className="font-display text-xl font-bold tracking-tight">
          {site.name}
        </span>
      </Link>

      <p className="-mt-3 font-mono text-[10px] tracking-[0.22em] text-mist-400 uppercase">
        Build / Host / Edit
      </p>

      <p className="text-sm leading-relaxed text-mist-300">
        Custom websites for small businesses, built and looked after by one
        person.
      </p>

      <p className="flex items-center gap-2 text-sm text-mist-300">
        <Icon name="check" className="size-3.5 shrink-0 text-accent" />
        Shropshire &amp; Cheshire
      </p>

      {/* Pages */}
      <nav aria-label="Pages">
        <p className="font-mono text-[10px] tracking-[0.22em] text-mist-400 uppercase">
          Pages
        </p>
        <ul className="mt-3 space-y-0.5">
          {PAGES.map((page, index) => {
            const current =
              page.href === "/"
                ? pathname === "/"
                : pathname.startsWith(page.href);
            return (
              <li key={page.href}>
                <Link
                  href={page.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "group flex items-baseline gap-2.5 py-1.5 text-[0.95rem] transition-colors",
                    current
                      ? "text-white"
                      : "text-mist-300 hover:text-accent-hover",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[10px] tabular-nums transition-colors",
                      current ? "text-accent" : "text-mist-400/70",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display font-semibold tracking-tight">
                    {page.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sections of the page being read. Only appears once there is more than
          one — a single entry is a label, not navigation. */}
      {sections.length > 1 && (
        <nav aria-label="On this page">
          <p className="font-mono text-[10px] tracking-[0.22em] text-mist-400 uppercase">
            On this page
          </p>
          <ul className="mt-3 space-y-0.5">
            {sections.map((section) => {
              const current = section.id === activeId;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={current ? "true" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 py-1 text-sm transition-colors",
                      current
                        ? "text-accent"
                        : "text-mist-400 hover:text-mist-200",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-px shrink-0 bg-current transition-all duration-300",
                        current ? "w-5" : "w-2.5",
                      )}
                    />
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {/* Contact, pinned to the bottom. */}
      <div className="mt-auto space-y-2.5 border-t border-navy-700/70 pt-5">
        <a
          href={booking.href}
          {...(booking.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-navy-950 shadow-[0_8px_24px_-8px_rgba(45,212,191,0.6)] transition-colors hover:bg-accent-hover"
        >
          {booking.label}
          <Icon name="arrowRight" className="size-4" />
        </a>
        <a
          href={`mailto:${site.email}`}
          className="flex min-h-10 items-center gap-2.5 text-[0.8rem] break-words text-mist-400 transition-colors hover:text-accent"
        >
          <Icon name="mail" className="size-3.5 shrink-0 text-accent" />
          {site.email}
        </a>
        <p className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/${area.slug}`}
              className="font-mono text-[10px] tracking-[0.14em] text-mist-400/80 uppercase transition-colors hover:text-accent"
            >
              {area.county}
            </Link>
          ))}
        </p>
      </div>
    </aside>
  );
}
