import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { ImageBand } from "@/components/ui/ImageBand";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CollapsibleCard } from "@/components/ui/CollapsibleCard";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Sandpaper Sites exists: small local businesses deserve a professional website without agency prices or DIY builder frustration. Here’s the story.",
  alternates: { canonical: "/about" },
};

const principles: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "wallet",
    title: "Say the price out loud",
    body: "Every price is on the site. If you can’t tell what something costs before you contact someone, that’s usually deliberate — and it’s usually bad news for you.",
  },
  {
    icon: "user",
    title: "One person, start to finish",
    body: "You speak to the person who builds your site. Nothing gets lost in a handover, because there isn’t one.",
  },
  {
    icon: "refresh",
    title: "A site is not a one-off",
    body: "A website that’s three years out of date is worse than no website. So edits are priced honestly and quoted upfront — small enough that you actually send them, clear enough that you always know the cost first.",
  },
  {
    icon: "shield",
    title: "No lock-in on your domain",
    body: "The domain is registered in your name from the start and released whenever you ask, along with the words and photos you gave me. You are never stuck with me over paperwork.",
  },
];

const suitedTo = [
  "Trades — plumbers, electricians, builders, landscapers",
  "Food and drink — cafés, takeaways, small restaurants",
  "Health and beauty — salons, barbers, therapists, clinics",
  "Instructors and coaches — PTs, driving instructors, tutors",
  "Shops and studios with a local catchment",
  "Anyone currently relying on a Facebook page alone",
];

const notSuitedTo = [
  "Large e-commerce stores with thousands of products",
  "Venture-backed startups needing a full product team",
];

/** The "In short" summary, as collapsible cards. */
const inShort = [
  {
    term: "What I do",
    headline: "Build, host and maintain",
    detail:
      "Custom websites for small local businesses — designed, built, put online, and kept current afterwards. One person doing all four.",
  },
  {
    term: "Who for",
    headline: "Owner-operators",
    detail:
      "Businesses with no website at all, or one that\u2019s actively letting them down. Trades, cafés, salons, instructors, small shops.",
  },
  {
    term: "Typical build",
    headline: "Two to three weeks",
    detail:
      "From the first call to going live. The main variable is how quickly you can get me your photos and content.",
  },
  {
    term: "Pricing",
    headline: "From £495, then £25 a month",
    detail:
      "A one-off fee to build it, a small monthly to host and run it, and edits quoted per job so you only pay for what you actually need.",
  },
  {
    term: "Contract",
    headline: "None at all",
    detail:
      "The monthly rolls on 30 days\u2019 notice. The domain is registered in your name and released to you whenever you ask.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="I started this because the gap was obvious."
        lead="Small local businesses were being quoted thousands by agencies, or left wrestling with a website builder at 11pm. There was nothing sensible in between."
      />

      {/* Story */}
      <Section tone="deep">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="space-y-6 text-base leading-relaxed text-mist-300">
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                  The story
                </h2>
                <p>
                  I kept running into the same thing. A good local business — a
                  proper one, with skilled people and loyal customers — and a
                  website that either didn’t exist or actively worked against
                  them. A page that hadn’t been touched since 2016. A phone
                  number that no longer worked. A layout that fell apart on a
                  phone, which is where nearly everyone was looking at it.
                </p>
                <p>
                  When they’d looked into fixing it, they got one of two
                  answers. An agency quoted four or five figures and talked
                  about brand discovery workshops. Or they were pointed at a
                  drag-and-drop builder and told it was easy, which it is right
                  up until you need it to do something specific — and then
                  you’re spending your Sunday evening fighting a template
                  instead of running your business.
                </p>
                <p>
                  So {site.name} does the boring, useful thing in the middle. I
                  build you a proper custom site for a fair one-off fee. I host
                  it, secure it, back it up and keep it online. And when
                  something needs changing, you email me, I tell you exactly
                  what it costs, and it&rsquo;s live as soon as you say yes.
                </p>
                <p>
                  It’s deliberately unglamorous. There’s no account team, no
                  jargon and no upsell. Just a site that works, looked after by
                  someone you can actually reach.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="lg:sticky lg:top-28">
                <h2 className="mb-4 font-display text-lg font-bold text-white">
                  In short
                </h2>
                <div className="space-y-3">
                  {inShort.map((item, index) => (
                    <CollapsibleCard
                      key={item.term}
                      eyebrow={item.term}
                      title={item.headline}
                      /* First one open so the pattern is obvious */
                      defaultOpen={index === 0}
                    >
                      <p className="text-body leading-relaxed text-mist-300">
                        {item.detail}
                      </p>
                    </CollapsibleCard>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <ImageBand
        src="/images/device-laptop.jpg"
        alt="A laptop open on a table beside a coffee, looking out over a harbour through a rain-flecked window"
        eyebrow="How it works in practice"
        title="One person, one laptop, no agency."
        body="No account team, no studio overheads, no layers between you and whoever is actually doing the work. That is why it costs what it costs."
        align="center"
      />

      {/* Principles */}
      <Section tone="navy">
        <SectionHeading
          eyebrow="How I work"
          title="Four things I won’t budge on."
        />

        <ul className="mt-10 grid gap-x-10 gap-y-11 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <Reveal as="li" key={principle.title} delay={(index % 2) * 70}>
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-navy-800 text-accent ring-1 ring-navy-700">
                <Icon name={principle.icon} className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-white">
                {principle.title}
              </h3>
              <p className="mt-2.5 text-body leading-relaxed text-mist-300">
                {principle.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Fit */}
      <Section tone="light">
        <SectionHeading
          tone="light"
          eyebrow="Who it’s for"
          title="A good fit — and an honest word on when it isn’t."
          lead="I’d rather tell you up front that I’m the wrong choice than take the work and disappoint you."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-7 sm:p-8">
              <h3 className="font-display text-lg font-bold text-navy-900">
                Built for
              </h3>
              <ul className="mt-6 space-y-3.5">
                {suitedTo.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-body leading-relaxed text-navy-900/85"
                  >
                    <Icon
                      name="check"
                      className="mt-1 size-3.5 shrink-0 text-accent-ink"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div className="h-full rounded-2xl border border-navy-900/10 bg-mist-50 p-7 sm:p-8">
              <h3 className="font-display text-lg font-bold text-navy-900">
                Probably not the right fit
              </h3>
              <ul className="mt-6 space-y-3.5">
                {notSuitedTo.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-body leading-relaxed text-mist-700"
                  >
                    <Icon
                      name="close"
                      className="mt-1 size-3.5 shrink-0 text-mist-700"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-body leading-relaxed text-mist-700">
                If that’s you, say hello anyway — I’ll happily point you toward
                someone better suited.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <FinalCta
        title="Fancy a straightforward conversation?"
        lead="Thirty minutes, no pitch. You describe the business, I tell you what I’d build and what it would cost."
      />
    </>
  );
}
