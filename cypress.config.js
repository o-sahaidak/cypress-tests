const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://telnyx.com',
    chromeWebSecurity: false,
    numTestsKeptInMemory: 1,
    experimentalMemoryManagement: true,
    projectId: "lzb1rS",
  },
})