"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { motion } from "@/lib/motion";
import { isFull } from "@/lib/mode";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Inertial scrolling, full tier only. Lenis drives the scroll and GSAP's
 * ticker drives Lenis, so ScrollTrigger and the scroll position stay in
 * lockstep — running them off separate clocks makes pinned sections drift.
 *
 * Phones keep native scrolling. Hijacking it there costs more than it adds:
 * it fights momentum, breaks pull-to-refresh, and most of this site's
 * visitors are on a phone.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  /* Next resets the scroll position on navigation, but Lenis keeps its own
     and immediately restores it — so following a footer link from the bottom
     of one page dropped you at the bottom of the next. Reset Lenis too. */
  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
  }, [pathname]);

  useEffect(() => {
    if (!isFull()) return;
    const { gsap, ScrollTrigger } = motion();

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    /* Pinned sections stretch the page after Lenis has measured it. Lenis has
       its own resize watcher but it runs on a debounced timer, which leaves a
       window where scrolling hits a stale, too-short limit. */
    const remeasure = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", remeasure);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    /* In-page links glide rather than jump. */
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      ScrollTrigger.removeEventListener("refresh", remeasure);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
