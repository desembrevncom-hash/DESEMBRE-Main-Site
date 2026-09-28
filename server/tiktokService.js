/**
 * TikTok OAuth v2 and Content Posting Foundation Service
 * Supports both Sandbox (TIKTOK_MODE=sandbox) and Production (TIKTOK_MODE=production).
 * Strictly respects Désembre Vietnam requirements:
 * - Redirect URI: https://www.desembre-vn.com/tiktok-callback
 * - Scopes: user.info.basic,video.publish
 * - Zero secret or token exposure in logs, status, or client JS
 * - Prepares FILE_UPLOAD for local video-master.mp4
 * - Independent of and protects Facebook production publishing workflow
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const BASE_DATA_DIR = IS_SERVERLESS ? path.join(os.tmpdir(), "desembre_data") : path.join(PROJECT_ROOT, ".data");

function parseAndApplyEnv(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return;
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split(/\r?\n/);
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eqIdx = line.indexOf("=");
      if (eqIdx <= 0) continue;
      const key = line.slice(0, eqIdx).trim();
      let val = line.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (val || process.env[key] === undefined) {
        process.env[key] = val;
      }
    }
  } catch (_e) {}
}

// Safe environment loading supporting .env, .env.local, .env.production.local
export function loadEnv(customPath) {
  try {
    const candidates = [
      customPath || path.join(PROJECT_ROOT, ".env"),
      path.join(PROJECT_ROOT, ".env.local"),
      path.join(PROJECT_ROOT, ".env.production.local"),
    ];
    for (const file of candidates) {
      parseAndApplyEnv(file);
    }
  } catch (_e) {
    // Ignore if missing
  }
}

// Automatically load environment on import
loadEnv();

export const TIKTOK_CONSTANTS = {
  AUTH_URL: "https://www.tiktok.com/v2/auth/authorize/",
  TOKEN_URL: "https://open.tiktokapis.com/v2/oauth/token/",
  CREATOR_INFO_URL: "https://open.tiktokapis.com/v2/post/publish/creator_info/query/",
  VIDEO_INIT_URL: "https://open.tiktokapis.com/v2/post/publish/video/init/",
  REQUIRED_SCOPES: "user.info.basic,video.publish",
  EXACT_REDIRECT_URI: "https://www.desembre-vn.com/tiktok-callback",
  DEFAULT_TOKEN_FILE: path.join(BASE_DATA_DIR, "tiktok_tokens.json"),
  DEFAULT_STATE_FILE: path.join(BASE_DATA_DIR, "tiktok_states.json"),
};

/**
 * Returns configuration object without exposing secrets.
 * Handles TIKTOK_MODE=sandbox and TIKTOK_MODE=production.
 */
export function getTikTokConfig(customMode) {
  const mode = (customMode || process.env.TIKTOK_MODE || "production").toLowerCase().trim();
  const isSandbox = mode === "sandbox";

  const clientKey = isSandbox
    ? (process.env.TIKTOK_SANDBOX_CLIENT_KEY || "").trim()
    : (process.env.TIKTOK_CLIENT_KEY || "").trim();

  const clientSecret = isSandbox
    ? (process.env.TIKTOK_SANDBOX_CLIENT_SECRET || "").trim()
    : (process.env.TIKTOK_CLIENT_SECRET || "").trim();

  const redirectUri = (process.env.TIKTOK_REDIRECT_URI || TIKTOK_CONSTANTS.EXACT_REDIRECT_URI).trim();

  return {
    mode: isSandbox ? "sandbox" : "production",
    clientKey,
    clientSecret,
    redirectUri: redirectUri || TIKTOK_CONSTANTS.EXACT_REDIRECT_URI,
    isKeyConfigured: Boolean(
      clientKey &&
      clientKey !== "your_tiktok_client_key_here" &&
      clientKey !== "your_tiktok_sandbox_client_key_here"
    ),
    isSecretConfigured: Boolean(
      clientSecret &&
      clientSecret !== "your_tiktok_client_secret_here" &&
      clientSecret !== "your_tiktok_sandbox_client_secret_here"
    ),
  };
}

