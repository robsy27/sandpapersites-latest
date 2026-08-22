# Sandpaper Sites — Marketing Website

Next.js (App Router) + TypeScript + Tailwind CSS v4. Fully static — deploys to
Vercel or Netlify with no extra configuration.

## Running locally

```bash
npm run dev
```

Then open http://localhost:3000

Other scripts: `npm run build` (production build), `npm start` (serve that
build locally, useful for checking response headers), `npm run lint`.

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

## Contact form

The form posts to `src/app/api/contact/route.ts`, which validates server-side,
screens bots with a honeypot and a rate limit, then sends the enquiry through
Resend's REST API. **It needs two environment variables before any email is
actually delivered.**

Until they are set, the endpoint replies `503 not_configured` and the form
tells the visitor so, handing them a pre-filled email and the phone number —
an enquiry is never silently lost.

### Turning delivery on (about two minutes)

1. Sign up at [resend.com](https://resend.com) — the free tier is ample for a
   contact form. Sign up with the address you want enquiries to reach.
2. Create an API key.
3. Set both variables in Hostinger: hPanel → your site → Environment
   variables.

   ```
   RESEND_API_KEY=re_your_key_here
   CONTACT_TO_EMAIL=where-enquiries-should-land@example.com
   ```

4. Redeploy, then send yourself a test enquiry.

`CONTACT_TO_EMAIL` is an environment variable rather than a value in the code
so a personal address never appears in this public repository.

For local development, copy `.env.example` to `.env.local` and fill in the
same values. `.env*` is gitignored.

### Sending from your own domain

Until a domain is verified in Resend, mail goes out via their shared sender
and **only delivers to your own Resend account address** — fine to start with.
To send from your own domain, verify `sandpapersites.co.uk` in Resend, then
add:

```
CONTACT_FROM_EMAIL="Sandpaper Sites <contact@sandpapersites.co.uk>"
```

### Using a different provider

Only the `fetch` call in `route.ts` is Resend-specific. Swap that one request
for Formspree, Postmark, SendGrid or SMTP and nothing else changes.

## Booking link

`bookingUrl` in `src/content/site.ts` is `null` until you have a real booking
page. While it is null, every "Book a call" button routes to `/contact`
instead of a dead link.

Once you have one — Calendly, Cal.com, SavvyCal — set it:

```ts
bookingUrl: "https://calendly.com/your-handle/intro-call",
```

Bookings are notified to whichever inbox the booking account was created
with, so sign up with the address you want those notifications in. Setting a
URL also switches the buttons to open in a new tab automatically.

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

Hosted on **Hostinger**, which runs the Next.js app on Node and deploys
automatically on every push to `main`. Push, wait for the deploy, done.

### Caching — read this before debugging a "broken" deploy

Hostinger puts a CDN in front of the site. Next.js defaults prerendered pages
to `s-maxage=31536000`, which told that CDN to cache the HTML for **a year**.

That caused a real outage: after a deploy the CDN kept serving old HTML, which
referenced content-hashed asset filenames that no longer existed on the server.
The stylesheet 404'd and every page rendered completely unstyled.

`next.config.ts` now sets cache headers explicitly:

| Path | Cache-Control | Why |
|---|---|---|
| `/_next/static/*` | `max-age=31536000, immutable` | Filenames are content-hashed, so they can never go stale |
| everything else | `max-age=0, s-maxage=60, stale-while-revalidate=300` | CDN revalidates within a minute, so deploys go live |

If a deploy ever looks broken again, check this first:

```bash
curl -sI https://sandpapersites.co.uk/ | grep -iE 'age|cache-control|x-hcdn-cache'
```

An `age:` header with a large number means you are looking at a cached copy,
not the new deploy. Purge the CDN cache in hPanel (Websites → Performance /
CDN → Purge cache). Note this is a CDN cache, not a browser cache — incognito
will *not* work around it.

### Other hosts

Vercel and Netlify both detect Next.js automatically and need no configuration.
