const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    API_URL: 'http://localhost:3001',
    hideCredentials: true,
    requestMode: true
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    experimentalRunAllSpecs: true // permite rodar todos os testes visuais de uma vez só
  },
  fixturesFolder: false,
  video: false
})
