const { defineConfig } = require('cypress')

module.exports = {
  viewportWidth: 1920,
  viewportHeight: 1080,

  env: {
    API_URL: "http://localhost:3001",
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    indexHtmlFile: 'frontend/cypress/support/component-index.html',
    specPattern: 'frontend/src/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'frontend/cypress/support/component.js'
  }}