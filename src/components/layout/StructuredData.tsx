import { site } from "@/content/site";
import { areas } from "@/content/areas";
import { plans } from "@/content/pricing";

/**
 * LocalBusiness / ProfessionalService JSON-LD. Helps search engines
 * understand what the business is, where it works and what it charges.
 *
 * `areaServed` used to be the bare string "GB", which told Google nothing
 * useful for county-level searches. It now names the counties, the home
 * town and the places around them, matching the copy on the location pages
 * — the association has to be stated in both places to be believed.
 *
 * No `address` is published: this is a service-area business run from home,
 * and a home address does not belong in public markup. `areaServed` without
 * a street address is the correct shape for that.
 */
/**
 * Places can legitimately appear twice in the source data — Whitchurch is
 * both its own location page and one of Shropshire's towns — and emitting
 * the same place twice in `areaServed` reads as careless markup rather than
 * as emphasis. First occurrence wins.
 */
function dedupeByName<T extends { name: string }>(entries: T[]): T[] {
  const seen = new Set<string>();
  return entries.filter((entry) =>
    seen.has(entry.name) ? false : (seen.add(entry.name), true),
  );
}

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    priceRange: "££",
    currenciesAccepted: "GBP",
    serviceType: "Website design, hosting and maintenance",
    /* The whole UK is served; the counties and towns are listed because
       that is where the local-search intent is and where I can be on site.
       Listing only the two counties told Google the business was unavailable
       everywhere else, which is not true. */
    areaServed: dedupeByName([
      { "@type": "Country", name: "United Kingdom" },
      ...areas.flatMap((area) => [
        {
          /* A county is an AdministrativeArea; Whitchurch is a City. Saying
             otherwise is a factual error in the markup, and areaServed is
             exactly the field a search engine reads to work out where this
             business operates. */
          "@type": area.kind === "county" ? "AdministrativeArea" : "City",
          name: area.place,
        },
        ...area.towns.map((town) => ({ "@type": "City", name: town })),
      ]),
    ]),
    /* The real, published prices — no invented figures. */
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website packages",
      itemListElement: plans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        description: plan.blurb,
        price: plan.initialFee.replace(/[^0-9]/g, ""),
        priceCurrency: "GBP",
        url: `${site.url}/services`,
      })),
    },
    /* Only advertise profiles that actually exist. Add the Google Business
       Profile URL here once it is verified — it links the site and the
       profile explicitly, which the map pack relies on. */
    sameAs: Object.values(site.social).filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      // Static, author-controlled object — safe to serialise directly.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * FAQPage markup for the contact page's existing questions.
 *
 * Reads the same `faqs` array the page renders, so the markup can never
 * drift from what a visitor actually sees — Google treats a mismatch
 * between the two as a reason to drop the rich result entirely.
 */
export function FaqSchema({
  faqs,
}: {
  faqs: readonly { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * BreadcrumbList for pages that sit below the top level.
 *
 * Google replaces the raw URL in a result with the trail when this is
 * present, so a case study reads "Sandpaper Sites > Work > Dan's Cafe"
 * rather than a path. It also states the hierarchy explicitly rather than
 * leaving a crawler to infer it from the URL shape.
 *
 * Pass the trail without the home page; it is prepended here so every
 * breadcrumb on the site starts the same way.
 */
export function BreadcrumbSchema({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Organization and WebSite markup, for the brand query specifically.
 *
 * Searching "sandpaper sites" was returning nothing because "sandpaper" is an
 * ordinary English word — without an explicit brand entity, Google reads the
 * query as being about abrasive paper and ranks shops accordingly. This says,
 * in the vocabulary Google uses for exactly this, that Sandpaper Sites is an
 * organisation, that these are its alternate spellings, and that this domain
 * is its home.
 *
 * It is necessary but not sufficient. The Business Profile is now verified
 * and linked from `sameAs` in site.ts, which is the strongest single
 * signal; the rest is accumulation.
 *
 * Tom is a separate Person node rather than an inline founder, linked both
 * ways. An entity with its own identifier, its own LinkedIn in `sameAs`
 * and an explicit employment edge is far more use to a search engine
 * working out that "Sandpaper Sites" names a business than a bare string
 * nested inside the organisation ever was.
 */
export function BrandSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        /* The ways people actually type it. */
        alternateName: [
          "Sandpaper Sites",
          "sandpapersites",
          "Sandpaper Sites Shropshire",
          "Sandpaper Sites Cheshire",
        ],
        url: site.url,
        email: site.email,
        telephone: site.phone,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/icon`,
        },
        founder: { "@id": `${site.url}/#tom` },
        sameAs: Object.values(site.social).filter(Boolean),
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#tom`,
        name: "Tom Robinson",
        jobTitle: "Web designer",
        description:
          "Builds, hosts and maintains websites for small businesses across Shropshire and Cheshire.",
        url: `${site.url}/about`,
        image: `${site.url}/images/tom-robinson.jpg`,
        worksFor: { "@id": `${site.url}/#organization` },
        /* Only the profiles that are really his — an invented profile URL
           sends a search engine looking for something that is not there. */
        sameAs: [site.social.linkedin].filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en-GB",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
