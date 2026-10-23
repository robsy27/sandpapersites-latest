import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One place that registers GSAP's plugins, so no component has to remember to.
 *
 * Registration is idempotent in GSAP, but importing ScrollTrigger from here
 * rather than directly keeps every caller on the same instance — two copies
 * would each keep their own scroll state and fight each other.
 *
 * Only ever called from inside an effect, so GSAP never runs during SSR.
 */
let registered = false;

export function motion() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/** Names of the section currently being read, for the rail and the readout. */
export const SECTION_EVENT = "sps:section";

export function announceSection(id: string, label: string) {
  window.dispatchEvent(
    new CustomEvent(SECTION_EVENT, { detail: { id, label } }),
  );
}
