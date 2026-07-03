import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

const wwwRedirectMiddleware = (
  req: { headers: Record<string, string | string[] | undefined>; url?: string },
  res: {
    writeHead: (status: number, headers: Record<string, string>) => void;
    end: () => void;
  },
  next: () => void,
) => {
  const rawHost = (req.headers.host as string) || (req.headers["x-forwarded-host"] as string) || "";
  const hostname =
    typeof rawHost === "string" ? rawHost.split(":")[0] : String(rawHost).split(":")[0];

  // Only redirect if it's the bare domain (non-www), not localhost or Replit domains
  if (
    hostname === "jobsdonelabs.ai" ||
    (hostname.endsWith(".jobsdonelabs.ai") && !hostname.startsWith("www."))
  ) {
    const target =
      "www." +
      hostname.replace(/^(www\.)?/, "");
    const port = typeof host === "string" && host.includes(":") ? host.split(":")[1] : "";
    const location = `https://${target}${port ? ":" + port : ""}${req.url || "/"}`;
    res.writeHead(301, { Location: location });
    res.end();
    return;
  }
  next();
};

function wwwRedirectPlugin() {
  return {
    name: "www-redirect",
    configureServer(server: any) {
      server.middlewares.use(wwwRedirectMiddleware);
    },
    configurePreviewServer(server: any) {
      server.middlewares.use(wwwRedirectMiddleware);
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    wwwRedirectPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