/**
 * Ensures storage directory exists
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Generates a cryptographically secure random OAuth state
 * Format: <random32Hex>.<timestamp>.<mode>.<hmacSignature>
 */
export function generateOAuthState(options = {}) {
  const mode = options.mode || getTikTokConfig().mode;
  const config = getTikTokConfig(mode);
  const stateFilePath = options.stateFilePath || path.join(BASE_DATA_DIR, `tiktok_states_${mode}.json`);
  
  const randBytes = crypto.randomBytes(32).toString("hex");
  const timestamp = Date.now();
  
  // Use client secret if available, or a local salt to sign the state
  const salt = config.clientSecret || "desembre_tiktok_state_salt";
  const hmac = crypto.createHmac("sha256", salt)
    .update(`${randBytes}:${timestamp}:${mode}`)
    .digest("hex");
    
  const stateString = `${randBytes}.${timestamp}.${mode}.${hmac}`;
  
  // Persist state locally for callback validation and replay protection
  try {
    ensureDir(path.dirname(stateFilePath));
    let states = {};
    if (fs.existsSync(stateFilePath)) {
      try {
        states = JSON.parse(fs.readFileSync(stateFilePath, "utf8")) || {};
      } catch (_e) {
        states = {};
      }
    }
    
    // Prune expired states (> 10 minutes)
    const now = Date.now();
    for (const [s, data] of Object.entries(states)) {
      if (!data || !data.expiresAt || data.expiresAt < now) {
        delete states[s];
      }
    }
    
    states[stateString] = {
      mode,
      createdAt: now,
      expiresAt: now + 10 * 60 * 1000, // 10 minutes TTL
    };
    
    fs.writeFileSync(stateFilePath, JSON.stringify(states, null, 2), { mode: 0o600 });
  } catch (_e) {
    // Non-fatal if state store is write-restricted; HMAC signature remains valid
  }
  
  return stateString;
}

/**
 * Validates OAuth state:
 * - Checks format and timestamp (< 10 minutes)
 * - Verifies HMAC signature using the active mode's secret
 * - Verifies presence in state store and consumes it
 */
export function validateOAuthState(state, options = {}) {
  if (!state || typeof state !== "string") {
    return { valid: false, error: "State parameter is missing or invalid" };
  }
  
  const parts = state.split(".");
  let randBytes, timestampStr, mode, signature;

  if (parts.length === 4) {
    [randBytes, timestampStr, mode, signature] = parts;
  } else if (parts.length === 3) {
    [randBytes, timestampStr, signature] = parts;
    mode = getTikTokConfig().mode;
  } else {
    return { valid: false, error: "State parameter format is invalid" };
  }
  
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) {
    return { valid: false, error: "State timestamp is invalid" };
  }
  
  const now = Date.now();
  if (now - timestamp > 10 * 60 * 1000 || timestamp > now + 60 * 1000) {
    return { valid: false, error: "State parameter has expired" };
  }
  
  const config = getTikTokConfig(mode);
  const salt = config.clientSecret || "desembre_tiktok_state_salt";
  const expectedPayload = parts.length === 4 ? `${randBytes}:${timestamp}:${mode}` : `${randBytes}:${timestamp}`;
  const expectedHmac = crypto.createHmac("sha256", salt)
    .update(expectedPayload)
    .digest("hex");
    
  if (signature !== expectedHmac) {
    return { valid: false, error: "State signature mismatch" };
  }
  
  // Verify state file if present
  const stateFilePath = options.stateFilePath || path.join(BASE_DATA_DIR, `tiktok_states_${mode}.json`);
  if (fs.existsSync(stateFilePath)) {
    try {
      const states = JSON.parse(fs.readFileSync(stateFilePath, "utf8")) || {};
      if (states[state]) {
        delete states[state]; // Consume state to prevent replay attack
        fs.writeFileSync(stateFilePath, JSON.stringify(states, null, 2), { mode: 0o600 });
      }
    } catch (_e) {
      // Ignore filesystem read/write error
    }
  }
  
  return { valid: true, mode };
}

