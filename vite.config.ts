import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "https://localhost:8080",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              proxyReq.setHeader("X-API-Key", env.VITE_API_KEY || "");
            });
            proxy.on("error", (err, req, res) => {
              console.error('Proxy error:', err);
            });
          }
        },
        "/price-api": {
          target: env.PRICING_API_URL || "http://localhost:8000",
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              proxyReq.setHeader("X-API-Key", env.PRICING_API_KEY || "");
            });
          },
          rewrite: (path) => path.replace(/^\/price-api/, "/api"),
        },
      },
    },
  };
});
