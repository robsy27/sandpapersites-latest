import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/**
 * The picture shown when the site is shared anywhere — WhatsApp, iMessage,
 * Slack, LinkedIn, Facebook, email previews.
 *
 * Generated from the site's own colours rather than a static file, so it
 * never goes stale and needs no asset to maintain.
 */

export const alt = `${site.name} — affordable custom websites for small local businesses`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a1930",
          padding: 72,
          position: "relative",
        }}
      >
        {/* accent glow, echoing the site's ambient background */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: "rgba(45,212,191,0.16)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              border: "3px solid #2dd4bf",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 34, color: "#ffffff", fontWeight: 700 }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.1,
              color: "#ffffff",
              fontWeight: 700,
              letterSpacing: -1.5,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            The website your business deserves,
          </div>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.1,
              color: "#2dd4bf",
              fontWeight: 700,
              letterSpacing: -1.5,
              marginTop: 6,
            }}
          >
            without the agency price tag.
          </div>
          <div style={{ fontSize: 30, color: "#94a3b8", marginTop: 30 }}>
            Built, hosted and looked after — from £495 + £25/month
          </div>
        </div>
      </div>
    ),
    size,
  );
}
