import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/portfolio";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The live client, on the home page.
 *
 * This band replaces the full pricing block that used to sit here and was a
 * copy of the one on the Services page. Proof is the better use of the
 * space: the home page previously never mentioned the one real project,
 * which is the single most persuasive thing the site has.
 *
 * Takes the first non-concept project rather than hardcoding a slug, so it
 * follows whatever the newest real work is.
 */
export function WorkTeaser() {
  const project = projects.find((entry) => !entry.concept) ?? projects[0];
  if (!project) return null;

  return (
    <Section id="work" tone="deep" ghost="Proof" ghostAt="left">
      <SectionHeading
        eyebrow="Recent work"
        title="A real site, for a real business."
        lead="Not a mock-up. Go and look at it, then decide whether you want one."
      />

      <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-6">
          <Link
            href={`/work/${project.slug}`}
            className="group block overflow-hidden rounded-2xl border border-navy-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <div
              className="relative aspect-[4/3] overflow-hidden bg-navy-950"
              data-parallax="5"
            >
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? ""}
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
            </div>
          </Link>
        </Reveal>

        <Reveal delay={90} className="lg:col-span-6">
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-accent uppercase">
            {project.sector}
          </p>
          <h3 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            {project.name}
          </h3>
          <p className="mt-5 text-lg leading-relaxed text-mist-300">
            {project.summary}
          </p>

          <ul className="mt-7 space-y-3">
            {project.tags.map((tag) => (
              <li key={tag} className="flex gap-3 text-body text-mist-300">
                <Icon name="check" className="mt-1.5 size-3.5 shrink-0 text-accent" />
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`/work/${project.slug}`} icon="arrowRight">
              Read the case study
            </ButtonLink>
            {project.liveUrl && (
              <ButtonLink
                href={project.liveUrl}
                external
                variant="secondary"
                icon="arrowRight"
              >
                Visit the site
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
