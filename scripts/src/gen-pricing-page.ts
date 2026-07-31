/**
 * Generates artifacts/landing-page/public/pricing/index.html.
 *
 * Why a committed static page as well as the Vite pre-render:
 * production serves files out of public/ the moment they land (a git pull is
 * enough), but anything under dist/ only changes when the app is rebuilt and
 * republished. The sitemap advertises /pricing, so without this file a crawler
 * that arrives between a push and a republish gets the home page shell under
 * the /pricing URL — wrong title, wrong content, duplicate of the home page.
 *
 * Layering: `vite build` copies public/ into dist/public/, then the
 * prerender-pricing plugin overwrites dist/public/pricing/index.html with the
 * SPA-hydrating version. So this page serves until the next publish, and the
 * React page serves after it. Both are generated from engagements.ts.
 *
 * Styling follows the pre-rendered industries pages — same tokens, same shape.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  BLUEPRINT,
  TIERS,
  ADD_ONS,
  PRINCIPLES,
  PRICING_FAQ,
  LADDER,
  VS_HIRE,
  MATRIX,
} from "../../artifacts/landing-page/src/lib/engagements.js";

const SITE = "https://www.jobsdonelabs.ai";
const URL = `${SITE}/pricing/`;
const TITLE = "Engagements & Pricing — Fractional AI CTO | Jobs Done Labs";
const DESCRIPTION =
  "Fractional AI CTO and AI consulting retainers for $1M+ operators. Coaching from $4,500/mo, Fractional AI CTO $12,000/mo, Embedded AI Division from $25,000/mo. Every engagement starts with a $7,500 AI Operating Blueprint, credited back.";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(HERE, "..", "..", "artifacts", "landing-page", "public", "pricing");

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function numericPrice(price: string): string | null {
  const m = price.replace(/,/g, "").match(/(\d+)/);
  return m ? m[1] : null;
}

function structuredData(): string {
  const offers = [BLUEPRINT, ...TIERS].map(t => {
    const price = numericPrice(t.price);
    return {
      "@type": "Offer",
      name: t.name,
      description: t.promise,
      ...(price ? { price, priceCurrency: "USD" } : {}),
      url: URL,
    };
  });

  const blocks: unknown[] = [
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
    .map(b => `  <script type="application/ld+json">\n${JSON.stringify(b, null, 2)}\n  </script>`)
    .join("\n");
}

const STYLE = `
    :root { --cream:#F4EFE3; --cream2:#EFE8D8; --ink:#0B0D12; --ink2:#11131B; --accent:#1466FF; --line:rgba(11,13,18,.1); --muted:rgba(11,13,18,.55); }
    * { box-sizing:border-box; margin:0; padding:0; }
    body { background:var(--cream); color:var(--ink); font-family:'Hanken Grotesk',system-ui,sans-serif; line-height:1.72; -webkit-font-smoothing:antialiased; }
    nav.top { display:flex; align-items:center; justify-content:space-between; padding:20px 24px; max-width:960px; margin:0 auto; border-bottom:1px solid var(--line); }
    nav.top a.logo { font-family:'Anton',sans-serif; font-size:20px; color:var(--ink); text-decoration:none; }
    nav.top a.cta { background:var(--ink); color:var(--cream); text-decoration:none; font-weight:700; font-size:14px; padding:10px 20px; border-radius:50px; }
    main { max-width:860px; margin:0 auto; padding:56px 24px 96px; }
    h1 { font-family:'Anton',sans-serif; font-size:clamp(2rem,4.5vw,3rem); line-height:1.08; margin-bottom:16px; }
    h2 { font-family:'Anton',sans-serif; font-size:clamp(1.4rem,3vw,1.9rem); line-height:1.15; margin:56px 0 16px; }
    h3 { font-family:'Anton',sans-serif; font-size:clamp(1.1rem,2.2vw,1.35rem); line-height:1.2; margin:32px 0 8px; }
    p { margin-bottom:18px; font-size:17px; }
    ul, ol { margin:0 0 24px 24px; font-size:17px; }
    li { margin-bottom:8px; padding-left:4px; }
    .hero-subtitle { font-size:19px; color:var(--muted); margin-bottom:28px; max-width:660px; }
    .hero-cta { display:inline-block; background:var(--accent); color:#fff; text-decoration:none; font-weight:700; font-size:16px; padding:14px 36px; border-radius:50px; }
    .tier { background:#fff; border:1px solid var(--line); border-radius:8px; padding:28px 32px; margin:20px 0; }
    .tier.featured { border-color:var(--accent); border-width:2px; }
    .tier h3 { margin-top:0; }
    .price { font-family:'Anton',sans-serif; font-size:34px; color:var(--accent); line-height:1.1; }
    .price span { font-family:'Hanken Grotesk',sans-serif; font-size:16px; color:var(--muted); font-weight:600; }
    .term { font-size:14px; color:var(--muted); margin-bottom:14px; }
    .eyebrow { font-size:11px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); }
    .fit { background:var(--cream2); border-radius:6px; padding:12px 16px; font-size:15px; margin:14px 0 4px; }
    table { width:100%; border-collapse:collapse; margin:24px 0 32px; font-size:15px; background:#fff; border:1px solid var(--line); }
    th, td { padding:12px 14px; border-bottom:1px solid var(--line); text-align:left; vertical-align:top; }
    thead th { font-size:13px; text-transform:uppercase; letter-spacing:.06em; color:var(--muted); }
    tbody th { font-weight:700; }
    .cta-block { background:var(--ink); color:var(--cream); padding:40px 44px; margin:56px 0 24px; border-radius:8px; text-align:center; }
    .cta-block h2 { color:var(--cream); margin-top:0; }
    .cta-block p { color:rgba(244,239,227,.75); font-size:16px; }
    .cta-block a.cta-btn { display:inline-block; background:var(--accent); color:#fff; text-decoration:none; font-weight:700; font-size:16px; padding:14px 36px; border-radius:50px; }
    .faq-item { margin-bottom:26px; }
    .faq-item h3 { font-family:'Hanken Grotesk',sans-serif; font-size:17px; font-weight:700; margin:0 0 6px; }
    .faq-item p { font-size:16px; color:rgba(11,13,18,.7); }
    .inline-link { color:var(--accent); text-decoration:underline; font-weight:600; }
    footer { text-align:center; font-size:13px; color:var(--muted); padding:32px 24px 48px; border-top:1px solid var(--line); max-width:960px; margin:0 auto; }
    footer a { color:var(--accent); text-decoration:none; }`;

/** Tier CTAs carry the tier they came from, the same way the React page does. */
function bookHref(intent: string): string {
  return `/contact?utm_source=jobsdonelabs.ai&utm_medium=pricing-page&utm_campaign=fractional-ai-cto&utm_content=${intent}`;
}

