import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// const USE_MOCK = "false";
const USE_MOCK = false;

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // When VITE_MOCK=true, proxy /api to json-server instead of real backend
    ...(USE_MOCK && {
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
          rewrite: (path) => {
            // json-server serves top-level resources directly.
            // /api/v1/researchers -> /researchers
            // /api/v1/researches  -> /researches
            // /api/v1/researches/1/predictions -> /predictions/1
            return path.replace(/^\/api\/v1\//, "/");
          },
        },
      },
    }),
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
