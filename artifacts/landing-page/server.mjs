/**
 * Production server for jobsdonelabs.ai
 * - Redirects non-www → www (301) for ALL requests
 * - Serves static files from public/ for landing page paths
 * - Proxies blog, about, case-study, and API requests to Express internally
 * - Runs on PORT env var (Replit autoscale requirement)
 */
import { createServer } from "node:http";
import { request as httpRequest } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
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
const EXPRESS_PORT = 8080;
const EXPRESS_HOST = "127.0.0.1";

// Paths that should be proxied to the Express API server
const PROXY_PATHS = ["/blog", "/about", "/case-study", "/api"];

function shouldProxy(pathname) {
  return PROXY_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

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

/**
 * Proxy a request to the Express API server running on localhost.
 * Pipes the original request body and returns the Express response.
 */
function proxyToExpress(req, res) {
  const options = {
    hostname: EXPRESS_HOST,
    port: EXPRESS_PORT,
    path: req.url,
    method: req.method,
    headers: { ...req.headers },
  };

  const proxyReq = httpRequest(options, (proxyRes) => {
    // Forward status and headers
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    // Pipe the response body
    proxyRes.pipe(res);
  });

  proxyReq.on("error", (err) => {
    console.error("Proxy error:", err.message);
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Bad Gateway");
  });

  // Pipe the request body to Express (for POST/PUT bodies)
  req.pipe(proxyReq);
}

const server = createServer((req, res) => {
  const rawHost = req.headers.host || req.headers["x-forwarded-host"] || "";
  const hostname =
    typeof rawHost === "string"
      ? rawHost.split(":")[0]
      : String(rawHost).split(":")[0];

  // ── Redirect non-www → www (301) for ALL paths ──
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

  // ── Parse path ──
  const url = new URL(req.url || "/", `http://${hostname || "localhost"}`);
  const pathname = url.pathname;

  // ── Proxy blog, about, case-study, and API to Express ──
  if (shouldProxy(pathname)) {
    proxyToExpress(req, res);
    return;
  }

  // ── Serve static file or SPA fallback ──
  let filePath = join(publicDir, pathname);

  // Directory → serve index.html
  if (existsSync(filePath) && !filePath.includes(".")) {
    const indexPath = join(filePath, "index.html");
    if (existsSync(indexPath)) {
      filePath = indexPath;
    }
  }

  // Clean URL → try .html extension
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
  console.log(`Proxying ${PROXY_PATHS.join(", ")} to Express on ${EXPRESS_HOST}:${EXPRESS_PORT}`);
  console.log(`Non-www → www redirect: ENABLED`);
});