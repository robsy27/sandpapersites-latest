"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "@/lib/motion";
import { currentTier } from "@/lib/mode";

/**
 * Scroll choreography, tiered.
 *
 * Mounted once and applied from here rather than wired into each section,
 * so adding a section needs no animation code and there is one place to
 * tune the whole site's feel.
 *
 * Three treatments:
 *
 *   recede   — a section eases back as it leaves the top of the viewport:
 *              it drifts up, shrinks a little and fades. This is the effect
 *              that makes the page feel like a stack of panes rather than a
 *              scrolling document, and it is the one carried over from the
 *              reference.
 *
 *   rise     — the next section comes up to meet you, so the join between
 *              two sections has a direction.
 *
 *   parallax — anything marked data-parallax drifts against the scroll.
 *              Used on section media so images sit on a different plane to
 *              the text beside them.
 *
 * Tiering. Parallax runs on phones too — it is one transform per element and
 * it is most of the perceived richness. Recede and rise do not: they animate
 * whole sections at once, and on a phone the viewport is short enough that a
 * section would be mid-fade for most of the time it is on screen, which reads
 * as content that will not settle rather than as polish. Reduced motion gets
 * nothing at all.
 *
 * No blur. The reference blurs sections on exit and it looks superb, but a
 * blur filter over a full-width section is composited every frame and it
 * drops frames on ordinary laptops — which is most of the audience here.
 * Opacity, scale and translate are all handled by the compositor and cost
 * effectively nothing.
 */
export function Choreography() {
  const pathname = usePathname();

  useEffect(() => {
    const tier = currentTier();
    if (tier === "minimal") return;
    const { gsap, ScrollTrigger } = motion();

    const ctx = gsap.context(() => {
      const sections =
        tier === "full" ? gsap.utils.toArray<HTMLElement>("main > section") : [];

      sections.forEach((section, index) => {
        /* recede — skip the last one, which has nothing after it to make
           room for and would just fade out over the footer. */
        if (index < sections.length - 1) {
          gsap.to(section, {
            scale: 0.965,
            opacity: 0.45,
            yPercent: -4,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              /* Tied to the section leaving the top of the viewport, not to
                 its bottom crossing 85%. The old trigger fired relative to
                 section height, so a short band — a page header — began
                 fading the instant it rendered and was already half
                 transparent before anyone had scrolled. */
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }

        /* rise — the hero is already in place on load, so it is excluded. */
        if (index > 0) {
          gsap.from(section, {
            yPercent: 5,
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 65%",
              scrub: 0.6,
            },
          });
        }
      });

      gsap.utils
        .toArray<HTMLElement>("[data-parallax]")
        .forEach((element) => {
          const depth = Number(element.dataset.parallax) || 12;
          gsap.fromTo(
            element,
            { yPercent: depth },
            {
              yPercent: -depth,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pathname]);

  return null;
}
