"use client";

import { useEffect } from "react";
import { CINEMA_MIN_WIDTH, isCinema } from "@/lib/mode";

/**
 * Cinema or static is decided once, by the inline script, before first paint.
 * If the visitor then crosses the threshold — rotating a tablet, dragging a
 * window narrower, switching on reduced motion — the page is left in the
 * layout for a viewport it no longer has: a rail with no room, or a header
 * missing on a wide screen.
 *
 * Reloading is blunt but correct. The two layouts differ in which components
 * mount and which effects are running (Lenis, ScrollTrigger), and tearing all
 * that down and rebuilding it live is a great deal of machinery for something
 * that happens rarely and deliberately. The reference does the same.
 */
export function ModeWatcher() {
  useEffect(() => {
    const queries = [
      `(min-width: ${CINEMA_MIN_WIDTH}px)`,
      "(pointer: fine)",
      "(prefers-reduced-motion: reduce)",
    ].map((query) => window.matchMedia(query));

    const was = isCinema();

    const onChange = () => {
      const shouldBe =
        queries[0].matches && queries[1].matches && !queries[2].matches;
      if (shouldBe !== was) window.location.reload();
    };

    queries.forEach((query) => query.addEventListener("change", onChange));
    return () =>
      queries.forEach((query) => query.removeEventListener("change", onChange));
  }, []);

  return null;
}
