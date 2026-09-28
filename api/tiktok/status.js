import { getSanitizedAuthStatus, loadEnv } from "../../server/tiktokService.js";

loadEnv();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  const status = getSanitizedAuthStatus();
  return res.status(200).json(status);
}
