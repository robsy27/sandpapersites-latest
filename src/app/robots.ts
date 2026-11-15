import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Everything is open to everything, and the AI crawlers are named rather
 * than left to the wildcard.
 *
 * Functionally this changes nothing — `*` already allowed them. It is here
 * so the decision is on the record: for a business that nobody has heard
 * of, being quoted by an assistant is a way of being found, not a theft to
 * be guarded against. Naming them also means a future change to the
 * wildcard cannot shut them out by accident.
 *
 * Google-Extended is the one worth understanding: it does not affect
 * ordinary Search ranking at all, only whether Google may use the content
 * to ground Gemini and AI Overviews. Blocking it is how sites quietly
 * disappear from the answers people increasingly read instead of results.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
