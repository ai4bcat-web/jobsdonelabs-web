/**
 * Production server for jobsdonelabs.ai
 * - Redirects non-www → www (301) for all requests
 * - Serves static files from dist/public/
 * - Runs on PORT env var (Replit autoscale requirement)
 */
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
// Serve from public/ (pre-built static HTML files committed to repo)
// Falls back to dist/public/ if it exists (Vite build output)
const distPublic = join(__dirname, "dist", "public");
const staticPublic = join(__dirname, "public");
const publicDir = existsSync(distPublic) ? distPublic : staticPublic;

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

function serveFile(res, filePath) {
  try {
    const data = readFileSync(filePath);
    const ext = extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": "public, max-age=3600",
    });
    res.end(data);
  } catch {
    // File not found — serve index.html for SPA routing
    try {
      const indexHtml = readFileSync(join(publicDir, "index.html"));
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(indexHtml);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  }
}

const server = createServer((req, res) => {
  // Check Host header first (what the client actually requested),
  // fall back to x-forwarded-host for proxy scenarios
  const rawHost = req.headers.host || req.headers["x-forwarded-host"] || "";
  const hostname = typeof rawHost === "string" ? rawHost.split(":")[0] : String(rawHost).split(":")[0];

  // Redirect non-www to www (301 permanent)
  if (
    hostname === "jobsdonelabs.ai" ||
    (hostname.endsWith(".jobsdonelabs.ai") && !hostname.startsWith("www."))
  ) {
    const target = "www." + hostname.replace(/^(www\.)?/, "");
    const location = `https://${target}${req.url || "/"}`;
    res.writeHead(301, {
      Location: location,
      "Cache-Control": "no-cache",
    });
    res.end();
    return;
  }

  // Serve static file or fall back to index.html (SPA)
  const url = new URL(req.url || "/", `http://${host}`);
  let filePath = join(publicDir, url.pathname);

  // If path is a directory, serve index.html
  if (existsSync(filePath) && !filePath.includes(".")) {
    const indexPath = join(filePath, "index.html");
    if (existsSync(indexPath)) {
      filePath = indexPath;
    }
  }

  // If no extension, try adding .html (clean URLs)
  if (!extname(filePath)) {
    const htmlPath = filePath + ".html";
    if (existsSync(htmlPath)) {
      filePath = htmlPath;
    }
  }

  serveFile(res, filePath);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
  console.log(`Serving static files from: ${publicDir}`);
  console.log(`Non-www → www redirect: ENABLED`);
});