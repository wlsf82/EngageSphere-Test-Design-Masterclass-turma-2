const { defineConfig } = require('cypress')
module.exports = defineConfig({
  hideXhr: true,
  env: {
    API_URL: 'http://localhost:3002'
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
})