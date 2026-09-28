#!/usr/bin/env node
/**
 * TikTok Authorization Preflight Check
 * Strictly read-only; never publishes content.
 * Never exposes credentials or secrets.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { getTikTokConfig, getSanitizedAuthStatus, loadEnv } from "../server/tiktokService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from project root
loadEnv(path.resolve(__dirname, "..", ".env"));

const config = getTikTokConfig();
const status = getSanitizedAuthStatus();

const configStatus = (config.isKeyConfigured && config.isSecretConfigured) ? "VALID" : "NOT_CONFIGURED";
const authStatus = status.authorized ? "AUTHORIZED" : "NOT_AUTHORIZED";
const scopeStatus = status.video_publish_authorized ? "AUTHORIZED" : "NOT_AUTHORIZED";

console.log(`TIKTOK_CONFIG_STATUS: ${configStatus}`);
console.log(`TIKTOK_AUTH_STATUS: ${authStatus}`);
console.log(`ACCESS_TOKEN_PRESENT: ${status.access_token_present}`);
console.log(`REFRESH_TOKEN_PRESENT: ${status.refresh_token_present}`);
console.log(`VIDEO_PUBLISH_SCOPE: ${scopeStatus}`);
console.log(`OPEN_ID_PRESENT: ${status.open_id_present}`);
console.log(`SECRET_VALUES_EXPOSED: false`);

process.exit(0);
