const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
  
    //fixturesFolder: false,
    //supportFile: false,
  },
  env: {
    API_URL: "http://localhost:3001",
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    indexHtmlFile: 'frontend/cypress/support/component-index.html',
    specPattern: 'frontend/src/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'frontend/cypress/support/component.js'
  },
});
