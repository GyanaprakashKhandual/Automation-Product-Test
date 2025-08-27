const { Before, After, BeforeAll, AfterAll, Status } = require('@cucumber/cucumber');
const AllureReporter = require('../reporters/cucumber-allure-reporter');

BeforeAll(function () {
  console.log('Starting Cucumber test execution');
  AllureReporter.addEnvironment('Test Framework', 'Cucumber.js with SuperTest');
});

Before(function (testCase) {
  AllureReporter.addFeature(testCase.pickle.tags[0]?.name || 'API Testing');
  AllureReporter.addDescription(`Scenario: ${testCase.pickle.name}`);
  AllureReporter.startStep(`Starting scenario: ${testCase.pickle.name}`);
});

After(function (testCase) {
  if (testCase.result.status === Status.FAILED) {
    AllureReporter.addStep('Test Failed', 'failed', testCase.result.message);
    AllureReporter.addAttachment('Error Stack', testCase.result.message, 'text/plain');
  }
  AllureReporter.endStep(testCase.result.status === Status.PASSED ? 'passed' : 'failed');
});

AfterAll(function () {
  console.log('Cucumber test execution completed');
});