/**
 * Pre-renders /pricing into dist/public/pricing/index.html.
 *
 * The pricing page is client-routed, so on its own it inherits the shell's
 * homepage title, description and canonical until React mounts — which is
 * useless for ranking on "fractional AI CTO pricing". This takes the built
 * shell, swaps in pricing metadata and structured data, and replaces the
 * crawler fallback inside #root with the pricing copy. Same trick the shell
 * already uses for the home page: bots and no-JS visitors read the static
 * markup, React replaces it on mount.
 *
 * Everything here is generated from `src/lib/engagements.ts`, so a price
 * still only changes in one place.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import {
  BLUEPRINT,
  TIERS,
  ADD_ONS,
  PRINCIPLES,
  PRICING_FAQ,
  LADDER,
  VS_HIRE,
} from "../src/lib/engagements";

const SITE = "https://www.jobsdonelabs.ai";
const URL = `${SITE}/pricing`;

const TITLE = "Engagements & Pricing — Fractional AI CTO | Jobs Done Labs";
const DESCRIPTION =
  "Fractional AI CTO and AI consulting retainers for $1M+ operators. Coaching from $4,500/mo, Fractional AI CTO $12,000/mo, Embedded AI Division from $25,000/mo. Every engagement starts with a $7,500 AI Operating Blueprint, credited back.";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Strip the currency/cadence noise so schema.org gets a number it can use. */
function numericPrice(price: string): string | null {
  const m = price.replace(/,/g, "").match(/(\d+)/);
  return m ? m[1] : null;
}

function staticContent(): string {
  const lines: string[] = [];
  const p = (s: string) => lines.push(s);

  p("      <!-- Static content for AI crawlers and search bots that don't execute JavaScript -->");
  p("      <main>");
  p(`        <h1>Hire the AI leader you can't justify hiring full time.</h1>`);
  p(
    "        <p>Ryne runs a logistics group, a software lab, and a portfolio of businesses where AI agents do real work every day — quoting, dispatching, reconciling, reporting. These are the ways you can put that seat inside your company, for a fixed monthly number and a term you can see the end of. Retainers, not hourly. You own every system.</p>",
  );

  p("        <section>");
  p("          <h2>How an engagement starts</h2>");
  p("          <ol>");
  for (const s of LADDER) p(`            <li><strong>${esc(s.label)}</strong> — ${esc(s.body)}</li>`);
  p("          </ol>");
  p("        </section>");

  p("        <section>");
  p(`          <h2>${esc(BLUEPRINT.name)} — ${esc(BLUEPRINT.price)} ${esc(BLUEPRINT.cadence)}, ${esc(BLUEPRINT.term)}</h2>`);
  p(`          <p>${esc(BLUEPRINT.promise)}</p>`);
  p(`          <p>${esc(BLUEPRINT.fit)}</p>`);
  p("          <ul>");
  for (const i of BLUEPRINT.includes) p(`            <li>${esc(i)}</li>`);
  p("          </ul>");
  p("        </section>");

  p("        <section>");
  p("          <h2>Retainers — three ways to work together</h2>");
  for (const t of TIERS) {
    p(`          <h3>${esc(t.name)} — ${esc(t.price)}${esc(t.cadence)}, ${esc(t.term)}</h3>`);
    p(`          <p>${esc(t.promise)}</p>`);
    p(`          <p><strong>Best fit:</strong> ${esc(t.fit)}</p>`);
    p("          <ul>");
    for (const i of t.includes) p(`            <li>${esc(i)}</li>`);
    p("          </ul>");
  }
  p("        </section>");

  p("        <section>");
  p("          <h2>Fractional AI CTO vs. a full-time AI hire</h2>");
  p("          <table>");
  p("            <thead><tr><th></th><th>Full-time AI hire</th><th>Fractional AI CTO</th></tr></thead>");
  p("            <tbody>");
  for (const r of VS_HIRE) {
    p(`              <tr><th>${esc(r.label)}</th><td>${esc(r.hire)}</td><td>${esc(r.jdl)}</td></tr>`);
  }
  p("            </tbody>");
  p("          </table>");
  p("        </section>");

  p("        <section>");
  p("          <h2>Add-ons</h2>");
  for (const a of ADD_ONS) {
    p(`          <h3>${esc(a.name)} — ${esc(a.price)}</h3>`);
    p(`          <p>${esc(a.body)}</p>`);
  }
  p("        </section>");

  p("        <section>");
  p("          <h2>How pricing works</h2>");
  for (const pr of PRINCIPLES) {
    p(`          <h3>${esc(pr.title)}</h3>`);
    p(`          <p>${esc(pr.body)}</p>`);
  }
  p("        </section>");

  p("        <section>");
  p("          <h2>Pricing FAQ</h2>");
  for (const f of PRICING_FAQ) {
    p(`          <h3>${esc(f.q)}</h3>`);
    p(`          <p>${esc(f.a)}</p>`);
  }
  p("        </section>");
  p("      </main>");

  return lines.join("\n");
}

