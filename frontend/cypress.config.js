const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      hideCredentials: true,
      requestMode: true,
    },
  },
  fixturesFolder: false,
  video: false,
  setupNodeEvents(on, config) {
    // implement node event listeners here
  }, 
})
