import { refreshTikTokToken, loadEnv } from "../../server/tiktokService.js";

loadEnv();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const result = await refreshTikTokToken();
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    return res.status(200).json(result);
  } catch (err) {
    const safeMessage = err instanceof Error ? err.message : "Failed to refresh token";
    return res.status(400).json({
      success: false,
      error: safeMessage,
      secret_values_exposed: false,
    });
  }
}
