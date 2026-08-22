import type { Metadata } from "next";
import Image from "next/image";
import { projects } from "@/content/portfolio";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Examples of custom websites built for small local businesses — cafés, trades, salons, trainers and more. New projects added as they launch.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Sites built for real local businesses."
        lead="The first projects are in build. As each one goes live it’ll appear here, with a note on what it needed and why it was built that way."
      />

      <Section tone="deep">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.id} delay={(index % 3) * 70}>
              <article className="group h-full overflow-hidden rounded-2xl border border-navy-700 bg-navy-800/60 transition-all duration-250 ease-out hover:-translate-y-1 hover:border-accent/45">
                {/* Thumbnail — real screenshot if provided, else a placeholder */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-navy-700 bg-navy-950">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`Homepage of the ${project.name} website built by Sandpiper Sites`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="bg-grid flex h-full flex-col justify-center gap-3 p-7 opacity-90"
                    >
                      <div className="h-2 w-1/4 rounded-full bg-accent/50" />
                      <div className="h-3.5 w-4/5 rounded-md bg-mist-200/20" />
                      <div className="h-3.5 w-3/5 rounded-md bg-mist-200/12" />
                      <div className="mt-2 flex gap-2">
                        <div className="h-6 w-20 rounded-full bg-accent/40" />
                        <div className="h-6 w-16 rounded-full border border-mist-400/25" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <p className="font-display text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                    {project.sector}
                  </p>
                  <h2 className="mt-3 font-display text-lg font-bold text-white">
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                      >
                        {project.name}
                        <Icon name="external" className="size-3.5" />
                      </a>
                    ) : (
                      project.name
                    )}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist-400">
                    {project.summary}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-navy-700 bg-navy-900/70 px-3 py-1 text-xs font-medium text-mist-300"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={140}>
          <p className="mx-auto mt-14 max-w-2xl rounded-2xl border border-navy-700 bg-navy-800/40 p-6 text-center text-sm leading-relaxed text-mist-400">
            These are placeholder tiles showing the kinds of businesses I build
            for. Real projects replace them as they launch — I’d rather show you
            nothing than show you someone else’s work.
          </p>
        </Reveal>
      </Section>

      <FinalCta
        title="Want yours to be one of these?"
        lead="Whatever your trade, the approach is the same: work out what your customers need to see, then build the shortest path to them getting in touch."
      />
    </>
  );
}
