/** Sandpaper Sites mark — an abstract sweep-and-dot glyph in a rounded square. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="9"
        stroke="currentColor"
        strokeWidth="1.75"
        opacity="0.45"
      />
      <path
        d="M7 20.5c3.4 0 4.6-3 6.6-6.2C15.2 11.7 17 9.5 20 9.5"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M12 22.5c3.6 0 5.2-2.4 7.2-4.6"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="22.5" cy="10.5" r="2.25" fill="currentColor" />
    </svg>
  );
}
