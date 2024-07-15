const {defineConfig} = require('cypress')
module.exports = {
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    indexHtmlFile: 'frontend/cypress/support/component-index.html',
    specPattern: 'frontend/src/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'frontend/cypress/support/component.js'
  },

  e2e: {
    baseUrl:"http://localhost:3001",
    setupNodeEvents(on, config) {
    }
  }
};

