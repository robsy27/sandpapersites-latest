import Image from "next/image";

/**
 * The hero visual: a photographed laptop with the site rendered onto its
 * screen.
 *
 * Screen rectangle measured from the photograph's pixels by scanning the
 * luminance profile for the black panel: x 30.41%–70.58%, y 30.0%–72.5%.
 *
 * The content on the screen uses the same photograph as the café case study
 * rather than the illustrated Scene. An illustration sitting on a
 * photorealistic laptop reads as fake immediately; a photograph does not.
 * Type is kept small and a content row sits below the hero so it scans as a
 * web page rather than a poster.
 */
export function LaptopHero() {
  return (
    /* Cropped in on the laptop rather than shipping a tighter photograph.
       The frame shows x 220-1100, y 185-735 of the original — the laptop
       with ~65px of margin either side. Image and screen overlay sit in the
       same oversized wrapper, so the measured screen percentages stay valid
       and the screen grows from 40% of the frame to 60%. */
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
      <div
        className="absolute"
        style={{
          left: "-25.00%",
          top: "-33.64%",
          width: "149.09%",
          height: "148.36%",
        }}
      >
      <Image
        src="/images/hero-laptop.jpg"
        alt="A laptop on a studio desk at dusk showing a café website built by Sandpaper Sites"
        fill
        priority
        sizes="(min-width: 1024px) 72vw, 145vw"
        className="object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute overflow-hidden"
        style={{
          /* Measured from the photograph's luminance profile, then inset a
             touch so a sliver of bezel stays visible. The radius matches the
             laptop's rounded screen corners — without it the square white
             corners sit proud of the lid. */
          left: "30.85%",
          top: "30.5%",
          width: "39.3%",
          height: "41.5%",
          borderRadius: "1.6cqw",
          containerType: "size",
        }}
      >
        <div className="relative flex size-full flex-col overflow-hidden rounded-[1.6cqw] bg-white">
          {/* Site nav. Kept low and quiet — an oversized header is the first
              thing that makes a small layout look amateur. */}
          <div className="flex h-[11cqh] shrink-0 items-center justify-between border-b border-black/[0.07] px-[5cqw]">
            <span className="flex items-center gap-[1.4cqw]">
              <span className="size-[2cqw] rounded-full bg-amber-600" />
              <span className="text-[2.9cqw] font-semibold tracking-tight text-neutral-900">
                The Harbour Café
              </span>
            </span>
            <span className="flex items-center gap-[3cqw] text-[2.2cqw] text-neutral-400">
              <span>Menu</span>
              <span>Book</span>
              <span>Find us</span>
            </span>
          </div>

          {/* Hero. Given most of the screen, with the photograph only gently
              lifted — the heavy grade before had bleached it flat. */}
          <div className="relative h-[63cqh] shrink-0">
            <Image
              src="/images/sector-cafe.jpg"
              alt=""
              fill
              sizes="320px"
              className="object-cover object-[42%_center] brightness-[1.22] contrast-[1.05] saturate-[1.12]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />

            <div className="absolute inset-0 flex flex-col justify-end gap-[2.6cqh] p-[5cqw]">
              <span className="text-[1.9cqw] font-semibold tracking-[0.22em] text-white/70 uppercase">
                Whitby harbour
              </span>
              <p className="max-w-[68%] text-[3.9cqw] leading-[1.25] font-semibold text-white">
                Fresh coffee, proper breakfast, harbour views.
              </p>
              <span className="flex items-center gap-[3cqw]">
                <span className="rounded-[0.8cqw] bg-amber-600 px-[3.4cqw] py-[1.5cqh] text-[2.3cqw] font-semibold text-white">
                  Book a table
                </span>
                <span className="text-[2.1cqw] text-white/75">
                  Open till 4pm
                </span>
              </span>
            </div>
          </div>

          {/* The next section, only partly in view — a real browser shows a
              page continuing past the fold, not a whole page shrunk to fit. */}
          <div className="flex flex-1 flex-col justify-start gap-[1.4cqh] px-[5cqw] pt-[3cqh]">
            <span className="text-[1.8cqw] font-semibold tracking-[0.2em] text-neutral-400 uppercase">
              This morning
            </span>
            {[
              ["Full English", "9.50"],
              ["Eggs Benedict", "8.00"],
            ].map(([dish, price]) => (
              <span key={dish} className="flex items-baseline gap-[2cqw]">
                <span className="shrink-0 text-[2.4cqw] text-neutral-700">
                  {dish}
                </span>
                <span className="h-px flex-1 translate-y-[-0.3cqh] bg-neutral-200" />
                <span className="shrink-0 text-[2.4cqw] font-medium text-neutral-900">
                  £{price}
                </span>
              </span>
            ))}
          </div>

          {/* screen glass */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
        </div>
      </div>
      </div>
    </div>
  );
}
