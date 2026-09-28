import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

function tiktokDevApiPlugin(): Plugin {
  return {
    name: "tiktok-dev-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || "/", "http://localhost");
        const pathname = url.pathname;

        const createVercelResponseMock = (rawRes: any) => ({
          setHeader: (name: string, value: string) => rawRes.setHeader(name, value),
          status: (code: number) => {
            rawRes.statusCode = code;
            return {
              json: (data: any) => {
                rawRes.setHeader("Content-Type", "application/json");
                rawRes.end(JSON.stringify(data));
              },
              send: (text: string) => {
                rawRes.end(text);
              },
            };
          },
          redirect: (statusOrUrl: number | string, targetUrl?: string) => {
            const code = typeof statusOrUrl === "number" ? statusOrUrl : 302;
            const destination = typeof statusOrUrl === "string" ? statusOrUrl : targetUrl || "/";
            rawRes.writeHead(code, { Location: destination });
            rawRes.end();
          },
        });

        if (pathname === "/api/tiktok/auth") {
          const { default: handler } = await import("./api/tiktok/auth.js");
          return handler(req, createVercelResponseMock(res));
        }

        if (pathname === "/tiktok-callback" || pathname === "/api/tiktok/callback") {
          // If TikTok redirected with code or error, execute server-side handler
          if (url.searchParams.has("code") || url.searchParams.has("error") || pathname === "/api/tiktok/callback") {
            const { default: handler } = await import("./api/tiktok/callback.js");
            return handler(req, createVercelResponseMock(res));
          }
          // Otherwise, pass to SPA router for client view
          return next();
        }

        if (pathname === "/api/tiktok/status") {
          const { default: handler } = await import("./api/tiktok/status.js");
          return handler(req, createVercelResponseMock(res));
        }

        if (pathname === "/api/tiktok/refresh") {
          const { default: handler } = await import("./api/tiktok/refresh.js");
          return handler(req, createVercelResponseMock(res));
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tiktokDevApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5175,
  },
});
