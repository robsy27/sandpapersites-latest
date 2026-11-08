import { NotFoundBody } from "@/components/sections/NotFoundBody";

/**
 * The 404 shown when a page inside the site calls `notFound()` — an unknown
 * case-study slug, for example.
 *
 * This boundary is inside the (site) group, so the header, footer and
 * background chrome come from that group's layout and only the body belongs
 * here. The root app/not-found.tsx covers addresses that match no route at
 * all and renders the same body with its own chrome.
 */
export default function SiteNotFound() {
  return <NotFoundBody />;
}
