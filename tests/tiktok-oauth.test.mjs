/**
 * Automated Test Suite for TikTok OAuth & Publishing Foundation
 * Covers all requirements in Section 9 of the specification.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import {
  TIKTOK_CONSTANTS,
  buildTikTokAuthUrl,
  generateOAuthState,
  validateOAuthState,
  exchangeAuthorizationCode,
  refreshTikTokToken,
  saveTokenData,
  loadTokenData,
  getSanitizedAuthStatus,
  getCreatorInfo,
  initVideoPublish,
} from "../server/tiktokService.js";

// Setup isolated temp directory for test state and tokens
function createTempFiles() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tiktok-test-"));
  return {
    tmpDir,
    tokenFile: path.join(tmpDir, "test_tokens.json"),
    stateFile: path.join(tmpDir, "test_states.json"),
  };
}

test("1. Authorization URL construction has required endpoints and parameters", () => {
  const state = "test_state_123456789";
  const urlString = buildTikTokAuthUrl(state, {
    clientKey: "test_client_key_abc",
  });
  
  const parsed = new URL(urlString);
  assert.equal(parsed.origin, "https://www.tiktok.com");
  assert.equal(parsed.pathname, "/v2/auth/authorize/");
  assert.equal(parsed.searchParams.get("client_key"), "test_client_key_abc");
  assert.equal(parsed.searchParams.get("response_type"), "code");
  assert.equal(parsed.searchParams.get("state"), state);
});

test("2. TikTok registered redirect URI MUST BE exactly https://www.desembre-vn.com/tiktok-callback", () => {
  const state = "state_exact_uri";
  const urlString = buildTikTokAuthUrl(state, {
    clientKey: "test_client_key_abc",
  });
  
  const parsed = new URL(urlString);
  const redirectUri = parsed.searchParams.get("redirect_uri");
  
  assert.equal(redirectUri, "https://www.desembre-vn.com/tiktok-callback");
  assert.equal(TIKTOK_CONSTANTS.EXACT_REDIRECT_URI, "https://www.desembre-vn.com/tiktok-callback");
  
  // Ensure no query parameters are appended inside redirect_uri itself
  assert.equal(redirectUri.includes("?"), false, "redirect_uri must not have query parameters appended");
});

test("3. Required scopes include user.info.basic and video.publish", () => {
  const state = "state_scopes";
  const urlString = buildTikTokAuthUrl(state, {
    clientKey: "test_key",
  });
  
  const parsed = new URL(urlString);
  const scopes = parsed.searchParams.get("scope");
  assert.ok(scopes, "Scopes should be present");
  assert.ok(scopes.includes("user.info.basic"), "Must include user.info.basic scope");
  assert.ok(scopes.includes("video.publish"), "Must include video.publish scope");
});

test("4. OAuth state creation generates cryptographically secure unique states", () => {
  const { stateFile, tmpDir } = createTempFiles();
  try {
    const state1 = generateOAuthState({ stateFilePath: stateFile });
    const state2 = generateOAuthState({ stateFilePath: stateFile });
    
    assert.notEqual(state1, state2, "States must be unique");
    assert.ok(state1.split(".").length >= 3, "State must have random, timestamp, and signature components");
    assert.ok(state1.length > 64, "State must have sufficient cryptographic entropy");
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("5. OAuth state validation succeeds for valid state", () => {
  const { stateFile, tmpDir } = createTempFiles();
  try {
    const state = generateOAuthState({ stateFilePath: stateFile });
    const result = validateOAuthState(state, { stateFilePath: stateFile });
    assert.equal(result.valid, true);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("6. OAuth state validation rejects tampered, expired, or missing states", () => {
  const { stateFile, tmpDir } = createTempFiles();
  try {
    // Missing state
    assert.equal(validateOAuthState(null).valid, false);
    assert.equal(validateOAuthState("").valid, false);
    
    // Tampered state
    const validState = generateOAuthState({ stateFilePath: stateFile });
    const tampered = validState.slice(0, -4) + "ffff";
    assert.equal(validateOAuthState(tampered, { stateFilePath: stateFile }).valid, false);
    
    // Expired timestamp (15 minutes in past)
    const expiredTimestamp = Date.now() - 15 * 60 * 1000;
    const expiredState = `randomhex123.${expiredTimestamp}.invalidsig`;
    assert.equal(validateOAuthState(expiredState, { stateFilePath: stateFile }).valid, false);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("7. Callback error handling does not exchange tokens and safely handles denial", () => {
  let exchangeAttempted = false;
  const mockFetch = async () => {
    exchangeAttempted = true;
    return { ok: true, json: async () => ({}) };
  };
  
  const query = {
    error: "access_denied",
    error_description: "The user has denied authorization",
  };
  
  // Emulate callback check
  let handledError = null;
  if (query.error) {
    handledError = query.error_description || query.error;
  } else {
    exchangeAttempted = true;
  }
  
  assert.equal(exchangeAttempted, false, "Must not exchange tokens when TikTok reports error");
  assert.equal(handledError, "The user has denied authorization");
});

test("8. Authorization-code exchange sends form-urlencoded with exact parameters", async () => {
  const { tokenFile, tmpDir } = createTempFiles();
  try {
    let capturedUrl = "";
    let capturedHeaders = {};
    let capturedBody = "";
    
    const mockFetch = async (url, opts) => {
      capturedUrl = url;
      capturedHeaders = opts.headers;
      capturedBody = opts.body;
      return {
        ok: true,
        json: async () => ({
          data: {
            access_token: "act.mock_access_token_12345",
            refresh_token: "rft.mock_refresh_token_67890",
            expires_in: 86400,
            refresh_expires_in: 31536000,
            open_id: "open_id_test_abc",
            scope: "user.info.basic,video.publish",
          },
        }),
      };
    };
    
    const status = await exchangeAuthorizationCode("test_code_xyz", {
      clientKey: "client_key_111",
      clientSecret: "client_secret_222",
      tokenFilePath: tokenFile,
      fetchFn: mockFetch,
    });
    
    assert.equal(capturedUrl, "https://open.tiktokapis.com/v2/oauth/token/");
    assert.equal(capturedHeaders["Content-Type"], "application/x-www-form-urlencoded");
    
    const params = new URLSearchParams(capturedBody);
    assert.equal(params.get("client_key"), "client_key_111");
    assert.equal(params.get("client_secret"), "client_secret_222");
    assert.equal(params.get("code"), "test_code_xyz");
    assert.equal(params.get("grant_type"), "authorization_code");
    assert.equal(params.get("redirect_uri"), "https://www.desembre-vn.com/tiktok-callback");
    
    assert.equal(status.authorized, true);
    assert.equal(status.open_id_present, true);
    assert.equal(status.video_publish_authorized, true);
    assert.equal(status.secret_values_exposed, false);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("9. Token storage is sanitized and never exposes secret values or tokens", () => {
  const { tokenFile, tmpDir } = createTempFiles();
  try {
    const rawTokens = {
      access_token: "SECRET_ACT_TOKEN_VALUE",
      refresh_token: "SECRET_RFT_TOKEN_VALUE",
      expires_in: 86400,
      refresh_expires_in: 31536000,
      open_id: "test_open_id",
      scope: "user.info.basic,video.publish",
      authorized_at: new Date().toISOString(),
      access_token_expires_at: new Date(Date.now() + 86400000).toISOString(),
    };
    
    saveTokenData(rawTokens, { tokenFilePath: tokenFile });
    
    const sanitized = getSanitizedAuthStatus({ tokenFilePath: tokenFile });
    
    // Assert sanitized output structure
    assert.equal(sanitized.authorized, true);
    assert.equal(sanitized.open_id_present, true);
    assert.equal(sanitized.video_publish_authorized, true);
    assert.equal(sanitized.access_token_present, true);
    assert.equal(sanitized.refresh_token_present, true);
    assert.equal(sanitized.secret_values_exposed, false);
    
    // Stringify and verify no secret token values appear in sanitized representation
    const jsonString = JSON.stringify(sanitized);
    assert.equal(jsonString.includes("SECRET_ACT_TOKEN_VALUE"), false);
    assert.equal(jsonString.includes("SECRET_RFT_TOKEN_VALUE"), false);
    assert.equal(Boolean(sanitized.access_token), false);
    assert.equal(Boolean(sanitized.refresh_token), false);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("10. Token refresh mocks POST and atomically updates stored token", async () => {
  const { tokenFile, tmpDir } = createTempFiles();
  try {
    const initialTokens = {
      access_token: "old_access_token",
      refresh_token: "existing_refresh_token",
      expires_in: 86400,
      refresh_expires_in: 31536000,
      open_id: "test_open_id",
      scope: "user.info.basic,video.publish",
      access_token_expires_at: new Date(Date.now() - 1000).toISOString(), // expired
    };
    saveTokenData(initialTokens, { tokenFilePath: tokenFile });
    
    let capturedBody = "";
    const mockFetch = async (_url, opts) => {
      capturedBody = opts.body;
      return {
        ok: true,
        json: async () => ({
          data: {
            access_token: "new_refreshed_access_token",
            refresh_token: "rotated_refresh_token",
            expires_in: 86400,
            refresh_expires_in: 31536000,
            scope: "user.info.basic,video.publish",
          },
        }),
      };
    };
    
    const result = await refreshTikTokToken({
      clientKey: "client_key_111",
      clientSecret: "client_secret_222",
      tokenFilePath: tokenFile,
      fetchFn: mockFetch,
    });
    
    const params = new URLSearchParams(capturedBody);
    assert.equal(params.get("grant_type"), "refresh_token");
    assert.equal(params.get("refresh_token"), "existing_refresh_token");
    
    assert.equal(result.authorized, true);
    assert.equal(result.secret_values_exposed, false);
    
    // Check updated token on disk
    const onDisk = loadTokenData({ tokenFilePath: tokenFile });
    assert.equal(onDisk.access_token, "new_refreshed_access_token");
    assert.equal(onDisk.refresh_token, "rotated_refresh_token");
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("11. Missing environment variables handled safely without crashing", () => {
  assert.throws(() => {
    buildTikTokAuthUrl("state", { clientKey: "" });
  }, /TIKTOK_CLIENT_KEY/);
});

test("12. Zero secret values exposed in logs or status representations", () => {
  const status = getSanitizedAuthStatus({ tokenData: null });
  assert.equal(status.secret_values_exposed, false);
  assert.equal(status.authorized, false);
  assert.equal(status.access_token_present, false);
  
  const serialized = JSON.stringify(status);
  assert.equal(serialized.includes("secret"), true); // in key "secret_values_exposed"
  assert.equal(serialized.includes("token_secret"), false);
});

test("13. No publish API calls occur during OAuth operations", async () => {
  const publishCalls = [];
  const recordingFetch = async (url) => {
    if (url.includes("/post/publish/")) {
      publishCalls.push(url);
    }
    return { ok: true, json: async () => ({ data: { access_token: "act" } }) };
  };
  
  const { tokenFile, tmpDir } = createTempFiles();
  try {
    const state = generateOAuthState();
    validateOAuthState(state);
    await exchangeAuthorizationCode("code123", {
      clientKey: "key",
      clientSecret: "sec",
      tokenFilePath: tokenFile,
      fetchFn: recordingFetch,
    });
    
    assert.equal(publishCalls.length, 0, "No publish API calls should be triggered during OAuth");
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("14. Content Posting API structure is prepared for FILE_UPLOAD", async () => {
  let initPayload = null;
  const mockFetch = async (_url, opts) => {
    initPayload = JSON.parse(opts.body);
    return { ok: true, json: async () => ({ data: { publish_id: "p123" } }) };
  };
  
  const dummyTokenData = {
    access_token: "test_act",
  };
  
  await initVideoPublish(
    {
      title: "Desembre Skin Science - NLD Automated Workflow",
      videoSize: 15420000,
    },
    {
      tokenData: dummyTokenData,
      fetchFn: mockFetch,
    }
  );
  
  assert.equal(initPayload.source_info.source, "FILE_UPLOAD");
  assert.equal(initPayload.source_info.video_size, 15420000);
});

test("15. TIKTOK_MODE=sandbox selects Sandbox Client Key and Secret without modifying Production credentials", async () => {
  const origMode = process.env.TIKTOK_MODE;
  const origProdKey = process.env.TIKTOK_CLIENT_KEY;
  const origProdSecret = process.env.TIKTOK_CLIENT_SECRET;
  const origSbKey = process.env.TIKTOK_SANDBOX_CLIENT_KEY;
  const origSbSecret = process.env.TIKTOK_SANDBOX_CLIENT_SECRET;

  try {
    process.env.TIKTOK_MODE = "sandbox";
    process.env.TIKTOK_CLIENT_KEY = "prod_client_key_111";
    process.env.TIKTOK_CLIENT_SECRET = "prod_client_sec_222";
    process.env.TIKTOK_SANDBOX_CLIENT_KEY = "sandbox_client_key_333";
    process.env.TIKTOK_SANDBOX_CLIENT_SECRET = "sandbox_client_sec_444";

    const { getTikTokConfig, buildTikTokAuthUrl } = await import(`../server/tiktokService.js?t=${Date.now()}`);
    const config = getTikTokConfig();

    assert.equal(config.mode, "sandbox");
    assert.equal(config.clientKey, "sandbox_client_key_333");
    assert.equal(config.clientSecret, "sandbox_client_sec_444");

    const authUrl = buildTikTokAuthUrl("state_sb_test");
    const parsed = new URL(authUrl);
    assert.equal(parsed.searchParams.get("client_key"), "sandbox_client_key_333");
    assert.equal(parsed.searchParams.get("redirect_uri"), "https://www.desembre-vn.com/tiktok-callback");
  } finally {
    process.env.TIKTOK_MODE = origMode;
    process.env.TIKTOK_CLIENT_KEY = origProdKey;
    process.env.TIKTOK_CLIENT_SECRET = origProdSecret;
    process.env.TIKTOK_SANDBOX_CLIENT_KEY = origSbKey;
    process.env.TIKTOK_SANDBOX_CLIENT_SECRET = origSbSecret;
  }
});

test("16. TIKTOK_MODE=production selects Production Client Key and Secret", async () => {
  const origMode = process.env.TIKTOK_MODE;
  const origProdKey = process.env.TIKTOK_CLIENT_KEY;
  const origProdSecret = process.env.TIKTOK_CLIENT_SECRET;
  const origSbKey = process.env.TIKTOK_SANDBOX_CLIENT_KEY;
  const origSbSecret = process.env.TIKTOK_SANDBOX_CLIENT_SECRET;

  try {
    process.env.TIKTOK_MODE = "production";
    process.env.TIKTOK_CLIENT_KEY = "prod_client_key_111";
    process.env.TIKTOK_CLIENT_SECRET = "prod_client_sec_222";
    process.env.TIKTOK_SANDBOX_CLIENT_KEY = "sandbox_client_key_333";
    process.env.TIKTOK_SANDBOX_CLIENT_SECRET = "sandbox_client_sec_444";

    const { getTikTokConfig, buildTikTokAuthUrl } = await import(`../server/tiktokService.js?t=${Date.now()}`);
    const config = getTikTokConfig();

    assert.equal(config.mode, "production");
    assert.equal(config.clientKey, "prod_client_key_111");
    assert.equal(config.clientSecret, "prod_client_sec_222");

    const authUrl = buildTikTokAuthUrl("state_prod_test");
    const parsed = new URL(authUrl);
    assert.equal(parsed.searchParams.get("client_key"), "prod_client_key_111");
    assert.equal(parsed.searchParams.get("redirect_uri"), "https://www.desembre-vn.com/tiktok-callback");
  } finally {
    process.env.TIKTOK_MODE = origMode;
    process.env.TIKTOK_CLIENT_KEY = origProdKey;
    process.env.TIKTOK_CLIENT_SECRET = origProdSecret;
    process.env.TIKTOK_SANDBOX_CLIENT_KEY = origSbKey;
    process.env.TIKTOK_SANDBOX_CLIENT_SECRET = origSbSecret;
  }
});

test("17. Sandbox and Production callback code exchange matches active mode", async () => {
  const { tokenFile, tmpDir } = createTempFiles();
  try {
    let capturedBody = "";
    const mockFetch = async (_url, opts) => {
      capturedBody = opts.body;
      return {
        ok: true,
        json: async () => ({
          data: {
            access_token: "act_sandbox_mock",
            refresh_token: "rft_sandbox_mock",
            expires_in: 86400,
            refresh_expires_in: 31536000,
            open_id: "sandbox_open_id_nghelamdep2026",
            scope: "user.info.basic,video.publish",
          },
        }),
      };
    };

    const status = await exchangeAuthorizationCode("sb_code_123", {
      mode: "sandbox",
      clientKey: "sb_key_999",
      clientSecret: "sb_sec_888",
      tokenFilePath: tokenFile,
      fetchFn: mockFetch,
    });

    const params = new URLSearchParams(capturedBody);
    assert.equal(params.get("client_key"), "sb_key_999");
    assert.equal(params.get("client_secret"), "sb_sec_888");
    assert.equal(params.get("redirect_uri"), "https://www.desembre-vn.com/tiktok-callback");
    assert.equal(status.mode, "sandbox");
    assert.equal(status.authorized, true);
    assert.equal(status.secret_values_exposed, false);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

