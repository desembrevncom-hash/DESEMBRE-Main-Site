import {
  exchangeAuthorizationCode,
  validateOAuthState,
  loadEnv,
  encryptTokenPayload,
  loadTokenData,
  getTikTokConfig,
  queryCreatorInfo,
} from "../../server/tiktokService.js";

loadEnv();

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderHtmlResponse(title, content, isSuccess = true) {
  const accentColor = isSuccess ? "#10b981" : "#f43f5e";
  const badgeText = isSuccess ? "AUTHORIZED" : "ERROR";
  const badgeBg = isSuccess ? "rgba(16, 185, 129, 0.15)" : "rgba(244, 63, 94, 0.15)";
  const badgeBorder = isSuccess ? "rgba(16, 185, 129, 0.4)" : "rgba(244, 63, 94, 0.4)";

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} — DÉSEMBRE VIETNAM</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #020617;
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .card {
      background: #0b1120;
      border: 1px solid #1e293b;
      border-radius: 1.25rem;
      padding: 2.25rem;
      max-width: 32rem;
      width: 100%;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      text-align: center;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin-bottom: 1.25rem;
      background: ${badgeBg};
      border: 1px solid ${badgeBorder};
      color: ${accentColor};
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 0.75rem;
      letter-spacing: -0.025em;
    }
    p {
      color: #94a3b8;
      font-size: 0.875rem;
      line-height: 1.5;
      margin-bottom: 1.5rem;
    }
    .details {
      background: #020617;
      border: 1px solid #1e293b;
      border-radius: 0.75rem;
      padding: 1rem;
      font-size: 0.75rem;
      text-align: left;
      margin-bottom: 1.5rem;
      color: #cbd5e1;
    }
    .details div {
      display: flex;
      justify-content: space-between;
      padding: 0.25rem 0;
    }
    .details .key { color: #64748b; }
    .details .val { font-weight: 600; color: #f1f5f9; }
    .btn {
      display: inline-block;
      width: 100%;
      padding: 0.875rem 1.5rem;
      border-radius: 0.75rem;
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s;
      background: #d97706;
      color: #ffffff;
      border: none;
      cursor: pointer;
    }
    .btn:hover { background: #b45309; }
    .btn-secondary {
      background: #1e293b;
      color: #cbd5e1;
      margin-top: 0.5rem;
    }
    .btn-secondary:hover { background: #334155; color: #ffffff; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">${badgeText}</div>
    <h1>${escapeHtml(title)}</h1>
    ${content}
  </div>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  // Support both parsed req.query and URL parsing
  const url = new URL(req.url, `https://${req.headers.host || "www.desembre-vn.com"}`);
  const query = req.query || Object.fromEntries(url.searchParams.entries());

  const { code, state, error, error_description } = query;

  // Scenario 1: Direct access without OAuth parameters (Verification / Probe)
  if (!code && !state && !error) {
    const html = renderHtmlResponse(
      "TikTok OAuth Callback Gateway",
      `<p>Đây là public callback endpoint chính thức được đăng ký cho ứng dụng TikTok Web của Désembre Việt Nam.</p>
       <div class="details">
         <div><span class="key">Redirect URI:</span><span class="val">https://www.desembre-vn.com/tiktok-callback</span></div>
         <div><span class="key">Trạng thái:</span><span class="val" style="color:#10b981;">Đang lắng nghe</span></div>
         <div><span class="key">Mục đích:</span><span class="val">NLD Automated Video Publishing</span></div>
       </div>
       <a href="/tiktok" class="btn">Mở TikTok Studio Dashboard</a>`,
      true
    );
    return res.status(200).send(html);
  }

  // Scenario 2: Behavior A - TikTok reported an error
  if (error) {
    const safeError = typeof error_description === "string" ? error_description : error;
    const html = renderHtmlResponse(
      "Ủy quyền TikTok không thành công",
      `<p>TikTok phản hồi từ chối hoặc quá trình cấp quyền bị hủy bởi người dùng.</p>
       <div class="details">
         <div><span class="key">Mã lỗi:</span><span class="val" style="color:#f43f5e;">${escapeHtml(error)}</span></div>
         <div><span class="key">Mô tả:</span><span class="val">${escapeHtml(safeError)}</span></div>
         <div><span class="key">Bảo mật:</span><span class="val" style="color:#10b981;">0% Secret Exposed</span></div>
       </div>
       <a href="/api/tiktok/auth" class="btn">Thử kết nối lại</a>
       <a href="/tiktok" class="btn btn-secondary">Về TikTok Studio</a>`,
      false
    );
    return res.status(400).send(html);
  }

  // Scenario 3: Behavior B - Validate state
  const validation = validateOAuthState(state);
  if (!validation.valid) {
    const safeReason = validation.error || "State validation failed or expired";
    const html = renderHtmlResponse(
      "Lỗi xác thực OAuth State",
      `<p>Tham số bảo mật state không hợp lệ hoặc đã quá hạn 10 phút. Yêu cầu ủy quyền đã bị từ chối để bảo vệ an toàn.</p>
       <div class="details">
         <div><span class="key">Lý do:</span><span class="val" style="color:#f43f5e;">${escapeHtml(safeReason)}</span></div>
         <div><span class="key">Bảo vệ:</span><span class="val">Chống CSRF & Replay Attack</span></div>
       </div>
       <a href="/api/tiktok/auth" class="btn">Thử kết nối lại</a>
       <a href="/tiktok" class="btn btn-secondary">Về TikTok Studio</a>`,
      false
    );
    return res.status(400).send(html);
  }

  const activeMode = validation.mode || getTikTokConfig().mode;
  const isSandbox = activeMode === "sandbox";

  // Check code presence
  if (!code || typeof code !== "string") {
    const html = renderHtmlResponse(
      "Thiếu Authorization Code",
      `<p>Yêu cầu callback không chứa authorization code hợp lệ từ TikTok.</p>
       <a href="/api/tiktok/auth" class="btn">Thử kết nối lại</a>`,
      false
    );
    return res.status(400).send(html);
  }

  // Scenario 4: Behavior C - Server-side token exchange
  try {
    const authStatus = await exchangeAuthorizationCode(code, { mode: activeMode });
    
    // Attempt querying and caching creator info immediately
    const tokenRecord = loadTokenData({ mode: activeMode });
    if (tokenRecord) {
      try {
        await queryCreatorInfo({ mode: activeMode, tokenData: tokenRecord });
      } catch (_e) {}

      // Set HttpOnly, Secure session cookie with encrypted token
      const config = getTikTokConfig(activeMode);
      const encryptedSession = encryptTokenPayload(tokenRecord, config.clientSecret);
      if (encryptedSession) {
        res.setHeader("Set-Cookie", `tiktok_session=${encryptedSession}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`);
      }
    }

    const html = renderHtmlResponse(
      `Kết nối TikTok ${isSandbox ? "Sandbox" : "Production"} thành công!`,
      `<p>Tài khoản TikTok ${isSandbox ? "Sandbox (Target: nghelamdep2026)" : "doanh nghiệp"} đã được xác thực an toàn và lưu trữ token phục vụ quy trình xuất bản NLD.</p>
       <div class="details">
         <div><span class="key">Môi trường:</span><span class="val" style="color:#f59e0b;">${isSandbox ? "SANDBOX (nghelamdep2026)" : "PRODUCTION"}</span></div>
         <div><span class="key">Trạng thái:</span><span class="val" style="color:#10b981;">AUTHORIZED</span></div>
         <div><span class="key">video.publish Scope:</span><span class="val">${authStatus.video_publish_authorized ? "ĐÃ CẤP QUYỀN" : "CHƯA CÓ"}</span></div>
         <div><span class="key">Bảo mật Credentials:</span><span class="val" style="color:#10b981;">0% Secret Exposed</span></div>
       </div>
       <a href="/tiktok" class="btn">Vào TikTok Studio Dashboard</a>`,
      true
    );
    return res.status(200).send(html);

  } catch (err) {
    const safeMessage = err instanceof Error ? err.message : "Token exchange failed";
    const html = renderHtmlResponse(
      "Trao đổi Token thất bại",
      `<p>Không thể hoán đổi authorization code lấy access token từ TikTok server.</p>
       <div class="details">
         <div><span class="key">Thông điệp:</span><span class="val" style="color:#f43f5e;">${escapeHtml(safeMessage)}</span></div>
       </div>
       <a href="/api/tiktok/auth" class="btn">Thử kết nối lại</a>
       <a href="/tiktok" class="btn btn-secondary">Về TikTok Studio</a>`,
      false
    );
    return res.status(400).send(html);
  }
}
