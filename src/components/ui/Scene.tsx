import { cn } from "@/lib/cn";

/**
 * Illustrated scenes standing in for photography.
 *
 * Layered SVG gradients and silhouettes rather than stock photos: nothing to
 * license, no external requests, scales crisply, and each trade gets its own
 * palette. Decorative — hidden from assistive tech.
 *
 * These are a deliberate placeholder for real client photography. Swap a
 * scene for a photo by passing `image` to the portfolio entry instead.
 */

export type SceneName =
  | "cafe"
  | "trades"
  | "salon"
  | "fitness"
  | "garage"
  | "landscaping";

const palettes: Record<SceneName, { from: string; via: string; to: string; ink: string }> = {
  cafe:        { from: "#F5C77E", via: "#D98E5A", to: "#7C4A2D", ink: "#3B2317" },
  trades:      { from: "#7DD3FC", via: "#3B82F6", to: "#1E3A8A", ink: "#132A5C" },
  salon:       { from: "#F9C5D5", via: "#D96FA0", to: "#7A2F55", ink: "#4A1B33" },
  fitness:     { from: "#6EE7D6", via: "#14B8A6", to: "#115E59", ink: "#0B3B37" },
  garage:      { from: "#CBD5E1", via: "#64748B", to: "#293548", ink: "#1B2434" },
  landscaping: { from: "#BBF7A0", via: "#4CA65C", to: "#1F5130", ink: "#14361F" },
};

function Foreground({ name, ink }: { name: SceneName; ink: string }) {
  const fill = ink;
  switch (name) {
    case "cafe":
      return (
        <g fill={fill}>
          {/* awning */}
          <path d="M0 96h200v14a10 10 0 0 1-10 10H10a10 10 0 0 1-10-10z" opacity="0.28" />
          {/* cup */}
          <path d="M78 148h34a4 4 0 0 1 4 4v14a17 17 0 0 1-17 17h-8a17 17 0 0 1-17-17v-14a4 4 0 0 1 4-4z" />
          <path d="M116 154h7a10 10 0 0 1 0 20h-7z" opacity="0.55" />
          <rect x="70" y="186" width="50" height="5" rx="2.5" opacity="0.7" />
          {/* steam */}
          <path d="M88 132c-5-6 4-10-1-17M100 130c-5-6 4-11-1-18" stroke={fill} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
        </g>
      );
    case "trades":
      return (
        <g fill={fill}>
          {/* roofline */}
          <path d="M28 150 100 104l72 46v6H28z" opacity="0.32" />
          <rect x="52" y="150" width="96" height="42" opacity="0.5" />
          {/* spanner */}
          <path d="M118 122a16 16 0 0 0-21 19l-28 28 9 9 28-28a16 16 0 0 0 19-21l-9 9-8-8z" />
        </g>
      );
    case "salon":
      return (
        <g fill={fill}>
          {/* mirror */}
          <rect x="58" y="96" width="84" height="66" rx="33" opacity="0.3" />
          {/* scissors */}
          <path d="M84 128l32 34M116 128l-32 34" stroke={fill} strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="80" cy="170" r="9" />
          <circle cx="120" cy="170" r="9" />
        </g>
      );
    case "fitness":
      return (
        <g fill={fill}>
          <rect x="62" y="136" width="76" height="14" rx="7" />
          <rect x="44" y="122" width="18" height="42" rx="6" />
          <rect x="138" y="122" width="18" height="42" rx="6" />
          <rect x="30" y="130" width="14" height="26" rx="5" opacity="0.6" />
          <rect x="156" y="130" width="14" height="26" rx="5" opacity="0.6" />
        </g>
      );
    case "garage":
      return (
        <g fill={fill}>
          <path d="M46 158l10-26a12 12 0 0 1 11-8h66a12 12 0 0 1 11 8l10 26v20a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6v-4H66v4a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6z" />
          <path d="M62 152l7-18h62l7 18z" fill="#fff" opacity="0.22" />
          <circle cx="70" cy="164" r="5" fill="#fff" opacity="0.35" />
          <circle cx="130" cy="164" r="5" fill="#fff" opacity="0.35" />
        </g>
      );
    case "landscaping":
      return (
        <g fill={fill}>
          <path d="M64 176V150M64 150c-16 0-26-12-26-24s12-22 26-22 26 10 26 22-10 24-26 24z" stroke={fill} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.75" />
          <path d="M134 180v-30M134 150l-20-16M134 150l20-16M134 132l-14-12M134 132l14-12" stroke={fill} strokeWidth="5" strokeLinecap="round" fill="none" />
          <rect x="20" y="176" width="160" height="8" rx="4" opacity="0.45" />
        </g>
      );
  }
}

export function Scene({
  name,
  className,
}: {
  name: SceneName;
  className?: string;
}) {
  const p = palettes[name];
  const id = `scene-${name}`;

  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      className={cn("size-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={p.from} />
          <stop offset="55%" stopColor={p.via} />
          <stop offset="100%" stopColor={p.to} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.72" cy="0.22" r="0.6">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="200" height="200" fill={`url(#${id}-bg)`} />
      <rect width="200" height="200" fill={`url(#${id}-glow)`} />

      {/* soft depth bands */}
      <path d="M0 150c46 14 92-16 200 2v48H0z" fill={p.to} opacity="0.35" />
      <path d="M0 172c56 10 104-10 200 6v22H0z" fill={p.ink} opacity="0.3" />

      <Foreground name={name} ink={p.ink} />
    </svg>
  );
}
