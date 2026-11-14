import Image from "next/image";

/**
 * The hero visual: a photographed laptop with a finished site design
 * composited onto its screen.
 *
 * Screen rectangle measured from the photograph's pixels by scanning the
 * luminance profile for the black panel: x 30.41%–70.58%, y 30.0%–72.5%.
 *
 * The screen shows danscafe.co.uk — a real client site anyone can go and
 * open. It previously showed an invented portfolio whose navigation read
 * "Agency & Ioes" and whose service list included "Design Design" and
 * "Colllin Management": generated-image artefacts, sitting in the largest
 * picture on the homepage of a web design business. A fake site on the
 * hero undermines every honest claim the copy makes.
 *
 * The screen opening works out at aspect 1.523 — 39.3% of 149.09% width
 * over 41.5% of 148.36% of a 16/10 box — so the replacement is captured at
 * exactly that ratio and fills the opening with no letterbox. Recapture at
 * 1.523 if it is ever swapped again.
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
        alt="A laptop on a studio desk at dusk showing the Dan's Cafe website, built by Sandpaper Sites"
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
        <div className="relative size-full overflow-hidden rounded-[1.6cqw] bg-[#070F11]">
          <Image
            src="/images/hero-screen-danscafe.jpg"
            alt=""
            fill
            /* The opening is 58.6% of the frame, and the frame is roughly
               69vw on desktop and the full column on a phone — so about
               40vw and 55vw respectively. This was `320px`, which served a
               320px file into a slot measuring 579px and left the one
               screenshot of real work on the page visibly soft. */
            sizes="(min-width: 1024px) 40vw, 55vw"
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
