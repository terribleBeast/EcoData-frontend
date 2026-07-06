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
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
