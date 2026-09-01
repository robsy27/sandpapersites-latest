import { site } from "@/content/site";
import { areas } from "@/content/areas";
import { plans } from "@/content/pricing";

/**
 * LocalBusiness / ProfessionalService JSON-LD. Helps search engines
 * understand what the business is, where it works and what it charges.
 *
 * `areaServed` used to be the bare string "GB", which told Google nothing
 * useful for county-level searches. It now names the counties and their
 * towns, matching the copy on the location pages — the association has to
 * be stated in both places to be believed.
 *
 * No `address` is published: this is a service-area business run from home,
 * and a home address does not belong in public markup. `areaServed` without
 * a street address is the correct shape for that.
 */
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
    areaServed: areas.flatMap((area) => [
      {
        "@type": "AdministrativeArea",
        name: area.county,
      },
      ...area.towns.map((town) => ({ "@type": "City", name: town })),
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