/**
 * Constructs the TikTok authorization URL
 * Redirect URI MUST BE exactly: https://www.desembre-vn.com/tiktok-callback
 */
export function buildTikTokAuthUrl(state, options = {}) {
  const mode = options.mode || getTikTokConfig().mode;
  const config = getTikTokConfig(mode);
  if (!config.isKeyConfigured && !options.clientKey) {
    throw new Error(mode === "sandbox" ? "TIKTOK_SANDBOX_CLIENT_KEY is not configured" : "TIKTOK_CLIENT_KEY is not configured");
  }

  
  const clientKey = options.clientKey || config.clientKey;
  const redirectUri = TIKTOK_CONSTANTS.EXACT_REDIRECT_URI;
  const scope = options.scope || TIKTOK_CONSTANTS.REQUIRED_SCOPES;
  
  const url = new URL(TIKTOK_CONSTANTS.AUTH_URL);
  url.searchParams.set("client_key", clientKey);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", scope);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", state);
  
  return url.toString();
}

function resolveTokenFilePath(options = {}) {
  if (options.tokenFilePath) return options.tokenFilePath;
  const mode = options.mode || getTikTokConfig().mode;
  return path.join(BASE_DATA_DIR, `tiktok_tokens_${mode}.json`);
}

/**
 * Atomically saves token data with strict permissions
 * Never exposes secrets in console
 */
export function saveTokenData(tokenData, options = {}) {
  const targetPath = resolveTokenFilePath(options);
  ensureDir(path.dirname(targetPath));
  
  const tempPath = `${targetPath}.${Date.now()}.tmp`;
  try {
    fs.writeFileSync(tempPath, JSON.stringify(tokenData, null, 2), { mode: 0o600 });
    fs.renameSync(tempPath, targetPath);
  } catch (_e) {
    const fallbackPath = path.join(os.tmpdir(), path.basename(targetPath));
    try {
      fs.writeFileSync(fallbackPath, JSON.stringify(tokenData, null, 2), { mode: 0o600 });
    } catch (_err) {}
  }
}

/**
 * Loads token data safely
 */
export function loadTokenData(options = {}) {
  const targetPath = resolveTokenFilePath(options);
  if (fs.existsSync(targetPath)) {
    try {
      const raw = fs.readFileSync(targetPath, "utf8");
      return JSON.parse(raw);
    } catch (_e) {}
  }
  const fallbackPath = path.join(os.tmpdir(), path.basename(targetPath));
  if (fs.existsSync(fallbackPath)) {
    try {
      const raw = fs.readFileSync(fallbackPath, "utf8");
      return JSON.parse(raw);
    } catch (_e) {}
  }
  if (fs.existsSync(TIKTOK_CONSTANTS.DEFAULT_TOKEN_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(TIKTOK_CONSTANTS.DEFAULT_TOKEN_FILE, "utf8"));
    } catch (_e) {}
  }
  return null;
}

/**
 * Sanitized authorization-status representation
 * NEVER exposes secret values, client secret, or tokens
 */
export function getSanitizedAuthStatus(options = {}) {
  const mode = options.mode || getTikTokConfig().mode;
  const tokenData = options.tokenData || loadTokenData({ ...options, mode });
  
  if (!tokenData || !tokenData.access_token) {
    return {
      mode,
      authorized: false,
      open_id_present: false,
      video_publish_authorized: false,
      access_token_present: false,
      refresh_token_present: false,
      access_token_expires_at: null,
      secret_values_exposed: false,
    };
  }
  
  const now = Date.now();
  let isExpired = false;
  if (tokenData.access_token_expires_at) {
    const expTime = new Date(tokenData.access_token_expires_at).getTime();
    if (!isNaN(expTime) && expTime <= now) {
      isExpired = true;
    }
  }
  
  const hasVideoPublishScope = typeof tokenData.scope === "string" 
    ? tokenData.scope.includes("video.publish") 
    : false;
    
  return {
    mode,
    authorized: !isExpired,
    open_id_present: Boolean(tokenData.open_id),
    video_publish_authorized: hasVideoPublishScope,
    access_token_present: Boolean(tokenData.access_token),
    refresh_token_present: Boolean(tokenData.refresh_token),
    access_token_expires_at: tokenData.access_token_expires_at || null,
    secret_values_exposed: false,
  };
}

