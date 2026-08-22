import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/portfolio";
import { previewThemes, SitePreview } from "@/components/ui/SitePreview";
import { Scene } from "@/components/ui/Scene";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { CollapsibleCard } from "@/components/ui/CollapsibleCard";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { FinalCta } from "@/components/sections/FinalCta";

/** Pre-render every project at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.name} — ${project.sector}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-navy-900 pt-10 pb-14 sm:pt-12 sm:pb-16">
        <AmbientBackground intensity="soft" />

        <Container className="relative">
          <Reveal>
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-mist-300 transition-colors hover:text-accent"
            >
              <Icon name="arrowRight" className="size-4 rotate-180" />
              All work
            </Link>
          </Reveal>

          <div className="mt-6 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal delay={70}>
                <div className="flex flex-wrap items-center gap-3">
                  <p className={`font-display text-xs font-semibold tracking-[0.18em] uppercase ${project.accent}`}>
                    {project.sector}
                  </p>
                  {project.concept && (
                    <span className="rounded-full border border-mist-400/30 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-mist-300 uppercase">
                      Concept build
                    </span>
                  )}
                </div>
                <h1 className="mt-5 font-display text-4xl font-bold text-white sm:text-5xl">
                  {project.name}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-mist-300">
                  {project.summary}
                </p>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-navy-700 bg-navy-800/60 px-3 py-1.5 text-xs font-medium text-mist-300"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={140} className="lg:col-span-6">
              {project.preview ? (
                <SitePreview theme={previewThemes[project.preview]} />
              ) : (
                <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-navy-700">
                  <Scene name={project.scene} />
                </div>
              )}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* The brief */}
      <Section tone="deep">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-3xl font-bold text-white">
              The brief
            </h2>
          </Reveal>
          <Reveal delay={70} className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-mist-300">
              {project.brief}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Decisions */}
      <Section tone="navy">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-white">
            What I&rsquo;d build, and why
          </h2>
        </Reveal>

        <ol className="mt-10 space-y-3">
          {project.decisions.map((decision, index) => (
            <Reveal as="li" key={decision.title} delay={index * 70}>
              <CollapsibleCard
                eyebrow={`Decision ${String(index + 1).padStart(2, "0")}`}
                title={decision.title}
                defaultOpen={index === 0}
              >
                <p className="text-body leading-relaxed text-mist-300">
                  {decision.body}
                </p>
              </CollapsibleCard>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* More work */}
      <Section tone="deep">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-white">
            More work
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {others.map((other, index) => (
            <Reveal as="li" key={other.slug} delay={index * 70}>
              <Link
                href={`/work/${other.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-navy-700 bg-navy-800/60 transition-all duration-250 hover:-translate-y-1 hover:border-accent/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <div className="relative aspect-[16/9] overflow-hidden border-b border-navy-700">
                  <Scene name={other.scene} className="absolute inset-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                </div>
                <div className="p-5">
                  <p className={`font-display text-[11px] font-semibold tracking-[0.14em] uppercase ${other.accent}`}>
                    {other.sector}
                  </p>
                  <p className="mt-2 font-display font-bold text-white transition-colors group-hover:text-accent">
                    {other.name}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={140} className="mt-12">
          <ButtonLink href="/work" variant="secondary" icon="arrowRight">
            See all work
          </ButtonLink>
        </Reveal>
      </Section>

      <FinalCta
        title={`Need something like ${project.name}?`}
        lead="Tell me what your business does and I'll come back with a straight answer on cost and timescale — usually within a working day."
      />
    </>
  );
}
