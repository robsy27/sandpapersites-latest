import { cn } from "@/lib/cn";

/** Surface card. `tone` matches the section background it sits on. */
export function Card({
  tone = "dark",
  interactive = false,
  className,
  children,
}: {
  tone?: "dark" | "light";
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 sm:p-8 transition-all duration-250 ease-out",
        tone === "dark"
          ? "border-navy-700 bg-navy-800/60"
          : "border-navy-900/10 bg-white",
        interactive &&
          (tone === "dark"
            ? "hover:-translate-y-1 hover:border-accent/45 hover:bg-navy-800"
            : "hover:-translate-y-1 hover:border-accent-ink/30 hover:shadow-lg"),
        className,
      )}
    >
      {children}
    </div>
  );
}
