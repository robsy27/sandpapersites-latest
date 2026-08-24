"use client";

import { useEffect, useRef } from "react";

/**
 * A soft glow that follows the pointer across its parent section.
 *
 * Deliberately cheap: pointer position is written to two CSS custom
 * properties inside a requestAnimationFrame, so at most one style write per
 * frame and no React state, meaning no re-render on mouse move.
 *
 * Skipped entirely on touch devices, where there is no cursor to follow, and
 * under prefers-reduced-motion.
 */
export function Spotlight({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = host.getBoundingClientRect();
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--my", `${event.clientY - rect.top}px`);
        el.style.setProperty("--lit", "1");
      });
    };

    const onLeave = () => el.style.setProperty("--lit", "0");

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: "var(--lit, 0)",
        transition: "opacity 500ms ease-out",
        background:
          "radial-gradient(34rem circle at var(--mx, 50%) var(--my, 30%), rgba(45,212,191,0.13), rgba(56,189,248,0.06) 40%, transparent 68%)",
      }}
    />
  );
}
