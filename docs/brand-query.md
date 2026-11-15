# The brand query problem

Why searching "sandpaper sites" returns Screwfix, and what actually moves
it. Measurements live in the session memory at
`google-visibility-baseline.md` — re-run those queries before concluding
anything from this document.

## Where it stands, 15 November 2026

| Query | Position |
|---|---|
| `sandpaper sites whitchurch` (Search) | 1st organic, 1st in the local pack |
| `sandpaper sites` (Maps, Whitchurch viewport) | 10th |
| `sandpaper sites` (Search, no location) | absent, no knowledge panel |

The first row is the one that says the work is landing. Google now resolves
the two words to this business the moment the query carries any local
context at all. What is left is the bare query, which is the hardest case
and always was.

## Why 10th on Maps and not 1st

Maps ranks on relevance, distance and prominence. Against the hardware
shops this business wins one of those three and loses the other two badly.

**Relevance** — an exact name match, which should be decisive and is not,
because Google is still splitting the query between two readings. One is
"the business called Sandpaper Sites". The other is "shops near me that
sell sandpaper". The second reading currently wins because far more people
have historically meant it.

**Distance** — a wash. Everything in that result set is within a few miles.

**Prominence** — this is the whole gap. Two reviews against Screwfix's 40,
Toolstation's 25, Home Bargains' 610. A profile created weeks ago against
national chains with decades of citations. Prominence is most of the
ranking weight in a competitive local set, and there is no configuration
change that substitutes for it.

So the position is not a misconfiguration and there is nothing on the
profile left to fix. It is a young, thinly-reviewed entity competing for a
phrase that describes a product sold by large retailers.

## What actually moves it, in order

**1. Reviews, with the name in the text.** The single biggest lever, and it
does double duty: prominence, plus every occurrence of "Sandpaper Sites"
written by a third party is evidence the phrase is a name. The constraint
is client volume, not asking technique — see `review-requests.md`.

**2. People searching the name and clicking the result.** Google learns
which reading of an ambiguous query is right from what people do with the
results. Every time someone searches "Sandpaper Sites" and clicks this
business, the brand reading gets a little stronger.

This is legitimately influenceable: **stop giving people the URL and start
telling them to search the name.** On the phone, on invoices, in the email
signature, on a business card, at the end of a job — "just search Sandpaper
Sites". Those are real people with a real reason to search, which is
exactly the signal Google wants.

What this is **not** is a licence to generate fake searches, buy clicks, or
run a bot. That is detectable, it is a guidelines violation, and the
downside is losing the profile that is finally starting to work.

**3. Brand-anchored links from real sites.** A "Site by Sandpaper Sites"
credit on every client build, as on danscafe.co.uk. Anchor text exactly
"Sandpaper Sites", nothing keyword-stuffed. Each one is another vote that
the phrase names a company. This compounds and costs nothing per job.

**4. Entity reconciliation across the listings.** The Bing Places, Apple
Business and Yell listings exist but their URLs are not in the site's
`sameAs` array — it currently carries LinkedIn and the Google profile only.
Adding them states that all four listings are one entity. Needs the three
URLs; see "Outstanding" below.

**5. Weekly posts and owner replies to reviews.** Activity signals. Cheap,
small, and they stop the profile looking abandoned. See `gbp-posts.md`.

## What does not work

**Renaming the profile.** "Sandpaper Sites — Web Design Whitchurch" would
help for about as long as it took to get reported. The name field must
match real-world signage. Suspension here would cost more than the
rankings are worth.

**More citations on small directories.** FreeIndex, Thomson Local, Cylex
and the rest were deliberately skipped, and that was the right call. They
are citation signals only, nobody uses them, and they are not what is
holding this back. Do not revisit unless everything above has been done and
stalled.

**Waiting for the bare national query.** `sandpaper sites` with no location
may never fully resolve, and chasing it is the wrong target. Nobody in
Shropshire searching for a web designer types it without context, and the
people who do type it want abrasive paper. The query that matters is the
one with a town in it, and that one is already won.

## Done

- Visible sitewide footer link, "Sandpaper Sites on Google", pointing at
  the profile — gives a crawler the association in plain words rather than
  only inside JSON-LD, and gives a visitor a route to the review box.
- `Organization` schema with `alternateName` covering the spellings, and
  the profile URL in `sameAs`.
- Review-request copy and timing in `review-requests.md`.
- Ten weeks of post copy in `gbp-posts.md`.

## Outstanding

- The Bing Places, Apple Business and Yell listing URLs, to add to
  `site.social` in `src/content/site.ts` so they flow into both `sameAs`
  arrays.
- A build credit on every new client site from here.
- Re-measure in early December, same queries, same method.
