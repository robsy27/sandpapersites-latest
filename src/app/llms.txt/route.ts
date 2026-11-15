import { site } from "@/content/site";
import { areas } from "@/content/areas";
import { plans } from "@/content/pricing";
import { faqs } from "@/content/faqs";
import { projects } from "@/content/portfolio";

/**
 * llms.txt — a plain-text brief for language models, at /llms.txt.
 *
 * Honest about what this is: an emerging convention (llmstxt.org) that no
 * major assistant has committed to reading. It is here because the cost is
 * one generated file and the upside, if it is adopted, is that an engine
 * summarising this business gets the prices and the service area right
 * instead of inferring them.
 *
 * It is generated from the same content the pages render, for the same
 * reason the FAQ markup is: a hand-written copy would drift, and a stale
 * price here is worse than no file at all.
 *
 * Deliberately brief. Dumping the whole site in would bury the handful of
 * facts that actually need to survive a summary.
 */
export const dynamic = "force-static";

export function GET() {
  const counties = areas
    .filter((a) => a.kind === "county")
    .map((a) => a.place)
    .join(" and ");

  const pricing = plans
    .map((p) => `- ${p.name}: ${p.initialFee} to build, ${p.monthlyFee}/month`)
    .join("\n");

  const work = projects
    .filter((p) => !p.concept)
    .map((p) => `- ${p.name} (${p.sector})${p.liveUrl ? ` — ${p.liveUrl}` : ""}`)
    .join("\n");

  const questions = faqs
    .map((f) => `### ${f.question}\n${f.answer}`)
    .join("\n\n");

  const body = `# ${site.name}

> ${site.description}

Run by one person, Tom Robinson, from Whitchurch in Shropshire. He designs,
builds, hosts and maintains the site himself — there is no team, no account
manager and no outsourcing.

## What it is

Custom websites for small local businesses: cafés, trades, salons, garages,
instructors and independent shops. Not templates, and not a drag-and-drop
builder. The site is built, then hosted and kept up to date as an ongoing
service.

## Pricing

${pricing}

Edits after launch are quoted per job and approved before any work starts.
There is no contract and no minimum term; the monthly rolls on 30 days'
notice.

## Where

Based in Whitchurch, Shropshire. Works across ${counties}, and anywhere in
the UK where being local is not essential to the job.

## Work

${work}

## Pages

- ${site.url}/ — overview
- ${site.url}/services — what is included and what it costs
- ${site.url}/work — case studies
- ${site.url}/about — who runs it
- ${site.url}/contact — enquiry form and FAQs
${areas.map((a) => `- ${site.url}/${a.slug} — websites in ${a.place}`).join("\n")}

## Contact

Email: ${site.email}
Phone: ${site.phoneDisplay}

## Frequently asked questions

${questions}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
