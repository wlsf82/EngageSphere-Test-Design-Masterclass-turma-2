module.exports = {
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      defaultCommandTimeout: 10000
      // implement node event listeners here
    },
  },
};