export function buildStandalonePricingPage(): string {
  const out: string[] = [];
  const p = (s: string) => out.push(s);

  p("<!DOCTYPE html>");
  p('<html lang="en">');
  p("<head>");
  p('  <meta charset="UTF-8" />');
  p('  <meta name="viewport" content="width=device-width, initial-scale=1.0" />');
  p(`  <title>${esc(TITLE)}</title>`);
  p(`  <meta name="description" content="${esc(DESCRIPTION)}" />`);
  p(`  <link rel="canonical" href="${URL}" />`);
  p('  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />');
  p('  <meta property="og:type" content="website" />');
  p(`  <meta property="og:url" content="${URL}" />`);
  p(`  <meta property="og:title" content="${esc(TITLE)}" />`);
  p(`  <meta property="og:description" content="${esc(DESCRIPTION)}" />`);
  p(`  <meta property="og:image" content="${SITE}/og-image.jpg" />`);
  p('  <meta property="og:image:width" content="1200" />');
  p('  <meta property="og:image:height" content="630" />');
  p('  <meta property="og:site_name" content="Jobs Done Labs" />');
  p('  <meta name="twitter:card" content="summary_large_image" />');
  p(`  <meta name="twitter:title" content="${esc(TITLE)}" />`);
  p(`  <meta name="twitter:description" content="${esc(DESCRIPTION)}" />`);
  p(`  <meta name="twitter:image" content="${SITE}/og-image.jpg" />`);
  p(structuredData());
  p('  <link rel="preconnect" href="https://fonts.googleapis.com">');
  p('  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
  p('  <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&family=Anton&display=swap" rel="stylesheet">');
  p(`  <style>${STYLE}\n  </style>`);
  p('  <script defer data-domain="jobsdonelabs.ai" src="https://plausible.io/js/script.js"></script>');
  p("</head>");
  p("<body>");
  p('  <nav class="top">');
  p('    <a class="logo" href="/">JOBS<span style="color:#1466FF">DONE</span> LABS</a>');
  p(`    <a class="cta" href="${bookHref("nav")}">Book a free call</a>`);
  p("  </nav>");
  p("  <main>");

  p("    <h1>Hire the AI leader you can't justify hiring full time.</h1>");
  p(
    '    <p class="hero-subtitle">Ryne runs a logistics group, a software lab, and a portfolio of businesses where AI agents do real work every day — quoting, dispatching, reconciling, reporting. These are the ways you can put that seat inside your company, for a fixed monthly number and a term you can see the end of.</p>',
  );
  p(`    <p><a class="hero-cta" href="${bookHref("pricing-hero")}">Book a free 45-min call →</a></p>`);

  p("    <h2>Nobody signs a retainer on a first date</h2>");
  p("    <ol>");
  for (const s of LADDER) p(`      <li><strong>${esc(s.label)}</strong> — ${esc(s.body)}</li>`);
  p("    </ol>");

  p(`    <h2>${esc(BLUEPRINT.name)}</h2>`);
  p(`    <p class="price">${esc(BLUEPRINT.price)} <span>${esc(BLUEPRINT.cadence)} · ${esc(BLUEPRINT.term)}</span></p>`);
  p(`    <p>${esc(BLUEPRINT.promise)}</p>`);
  p(`    <p><strong>${esc(BLUEPRINT.fit)}</strong></p>`);
  p("    <ul>");
  for (const i of BLUEPRINT.includes) p(`      <li>${esc(i)}</li>`);
  p("    </ul>");
  p(`    <p><a class="hero-cta" href="${bookHref("blueprint")}">${esc(BLUEPRINT.cta)} →</a></p>`);

  p("    <h2>Three ways to work together</h2>");
  p(
    "    <p>The only question that matters: who's holding the keyboard? Pick the tier that answers it honestly and the engagement works. Pick the wrong one and you'll feel it by week three.</p>",
  );
  for (const t of TIERS) {
    p(`    <div class="tier${t.featured ? " featured" : ""}">`);
    p(`      <p class="eyebrow">${esc(t.eyebrow)}${t.featured ? " · most operators start here" : ""}</p>`);
    p(`      <h3>${esc(t.name)}</h3>`);
    p(`      <p class="price">${esc(t.price)} <span>${esc(t.cadence)}</span></p>`);
    p(`      <p class="term">${esc(t.term)}</p>`);
    p(`      <p>${esc(t.promise)}</p>`);
    p(`      <p class="fit"><strong>Best fit:</strong> ${esc(t.fit)}</p>`);
    p("      <ul>");
    for (const i of t.includes) p(`        <li>${esc(i)}</li>`);
    p("      </ul>");
    p(`      <p><a class="inline-link" href="${bookHref(t.id)}">${esc(t.cta)} →</a></p>`);
    p("    </div>");
  }

  p("    <h2>What's actually included</h2>");
  p("    <table>");
  p("      <thead><tr><th></th><th>Coach</th><th>Fractional CTO</th><th>Embedded Division</th></tr></thead>");
  p("      <tbody>");
  for (const row of MATRIX) {
    const mark = (v: boolean) => (v ? "Yes" : "—");
    p(
      `        <tr><th>${esc(row.feature)}</th><td>${mark(row.coach)}</td><td>${mark(row.cto)}</td><td>${mark(row.partner)}</td></tr>`,
    );
  }
  p("      </tbody>");
  p("    </table>");

  p("    <h2>Fractional CTO vs. a full-time AI hire</h2>");
  p("    <table>");
  p("      <thead><tr><th></th><th>Full-time AI hire</th><th>Fractional AI CTO</th></tr></thead>");
  p("      <tbody>");
  for (const r of VS_HIRE) {
    p(`        <tr><th>${esc(r.label)}</th><td>${esc(r.hire)}</td><td>${esc(r.jdl)}</td></tr>`);
  }
  p("      </tbody>");
  p("    </table>");

  p("    <h2>Bolt on what you need</h2>");
  for (const a of ADD_ONS) {
    p(`    <h3>${esc(a.name)} — ${esc(a.price)}</h3>`);
    p(`    <p>${esc(a.body)}</p>`);
  }

  p("    <h2>Six rules we won't bend</h2>");
  p(
    "    <p>Consulting gets a bad name from hourly billing, scope games, and rented software. None of that happens here.</p>",
  );
  for (const pr of PRINCIPLES) {
    p(`    <h3>${esc(pr.title)}</h3>`);
    p(`    <p>${esc(pr.body)}</p>`);
  }

  p("    <h2>The questions operators actually ask</h2>");
  for (const f of PRICING_FAQ) {
    p('    <div class="faq-item">');
    p(`      <h3>${esc(f.q)}</h3>`);
    p(`      <p>${esc(f.a)}</p>`);
    p("    </div>");
  }

  p('    <div class="cta-block">');
  p("      <h2>Not sure which tier fits?</h2>");
  p(
    "      <p>That's what the free call is for. Forty-five minutes, no pitch — we'll tell you which tier fits, or that none of them do. Plenty of operators leave with a plan and no invoice.</p>",
  );
  p(`      <p><a class="cta-btn" href="${bookHref("pricing-final")}">Book your free call →</a></p>`);
  p("    </div>");

  p("  </main>");
  p("  <footer>");
  p(
    '    © 2026 Jobs Done Labs · <a href="/">Home</a> · <a href="/contact">Contact</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="https://makeitryne.ai">Free AI builds &amp; prompts</a>',
  );
  p("  </footer>");
  p("</body>");
  p("</html>");

  return out.join("\n") + "\n";
}

export function runGenPricingPage(outDir: string = OUT_DIR): string {
  mkdirSync(outDir, { recursive: true });
  const file = join(outDir, "index.html");
  writeFileSync(file, buildStandalonePricingPage(), "utf-8");
  console.log(`[gen-pricing-page] ✓ wrote ${file}`);
  return file;
}

runGenPricingPage();
