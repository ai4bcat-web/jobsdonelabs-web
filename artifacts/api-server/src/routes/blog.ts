import { Router, type IRouter, type Request, type Response } from "express";
import fs from "fs/promises";
import path from "path";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const workspaceRoot = process.cwd().endsWith(path.join("artifacts", "api-server"))
  ? path.resolve(process.cwd(), "../..")
  : process.cwd();

const publicDir = path.resolve(workspaceRoot, "artifacts/landing-page/public");

async function serveHtml(res: Response, filePath: string): Promise<boolean> {
  try {
    const html = await fs.readFile(filePath, "utf-8");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=300");
    res.status(200).send(html);
    return true;
  } catch {
    return false;
  }
}

// Blog index
router.get("/blog", async (_req: Request, res: Response) => {
  const served = await serveHtml(res, path.join(publicDir, "blog", "index.html"));
  if (!served) { logger.warn("Blog index not found"); res.status(404).send("Not found"); }
});
router.get("/blog/", async (_req: Request, res: Response) => {
  const served = await serveHtml(res, path.join(publicDir, "blog", "index.html"));
  if (!served) { logger.warn("Blog index not found"); res.status(404).send("Not found"); }
});

// Blog post
router.get("/blog/:slug", async (req: Request, res: Response) => {
  const slug = req.params["slug"] as string;
  const served = await serveHtml(res, path.join(publicDir, "blog", slug, "index.html"));
  if (!served) { logger.warn({ slug }, "Blog post not found"); res.status(404).send("Not found"); }
});
router.get("/blog/:slug/", async (req: Request, res: Response) => {
  const slug = req.params["slug"] as string;
  const served = await serveHtml(res, path.join(publicDir, "blog", slug, "index.html"));
  if (!served) { logger.warn({ slug }, "Blog post not found"); res.status(404).send("Not found"); }
});

// About pages
router.get("/about/:slug", async (req: Request, res: Response) => {
  const slug = req.params["slug"] as string;
  const served = await serveHtml(res, path.join(publicDir, "about", slug, "index.html"));
  if (!served) { logger.warn({ slug }, "About page not found"); res.status(404).send("Not found"); }
});
router.get("/about/:slug/", async (req: Request, res: Response) => {
  const slug = req.params["slug"] as string;
  const served = await serveHtml(res, path.join(publicDir, "about", slug, "index.html"));
  if (!served) { logger.warn({ slug }, "About page not found"); res.status(404).send("Not found"); }
});

// Case study pages
router.get("/case-study/:slug", async (req: Request, res: Response) => {
  const slug = req.params["slug"] as string;
  const served = await serveHtml(res, path.join(publicDir, "case-study", slug, "index.html"));
  if (!served) { logger.warn({ slug }, "Case study not found"); res.status(404).send("Not found"); }
});
router.get("/case-study/:slug/", async (req: Request, res: Response) => {
  const slug = req.params["slug"] as string;
  const served = await serveHtml(res, path.join(publicDir, "case-study", slug, "index.html"));
  if (!served) { logger.warn({ slug }, "Case study not found"); res.status(404).send("Not found"); }
});

export default router;
