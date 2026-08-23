import Image from "next/image";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

/**
 * Full-bleed photographic strip between sections.
 *
 * The scrim is deliberately heavy: these run edge to edge behind text, and a
 * photograph that looks fine on its own can still swallow white type. Bands
 * are also fixed-height rather than aspect-driven so they never dominate the
 * page on a wide screen.
 */
export function ImageBand({
  src,
  alt,
  eyebrow,
  title,
  body,
  align = "left",
  className,
}: {
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative h-[22rem] overflow-hidden sm:h-[24rem] lg:h-[26rem]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Two scrims: a directional one for the text, plus an overall wash
          that ties the photograph to the navy either side of it. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0",
          align === "center"
            ? "bg-navy-950/70"
            : "bg-gradient-to-r from-navy-950/92 via-navy-950/70 to-navy-950/35",
        )}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy-950 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950 to-transparent"
      />

      <Container className="relative flex h-full items-center">
        <Reveal
          className={cn(
            "max-w-measure",
            align === "center" && "mx-auto text-center",
          )}
        >
          {eyebrow && (
            <p className="mb-3 font-display text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          {body && (
            <p className="mt-4 text-body leading-relaxed text-mist-300 sm:text-base">
              {body}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
