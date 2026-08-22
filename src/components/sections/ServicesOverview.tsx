import { services } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export function ServicesOverview() {
  return (
    <Section id="services" tone="deep">
      <SectionHeading
        eyebrow="What you get"
        title="Build, host, edit — the whole thing, handled."
        lead="Most small businesses don’t want a website project. They want a website that exists, works and stays current. That’s the three-part package."
      />

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal as="li" key={service.id} delay={index * 70}>
            <Card interactive className="h-full">
              <span className="inline-flex size-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                <Icon name={service.icon} className="size-6" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-body leading-relaxed text-mist-300">
                {service.summary}
              </p>
              <ul className="mt-6 space-y-2.5">
                {service.details.slice(0, 3).map((detail) => (
                  <li
                    key={detail}
                    className="flex gap-3 text-body leading-relaxed text-mist-300"
                  >
                    <Icon
                      name="check"
                      className="mt-1 size-3.5 shrink-0 text-accent"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={140} className="mt-12">
        <ButtonLink href="/services" variant="secondary" icon="arrowRight">
          See everything that’s included
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
