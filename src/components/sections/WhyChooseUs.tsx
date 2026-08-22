import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

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
    title: "Edits done the same day",
    body: "Prices changed? Closed for a bank holiday? Email me and it’s live. Unlimited small edits are part of the monthly, not an extra.",
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
        eyebrow="Why Sandpiper"
        title="Agency quality. Sole-trader overheads."
        lead="Big agencies charge thousands and put a junior on your account. DIY builders leave you doing the work. This sits in the gap between them."
      />

      <ul className="mt-14 grid gap-x-10 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <Reveal as="li" key={reason.title} delay={(index % 3) * 70}>
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-navy-800 text-accent ring-1 ring-navy-700">
              <Icon name={reason.icon} className="size-5" />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold text-white">
              {reason.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-mist-400">
              {reason.body}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
