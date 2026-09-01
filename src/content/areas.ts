/**
 * Location pages, one per county actually served.
 *
 * These exist to rank for county-level searches ("websites Shropshire"),
 * which the rest of the site cannot do — a page that mentions a place once
 * loses to a page that is genuinely about it.
 *
 * The important constraint: this is NOT a template with the county name
 * swapped. Google classifies near-duplicate location pages as doorway pages
 * and they can earn a penalty rather than a ranking, so every field below is
 * written separately and says something true about that county's economy and
 * the businesses in it. If a third county is ever added, write it — do not
 * copy one of these.
 *
 * Only add a county the work would genuinely be taken on.
 */

export type Area = {
  slug: string;
  county: string;
  /** Named on the page and in the structured data's areaServed. */
  towns: string[];
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  lead: string;
  /** Two or three paragraphs on the county itself. Distinct per area. */
  context: string[];
  /** What businesses here tend to need, and why. Distinct per area. */
  needs: { title: string; body: string }[];
  /** Closing paragraph before the pricing block. */
  close: string;
};

export const areas: Area[] = [
  {
    slug: "websites-shropshire",
    county: "Shropshire",
    towns: [
      "Shrewsbury",
      "Telford",
      "Oswestry",
      "Bridgnorth",
      "Ludlow",
      "Market Drayton",
      "Whitchurch",
      "Wem",
    ],
    title: "Websites for Small Businesses in Shropshire",
    description:
      "Affordable custom websites for small businesses across Shropshire — Shrewsbury, Telford, Oswestry, Bridgnorth, Ludlow and the market towns between. Built, hosted and maintained by one person.",
    eyebrow: "Shropshire",
    heading: "Websites for Shropshire businesses that need to be found.",
    lead: "From Shrewsbury to Ludlow, and every market town in between. A proper website, built once and looked after properly — for a price a small Shropshire business can actually justify.",
    context: [
      "Shropshire is a big, thinly spread county. That shapes how customers find you: someone in Bridgnorth searching for a tradesperson is not going to scroll past the first few results, and they are almost certainly doing it on a phone, outdoors, deciding between you and whoever else showed up. Being findable and looking credible in that moment is most of the job.",
      "It also means the catchment for a lot of Shropshire businesses is genuinely local. A salon in Oswestry is not competing with Birmingham — it is competing with three other salons within ten miles. That is a fight a good website can win outright, and it is why a site aimed squarely at your actual town tends to beat a bigger, vaguer one.",
      "Rural connectivity is still uneven across the county. Sites that are heavy and slow lose people before the page finishes loading, which is why every build here is kept light and made to work on a weak signal rather than only on office broadband.",
    ],
    needs: [
      {
        title: "Trades and agricultural services",
        body: "Plumbers, electricians, builders, groundworkers, agricultural contractors. Usually the same requirement: show the work, cover the area served, and make the phone number impossible to miss.",
      },
      {
        title: "Food, drink and tourism",
        body: "Ludlow and Shrewsbury pull genuine visitor traffic, and visitors research before they arrive. Menus, opening hours and directions that are actually current matter more than anything clever.",
      },
      {
        title: "Independent retail and studios",
        body: "Shops competing with out-of-town retail and online. A site that says clearly what you stock, where you are and why coming in is worth it.",
      },
      {
        title: "Telford's business parks",
        body: "Small B2B firms who need to look established next to much larger competitors. Credibility is the whole brief.",
      },
    ],
    close:
      "The same fees apply wherever you are in Shropshire — a one-off build fee, a small monthly cost for hosting, and edits quoted before any work starts. No travel surcharge for being at the far end of the county.",
  },
  {
    slug: "websites-cheshire",
    county: "Cheshire",
    towns: [
      "Chester",
      "Crewe",
      "Nantwich",
      "Northwich",
      "Macclesfield",
      "Congleton",
      "Winsford",
      "Sandbach",
    ],
    title: "Websites for Small Businesses in Cheshire",
    description:
      "Affordable custom websites for small businesses across Cheshire — Chester, Crewe, Nantwich, Northwich, Macclesfield and Congleton. Built, hosted and maintained by one person.",
    eyebrow: "Cheshire",
    heading: "Websites for Cheshire businesses, without Cheshire agency prices.",
    lead: "Chester to Macclesfield, Crewe to Nantwich. A professional site that stands up next to far bigger competitors — built and looked after by the person you actually speak to.",
    context: [
      "Cheshire is a more crowded market than its neighbours, and a more demanding one. Customers here compare before they commit, and a website that looks dated or hurried costs you the enquiry before a conversation ever happens. The bar is simply higher, and it is set by businesses with bigger budgets than yours.",
      "There is also no shortage of agencies within reach — Chester, Manchester and Liverpool are all on the doorstep. Plenty of them do good work at prices a small independent cannot justify, and the usual alternative is a template that never quite fits. The gap in the middle is what this exists to fill: a custom site, built properly, at a figure that makes sense for a business of your size.",
      "Much of Cheshire is commuter territory, which changes when people look. Enquiries land in the evening and at weekends, from a phone, often from someone who will decide that night. The site has to do the convincing on its own, because you will not be there to.",
    ],
    needs: [
      {
        title: "Professional and financial services",
        body: "Accountants, consultants, surveyors, solicitors. Credibility carries the entire decision here — the site needs to look like the firm you already are.",
      },
      {
        title: "Health, beauty and wellbeing",
        body: "Salons, clinics, therapists and trainers in a competitive and image-conscious market. Booking has to be effortless, and the site has to look the part.",
      },
      {
        title: "Hospitality around Chester and Nantwich",
        body: "Strong visitor economies where people research first. Current information, quick loading, and something that photographs well.",
      },
      {
        title: "Trades serving higher-value work",
        body: "Kitchens, bathrooms, landscaping, renovation. Bigger jobs mean longer consideration, and a portfolio that earns the callback.",
      },
    ],
    close:
      "Same fees across Cheshire — a one-off build fee, a small monthly cost for hosting, and edits quoted before any work starts. Agency standard of work, without the agency overhead paying for it.",
  },
];

export function getArea(slug: string): Area | undefined {
  return areas.find((area) => area.slug === slug);
}
