import { cn } from "@/lib/cn";

/** Consistent max-width and responsive gutters for every section. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </div>
  );
}
