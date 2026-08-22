/**
 * FAQs shown on the contact page.
 *
 * Ordered by what blocks an enquiry: what's required of the customer first,
 * then timescales, then money, then admin.
 *
 * NOTE: the instalment terms and the edit price examples below are drafts —
 * confirm they match what you actually offer before this goes in front of
 * anyone, since both are commitments.
 */

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "What do you actually need from me?",
    answer:
      "Less than you would think. Your logo if you have one, a handful of photos, and a rough idea of your services and prices. I write the words and send you a draft to correct — most people find that far easier than starting from a blank page. No logo or no photos is not a problem; just say so on the call and we will work around it.",
  },
  {
    question: "How long does a site take?",
    answer:
      "Two to three weeks for most builds, from the first call to going live. The main variable is how quickly you can get me your photos and content.",
  },
  {
    question: "How much do edits usually cost?",
    answer:
      "Most are £25 — changing prices, updating opening hours, swapping a photo, adding a staff member. Something larger, like a new page or a new section, is usually £60 to £120 depending on what is involved. Either way you get the exact figure before I start, and you are free to say no.",
  },
  {
    question: "Can I pay the build fee in instalments?",
    answer:
      "Yes. Half before I start and half when the site goes live, as standard. If that is still awkward for your cash flow, say so on the call — I would rather split it further than lose a good business over timing.",
  },
  {
    question: "What if I already have a domain?",
    answer:
      "Bring it with you. I will point it at the new site with no downtime, and it stays registered in your name throughout.",
  },
  {
    question: "Am I tied into a contract?",
    answer:
      "No. The monthly rolls on 30 days' notice. The domain is registered in your name and released to you whenever you ask, along with the copy and photos you supplied.",
  },
];
