import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

/* Every target clears 44px height; focus ring is never removed. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-all duration-200 ease-out cursor-pointer select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent " +
  "disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation";

const variants: Record<Variant, string> = {
  /* Accent reserved for the single primary action per screen. */
  primary:
    "bg-accent text-navy-950 font-semibold shadow-[0_8px_24px_-8px_rgba(45,212,191,0.6)] " +
    "hover:bg-accent-hover hover:shadow-[0_12px_32px_-8px_rgba(45,212,191,0.7)] active:scale-[0.98]",
  secondary:
    "border border-mist-400/35 bg-white/5 text-mist-100 backdrop-blur-sm " +
    "hover:border-accent/60 hover:bg-white/10 hover:text-white active:scale-[0.98]",
  ghost:
    "text-mist-200 hover:text-accent hover:bg-white/5 active:scale-[0.98]",
  light:
    "border border-navy-900/15 bg-white text-navy-900 shadow-sm " +
    "hover:border-navy-900/30 hover:shadow-md active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: IconName;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  external,
  variant = "primary",
  size = "md",
  className,
  icon,
  children,
}: CommonProps & { href: string; external?: boolean }) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} className="size-4 shrink-0" />}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  icon,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
      {icon && <Icon name={icon} className="size-4 shrink-0" />}
    </button>
  );
}
