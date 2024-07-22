const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  hideXhr: true,
  env: {
   API_URL: 'http://localhost:3002'
  },
  e2e: {
    setupNodeEvents(on, config) {

    },
  },
})