function structuredData(): string {
  const offers = [BLUEPRINT, ...TIERS].map(t => {
    const price = numericPrice(t.price);
    return {
      "@type": "Offer",
      name: t.name,
      description: t.promise,
      ...(price
        ? {
            price,
            priceCurrency: "USD",
            ...(t.cadence === "/month" ? { unitText: "MONTH" } : {}),
          }
        : {}),
      url: URL,
    };
  });

  const blocks = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Fractional AI CTO",
      serviceType: "Fractional AI leadership and AI automation consulting",
      description: DESCRIPTION,
      url: URL,
      areaServed: "US",
      provider: {
        "@type": "Organization",
        name: "Jobs Done Labs",
        url: SITE,
        logo: `${SITE}/logo.png`,
      },
      offers: { "@type": "OfferCatalog", name: "Engagements", itemListElement: offers },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Engagements & Pricing", item: URL },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PRICING_FAQ.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return blocks
    .map(b => `    <script type="application/ld+json">\n${JSON.stringify(b, null, 2)}\n    </script>`)
    .join("\n");
}

/**
 * Swap the head metadata and the #root fallback of the built shell.
 * Throws rather than writing a half-transformed page — a silently wrong
 * canonical is worse than a failed build.
 */
export function buildPricingHtml(shell: string): string {
  let html = shell;

  const replaceOne = (re: RegExp, value: string, what: string) => {
    const matches = html.match(re);
    if (!matches) throw new Error(`prerender-pricing: no ${what} found in index.html`);
    html = html.replace(re, value);
  };

  replaceOne(/<title>[\s\S]*?<\/title>/, `<title>${esc(TITLE)}</title>`, "<title>");
  replaceOne(
    /<meta name="description" content="[\s\S]*?" \/>/,
    `<meta name="description" content="${esc(DESCRIPTION)}" />`,
    "description meta",
  );
  replaceOne(
    /<link rel="canonical" href="[\s\S]*?" \/>/,
    `<link rel="canonical" href="${URL}" />`,
    "canonical link",
  );
  replaceOne(/<meta property="og:url" content="[\s\S]*?" \/>/, `<meta property="og:url" content="${URL}" />`, "og:url");
  replaceOne(
    /<meta property="og:title" content="[\s\S]*?" \/>/,
    `<meta property="og:title" content="${esc(TITLE)}" />`,
    "og:title",
  );
  replaceOne(
    /<meta property="og:description" content="[\s\S]*?" \/>/,
    `<meta property="og:description" content="${esc(DESCRIPTION)}" />`,
    "og:description",
  );
  replaceOne(
    /<meta name="twitter:title" content="[\s\S]*?" \/>/,
    `<meta name="twitter:title" content="${esc(TITLE)}" />`,
    "twitter:title",
  );
  replaceOne(
    /<meta name="twitter:description" content="[\s\S]*?" \/>/,
    `<meta name="twitter:description" content="${esc(DESCRIPTION)}" />`,
    "twitter:description",
  );

  // The home page's structured data describes the home page. Drop all of it and
  // put the pricing graph in its place.
  const ldRe = /[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>\n?/g;
  if (!ldRe.test(html)) throw new Error("prerender-pricing: no JSON-LD blocks found in index.html");
  html = html.replace(ldRe, "");
  html = html.replace("</head>", `${structuredData()}\n  </head>`);

  // Swap the crawler fallback inside #root.
  const openTag = '<div id="root">';
  const start = html.indexOf(openTag);
  if (start === -1) throw new Error("prerender-pricing: no #root element found in index.html");
  const scriptAt = html.indexOf("<script", start);
  if (scriptAt === -1) throw new Error("prerender-pricing: no bootstrap script found after #root");
  const closeAt = html.lastIndexOf("</div>", scriptAt);
  if (closeAt === -1 || closeAt < start) throw new Error("prerender-pricing: could not find the closing tag of #root");

  html =
    html.slice(0, start + openTag.length) +
    "\n" +
    staticContent() +
    "\n    " +
    html.slice(closeAt);

  return html;
}

/** Vite plugin: runs after the bundle is written, so asset hashes are final. */
export default function prerenderPricing() {
  let outDir = "";
  return {
    name: "prerender-pricing",
    apply: "build" as const,
    configResolved(config: { build: { outDir: string } }) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const shell = readFileSync(join(outDir, "index.html"), "utf-8");
      const dir = join(outDir, "pricing");
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, "index.html"), buildPricingHtml(shell), "utf-8");
      // eslint-disable-next-line no-console
      console.log("[prerender-pricing] wrote dist/public/pricing/index.html");
    },
  };
}
