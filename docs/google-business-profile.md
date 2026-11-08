# Google Business Profile

Everything that goes on the Sandpaper Sites profile, so it is written once
and stays consistent with the site.

Profile: https://maps.google.com/?cid=4613831360892109151
Place ID: `ChIJbZxV-DKTekgRXwGIdy2fB0A`
Managed by: tomrobinson2727@gmail.com (not the main account)

## Review link

Send this to a client who has agreed to leave a review. It opens the review
box directly rather than making them find the profile first.

```
https://g.page/r/CV8BiHctnwdAEBM/review
```

Google's own short link, taken from "Ask for reviews" in the profile
manager. It looks less like a phishing link in a text message than the long
form, which also works:
`https://search.google.com/local/writereview?placeid=ChIJbZxV-DKTekgRXwGIdy2fB0A`

Never offer anything in exchange for a review — a discount, a free month,
anything. Google removes incentivised reviews and can suspend the profile.
Asking is fine; paying for it is not.

## Description

750 characters maximum. This is the version to use:

> Sandpaper Sites builds, hosts and looks after websites for small
> businesses in Shropshire and Cheshire.
>
> One person from start to finish, so you deal with whoever built your site
> rather than a support queue. A one-off build fee from £495, hosting from
> £25 a month, and any edits quoted before the work starts — no retainers,
> no surprise invoices.
>
> Every site is custom-built, loads fast on a phone, and is set up to be
> found when someone searches your trade and your town. Cafés, trades,
> salons, garages, instructors — if people find you by searching, that is
> the whole job.
>
> Based in Whitchurch, working across Shropshire and Cheshire.

**Why the UK was dropped.** The old description said "Shropshire, Cheshire &
The United kingdom" — which carried a typo, and worked against itself. The
site's structured data still claims the whole UK, and should: it stops
Google concluding the business refuses work elsewhere. But a profile
description is read by people, and a one-man business claiming national
coverage reads worse than one that is plainly, specifically local. The local
claim is the one that wins work here.

## Services

Custom services under the Website Designer category. Each can carry a
description of up to 300 characters.

| Service | Description |
|---|---|
| Website design | Custom design, not a template. Built around what the business actually does and who it is trying to reach. |
| Website build | A complete site, built and launched for a one-off fee from £495. |
| Website hosting | Fast, secure hosting from £25 a month, including the SSL certificate, backups and updates. |
| Website maintenance | Ongoing updates and fixes, quoted before any work starts. |
| Website redesign | Rebuilding a site that is slow, dated or unusable on a phone. |
| Mobile-first design | Designed for a phone first, because that is where most local searches happen. |
| Local SEO setup | The groundwork that gets a business found when someone searches a trade and a town. |
| Google Business Profile setup | Setting up and filling out the profile that puts a business on the map. |
| Domain and email setup | Registering a domain and setting up a professional email address on it. |
| Online ordering setup | Order-ahead and collection, as built for Dan's Cafe. |

## Questions and answers

The owner can post a question and answer it. These seed the section and
catch the questions prospects actually ask.

**Not posted — the feature is not available on this profile.** There is no
"Ask a question" control on the Maps listing or the Search panel, signed in
as owner or signed out. Google has been retiring Q&A from Business
Profiles. Kept here in case it returns, in the order to post them, price
last. Note that Google decides display order itself (most upvoted, then
most recent), so posting order would only ever be a nudge.

Most of this is already answered on the site with FAQPage markup, in
`src/content/faqs.ts`. "Can you update my existing site instead of building
a new one?" was the one real gap and has been added there.

**How long does it take?**
Usually two to three weeks from the first conversation to going live. The
part that sets the pace is photos and wording, not the build.

**Do you work outside Whitchurch?**
Yes — across Shropshire and Cheshire, and further where it suits. Most of
the work happens remotely, and I will come out to you locally.

**Can you update my existing website instead of building a new one?**
Sometimes, depending on how it was built. Worth a conversation either way —
if updating it is the better value, I will say so.

**What happens if I need something changed later?**
Send it over and I will quote it before doing anything. You deal with the
person who built the site, not a ticket queue.

**How much does a website cost?**
A one-off build fee from £495, then hosting from £25 a month. Hosting covers
the SSL certificate, backups and updates. Anything you want changed after
launch is quoted before the work starts, so there is never a surprise bill.

## Photos

Upload set lives in `images/gbp/`. Google accepts JPG and PNG only — not
WebP — and caps each file at 5MB.

| File | Slot |
|---|---|
| `01-logo-square-1024.png` | Logo |
| `02-cover-1920x1080.png` | Cover |
| `03-team-tom-robinson-768.jpg` | Team |
| `04-work-sandpapersites-2880x2160.jpg` | At work |
| `05-work-danscafe-2880x1780.jpg` | At work |
| `06-identity-lockup-2400x1350.png` | Identity |

Still missing, in order of what they would add:

1. **Tom working in Dan's Cafe.** The one photo that proves a real local
   person. Ask Dan.
2. **More client work**, as each site launches.

Geotagging photos does nothing — Google strips EXIF on upload. Ignore any
advice that says otherwise.

## The street address

**Still published**, and it is a home address: 1 Meadow View Rd, Whitchurch
SY13 1JT, with a map pin on the house and a Street View thumbnail. The
site's structured data deliberately omits it; the profile does not.

Hiding it switches the profile to a service-area business, which is the
correct shape for one that travels to clients, and lets the Shropshire and
Cheshire service areas surface. The risk is that an address change can
trigger re-verification, usually by postcard, during which the profile can
drop out of results.

**Decision, 8 November 2026: leave it published.** The profile is newly
built up and has no reviews yet; a verification wobble now would cost more
than the address exposure. Revisit once there are reviews banked and the
profile has something holding it up. Do not re-raise before then.

## Baseline, 8 November 2026

Recorded so later changes can be measured against something.

- **3 profile interactions** across Sept–Nov 2026
- **0 reviews**
- Ranked 4th for "web designer Whitchurch Shropshire" (2nd excluding ads).
  The business directly above, Blaidd Software, had two reviews.
- Not in the top 10 around Nantwich, where every result was rated 5.0 with
  10 to 33 reviews.

## Posting

A short update every two to four weeks is enough. A launched site, a before
and after, a note about a town. Posts expire from the main view after six
months, so this is maintenance rather than a campaign.
