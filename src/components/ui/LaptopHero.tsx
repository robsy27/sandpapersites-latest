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
    <div className="relative">
      <Image
        src="/images/hero-laptop.jpg"
        alt="A laptop on a studio desk at dusk showing a café website built by Sandpaper Sites"
        width={1312}
        height={816}
        priority
        sizes="(min-width: 1024px) 45vw, 90vw"
        className="h-auto w-full rounded-xl"
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
          {/* site nav */}
          <div className="flex h-[13cqh] shrink-0 items-center justify-between border-b border-black/10 px-[4cqw]">
            <span className="text-[3.6cqw] font-bold tracking-tight text-neutral-900">
              The Harbour Café
            </span>
            <span className="flex gap-[2.4cqw] text-[2.7cqw] text-neutral-500">
              <span>Menu</span>
              <span>Book</span>
              <span>Find us</span>
            </span>
          </div>

          {/* photographic hero — same shot as the café case study */}
          <div className="relative h-[58cqh] shrink-0">
            {/* The café shot was graded dark to sit as a tile on a navy page.
                Here it plays the café's own hero image, where that reads as
                gloomy — so it is lifted and warmed, and framed on the bright
                window side, to look like a site a café would actually run. */}
            <Image
              src="/images/sector-cafe.jpg"
              alt=""
              fill
              sizes="200px"
              className="object-cover object-[38%_center] brightness-[1.7] contrast-[0.92] saturate-[1.45] sepia-[0.12]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center gap-[2.4cqh] px-[4cqw]">
              <p className="max-w-[74%] text-[4.4cqw] leading-[1.2] font-bold text-white">
                Fresh coffee, proper breakfast, harbour views.
              </p>
              <span className="w-fit rounded-[1cqw] bg-amber-500 px-[3cqw] py-[1.4cqh] text-[2.8cqw] font-semibold text-white">
                Book a table
              </span>
            </div>
          </div>

          {/* a strip of page content, so it scans as a site not a slide */}
          <div className="grid flex-1 grid-cols-3 gap-[2cqw] px-[4cqw] py-[3cqh]">
            {[
              ["Breakfast", "Until 11.30"],
              ["Lunch", "Daily specials"],
              ["Takeaway", "Order ahead"],
            ].map(([t, l]) => (
              <div key={t} className="flex flex-col gap-[0.8cqh]">
                <span className="text-[2.7cqw] font-semibold text-neutral-900">
                  {t}
                </span>
                <span className="text-[2.3cqw] text-amber-700">{l}</span>
                <span className="mt-[0.4cqh] h-[0.9cqh] w-full rounded-full bg-neutral-200" />
                <span className="h-[0.9cqh] w-2/3 rounded-full bg-neutral-200" />
              </div>
            ))}
          </div>

          {/* screen glass */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}
