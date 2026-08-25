import Image from "next/image";

/**
 * The hero visual: a photographed laptop with a finished site design
 * composited onto its screen.
 *
 * Screen rectangle measured from the photograph's pixels by scanning the
 * luminance profile for the black panel: x 30.41%–70.58%, y 30.0%–72.5%.
 *
 * The screen image (1408x768, aspect 1.83) is wider than the screen opening
 * (aspect ~1.52), so object-contain is used rather than object-cover —
 * cover would crop roughly 8.5% off each side, clipping the logo on the
 * left and the "Order Online" button on the right. Contain instead leaves
 * a thin letterbox top and bottom, which is filled with #010F2F — sampled
 * directly from the image's own corner pixels — so the seam is invisible
 * rather than guessed from a design-system token.
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
        <div className="relative size-full overflow-hidden rounded-[1.6cqw] bg-[#010F2F]">
          <Image
            src="/images/home-laptop.jpg"
            alt=""
            fill
            sizes="320px"
            className="object-contain"
          />

          {/* screen glass */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
        </div>
      </div>
      </div>
    </div>
  );
}
