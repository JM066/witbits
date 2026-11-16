import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  build: {
    rolldownOptions: {
      output: {
        // Libraries change far less often than app code, so give each its own
        // long-cached file instead of one big bundle that's invalidated on every deploy.
        codeSplitting: {
          groups: [
            {
              name: "react",
              test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/,
              priority: 30,
            },
            {
              name: "supabase",
              test: /node_modules[\\/]@supabase[\\/]/,
              priority: 20,
            },
            {
              name: "vendor",
              // react-hook-form is only used by the lazy Profile route, so let it ship with that chunk.
              test: /node_modules[\\/](?!react-hook-form[\\/])/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    // Fake Supabase credentials for tests; requests to this URL are intercepted by MSW.
    env: {
      VITE_SUPABASE_URL: "http://supabase.test",
      VITE_SUPABASE_ANON_KEY: "test-anon-key",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@components": path.resolve(import.meta.dirname, "./src/components"),
      "@hooks": path.resolve(import.meta.dirname, "./src/hooks"),
      "@api": path.resolve(import.meta.dirname, "./src/api"),
      "@shared": path.resolve(import.meta.dirname, "./src/shared"),
    },
  },
});
