import { ImageResponse } from "next/og";

/**
 * Home-screen icon for iOS. Rendered larger than the tab icon, so the mark
 * gets more room and the tile is squared off — iOS applies its own corner
 * radius and would clip ours.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a1930",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 32 32" fill="none">
          <path
            d="M7 21.5c3.6 0 4.8-3.2 6.9-6.6C15.7 12 17.6 9.6 20.8 9.6"
            stroke="#2dd4bf"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="23" cy="10.4" r="2.9" fill="#2dd4bf" />
        </svg>
      </div>
    ),
    size,
  );
}
