import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/portfolio";
import { previewThemes } from "@/components/ui/SitePreview";
import { SitePreview } from "@/components/ui/SitePreview";
import { Scene } from "@/components/ui/Scene";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Concept builds for small local businesses — cafés, trades, salons, trainers, garages and landscapers. See the thinking behind each one.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Sites built the way local businesses actually get found."
        lead="Each of these is a concept build — a real design for a real kind of business, showing how I'd approach the brief. Click any one to see the thinking behind it."
      />

      <Section tone="deep">
        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.slug} delay={(index % 3) * 70}>
              <article className="group h-full overflow-hidden rounded-2xl border border-navy-700 bg-navy-800/60 transition-all duration-250 ease-out hover:-translate-y-1 hover:border-accent/45">
                <Link
                  href={`/work/${project.slug}`}
                  className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {/* Preview: a real mini-site where one exists, else the scene */}
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-navy-700 bg-navy-950">
                    {project.preview ? (
                      <div className="absolute inset-0 flex items-center justify-center p-3">
                        <SitePreview
                          theme={previewThemes[project.preview]}
                          compact
                          className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                    ) : (
                      <>
                        <Scene
                          name={project.scene}
                          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent" />
                      </>
                    )}

                    {project.concept && (
                      <span className="absolute top-3 right-3 rounded-full border border-white/20 bg-navy-950/80 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-mist-200 uppercase backdrop-blur-sm">
                        Concept
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <p className={`font-display text-xs font-semibold tracking-[0.14em] uppercase ${project.accent}`}>
                      {project.sector}
                    </p>
                    <h2 className="mt-3 font-display text-lg font-bold text-white transition-colors group-hover:text-accent">
                      {project.name}
                    </h2>
                    <p className="mt-2.5 text-body leading-relaxed text-mist-300">
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

                    <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      See the thinking
                      <Icon
                        name="arrowRight"
                        className="size-4 transition-transform duration-250 group-hover:translate-x-1"
                      />
                    </p>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={140}>
          <p className="mx-auto mt-14 max-w-2xl rounded-2xl border border-navy-700 bg-navy-800/40 p-6 text-center text-body leading-relaxed text-mist-300">
            These are concept builds, not past clients — I&rsquo;d rather show you
            honest work of my own than borrow someone else&rsquo;s. Real projects
            replace them as they launch.
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
