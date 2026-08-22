import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/**
 * Eyebrow + heading + optional lead paragraph.
 * `tone` switches text colours for light vs dark section backgrounds.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 font-display text-xs font-semibold tracking-[0.18em] uppercase",
            isDark ? "text-accent" : "text-accent-ink",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "font-display font-bold",
          Tag === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl lg:text-[2.75rem]",
          isDark ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={cn(
            "mt-5 max-w-measure text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            isDark ? "text-mist-300" : "text-mist-700",
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
