/**
 * Validates required Open Graph and meta tags in all blog post HTML files.
 *
 * Checks each public/blog/*\/index.html (excluding the blog index itself) for:
 *   - og:title
 *   - og:description
 *   - og:image
 *   - meta name="description"
 *   - link rel="canonical"
 *
 * Exits non-zero if any file is missing or has an empty value for a required tag,
 * so it can be wired into the publish workflow.
 */

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "../..");
const BLOG_DIR = join(REPO_ROOT, "artifacts/landing-page/public/blog");

type TagCheck = {
  label: string;
  pattern: RegExp;
};

const REQUIRED_TAGS: TagCheck[] = [
  {
    label: "og:title",
    pattern: /<meta\s+property="og:title"\s+content="([^"]*)"/i,
  },
  {
    label: "og:description",
    pattern: /<meta\s+property="og:description"\s+content="([^"]*)"/i,
  },
  {
    label: "og:image",
    pattern: /<meta\s+property="og:image"\s+content="([^"]*)"/i,
  },
  {
    label: 'meta name="description"',
    pattern: /<meta\s+name="description"\s+content="([^"]*)"/i,
  },
  {
    label: "canonical URL",
    pattern: /<link\s+rel="canonical"\s+href="([^"]*)"/i,
  },
];

function checkFile(filePath: string): string[] {
  const html = readFileSync(filePath, "utf-8");
  const failures: string[] = [];

  for (const { label, pattern } of REQUIRED_TAGS) {
    const match = html.match(pattern);
    if (!match) {
      failures.push(`missing ${label}`);
    } else if (match[1].trim() === "") {
      failures.push(`empty ${label}`);
    }
  }

  return failures;
}

const slugs = readdirSync(BLOG_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let totalFiles = 0;
let failedFiles = 0;

for (const slug of slugs) {
  const filePath = join(BLOG_DIR, slug, "index.html");
  totalFiles++;

  const failures = checkFile(filePath);

  if (failures.length > 0) {
    failedFiles++;
    console.error(`[check-og-tags] FAIL  ${filePath}`);
    for (const f of failures) {
      console.error(`[check-og-tags]         - ${f}`);
    }
  } else {
    console.log(`[check-og-tags] ok    blog/${slug}/index.html`);
  }
}

console.log(
  `\n[check-og-tags] ${totalFiles - failedFiles}/${totalFiles} file(s) passed.`
);

if (failedFiles > 0) {
  console.error(
    `[check-og-tags] ✗ ${failedFiles} file(s) failed OG tag validation.`
  );
  process.exit(1);
} else {
  console.log("[check-og-tags] ✓ All files passed OG tag validation.");
}
