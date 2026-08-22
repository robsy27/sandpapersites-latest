import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/* Required by output: "export" — emit this as a static file. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
