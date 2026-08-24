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
          left: "30.41%",
          top: "30.0%",
          width: "40.17%",
          height: "42.5%",
          containerType: "size",
        }}
      >
        <div className="relative flex size-full flex-col bg-white">
          {/* site nav, with its own mark and a booking pill */}
          <div className="flex h-[12cqh] shrink-0 items-center justify-between border-b border-black/8 px-[3.5cqw]">
            <span className="flex items-center gap-[1.4cqw]">
              <span className="size-[2.6cqw] rounded-full bg-amber-500" />
              <span className="text-[3.4cqw] font-bold tracking-tight text-neutral-900">
                The Harbour Café
              </span>
            </span>
            <span className="flex items-center gap-[2.2cqw] text-[2.5cqw] text-neutral-500">
              <span>Menu</span>
              <span>Find us</span>
              <span className="rounded-full bg-neutral-900 px-[2.2cqw] py-[0.9cqh] font-semibold text-white">
                Book
              </span>
            </span>
          </div>

          {/* photographic hero */}
          <div className="relative h-[52cqh] shrink-0">
            {/* The café shot was graded dark to sit as a tile on a navy page.
                Here it plays the café's own hero image, where that reads as
                gloomy — so it is lifted and warmed, and framed on the bright
                window side. */}
            <Image
              src="/images/sector-cafe.jpg"
              alt=""
              fill
              sizes="200px"
              className="object-cover object-[38%_center] brightness-[1.7] contrast-[0.92] saturate-[1.45] sepia-[0.12]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center gap-[2cqh] px-[3.5cqw]">
              <p className="max-w-[72%] text-[4.2cqw] leading-[1.15] font-bold text-white">
                Fresh coffee, proper breakfast, harbour views.
              </p>
              <span className="flex items-center gap-[2cqw]">
                <span className="rounded-full bg-amber-500 px-[3cqw] py-[1.3cqh] text-[2.7cqw] font-semibold text-white">
                  Book a table
                </span>
                <span className="text-[2.4cqw] font-medium text-white/85">
                  Open till 4pm
                </span>
              </span>
            </div>
          </div>

          {/* menu, priced — real content rather than placeholder bars */}
          <div className="flex flex-1 flex-col justify-center gap-[1.6cqh] px-[3.5cqw]">
            {[
              ["Full English", "£9.50"],
              ["Eggs Benedict", "£8.00"],
              ["Harbour crab sandwich", "£11.00"],
            ].map(([dish, price], i) => (
              <span
                key={dish}
                className={
                  "flex items-baseline justify-between gap-[2cqw] " +
                  (i < 2 ? "border-b border-black/8 pb-[1.4cqh]" : "")
                }
              >
                <span className="truncate text-[2.7cqw] font-medium text-neutral-800">
                  {dish}
                </span>
                <span className="shrink-0 text-[2.7cqw] font-semibold text-amber-700">
                  {price}
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
