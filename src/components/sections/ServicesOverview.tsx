import { services } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CollapsibleCard } from "@/components/ui/CollapsibleCard";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export function ServicesOverview() {
  return (
    <Section id="services" tone="deep">
      <SectionHeading
        eyebrow="What you get"
        title="Build, host, edit — the whole thing, handled."
        lead="Most small businesses don't want a website project. They want a website that exists, works and stays current. That's the three-part package."
      />

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal as="li" key={service.id} delay={index * 70}>
            <CollapsibleCard
              icon={service.icon}
              title={service.title}
              summary={service.summary}
              /* First one open, so the pattern is obvious at a glance */
              defaultOpen={index === 0}
            >
              <ul className="space-y-2.5">
                {service.details.slice(0, 3).map((detail) => (
                  <li
                    key={detail}
                    className="flex gap-3 text-body leading-relaxed text-mist-300"
                  >
                    <Icon
                      name="check"
                      className="mt-1.5 size-3.5 shrink-0 text-accent"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </CollapsibleCard>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={140} className="mt-10">
        <ButtonLink href="/services" variant="secondary" icon="arrowRight">
          See everything that&rsquo;s included
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
