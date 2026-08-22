"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll-triggered fade + rise. The *final* state is the CSS default, so
 * content is fully visible without JS and under prefers-reduced-motion
 * (handled in globals.css). The class is toggled on the node directly —
 * no React state, so no cascading render on every reveal.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Stagger offset in ms — keep list steps to 60–80ms. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.classList.add("reveal-visible");

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      show();
      return;
    }

    /* Already on screen at mount (hero, page headers): reveal without
       waiting on the observer, which reports nothing while the document is
       hidden (background tab, prerender). A timer rather than rAF — rAF is
       also paused while hidden, which would leave the content invisible. */
    if (node.getBoundingClientRect().top < window.innerHeight) {
      const timer = setTimeout(show, 50);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}
