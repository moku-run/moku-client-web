import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      global: "window", // 👈 global을 window로 대체
    },
    plugins: [react()],
    server: {
      https: {
        key: fs.readFileSync(
          path.resolve(__dirname, "secrets/certs/private.key")
        ),
        cert: fs.readFileSync(
          path.resolve(__dirname, "secrets/certs/certificate.crt")
        ),
      },

      host: "0.0.0.0",
      port: env.VITE_PORT,
      allowedHosts: [env.VITE_ALLOWED_HOSTS],
      proxy: {
        "/api": {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
