const { defineConfig } = require('cypress')

module.exports = defineConfig ({
  projectId: "kvars8",
  viewportWidth: 1920,
  viewportHeight: 1080,
  env: {
    API_URL: "http://localhost:3001",
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    retries: {
      runMode: 1,
      openMode: 0,
    },
    experimentalRunAllSpecs: true,
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    indexHtmlFile: 'frontend/cypress/support/component-index.html',
    specPattern: 'frontend/src/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'frontend/cypress/support/component.js'
  }})
