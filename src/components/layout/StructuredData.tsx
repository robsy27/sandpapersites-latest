import { site } from "@/content/site";

/**
 * LocalBusiness / ProfessionalService JSON-LD. Helps search engines
 * understand what the business is and how to contact it.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    areaServed: "GB",
    priceRange: "££",
    serviceType: "Website design, hosting and maintenance",
    /* Only advertise profiles that actually exist */
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
