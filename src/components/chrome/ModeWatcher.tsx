"use client";

import { useEffect } from "react";
import { FULL_MIN_WIDTH, currentTier, tierFor } from "@/lib/mode";

/**
 * The motion tier is decided once, by the inline script, before first paint.
 * If the visitor then crosses the threshold — rotating a tablet, dragging a
 * window narrower, switching on reduced motion — the page is left in the
 * treatment for a device it no longer is.
 *
 * Reloading is blunt but correct. The two layouts differ in which components
 * mount and which effects are running (Lenis, ScrollTrigger), and tearing all
 * that down and rebuilding it live is a great deal of machinery for something
 * that happens rarely and deliberately. The reference does the same.
 */
export function ModeWatcher() {
  useEffect(() => {
    const queries = [
      `(min-width: ${FULL_MIN_WIDTH}px)`,
      "(pointer: fine)",
      "(prefers-reduced-motion: reduce)",
    ].map((query) => window.matchMedia(query));

    const was = currentTier();

    const onChange = () => {
      const shouldBe = tierFor({
        width: window.innerWidth,
        finePointer: queries[1].matches,
        reducedMotion: queries[2].matches,
      });
      if (shouldBe !== was) window.location.reload();
    };

    queries.forEach((query) => query.addEventListener("change", onChange));
    return () =>
      queries.forEach((query) => query.removeEventListener("change", onChange));
  }, []);

  return null;
}
