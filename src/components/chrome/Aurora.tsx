"use client";

import { useEffect, useRef } from "react";
import { isCinema } from "@/lib/mode";

/**
 * A slow field of coloured light behind the whole site, cinema layout only.
 *
 * Why this and not a background video. A video that looked good enough to
 * justify itself would be several megabytes, and this site sells to people
 * on phones in rural Shropshire — the copy on the county page literally
 * promises sites that work on a weak signal. Stock footage would also read
 * as template, which is the opposite of the point. This ships no asset at
 * all, reacts to the visitor, and cannot look like anyone else's site.
 *
 * The cheap trick that makes it affordable: the canvas is tiny — roughly
 * 200px wide — and CSS scales it up over the viewport with a heavy blur.
 * Drawing six soft radial gradients into 200x115 pixels costs almost
 * nothing per frame, and at that blur nobody can tell it was not rendered
 * at full size.
 *
 * It answers the visitor in two ways: the field drifts toward the pointer,
 * and scrolling pushes it, so moving down the page stirs the light. Both are
 * damped hard, so it reads as atmosphere rather than a toy.
 */

type Blob = {
  /** base position in 0..1 of the canvas */
  x: number;
  y: number;
  /** drift speed and phase, so no two move together */
  sx: number;
  sy: number;
  phase: number;
  radius: number;
  colour: [number, number, number];
  alpha: number;
};

/* Navy, teal and a cooler cyan — the site's own palette, nothing new. */
const BLOBS: Blob[] = [
  { x: 0.22, y: 0.18, sx: 0.07, sy: 0.05, phase: 0.0, radius: 0.55, colour: [45, 212, 191], alpha: 0.5 },
  { x: 0.78, y: 0.28, sx: 0.05, sy: 0.08, phase: 1.7, radius: 0.6, colour: [56, 189, 248], alpha: 0.38 },
  { x: 0.5, y: 0.72, sx: 0.09, sy: 0.04, phase: 3.1, radius: 0.5, colour: [20, 184, 166], alpha: 0.42 },
  { x: 0.12, y: 0.82, sx: 0.06, sy: 0.07, phase: 4.6, radius: 0.45, colour: [34, 211, 238], alpha: 0.3 },
  { x: 0.88, y: 0.85, sx: 0.08, sy: 0.06, phase: 2.2, radius: 0.4, colour: [45, 212, 191], alpha: 0.28 },
  { x: 0.42, y: 0.08, sx: 0.04, sy: 0.09, phase: 5.4, radius: 0.5, colour: [19, 36, 65], alpha: 0.6 },
];

const WIDTH = 200;

export function Aurora() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isCinema()) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const height = Math.round(WIDTH * (window.innerHeight / window.innerWidth));
    canvas.width = WIDTH;
    canvas.height = height;

    /* Pointer and scroll, each with a damped follower so nothing snaps. */
    let pointerX = 0.5;
    let pointerY = 0.5;
    let easedX = 0.5;
    let easedY = 0.5;
    let scroll = 0;
    let easedScroll = 0;

    let raf = 0;
    let running = true;
    const start = performance.now();

    const onPointer = (event: PointerEvent) => {
      pointerX = event.clientX / window.innerWidth;
      pointerY = event.clientY / window.innerHeight;
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll = max > 0 ? window.scrollY / max : 0;
    };
    const onResize = () => {
      canvas.height = Math.round(
        WIDTH * (window.innerHeight / window.innerWidth),
      );
    };
    /* A background tab should cost nothing. */
    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        raf ||= requestAnimationFrame(draw);
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    function draw(now: number) {
      raf = running ? requestAnimationFrame(draw) : 0;
      if (!ctx) return;

      const t = (now - start) / 1000;
      const w = canvas!.width;
      const h = canvas!.height;

      easedX += (pointerX - easedX) * 0.03;
      easedY += (pointerY - easedY) * 0.03;
      easedScroll += (scroll - easedScroll) * 0.05;

      /* Deep navy ground — the same value as --color-navy-950, so the canvas
         and the CSS behind it are indistinguishable where light does not
         reach. */
      ctx.fillStyle = "#060f1f";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      for (const blob of BLOBS) {
        /* drift + a nudge from the pointer + a push from the scroll */
        const dx = Math.sin(t * blob.sx + blob.phase) * 0.12;
        const dy = Math.cos(t * blob.sy + blob.phase) * 0.12;
        const px = (easedX - 0.5) * 0.08;
        const py = (easedY - 0.5) * 0.08 - easedScroll * 0.35;

        const cx = (blob.x + dx + px) * w;
        const cy = (blob.y + dy + py) * h;
        const r = blob.radius * w;

        const [red, green, blue] = blob.colour;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        gradient.addColorStop(0, `rgba(${red},${green},${blue},${blob.alpha})`);
        gradient.addColorStop(1, `rgba(${red},${green},${blue},0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = "source-over";
    }

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    onScroll();
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden size-full object-cover opacity-70 blur-[64px] cinema:block"
    />
  );
}
