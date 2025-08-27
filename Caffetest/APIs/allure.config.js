const { CucumberJSAllureFormatter } = require("cucumberjs-allure2-reporter");
const { AllureRuntime } = require("allure-js-commons");

class AllureReporter extends CucumberJSAllureFormatter {
  constructor(options) {
    super(
      options,
      new AllureRuntime({ resultsDir: "./allure-results" }),
      {
        labels: [
          { pattern: [/@feature:(.*)/], name: "feature" },
          { pattern: [/@severity:(.*)/], name: "severity" }
        ]
      }
    );
  }
}

module.exports = AllureReporter;
