import {
  prepareSandboxVideoTestPreflight,
  loadSandboxTestState,
  executeStagedSandboxVideoTest,
  loadEnv,
} from "../../server/tiktokService.js";

loadEnv();

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  // GET: Read-only preflight and latest test state. Never executes publication.
  if (req.method === "GET") {
    try {
      const preflight = await prepareSandboxVideoTestPreflight({ req });
      const testState = loadSandboxTestState();
      return res.status(200).json({
        preflight,
        last_test_state: testState || null,
        safety_status: {
          mode: preflight.mode,
          production_hard_block: preflight.production_hard_block,
          allow_sandbox_publish: preflight.allow_sandbox_publish,
          secret_values_exposed: false,
        },
      });
    } catch (err) {
      const safeError = err instanceof Error ? err.message : "Preflight query failed";
      return res.status(500).json({ error: safeError, secret_values_exposed: false });
    }
  }

  // POST: Explicit manual execution only. Requires explicit approval header and flag.
  if (req.method === "POST") {
    const isExecutionAuthorized =
      req.headers["x-execute-sandbox-test"] === "true" ||
      req.query?.execute === "true";

    if (!isExecutionAuthorized || process.env.TIKTOK_ALLOW_SANDBOX_PUBLISH !== "true") {
      return res.status(403).json({
        error: "SAFETY_GUARD_BLOCKED: Sandbox publication requires explicit approval and TIKTOK_ALLOW_SANDBOX_PUBLISH=true",
        mode: process.env.TIKTOK_MODE || "sandbox",
        allow_sandbox_publish: process.env.TIKTOK_ALLOW_SANDBOX_PUBLISH === "true",
        secret_values_exposed: false,
      });
    }

    try {
      const result = await executeStagedSandboxVideoTest({ req });
      return res.status(200).json(result);
    } catch (err) {
      const safeError = err instanceof Error ? err.message : "Sandbox video test failed";
      return res.status(400).json({
        error: safeError,
        secret_values_exposed: false,
      });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method Not Allowed" });
}
