/**
 * Three motion tiers, not two layouts.
 *
 * The earlier version was binary — a full experience on desktop and a plain
 * site everywhere else. That was wrong for this site: most visitors are on a
 * phone, so the plain version was what most people actually saw.
 *
 *   full    — wide screen with a mouse. Everything: inertial scrolling,
 *             scroll choreography, a background that reacts to the pointer.
 *   lite    — phones and tablets. Entrance reveals and parallax still run,
 *             but native scrolling is left alone and nothing tracks the
 *             pointer. Premium without fighting the device.
 *   minimal — anyone who asked for reduced motion. Nothing animates.
 *
 * Content never depends on the tier. Every word is in the server-rendered
 * HTML in all three, so search engines and no-JS visitors get the full page —
 * which matters here because the county pages exist to rank.
 *
 * The tier is written to <html> as a class by an inline script before first
 * paint, so there is no flash of the wrong treatment.
 */

export type MotionTier = "full" | "lite" | "minimal";

/** Below this, the pointer-driven and scroll-pinned work is skipped. */
export const FULL_MIN_WIDTH = 1100;

export type ModeInputs = {
  width: number;
  finePointer: boolean;
  reducedMotion: boolean;
};

export function tierFor({
  width,
  finePointer,
  reducedMotion,
}: ModeInputs): MotionTier {
  if (reducedMotion) return "minimal";
  if (width >= FULL_MIN_WIDTH && finePointer) return "full";
  return "lite";
}

/**
 * The same rules as a string for the inline <head> script.
 * Keep in step with `tierFor` above.
 */
export const MODE_SCRIPT = `(function(){try{
var m=function(q){return window.matchMedia&&window.matchMedia(q).matches};
var t=m("(prefers-reduced-motion: reduce)")?"minimal":(window.innerWidth>=${FULL_MIN_WIDTH}&&m("(pointer: fine)"))?"full":"lite";
document.documentElement.classList.add("motion-"+t);
}catch(e){document.documentElement.classList.add("motion-lite")}})();`;

export function currentTier(): MotionTier {
  if (typeof document === "undefined") return "lite";
  const list = document.documentElement.classList;
  if (list.contains("motion-full")) return "full";
  if (list.contains("motion-minimal")) return "minimal";
  return "lite";
}

/** True when the full, pointer-driven treatment is running. */
export function isFull(): boolean {
  return currentTier() === "full";
}

/** True when any motion at all is wanted. */
export function motionAllowed(): boolean {
  return currentTier() !== "minimal";
}
