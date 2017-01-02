// An example configuration file.
exports.config = {
  // framework      : 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // directConnect  : true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'firefox'
  },

  specs: ['test/e2e/dist/**/*.js'],

  plugins: [{
    path: 'aurelia.protractor.js'
  }],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors            : true,
    defaultTimeoutInterval: 30000
  }
};
