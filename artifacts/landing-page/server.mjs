/**
 * Production server for jobsdonelabs.ai
 * - Redirects non-www → www (301) for all requests
 * - Serves static files: checks dist/public/ first (Vite build), then public/ (pre-rendered SEO pages)
 * - Falls back to dist/public/index.html or public/index.html for SPA routing
 * - Runs on PORT env var (Replit autoscale requirement)
 */
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const distPublic = join(__dirname, "dist", "public");
const staticPublic = join(__dirname, "public");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
};

const port = parseInt(process.env.PORT || "8080", 10);
const EXPRESS_PORT = 8080;
const EXPRESS_HOST = "127.0.0.1";

// Paths that should be proxied to the Express API server
const PROXY_PATHS = ["/blog", "/about", "/case-study", "/api"];

function shouldProxy(pathname) {
  return PROXY_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

/**
 * Resolve a URL pathname to an absolute file path.
 * Checks dist/public/ first (Vite assets + index.html), then public/ (pre-rendered HTML pages).
 * Returns null if nothing matched.
 */
function resolveFilePath(pathname) {
  // Sanitize to prevent directory traversal
  const safe = pathname.replace(/\.\./g, "").replace(/\/+/g, "/");

  const candidates = [];

  // Check both directories; dist/public takes priority for overlapping files (e.g. index.html)
  for (const base of [distPublic, staticPublic]) {
    if (!existsSync(base)) continue;

    let p = join(base, safe);

    // Directory → look for index.html inside
    if (existsSync(p)) {
      try {
        if (statSync(p).isDirectory()) {
          const idx = join(p, "index.html");
          if (existsSync(idx)) candidates.push(idx);
          continue;
        }
      } catch {}
      candidates.push(p);
      continue;
    }

    // No extension → try .html suffix (clean URLs)
    if (!extname(p)) {
      const html = p + ".html";
      if (existsSync(html)) {
        candidates.push(html);
        continue;
      }
    }
  }

  return candidates[0] ?? null;
}

/** Fall-back SPA shell for client-side routes */
function spaFallback() {
  for (const base of [distPublic, staticPublic]) {
    const idx = join(base, "index.html");
    if (existsSync(idx)) return idx;
  }
  return null;
}

function serveFile(res, filePath) {
  try {
    const data = readFileSync(filePath);
    const ext = extname(filePath).toLowerCase();
    const isHtml = ext === ".html";
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      // Assets are fingerprinted; HTML should not be cached long-term
      "Cache-Control": isHtml ? "public, max-age=300" : "public, max-age=31536000, immutable",
    });
    res.end(data);
  } catch {
    const fallback = spaFallback();
    if (fallback) {
      try {
        const data = readFileSync(fallback);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" });
        res.end(data);
        return;
      } catch {}
    }
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
}

const server = createServer((req, res) => {
  const rawHost = req.headers["x-forwarded-host"] || req.headers.host || "";
  const hostname = (typeof rawHost === "string" ? rawHost : String(rawHost)).split(":")[0];

  // 301 redirect non-www → www (before any file serving)
  if (
    hostname === "jobsdonelabs.ai" ||
    (hostname.endsWith(".jobsdonelabs.ai") && !hostname.startsWith("www."))
  ) {
    const location = `https://www.jobsdonelabs.ai${req.url || "/"}`;
    res.writeHead(301, {
      Location: location,
      "Cache-Control": "no-cache",
    });
    res.end();
    return;
  }

  let pathname;
  try {
    pathname = new URL(req.url || "/", "http://localhost").pathname;
  } catch {
    pathname = "/";
  }

  const filePath = resolveFilePath(pathname);
  if (filePath) {
    serveFile(res, filePath);
  } else {
    // SPA fallback for client-side routes
    const fallback = spaFallback();
    if (fallback) {
      serveFile(res, fallback);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
  console.log(`Serving from: ${existsSync(distPublic) ? distPublic : staticPublic} (+ public/ fallback)`);
  console.log(`Non-www → www redirect: ENABLED`);
});
