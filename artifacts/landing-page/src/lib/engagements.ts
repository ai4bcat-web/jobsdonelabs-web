/**
 * Jobs Done Labs — fractional AI consulting offer.
 *
 * Single source of truth for engagement tiers, add-ons, and pricing principles.
 * Consumed by the /pricing page and the pricing preview band on the home page,
 * so a price only ever has to change in one place.
 *
 * Positioning: Ryne is a CTO who runs a portfolio of real businesses on AI
 * agents. These are retainers for that seat — not hourly work, not deliverables.
 */

export interface Tier {
  id: string;
  /** Card eyebrow — who this is for, in four words or less */
  eyebrow: string;
  name: string;
  price: string;
  /** Billing cadence shown next to the price */
  cadence: string;
  /** Minimum commitment, shown under the price */
  term: string;
  /** The transformation this tier sells — one sentence, no feature-speak */
  promise: string;
  /** Who it fits, in the operator's own language */
  fit: string;
  includes: string[];
  /** Renders the card in the accent treatment */
  featured?: boolean;
  cta: string;
}

/** Paid diagnostic. The on-ramp from the free call into any retainer. */
export const BLUEPRINT: Tier = {
  id: "blueprint",
  eyebrow: "Start here",
  name: "AI Operating Blueprint",
  price: "$7,500",
  cadence: "one-time",
  term: "2 weeks · credited back",
  promise:
    "Walk out knowing exactly which parts of your business an AI agent should be running, what each one is worth, and in what order to build them.",
  fit: "Every engagement starts here unless we've already worked together.",
  includes: [
    "Full operations and data map — where work actually happens, and where it stalls",
    "Agent opportunity inventory, ranked by annual dollar impact",
    "90-day build sequence with projected return per system",
    "One working agent shipped inside the two weeks — proof, not slides",
    "Executive readout plus a recorded walkthrough your team keeps",
    "100% credited toward any retainer started within 30 days",
  ],
  cta: "Book the blueprint call",
};

export const TIERS: Tier[] = [
  {
    id: "coach",
    eyebrow: "You build",
    name: "Fractional AI Coach",
    price: "$4,500",
    cadence: "/month",
    term: "3-month minimum",
    promise:
      "Your team stops guessing at AI and starts shipping agents that hold up in production — with an operator checking the work.",
    fit: "$1M–$5M operators with someone in-house who can build (ops lead, RevOps, junior dev).",
    includes: [
      "Two 90-minute working sessions a month with Ryne — hands on your systems",
      "Async access by Slack and Loom, answered within one business day",
      "Architecture review on every agent before it touches live data",
      "The Jobs Done Labs playbook library — agent patterns, prompts, guardrails",
      "Quarterly roadmap reset against your numbers",
      "Tooling and vendor decisions made for you, not researched by you",
    ],
    cta: "Apply for coaching",
  },
  {
    id: "cto",
    eyebrow: "We build",
    name: "Fractional AI CTO",
    price: "$12,000",
    cadence: "/month",
    term: "6-month minimum",
    promise:
      "You get the technology leader you can't justify hiring — and the agent fleet that does the work while you run the business.",
    fit: "$3M–$25M operators who need systems live this quarter, not a hiring search.",
    includes: [
      "Ryne owns your AI roadmap end to end — strategy, build, and the number it moves",
      "Two production agent systems live per quarter, built against your real data",
      "Weekly executive session, plus async access all week",
      "Live profit and operations dashboard so you can see the systems working",
      "Security, data hygiene, and model decisions handled",
      "Your team trained to run everything after we're done",
      "Backed by the $30K / 90-day profit recovery guarantee",
    ],
    featured: true,
    cta: "Book a fit call",
  },
  {
    id: "partner",
    eyebrow: "We run it with you",
    name: "Embedded AI Division",
    price: "From $25,000",
    cadence: "/month",
    term: "12-month term · 2 seats a year",
    promise:
      "An AI-native operating division inside your company, with a CTO of record accountable to the board for what it returns.",
    fit: "$10M+ operators or multi-entity portfolios where the whole org has to change, not one department.",
    includes: [
      "CTO of record — board and executive reporting on the AI P&L",
      "A dedicated agent fleet running daily work across departments, under SLA",
      "24/7 monitoring and on-call for every production agent",
      "Org design and hiring for the AI-native team that outlives the engagement",
      "Quarterly on-site with your leadership team",
      "Alternative structure available: $18K/month plus equity or a share of documented profit",
    ],
    cta: "Request an intro call",
  },
];

/** The four steps from first contact to handover, shown on /pricing. */
export const LADDER: { step: string; label: string; body: string }[] = [
  { step: "01", label: "Free call",  body: "45 minutes. We map where the money leaks and whether the math works. You keep the map either way." },
  { step: "02", label: "Blueprint",  body: "Two paid weeks. Full ops map, ranked agent opportunities, and one agent shipped. Credited back if you continue." },
  { step: "03", label: "Retainer",   body: "Coaching, Fractional CTO, or an embedded division — whichever matches who's holding the keyboard." },
  { step: "04", label: "Handover",   body: "Your team runs the fleet. Keep us on Fleet Care if you'd rather we watched it." },
];

/** The comparison that reframes the competitor set as "hire vs fractional". */
export const VS_HIRE: { label: string; hire: string; jdl: string }[] = [
  { label: "Annual cost",                 hire: "$220K–$300K + equity",          jdl: "$144K, all in" },
  { label: "Time to productive",          hire: "4–7 months to hire and ramp",   jdl: "First system live in ~3 weeks" },
  { label: "Who does the building",       hire: "You hire builders under them",  jdl: "An agent fleet that's already running" },
  { label: "If it isn't working",         hire: "Severance conversation",        jdl: "End of term" },
  { label: "Track record you're buying",  hire: "A résumé",                      jdl: "A portfolio of businesses run this way" },
];

