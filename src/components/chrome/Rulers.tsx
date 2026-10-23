"use client";

import { useEffect, useRef } from "react";
import { SECTION_EVENT } from "@/lib/motion";

/**
 * Drafting-table furniture, cinema layout only: rulers along the top and left
 * edges whose markers track the pointer, and a readout on the right edge
 * giving pointer position, scroll progress and the section being read.
 *
 * It is decoration, but not arbitrary — it says "measured, deliberate, built
 * by someone precise", which is the impression the whole redesign is for.
 * Accent teal rather than the reference's red.
 *
 * Everything updates by writing to the DOM directly inside one animation
 * frame, never through React state, so it costs nothing while scrolling.
 */
const TOP_MARKS = Array.from({ length: 30 }, (_, i) => i * 100);
const LEFT_MARKS = Array.from({ length: 18 }, (_, i) => i * 100);

export function Rulers() {
  const xMark = useRef<HTMLSpanElement>(null);
  const yMark = useRef<HTMLSpanElement>(null);
  const xOut = useRef<HTMLSpanElement>(null);
  const yOut = useRef<HTMLSpanElement>(null);
  const pOut = useRef<HTMLSpanElement>(null);
  const sOut = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!document.documentElement.classList.contains("cinema")) return;

    let mx = 0;
    let my = 0;
    let raf = 0;
    let dirty = true;

    const pad = (n: number) =>
      String(Math.max(0, Math.round(n))).padStart(4, "0");

    const draw = () => {
      raf = 0;
      if (!dirty) return;
      dirty = false;
      if (xMark.current) xMark.current.style.transform = `translateX(${mx}px)`;
      if (yMark.current) yMark.current.style.transform = `translateY(${my}px)`;
      if (xOut.current) xOut.current.textContent = `X:${pad(mx)}`;
      if (yOut.current) yOut.current.textContent = `Y:${pad(my)}`;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (pOut.current) {
        pOut.current.textContent = `P:${String(Math.round(progress)).padStart(3, "0")}%`;
      }
    };

    const queue = () => {
      dirty = true;
      raf ||= requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      mx = event.clientX;
      my = event.clientY;
      queue();
    };

    const onSection = (event: Event) => {
      const { label } = (event as CustomEvent<{ label: string }>).detail;
      if (sOut.current) sOut.current.textContent = `S:${label.toUpperCase()}`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    window.addEventListener(SECTION_EVENT, onSection);
    queue();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      window.removeEventListener(SECTION_EVENT, onSection);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[55] hidden select-none cinema:block"
    >
      {/* top ruler */}
      <div className="absolute inset-x-0 top-0 h-5 border-b border-white/[0.06]">
        {TOP_MARKS.map((n) => (
          <span
            key={n}
            style={{ left: n }}
            className="absolute top-0 h-1.5 border-l border-white/15 pl-1 font-mono text-[9px] leading-[1.6] tracking-wider text-mist-400/50"
          >
            {n}
          </span>
        ))}
        <span
          ref={xMark}
          className="absolute top-0 left-0 h-5 w-px bg-accent will-change-transform"
        />
      </div>

      {/* left ruler */}
      <div className="absolute inset-y-0 left-0 w-5 border-r border-white/[0.06]">
        {LEFT_MARKS.map((n) => (
          <span
            key={n}
            style={{ top: n }}
            className="absolute left-0 w-1.5 border-t border-white/15 font-mono text-[9px] leading-none tracking-wider text-mist-400/50 [writing-mode:vertical-rl]"
          >
            {n}
          </span>
        ))}
        <span
          ref={yMark}
          className="absolute top-0 left-0 h-px w-5 bg-accent will-change-transform"
        />
      </div>

      {/* right-edge readout */}
      {/* Clears the 19rem rail — at right-1.5 the readout sat on top of the
          page list. */}
      <div className="absolute top-1/2 right-[20rem] flex -translate-y-1/2 flex-col items-center gap-5 font-mono text-[10px] tracking-[0.2em] text-mist-400/60 [writing-mode:vertical-rl]">
        <span ref={xOut}>X:0000</span>
        <span ref={yOut}>Y:0000</span>
        <span ref={pOut}>P:000%</span>
        <span ref={sOut} className="text-accent/70">
          S:
        </span>
      </div>

      {/* corner crosses */}
      {[
        "top-3 left-3",
        "top-3 right-3",
        "bottom-3 left-3",
        "bottom-3 right-3",
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} block size-2.5 before:absolute before:top-1/2 before:left-0 before:h-px before:w-full before:bg-white/20 after:absolute after:top-0 after:left-1/2 after:h-full after:w-px after:bg-white/20`}
        />
      ))}
    </div>
  );
}
