# Jobs Done Labs — fractional AI consulting offer

Source: RW-71 "[VISION] Free funnel strategy: makeitryne.ai → JobsDoneLabs consulting"
(Ryne, July 30 2026). This is the pricing architecture and the reasoning behind it.
Prices themselves live in code at `artifacts/landing-page/src/lib/engagements.ts` —
change them there, not here, and this doc stays the "why".

## The funnel this offer sits in

| Stage | Property | Job |
|---|---|---|
| Top | makeitryne.ai | Free AI builds, prompts, newsletter. Proof of capability. "If the free stuff is this good…" |
| Middle | Email nurture | Show the operator's version of the same work — agents doing real jobs in real companies |
| Bottom | jobsdonelabs.ai | Book Ryne as a fractional AI CTO / coach |

The free tools are the demo. This page is the ask. So the site's job changed:
it used to sell a 90-day automation *project*, and now it has to sell a *seat* —
a technology leader who stays.

## Positioning

Ryne is not a developer for hire. He is a CTO who runs a portfolio of real
businesses — a logistics group, a software lab — where AI agents do production
work every day. The offer sells that: **hire the AI leader you can't justify
hiring full time.** Transformation, not technical help.

The competitor set is therefore no longer "agency vs freelancer." It is
"full-time AI hire vs fractional." That reframe is on the site in two places:
the home comparison table and the honest-math table on `/pricing`.

## The ladder

    Free tools (makeitryne.ai)
      → Free 45-min call
        → AI Operating Blueprint — $7,500, 2 weeks, credited back
          → Retainer (Coach / Fractional CTO / Embedded Division)
            → Agent Fleet Care — $2,500/mo, or handover

Nobody signs a retainer off a first call. The Blueprint is the bridge: it's paid,
so it filters, but it's credited back, so it doesn't feel like a toll. It also
ships one working agent, which is the single strongest proof we can put in front
of an operator in two weeks.

## Tiers

| | Coach | **Fractional AI CTO** | Embedded AI Division |
|---|---|---|---|
| Price | $4,500/mo | **$12,000/mo** | from $25,000/mo |
| Term | 3-month min | **6-month min** | 12-month, 2 seats/yr |
| Who builds | Their team | **Ryne + agent fleet** | Ryne + fleet + their AI team |
| Fits | $1M–$5M, someone in-house who can build | **$3M–$25M, needs systems live this quarter** | $10M+ or multi-entity |
| Guarantee | — | **$30K / 90 days** | $30K / 90 days |

**Why these numbers.**

- **$12,000/mo is the anchor** and the tier the page pushes. Six months is $72K,
  which lands inside the $50K–$120K range JDL already quotes for project work —
  so it isn't a price increase, it's the same money on a structure that keeps
  Ryne in the business. Against a full-time AI-fluent leader at $220K–$300K plus
  equity, $144K/yr with a fleet that already builds is the easy comparison.
- **$4,500/mo for Coaching** is deliberately below the level where an operator
  needs a board conversation. It exists to catch the $1M–$5M segment that can't
  clear $12K but has hands in-house — and to create an upgrade path. Coaching does
  **not** carry the guarantee: we're not holding the keyboard, so we can't own the
  number. Saying that out loud makes the guarantee more credible everywhere else.
- **$25,000/mo** is the CTO-of-record tier, capped at two seats a year because it
  is genuinely capacity-bound. The $18K + equity/profit-share alternative is there
  for the operator who'd rather align than pay — it's not a discount, it's a
  different bet.
- **Retainer, never hourly.** Hourly billing caps the upside at Ryne's calendar
  and invites scope arguments. Six pricing principles are published on the page
  precisely because consulting has a trust problem; publishing the rules is cheap
  and it disarms the objection before the call.

**Add-ons:** AI Enablement Workshop $5,000/day · Extra Build Sprint $8,500 ·
Agent Fleet Care $2,500/mo. Fleet Care is the retention play — it's what a
finished CTO engagement downgrades into instead of churning to zero.

## What changed on the site

- **New `/pricing` page** (`src/pages/Pricing.tsx`, routed in `App.tsx`) — hero,
  the four-step path, Blueprint band, three tier cards, inclusion matrix,
  fractional-vs-full-time-hire math, add-ons, six pricing principles, pricing FAQ,
  CTA. Client-routed; SPA fallback in `server.mjs` already serves it.
