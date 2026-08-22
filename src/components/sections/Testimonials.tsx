import { hasRealTestimonials, testimonials } from "@/content/testimonials";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Static grid rather than an auto-rotating carousel — nothing to pause,
 * nothing that moves under a screen reader, everything keyboard-reachable.
 */
export function Testimonials() {
  return (
    <Section id="testimonials" tone="deep">
      <SectionHeading
        eyebrow={hasRealTestimonials ? "Client feedback" : "Coming soon"}
        title={
          hasRealTestimonials
            ? "What local businesses say"
            : "Real client feedback lands here"
        }
        lead={
          hasRealTestimonials
            ? "A few words from the people whose sites I look after."
            : "These are placeholders while the first sites go live. Rather than invent quotes, I’d rather leave the space honest until there are real ones to put in it."
        }
      />

      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal as="li" key={index} delay={index * 70}>
            <Card className="flex h-full flex-col">
              <Icon name="quote" className="size-7 text-accent/40" />
              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-mist-300">
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
                  <span className="block truncate text-xs text-mist-400">
                    {testimonial.role}
                  </span>
                </span>
              </figcaption>
              {testimonial.placeholder && (
                <p className="mt-4 text-xs font-medium tracking-wide text-mist-400/70 uppercase">
                  Placeholder
                </p>
              )}
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
