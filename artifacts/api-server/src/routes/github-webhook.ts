import { Router, type IRouter, type Request, type Response } from "express";
import crypto from "crypto";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import { logger } from "../lib/logger";

const execAsync = promisify(exec);
const router: IRouter = Router();

function verifySignature(
  secret: string,
  payload: Buffer,
  signature: string,
): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  const expected = `sha256=${hmac.digest("hex")}`;
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected),
    );
  } catch {
    return false;
  }
}

router.post("/github-webhook", async (req: Request, res: Response) => {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret) {
    logger.error("GITHUB_WEBHOOK_SECRET is not set");
    res.status(500).json({ error: "Webhook secret not configured" });
    return;
  }

  const signature = req.headers["x-hub-signature-256"] as string | undefined;
  if (!signature) {
    res.status(401).json({ error: "Missing X-Hub-Signature-256 header" });
    return;
  }

  const payload = req.body as Buffer;
  if (!Buffer.isBuffer(payload) || payload.length === 0) {
    res.status(400).json({ error: "Empty or non-raw body" });
    return;
  }

  if (!verifySignature(secret, payload, signature)) {
    res.status(401).json({ error: "Invalid signature" });
    return;
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(payload.toString()) as Record<string, unknown>;
  } catch {
    res.status(400).json({ error: "Invalid JSON payload" });
    return;
  }

  const ref = event.ref as string | undefined;
  if (!ref?.endsWith("/main")) {
    res.status(200).json({ message: `Ignored push to ${ref ?? "unknown ref"}` });
    return;
  }

  res.status(200).json({ message: "Pull triggered" });

  const workspaceRoot = process.cwd().endsWith(
    path.join("artifacts", "api-server"),
  )
    ? path.resolve(process.cwd(), "../..")
    : process.cwd();

  try {
    // -X ours: auto-resolve conflicts by preferring the local (Replit) version.
    // New files from GitHub (blog posts, etc.) are always brought in since they
    // have no conflict. For files edited on both sides (e.g. index.html with
    // SEO improvements), Replit's version is preserved.
    const { stdout, stderr } = await execAsync(
      "git pull -X ours",
      { cwd: workspaceRoot },
    );
    logger.info({ stdout, stderr }, "git pull completed");
  } catch (err) {
    logger.error({ err }, "git pull failed");
  }
});

export default router;