- **Home page** (`src/pages/Home.tsx`):
  - "Engagements" band with the three tiers, linking to `/pricing`
  - Nav gains "Engagements"; trimmed to seven items so it stops colliding with the
    wordmark (Results and FAQ moved to the mobile menu only)
  - Hero gains a secondary "See engagements & pricing" CTA and a fractional-AI-CTO line
  - "Your fractional systems operator" → "Your fractional AI CTO", rewritten to sell the seat
  - Comparison table: "In-house hire" → "Full-time AI hire"; the old
    "No long-term retainer" row (which now contradicts the model) replaced with
    "One fixed monthly fee — never hourly", plus a CTO-level-strategy row
  - FAQ: real prices in "What does it cost?", a new "Why a retainer instead of a
    one-off project?", and the agency answer rewritten around the hire comparison
  - Footer: "Engagements & pricing" and a link out to makeitryne.ai
- **`public/sitemap.xml`**: `/pricing` added at priority 0.95.

## Decisions taken (2026-07-30, RW-74)

1. **The $30K guarantee stays**, scoped to the Fractional AI CTO tier and above.
   Retiring it would have invalidated the hero, the VSL, the OG images and most
   of the published blog library, for no offsetting gain. The scope is now stated
   wherever the guarantee appears: the home guarantee band links to `/pricing`
   and says Coaching can't carry it, and the same line is in the pricing FAQ and
   in the home page's crawler fallback and FAQ schema. The "no long-term
   retainers" guarantee bullet — which flatly contradicted the model — is gone.
2. **The pilot-program section is retired.** In its place is an availability
   band: Coaching and Fractional CTO are open, the Embedded Division is two seats
   a year. That reads as capacity, not as a founding cohort waiting on Q4 case
   studies, and it sells the top tier instead of apologising for having no
   testimonials.
3. **Both the free call and the Blueprint stay.** The free 45-minute call remains
   the front door — it's what every CTA and every blog post already points at, and
   the funnel from makeitryne.ai needs a $0 first step. The Blueprint is the paid
   bridge behind it. Revisit only if inbound volume outgrows Ryne's calendar; the
   change would then be a copy edit, not a rebuild.
4. **`/pricing/` is pre-rendered, in two layers.** Production serves files out
   of `public/` as soon as they land, but anything under `dist/` only changes when
   the app is rebuilt and republished — so a single layer would have left the
   sitemap advertising a URL that served the home page shell.
   - `scripts/src/gen-pricing-page.ts` writes a self-contained
     `public/pricing/index.html` (no bundle, no JS) and runs from
     `post-merge.sh`, so it is live the moment a push lands.
   - `prerender/pricing.ts` runs as a Vite plugin after the bundle is written and
     overwrites `dist/public/pricing/index.html` with the built shell — same
     metadata, but the `#root` crawler fallback is the pricing copy and React
     takes over on mount. That one wins after the next publish.

   Both carry the pricing title, description, canonical, OG/Twitter tags and
   Service + BreadcrumbList + FAQPage structured data, and both are generated
   from `engagements.ts`. Canonical is `/pricing/` with the trailing slash — that
   is what the directory actually serves and what `update-sitemap` derives, so
   the two don't fight and produce a duplicate entry. The client router answers
   on both spellings.
5. **CTAs carry a tier.** `BookingModal` takes a `BookingIntent` and passes it to
   the GHL calendar as UTM params (`utm_content` = the tier or CTA that was
   clicked, `utm_medium` = home or pricing page). A click on the $25K tier and a
   click in the footer no longer look identical in the CRM.

## Still open

- **Published content still quotes the old offer.** The blog library and
  `llms-full.txt` carry "$50K to $120K" project pricing and "no retainer" in
  places. The home page, `/pricing`, `index.html`'s crawler fallback and
  `llms.txt` are updated; the ~50 blog posts are not. They're jd4's territory and
  a bulk rewrite there is its own job.
- **GHL side of the intake.** The UTM params are being sent; someone still has to
  confirm the calendar stores them on the contact and build the view that makes
  them useful. Tier-specific intake questions would be better still.
- **Nothing pins the Embedded Division seat count.** The site says two seats a
  year. If one gets taken, the copy in `SEAT_AVAILABILITY` (Home.tsx) is where to
  say so.
