const { defineConfig } = require("Cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:'http://localhost:3000',
    fixturesFolder: false,
    env: {
      API_URL: 'http://localhost:3001'
    }
  },
});
