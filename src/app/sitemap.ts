import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { areas } from "@/content/areas";
import { projects } from "@/content/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/work", "/about", "/contact"];
  const lastModified = new Date();

  return [
    ...routes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    /* Location pages sit just under the main routes: they are the entry
       point for county searches, so they matter more than a case study. */
    ...areas.map((area) => ({
      url: `${site.url}/${area.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
