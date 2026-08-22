import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";

const reasons: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "user",
    title: "You deal with me, directly",
    body: "No account managers, no ticket queues, no being passed between departments. One person builds your site and one person looks after it.",
  },
  {
    icon: "wallet",
    title: "Pricing you can actually plan around",
    body: "A fixed build fee and a small monthly cost. No hourly billing, no surprise invoices, no charges for changing a phone number.",
  },
  {
    icon: "layers",
    title: "Built for you, not from a template",
    body: "Your site is designed around your trade, your customers and the way you actually get work — not a stock theme with your logo dropped in.",
  },
  {
    icon: "clock",
    title: "Edits priced before they happen",
    body: "Prices changed? Closed for a bank holiday? Email me, I quote the exact job, and it goes live once you say yes. No open-ended retainer, no surprise invoice.",
  },
  {
    icon: "search",
    title: "Findable by local customers",
    body: "Proper page titles, structured data and Google Business Profile setup, so when someone searches your trade and your town, you’re there.",
  },
  {
    icon: "shield",
    title: "Nothing left for you to manage",
    body: "Hosting, SSL, domain renewals, backups and updates all handled. You’ll never log into a control panel or get a certificate warning.",
  },
];

export function WhyChooseUs() {
  return (
    <Section id="why" tone="navy">
      <SectionHeading
        eyebrow="Why Sandpaper"
        title="Agency quality. Sole-trader overheads."
        lead="Big agencies charge thousands and put a junior on your account. DIY builders leave you doing the work. This sits in the gap between them."
      />

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <Reveal as="li" key={reason.title} delay={(index % 3) * 70}>
            <GlassCard interactive className="group h-full p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-accent/20">
                <Icon name={reason.icon} className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-white">
                {reason.title}
              </h3>
              <p className="mt-2.5 text-body leading-relaxed text-mist-300">
                {reason.body}
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
