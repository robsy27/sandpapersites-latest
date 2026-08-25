/**
 * FAQs shown on the contact page.
 *
 * Ordered by what blocks an enquiry: what's required of the customer first,
 * then timescales, then money, then admin.
 *
 * NOTE: the edit price examples below are drafts — confirm they match what
 * you actually offer before this goes in front of anyone, since they are a
 * commitment. The build fee is payable in full upfront, matching Section 2
 * of public/terms.html; keep the two in step if either changes.
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
    question: "When do I pay the build fee?",
    answer:
      "In full before I start. You get the exact figure on the first call and it does not move, so there is nothing left to settle once the site goes live. The monthly hosting fee only begins when you are live.",
  },
  {
    question: "What if I already have a domain?",
    answer:
      "Bring it with you. I will point it at the new site with no downtime, and it stays registered in your name throughout.",
  },
  {
    question: "Am I tied into a contract?",
    answer:
      "No. The monthly rolls on 30 days' notice. There is nothing to get out of and no cancellation fee.",
  },
  {
    question: "What happens if I want to leave?",
    answer:
      "The domain is registered in your name, so it transfers to you — no fee, no argument — and the words and photos you supplied are yours. Being straight with you about the rest: the site is built to run on my hosting, so taking it with you means having your own hosting set up and someone able to upload and manage the files. Most small businesses would rather not deal with that, which is exactly why hosting is part of the service. But you are never held here by paperwork.",
  },
];
