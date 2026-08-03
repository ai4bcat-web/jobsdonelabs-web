import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import blogRouter from "./routes/blog";
import { logger } from "./lib/logger";

const app: Express = express();

// Trust Google Frontend proxy headers (X-Forwarded-Host, etc.)
app.set("trust proxy", true);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
// GitHub webhook: express.raw() MUST come before express.json() so the body
// stays as a raw Buffer for signature verification. Also bump the limit to
// 1 MB — push events with multiple commits can exceed the 100 KB default.
app.use("/api/github-webhook", express.raw({ type: "application/json", limit: "1mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Redirect non-www → www (301) for all requests
app.use((req, res, next) => {
  // Signal that this middleware is active (remove after confirming)
  res.setHeader("X-Www-Redirect", "active");
  
  const hostname = (req.hostname || req.get("host") || "").split(":")[0];
  if (
    hostname === "jobsdonelabs.ai" ||
    (hostname.endsWith(".jobsdonelabs.ai") && !hostname.startsWith("www."))
  ) {
    const target = "www." + hostname.replace(/^(www\.)?/, "");
    const location = `https://${target}${req.originalUrl}`;
    return res.redirect(301, location);
  }
  next();
});

app.use(blogRouter);
app.use("/api", router);

export default app;