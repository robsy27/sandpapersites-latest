/**
 * Two layouts share every page.
 *
 *  cinema — the full treatment: docking side rail, scroll choreography,
 *           inertial scrolling, edge rulers. Desktop with a mouse only.
 *  static — phones, tablets, touch screens, reduced motion, print and
 *           no-JavaScript. Every word is still there; nothing pins.
 *
 * The static layout is what the exported HTML contains, so search engines and
 * visitors without JavaScript always get complete content. That matters more
 * here than on a portfolio: the county landing pages exist to rank, and a
 * layout that hid its copy behind JavaScript would undo that.
 *
 * An inline script in <head> adds `cinema` to <html> before first paint when
 * the visitor qualifies, so there is no flash of the wrong layout.
 */

/**
 * 1100 rather than the reference's 960. The side rail is wider here because
 * it carries a page list and a section list rather than one page's sections,
 * so it needs more room before the main column gets cramped.
 */
export const CINEMA_MIN_WIDTH = 1100;

export type ModeInputs = {
  width: number;
  finePointer: boolean;
  reducedMotion: boolean;
};

export function shouldUseCinema({
  width,
  finePointer,
  reducedMotion,
}: ModeInputs): boolean {
  return width >= CINEMA_MIN_WIDTH && finePointer && !reducedMotion;
}

/**
 * Both rules as a string for the inline <head> script.
 * Keep in step with `shouldUseCinema` above.
 */
export const MODE_SCRIPT = `(function(){try{
var m=function(q){return window.matchMedia&&window.matchMedia(q).matches};
if(window.innerWidth>=${CINEMA_MIN_WIDTH}&&m("(pointer: fine)")&&!m("(prefers-reduced-motion: reduce)")){document.documentElement.classList.add("cinema")}
}catch(e){}})();`;

export function isCinema(): boolean {
  return (
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("cinema")
  );
}
