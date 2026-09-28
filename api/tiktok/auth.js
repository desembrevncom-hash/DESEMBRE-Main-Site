import { buildTikTokAuthUrl, generateOAuthState, getTikTokConfig, loadEnv } from "../../server/tiktokService.js";

loadEnv();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  try {
    const config = getTikTokConfig();
    if (!config.isKeyConfigured) {
      const acceptsJson = req.headers.accept?.includes("application/json") || req.headers["user-agent"]?.includes("curl");
      if (acceptsJson) {
        return res.status(400).json({
          error: "TIKTOK_CLIENT_KEY is not configured",
          config_status: "NOT_CONFIGURED",
        });
      }
      return res.redirect(302, "/tiktok?error=missing_credentials");
    }

    const state = generateOAuthState();
    const authUrl = buildTikTokAuthUrl(state);

    return res.redirect(302, authUrl);
  } catch (err) {
    const safeMessage = err instanceof Error ? err.message : "Failed to initiate TikTok OAuth";
    const acceptsJson = req.headers.accept?.includes("application/json") || req.headers["user-agent"]?.includes("curl");
    if (acceptsJson) {
      return res.status(500).json({ error: safeMessage });
    }
    return res.redirect(302, `/tiktok?error=${encodeURIComponent(safeMessage)}`);
  }
}
