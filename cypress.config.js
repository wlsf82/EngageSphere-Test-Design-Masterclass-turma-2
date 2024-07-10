const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  hideXhr: true,
  chromeWebSecurity: false,
  env: {
   
  },
  e2e: {
    setupNodeEvents(on, config) {

    },
  },
})


