import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/portfolio";
import Image from "next/image";
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
                  {project.concept ? (
                    <span className="rounded-full border border-mist-400/30 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-mist-300 uppercase">
                      Concept build
                    </span>
                  ) : (
                    <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-accent uppercase">
                      Live client site
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

                {/* liveUrl existed on the type but was never rendered — the
                    template predated having a real client to link to. */}
                {project.liveUrl && (
                  <div className="mt-8">
                    <ButtonLink
                      href={project.liveUrl}
                      external
                      size="lg"
                      icon="arrowRight"
                    >
                      Visit {project.name}
                    </ButtonLink>
                  </div>
                )}
              </Reveal>
            </div>

            <Reveal delay={140} className="lg:col-span-6">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-navy-700">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? ""}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <Scene name={project.scene} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/45 to-transparent" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* The brief.
          Was a 5/7 split with nothing but two words in the left column, which
          left a large hole beside a single paragraph. The heading now sits
          above its text in one measured column. */}
      <Section tone="deep" ghost="Brief" ghostAt="right">
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-display text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              01 — The brief
            </p>
            {/* Generic, not the client's name: this template serves every
                project, so a hardcoded "What Dan needed" would be wrong the
                moment a second one is added. */}
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
              Where they started
            </h2>
          </Reveal>
          <Reveal delay={70}>
            <p className="mt-6 text-lg leading-relaxed text-mist-300">
              {project.brief}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Decisions */}
      <Section tone="navy" ghost="Built" ghostAt="left">
        <Reveal>
          {/* Conditional tense: speculative for a concept, past for work that
              actually shipped. Saying "what I'd build" about a live client
              site undersells it and reads as though it never happened. */}
          <h2 className="font-display text-3xl font-bold text-white">
            {project.concept
              ? "What I’d build, and why"
              : "What I built, and why"}
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


      <FinalCta
        title={`Need something like ${project.name}?`}
        lead="Tell me what your business does and I'll come back with a straight answer on cost and timescale — usually within a working day."
      />
    </>
  );
}
