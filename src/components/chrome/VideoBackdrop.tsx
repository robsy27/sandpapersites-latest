"use client";

import { useEffect, useRef, useState } from "react";
import { currentTier } from "@/lib/mode";

/**
 * A looping aerial clip behind a section, heavily damped so the copy over it
 * stays readable.
 *
 * Three things keep it from hurting the page:
 *
 *   It never loads on mobile data or reduced motion. The tier decides, and
 *   below the `full` tier a still frame is not substituted either — the
 *   section simply keeps its normal background. A 2MB download to decorate a
 *   phone screen is not a trade worth making on a site that promises to work
 *   on weak rural signal.
 *
 *   `preload="none"` until it is actually near the viewport, so the clip
 *   costs nothing on a visit that never scrolls that far.
 *
 *   It sits under a heavy scrim and at reduced opacity. Aerial footage is
 *   busy and high-contrast; without that, white text over it is unreadable
 *   about a third of the time as the shot moves.
 */
export function VideoBackdrop({
  src,
  poster,
  /** 0–1. Higher shows more of the clip; above ~0.5 the copy starts to suffer. */
  strength = 0.38,
}: {
  src: string;
  poster?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (currentTier() !== "full") return;
    const node = ref.current;
    if (!node) return;

    /* Already on screen at mount — a page header is, every time. Activate
       without waiting for the observer, which reports nothing while the
       document is hidden (background tab, prerender, an inactive preview
       pane) and would otherwise leave the backdrop permanently blank. */
    if (node.getBoundingClientRect().top < window.innerHeight) {
      setActive(true);
      return;
    }

    /* Otherwise hold off fetching until it is close to being seen. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {active && (
        <video
          className="absolute inset-0 size-full object-cover"
          style={{ opacity: strength }}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      )}
      {/* Scrim. Two layers: a flat navy wash to drop the overall brightness,
          and a vertical gradient so text near the top and bottom edges — where
          headings and buttons sit — gets the most protection. */}
      <div className="absolute inset-0 bg-navy-950/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/45 to-navy-950" />
    </div>
  );
}
