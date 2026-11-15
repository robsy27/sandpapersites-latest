import { ImageResponse } from "next/og";
import { getProject } from "@/content/portfolio";
import { site } from "@/content/site";

/**
 * Share card for a case study.
 *
 * Every page used to fall back to the site-wide card, so pasting a case
 * study into an email or a WhatsApp message previewed identically to the
 * home page — which is a waste, because these are exactly the links that
 * get sent to a prospect one at a time.
 *
 * Generated from the project data rather than drawn, for the same reason
 * the site-wide one is: a static file per client would need maintaining
 * and would be wrong the first time a name changed.
 */

/* The plain file-convention exports, per the opengraph-image docs: alt,
   size and contentType as constants, and a default function that reads
   params. `generateImageMetadata` exists for emitting several images from
   one route, which this does not need — and using it here made Next
   generate its own generateStaticParams, which collided with the route's. */
export const alt = `A website built by ${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function CaseStudyOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

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
          <div style={{ fontSize: 26, color: "#2dd4bf", letterSpacing: 2 }}>
            {(project?.sector ?? "Case study").toUpperCase()}
          </div>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              color: "#ffffff",
              fontWeight: 700,
              letterSpacing: -2,
              marginTop: 14,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {project?.name ?? "Our work"}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "#94a3b8",
              marginTop: 24,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {/* Trimmed rather than wrapped indefinitely: past roughly 150
                characters the text starts crowding the title at this size. */}
            {(project?.summary ?? "").slice(0, 150)}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
