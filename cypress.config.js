const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    env: {
      hideCredentials: true,
      requestMode: true,
      API_URL: 'http://localhost:3001',
    },
  },
  fixturesFolder: false,
  setupNodeEvents(on, config) {
    // implement node event listeners here
  }, 
})