export const ADD_ONS = [
  {
    name: "AI Enablement Workshop",
    price: "$5,000 / day",
    body: "A full day with your team — on-site or remote, up to 15 people. They leave having built and shipped something real, not having watched a deck.",
  },
  {
    name: "Extra Build Sprint",
    price: "$8,500 / sprint",
    body: "Two focused weeks to ship one more system outside the quarterly plan. Available inside any retainer when something urgent jumps the queue.",
  },
  {
    name: "Agent Fleet Care",
    price: "$2,500 / month",
    body: "Monitoring, maintenance, model upgrades, and on-call for the systems we built — for operators who want the fleet watched after the engagement ends.",
  },
];

export const PRINCIPLES: { title: string; body: string }[] = [
  {
    title: "Retainers, never hours",
    body: "You're buying a standing seat and an outcome, not a timesheet. No hourly rates, no billable-minute games, no invoice surprises.",
  },
  {
    title: "Minimum terms, on purpose",
    body: "Nothing worth calling transformation happens in 30 days. The minimums exist so the work gets far enough to pay for itself.",
  },
  {
    title: "The diagnostic pays for itself",
    body: "The Blueprint fee comes straight off your first retainer invoice if you start within 30 days. You're not paying twice to get started.",
  },
  {
    title: "You own everything",
    body: "Code, agents, prompts, dashboards, documentation — yours outright, on day one and after we're gone. No rented IP, no license that expires.",
  },
  {
    title: "Priced against a return",
    body: "If we can't see a credible path to three to five times the retainer, we'll tell you and we won't take the engagement.",
  },
  {
    title: "One price, all in",
    body: "No per-seat, per-agent, or per-integration fees. Third-party model and API usage is billed through at cost, with the estimate given up front.",
  },
];

/** Rows for the what-you-get-by-tier comparison table on /pricing. */
export const MATRIX: { feature: string; coach: boolean; cto: boolean; partner: boolean }[] = [
  { feature: "Direct access to Ryne",                     coach: true,  cto: true,  partner: true  },
  { feature: "AI roadmap owned and maintained for you",   coach: false, cto: true,  partner: true  },
  { feature: "We do the building",                        coach: false, cto: true,  partner: true  },
  { feature: "Production agents live every quarter",      coach: false, cto: true,  partner: true  },
  { feature: "Live profit & operations dashboard",        coach: false, cto: true,  partner: true  },
  { feature: "$30K / 90-day recovery guarantee",          coach: false, cto: true,  partner: true  },
  { feature: "24/7 monitoring and on-call",               coach: false, cto: false, partner: true  },
  { feature: "Board and executive reporting",             coach: false, cto: false, partner: true  },
  { feature: "Org design and AI hiring",                  coach: false, cto: false, partner: true  },
  { feature: "You own every system outright",             coach: true,  cto: true,  partner: true  },
];

export const PRICING_FAQ: { q: string; a: string }[] = [
  {
    q: "Why a retainer instead of a fixed project?",
    a: "Because the first build is never the whole job. Agents meet your real data, your team's habits shift, and the highest-value system is usually the one you discover in month two. A retainer buys the seat that keeps adapting — projects buy a deliverable and then leave. You still get a fixed monthly number, so it's predictable either way.",
  },
  {
    q: "How is this different from hiring someone full time?",
    a: "A capable AI-fluent technology leader costs $220K–$300K a year plus equity, and you'd still be hiring the builders under them. The CTO tier is $144K a year for the same decision-making, plus an agent fleet that does the building. And you can stop at the end of a term without a severance conversation.",
  },
  {
    q: "What's the real difference between Coaching and the CTO tier?",
    a: "Who holds the keyboard. In Coaching, your team builds and Ryne makes sure they're building the right thing the right way. In the CTO tier, Ryne and his agent fleet build it, and he's accountable for the number it moves. If you don't have someone in-house who can build, Coaching will frustrate you — start at CTO.",
  },
  {
    q: "Does the $30K guarantee apply to every tier?",
    a: "It applies to the Fractional AI CTO tier and above, because those are the tiers where we control the execution. Coaching can't carry it — we're not the ones building. The Blueprint is fixed-fee and credited back, so there's nothing to guarantee.",
  },
  {
    q: "Can I start with the Blueprint and stop there?",
    a: "Yes, and some operators should. You keep the map, the ranked opportunity list, the 90-day sequence, and the agent we shipped during the sprint. If your team can run it from there, run it. The credit is there if you'd rather we did.",
  },
  {
    q: "What if I need to change tiers mid-engagement?",
    a: "Move up at any time — the difference is prorated from that month. Moving down happens at the end of your minimum term. Most operators start at CTO for two quarters to get the systems live, then drop to Coaching or Fleet Care to keep them running.",
  },
  {
    q: "Do you take equity instead of cash?",
    a: "Only at the Embedded AI Division level, and only where we're genuinely operating alongside you. The structure is $18K a month plus equity or a share of documented profit. It's not a discount — it's a different bet, and it means we're in it for years, not quarters.",
  },
  {
    q: "What does onboarding actually look like?",
    a: "Free 45-minute call to see if the math works. Blueprint starts within a week of signing and runs two weeks. If you continue, the retainer begins the Monday after the readout and the first system is usually live within three weeks of that.",
  },
];
