import Image from "next/image";
import { Scene } from "./Scene";

/**
 * The hero visual: a photographed laptop with the site rendered onto its
 * screen.
 *
 * The photograph was generated with a deliberately black screen, and the
 * screen rectangle was measured from the pixels — 30.41% / 29.53%, sized
 * 40.17% x 41.91%. Compositing real markup into it means the interface on
 * show is genuinely ours, rather than an AI's guess at what a website looks
 * like, which never survives close inspection.
 *
 * The screen renders around 185px wide at desktop, so its contents are sized
 * in container-query units and kept deliberately chunky. A shrunken copy of
 * the full mini-site would just be mush at this scale.
 */
export function LaptopHero() {
  return (
    <div className="relative">
      <Image
        src="/images/hero-laptop.jpg"
        alt="A laptop on a desk in a studio at dusk, showing a café website built by Sandpaper Sites"
        width={1312}
        height={816}
        priority
        sizes="(min-width: 1024px) 45vw, 90vw"
        className="h-auto w-full rounded-xl"
      />

      {/* Measured screen rectangle */}
      <div
        aria-hidden="true"
        className="absolute overflow-hidden"
        style={{
          left: "30.41%",
          top: "29.53%",
          width: "40.17%",
          height: "41.91%",
          containerType: "size",
        }}
      >
        <div className="relative size-full bg-white">
          {/* the site's own top bar */}
          <div className="flex h-[14cqh] items-center justify-between bg-white px-[4cqw]">
            <span className="text-[4.4cqw] font-bold tracking-tight text-navy-900">
              The Harbour Café
            </span>
            <span className="flex gap-[2.5cqw] text-[3.4cqw] text-navy-900/50">
              <span>Menu</span>
              <span>Book</span>
            </span>
          </div>

          {/* hero band */}
          <div className="relative h-[86cqh]">
            <Scene name="cafe" className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
            <div className="absolute inset-0 flex flex-col justify-center gap-[2cqh] px-[4cqw]">
              <p className="max-w-[72%] text-[6.2cqw] leading-[1.15] font-bold text-white">
                Fresh coffee, proper breakfast, harbour views.
              </p>
              <span className="w-fit rounded-full bg-amber-500 px-[3.4cqw] py-[1.6cqh] text-[3.8cqw] font-semibold text-white">
                Book a table
              </span>
            </div>
          </div>

          {/* Screen glass: a faint sheen so it reads as a display, not a
              picture pasted onto the laptop. */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}
