const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Base URL of the portfolio under test
    baseUrl: 'https://ravifel.github.io',

    // Where Cypress looks for E2E specs
    specPattern: 'cypress/e2e/**/*.cy.js',

    // Timeouts (similar to your Selenium config)
    defaultCommandTimeout: 10000, // 10s for get/click/type, etc.
    pageLoadTimeout: 90000, // 90s max for full page load

    // Browser viewport for tests
    viewportWidth: 1280,
    viewportHeight: 720,

    // Retry failed tests when running via "cypress run" (CI/local run)
    retries: {
      runMode: 1, // 1 extra attempt when running headless
      openMode: 0, // no retry in interactive mode
    },

    // Artifacts (useful for debugging and portfolio)
    video: true,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',

    // Custom env vars (add here if needed later)
    env: {
      // example: apiBaseUrl: 'https://api.example.com'
    },

    // Node event hooks (reporters, tasks, etc.)
    setupNodeEvents(on, config) {
      // Keep for future extensions (e.g. custom reporters, tasks)
      return config;
    },
  },
});