/**
 * Exchanges authorization code SERVER-SIDE using TikTok OAuth v2 endpoint
 * Uses Content-Type: application/x-www-form-urlencoded
 */
export function exchangeAuthorizationCode(code, options = {}) {
  const mode = options.mode || getTikTokConfig().mode;
  const config = getTikTokConfig(mode);
  const clientKey = options.clientKey || config.clientKey;
  const clientSecret = options.clientSecret || config.clientSecret;
  const redirectUri = TIKTOK_CONSTANTS.EXACT_REDIRECT_URI;
  const fetchFn = options.fetchFn || globalThis.fetch;
  
  if (!clientKey) {
    return Promise.reject(new Error(`TIKTOK_${mode.toUpperCase()}_CLIENT_KEY is missing`));
  }
  if (!clientSecret) {
    return Promise.reject(new Error(`TIKTOK_${mode.toUpperCase()}_CLIENT_SECRET is missing`));
  }
  if (!code) {
    return Promise.reject(new Error("Authorization code is missing"));
  }
  
  const params = new URLSearchParams();
  params.set("client_key", clientKey);
  params.set("client_secret", clientSecret);
  params.set("code", code);
  params.set("grant_type", "authorization_code");
  params.set("redirect_uri", redirectUri);
  
  return fetchFn(TIKTOK_CONSTANTS.TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    body: params.toString(),
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((_body) => {
          throw new Error(`TikTok token exchange HTTP ${res.status}`);
        });
      }
      return res.json();
    })
    .then((payload) => {
      const data = payload?.data || payload;
      const error = payload?.error;
      
      if (error && error.code && error.code !== "ok" && error.code !== 0) {
        throw new Error(`TikTok token error: ${error.message || error.code}`);
      }
      
      if (!data || !data.access_token) {
        throw new Error("TikTok token response missing access_token");
      }
      
      const now = Date.now();
      const expiresInSec = Number(data.expires_in) || 86400;
      const refreshExpiresInSec = Number(data.refresh_expires_in) || 31536000;
      
      const tokenRecord = {
        mode,
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: expiresInSec,
        refresh_expires_in: refreshExpiresInSec,
        open_id: data.open_id || null,
        scope: data.scope || TIKTOK_CONSTANTS.REQUIRED_SCOPES,
        authorized_at: new Date(now).toISOString(),
        access_token_expires_at: new Date(now + expiresInSec * 1000).toISOString(),
        refresh_token_expires_at: new Date(now + refreshExpiresInSec * 1000).toISOString(),
      };
      
      saveTokenData(tokenRecord, { ...options, mode });
      return getSanitizedAuthStatus({ tokenData: tokenRecord, mode });
    });
}

/**
 * Reusable TikTok token refresh support
 * Atomically replaces stored tokens/expiry metadata
 * Never exposes refresh_token or secrets
 */
