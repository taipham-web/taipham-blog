import { defineConfig } from "vite";

export default defineConfig({
  assetsInclude: ["**/*.json"],
  json: {
    stringify: false,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
