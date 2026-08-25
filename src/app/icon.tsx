import { ImageResponse } from "next/og";

/**
 * Browser tab icon, generated from the brand rather than shipped as a file.
 *
 * Drawn for 16px first: the site logo's thin swoosh and outlined tile turn to
 * mush at tab size, so this keeps a solid accent tile and one heavy stroke —
 * the only things that survive being shrunk that far.
 */

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M7 21.5c3.6 0 4.8-3.2 6.9-6.6C15.7 12 17.6 9.6 20.8 9.6"
            stroke="#2dd4bf"
            strokeWidth="4.4"
            strokeLinecap="round"
          />
          <circle cx="23" cy="10.4" r="3.1" fill="#2dd4bf" />
        </svg>
      </div>
    ),
    size,
  );
}