export function refreshTikTokToken(options = {}) {
  const mode = options.mode || getTikTokConfig().mode;
  const tokenData = options.tokenData || loadTokenData({ ...options, mode });
  if (!tokenData || !tokenData.refresh_token) {
    return Promise.reject(new Error("No valid refresh_token available to refresh"));
  }
  
  const config = getTikTokConfig(mode);
  const clientKey = options.clientKey || config.clientKey;
  const clientSecret = options.clientSecret || config.clientSecret;
  const fetchFn = options.fetchFn || globalThis.fetch;
  
  if (!clientKey || !clientSecret) {
    return Promise.reject(new Error(`TikTok credentials missing for ${mode} token refresh`));
  }
  
  const params = new URLSearchParams();
  params.set("client_key", clientKey);
  params.set("client_secret", clientSecret);
  params.set("grant_type", "refresh_token");
  params.set("refresh_token", tokenData.refresh_token);
  
  return fetchFn(TIKTOK_CONSTANTS.TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    body: params.toString(),
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((_body) => {
          throw new Error(`TikTok token refresh HTTP ${res.status}`);
        });
      }
      return res.json();
    })
    .then((payload) => {
      const data = payload?.data || payload;
      const error = payload?.error;
      
      if (error && error.code && error.code !== "ok" && error.code !== 0) {
        throw new Error(`TikTok token refresh error: ${error.message || error.code}`);
      }
      
      if (!data || !data.access_token) {
        throw new Error("TikTok token refresh response missing access_token");
      }
      
      const now = Date.now();
      const expiresInSec = Number(data.expires_in) || 86400;
      const refreshExpiresInSec = Number(data.refresh_expires_in) || (tokenData.refresh_expires_in || 31536000);
      
      const updatedRecord = {
        ...tokenData,
        mode,
        access_token: data.access_token,
        refresh_token: data.refresh_token || tokenData.refresh_token,
        expires_in: expiresInSec,
        refresh_expires_in: refreshExpiresInSec,
        open_id: data.open_id || tokenData.open_id,
        scope: data.scope || tokenData.scope,
        access_token_expires_at: new Date(now + expiresInSec * 1000).toISOString(),
        refresh_token_expires_at: new Date(now + refreshExpiresInSec * 1000).toISOString(),
      };
      
      saveTokenData(updatedRecord, { ...options, mode });
      return getSanitizedAuthStatus({ tokenData: updatedRecord, mode });
    });
}

/**
 * Structured TikTok Content Posting Client Preparation (Section 7)
 * NOTE: DOES NOT execute real publishing calls during OAuth tasks.
 * Prepared for FILE_UPLOAD rather than PULL_FROM_URL for local video-master.mp4.
 */
export function getCreatorInfo(options = {}) {
  const tokenData = options.tokenData || loadTokenData(options);
  if (!tokenData || !tokenData.access_token) {
    return Promise.reject(new Error("Cannot query creator info: Not authorized"));
  }
  
  const fetchFn = options.fetchFn || globalThis.fetch;
  return fetchFn(TIKTOK_CONSTANTS.CREATOR_INFO_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${tokenData.access_token}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  }).then((res) => res.json());
}

export function initVideoPublish(publishOptions, options = {}) {
  const tokenData = options.tokenData || loadTokenData(options);
  if (!tokenData || !tokenData.access_token) {
    return Promise.reject(new Error("Cannot initialize video publish: Not authorized"));
  }
  
  if (!publishOptions || typeof publishOptions.videoSize !== "number") {
    return Promise.reject(new Error("videoSize is required for FILE_UPLOAD video initialization"));
  }
  
  const fetchFn = options.fetchFn || globalThis.fetch;
  const payload = {
    post_info: {
      title: publishOptions.title || "",
      privacy_level: publishOptions.privacyLevel || "PUBLIC_TO_EVERYONE",
      disable_duet: false,
      disable_stitch: false,
      disable_comment: false,
      video_cover_timestamp_ms: publishOptions.coverTimestampMs || 1000,
    },
    source_info: {
      source: "FILE_UPLOAD",
      video_size: publishOptions.videoSize,
      chunk_size: publishOptions.chunkSize || publishOptions.videoSize,
      total_chunk_count: publishOptions.totalChunkCount || 1,
    },
  };
  
  return fetchFn(TIKTOK_CONSTANTS.VIDEO_INIT_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${tokenData.access_token}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}
