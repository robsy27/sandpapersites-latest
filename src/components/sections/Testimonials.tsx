import { hasRealTestimonials, promises, testimonials } from "@/content/testimonials";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";

/**
 * Shows real client quotes once they exist. Until then it shows commitments
 * that can be stood behind today — the space still earns its place rather
 * than advertising an absence.
 *
 * Static grid rather than an auto-rotating carousel: nothing to pause,
 * nothing moving under a screen reader, everything keyboard-reachable.
 */
export function Testimonials() {
  if (hasRealTestimonials) {
    return (
      <Section id="testimonials" tone="deep">
        <SectionHeading
          eyebrow="Client feedback"
          title="What local businesses say"
          lead="A few words from the people whose sites I look after."
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal as="li" key={testimonial.name + index} delay={index * 70}>
              <Card className="flex h-full flex-col">
                <Icon name="quote" className="size-7 text-accent/40" />
                <blockquote className="mt-5 flex-1 text-body leading-relaxed text-mist-300">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3.5 border-t border-navy-700 pt-6">
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-700 font-display text-sm font-bold text-mist-300"
                  >
                    {testimonial.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-sm font-semibold text-white">
                      {testimonial.name}
                    </span>
                    <span className="block truncate text-xs text-mist-300">
                      {testimonial.role}
                    </span>
                  </span>
                </figcaption>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>
    );
  }

  return (
    <Section id="testimonials" tone="deep">
      <SectionHeading
        eyebrow="What you can count on"
        title="Six things I'll put in writing."
        lead="I'm early enough that I don't have a wall of client quotes yet, and I'd rather not invent any. So here's what I'll commit to instead — hold me to all of it."
      />

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {promises.map((promise, index) => (
          <Reveal as="li" key={promise.title} delay={(index % 3) * 70}>
            <GlassCard interactive className="group h-full p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-accent/20">
                <Icon name={promise.icon} className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-white">
                {promise.title}
              </h3>
              <p className="mt-2.5 text-body leading-relaxed text-mist-300">
                {promise.body}
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
