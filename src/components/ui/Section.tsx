import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "navy" | "deep" | "light" | "raised";

const tones: Record<Tone, string> = {
  navy: "bg-navy-900 text-mist-200",
  deep: "bg-navy-950 text-mist-200",
  raised: "bg-navy-800 text-mist-200",
  light: "bg-mist-100 text-navy-900",
};

/**
 * Page section with vertical rhythm and a background tone.
 * `id` doubles as the smooth-scroll anchor target.
 */
export function Section({
  id,
  tone = "navy",
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-24 lg:py-32", tones[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
