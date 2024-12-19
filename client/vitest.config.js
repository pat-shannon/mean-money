import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    // Enable global test functions like `describe`, `it`, `test` without imports
    globals: true,

    // Use jsdom as the test environment for frontend DOM simulation
    environment: "jsdom",

    // Load setup files for global imports (e.g., jest-dom)
    setupFiles: "./vitest.setup.js",

    // Configure coverage options
    coverage: {
      provider: "v8", // Use v8 coverage provider
      reportsDirectory: "./coverage", // Directory for coverage reports
      reporter: ["text", "html"], // Output both text summary and HTML reports
    },

    // Optionally include/exclude specific test files
    include: ["**/*.test.{js,jsx,ts,tsx}"],
    exclude: ["node_modules", "dist", "test"],
  },
});