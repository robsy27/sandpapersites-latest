# Sandpiper Sites — Marketing Website

Next.js (App Router) + TypeScript + Tailwind CSS v4. Fully static — deploys to
Vercel or Netlify with no extra configuration.

## Running locally

```bash
npm run dev
```

Then open http://localhost:3000

Other scripts: `npm run build` (production build), `npm start` (serve the build),
`npm run lint`.

## Where to edit content

All copy, pricing and data live in `src/content/` — you shouldn't need to touch
component code to change what the site says.

| File | Controls |
|---|---|
| `src/content/site.ts` | Business name, email, phone, booking link, nav items, SEO description |
| `src/content/services.ts` | The build / host / edit package and "included as standard" items |
| `src/content/pricing.ts` | Plan names, build fees, monthly fees, feature lists, small print |
| `src/content/testimonials.ts` | Testimonial quotes (see note below) |
| `src/content/portfolio.ts` | Portfolio tiles on the Work page |

### Before launch

1. **`src/content/site.ts`** — set the real `url`, `email`, `phone` and
   `bookingUrl` (your Calendly / Cal.com link). `url` feeds the canonical tags,
   sitemap and Open Graph data.
2. **Testimonials** — `src/content/testimonials.ts` ships with clearly-labelled
   placeholders. Replace them with real, attributable quotes and set
   `placeholder: false`. Until then the section says so honestly on the page.
3. **Portfolio** — add screenshots to `public/work/` and set `image` (and
   optionally `url`) on entries in `src/content/portfolio.ts`.
4. **Contact form** — currently frontend-only. See below.

## Wiring up the contact form

The form validates, shows errors and renders a success state, but doesn't send
anywhere yet. In `src/components/sections/ContactForm.tsx`, replace the
`submitEnquiry` function with a real request:

```ts
async function submitEnquiry(values: Values): Promise<void> {
  const res = await fetch("https://formspree.io/f/YOUR_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  if (!res.ok) throw new Error("Submission failed");
}
```

Throwing makes the form show its error state; resolving shows the success state.
Nothing else needs changing.

## Project structure

```
src/
  app/                 Routes (App Router)
    layout.tsx         Fonts, metadata, header/footer, skip link
    globals.css        Design tokens (@theme) and base styles
    page.tsx           Home
    services|work|about|contact/page.tsx
    sitemap.ts         Auto-generated sitemap
    robots.ts          Auto-generated robots.txt
  components/
    layout/            Header (with mobile menu), Footer, Logo, JSON-LD
    sections/          Page sections — Hero, PricingTeaser, ContactForm, …
    ui/                Primitives — Button, Card, Section, Icon, Reveal
  content/             All editable copy and data
  lib/cn.ts            Class-name helper
```

## Design system

Defined once as CSS variables in `src/app/globals.css` under `@theme`, which
makes them available as Tailwind utilities (`bg-navy-900`, `text-accent`, …).

- **Navy** `navy-950 / 900 / 800 / 700` — brand background and surfaces
- **Cool greys** `mist-50 → mist-600` — section breaks and body text
- **Teal accent** `accent` (#2DD4BF) for dark backgrounds; `accent-ink`
  (#0F766E) for accent-coloured *text on light backgrounds* — the bright teal
  doesn't meet contrast requirements there
- **Type** — Space Grotesk for headings (`font-display`), Inter for body
  (`font-sans`), both via `next/font`

Accent is deliberately reserved for CTAs and highlights.

## Accessibility notes

Worth preserving if you edit the components:

- Skip link, visible focus rings, and a header offset so sticky UI never hides
  the focused element
- Mobile menu traps focus, closes on Escape, and returns focus to its toggle
- Form has visible labels, validates on blur, links errors with
  `aria-describedby`, and focuses an error summary after a failed submit
- All animation respects `prefers-reduced-motion`; with JavaScript disabled the
  scroll-reveal content renders normally rather than staying hidden

## Deploying

**Vercel** — import the repo; no configuration needed.

**Netlify** — build command `npm run build`, and install
`@netlify/plugin-nextjs` (Netlify usually adds it automatically).
