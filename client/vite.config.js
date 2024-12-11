import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

    test: {
      // globals: true - makes the global test functions (describe, it, test, etc.)
      // available without having to explicity import them
      globals: true,

      // environment: "jsdom" - sets the test environment to jsdom, a simulated browser
      // environment for Node.js, allowing us to ineract with the DOM and test frontend
      // code in a simulated browser
      environment: "jsdom",

      // setupFiles: "./vitest.setup.js" allows us to import anything we need for our
      // tests, without having to do so in each individual test file (e.g. jest-dom)
      setupFiles: "./vitest.setup.js",
    }
})
