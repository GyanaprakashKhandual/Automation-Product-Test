const allure = require('@wdio/allure-reporter').default;
const chai = require('./src/assertions/custom-assertions');

// Global before hook
before(function () {
  // Add environment variables to Allure
  allure.addEnvironment('NODE_ENV', process.env.NODE_ENV);
  allure.addEnvironment('BASE_URL', process.env.BASE_URL);
});

// Global after hook
after(function () {
  // Cleanup if needed
});

// Global after each hook
afterEach(function () {
  if (this.currentTest.state === 'failed') {
    const screenshotPath = `./screenshots/${this.currentTest.title.replace(/\s+/g, '_')}.png`;
    // You can add screenshot capability for API responses if needed
    allure.addAttachment('Error Stack', this.currentTest.err.stack, 'text/plain');
  }
});