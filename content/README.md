# Content Pipeline — JobsDone Labs

**Blog: daily (Radagast JD4) | LinkedIn: 2/month (Frodo, 1st & 15th)**

## How it works

```
Sauron (daily keyword research)
    ↓
Radagast JD4 (daily)              Frodo cron (1st & 15th, 9am)
    ↓                                  ↓
blog posts on jobsdonelabs.ai      picks best recent blog post
    ↓                                  ↓
                                   LinkedIn companion article
                                   (SEO-optimized, cross-linked)
                                        ↓
                                   Ryne publishes to LinkedIn
                                        ↓
                            ┌──── Google indexes LinkedIn article ────┐
                            │  (headline → snippet → body keywords)   │
                            │  (blog → LinkedIn → blog link trail)    │
                            └─────────────────────────────────────────┘
```

## The two pipelines

### Blog pipeline (daily — Radagast JD4)
- Runs every day via Hermes job runner
- Produces SEO-optimized HTML blog posts in `artifacts/landing-page/public/blog/`
- Keywords from Sauron's daily research at `bcat-command-center/output/seo-research/latest.md`

### LinkedIn pipeline (2/month — Frodo cron `6ae93022dc81`)
- Runs 1st and 15th at 9am | Profile: frodo | Delivers: slack:hermes-updates
- Picks ONE recent blog post and writes an SEO-optimized LinkedIn companion
- **Every article includes**:
  - Front-loaded primary keyword in headline (max 70 chars)
  - First 2 sentences optimized as Google SERP snippet
  - Cross-link to blog post with keyword-rich anchor text
  - Keyword variants in H2/H3 subheadings
  - YAML frontmatter with blog_slug, blog_url, headline, keyword, snippet
- Saves to `content/linkedin/YYYY-MM-DD-slug.md`

## Google indexing strategy
LinkedIn articles get indexed by Google and rank for B2B queries thanks to LinkedIn's domain authority. To maximize this:

1. **Headline + snippet**: Frodo front-loads keywords into the LinkedIn headline and first 2 sentences — these become the Google SERP title + description
2. **Cross-linking**: LinkedIn article → blog (keyword anchor text). Blog → LinkedIn article (add after publishing)
3. **Structure**: H2/H3 subheadings with keyword variants help Google understand the article's topic
4. **Indexing signal**: After Ryne publishes, share the LinkedIn URL on other platforms for crawl signals

## Directory structure
```
content/
├── README.md              ← this file
├── linkedin/              ← Frodo writes LinkedIn companion articles here
└── drafts/                ← archived standalone LinkedIn drafts (pre-Aug 2026)
```

## Publishing workflow (manual, Ryne)
1. Frodo delivers LinkedIn article to Slack
2. Paste into LinkedIn → Write article → Publish
3. Copy the published LinkedIn URL
4. (Optional but recommended) Add a link to the LinkedIn article in the corresponding blog post on jobsdonelabs.ai — this closes the cross-link loop for Google
5. Add to POSTED.txt in bcat-command-center/output/jobsdone-linkedin-articles/