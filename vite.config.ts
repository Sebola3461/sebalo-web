import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mix from "vite-plugin-mix";

export default defineConfig({
  plugins: [
    react({
      fastRefresh: false,
    }),
    mix({
      handler: "./server/server.ts",
    }),
  ],
  build: {
    outDir: "./build",
  },
  server: {
    port: Number(process.env.PORT),
  },
});
