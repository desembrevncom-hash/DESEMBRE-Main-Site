import { runPreflightCheck, loadEnv } from "../../server/tiktokService.js";

loadEnv();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  try {
    const preflight = await runPreflightCheck({ req });
    return res.status(200).json(preflight);
  } catch (err) {
    const safeError = err instanceof Error ? err.message : "Preflight execution failed";
    return res.status(500).json({
      error: safeError,
      mode: process.env.TIKTOK_MODE || "sandbox",
      oauth_authorized: false,
      video_publish_scope: "NOT_AUTHORIZED",
      file_upload_ready: false,
      secret_values_exposed: false,
      real_tiktok_video_init_calls: 0,
      real_tiktok_upload_calls: 0,
      real_tiktok_publish_calls: 0,
      real_facebook_publish_calls: 0,
    });
  }
}
