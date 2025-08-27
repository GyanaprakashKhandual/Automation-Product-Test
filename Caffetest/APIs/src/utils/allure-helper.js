const reporter = require('@wdio/allure-reporter').default;

class AllureHelper {
  static addStep(name, status = 'passed', attachment = null) {
    reporter.addStep(name, status, attachment);
  }

  static addAttachment(name, content, type = 'text/plain') {
    reporter.addAttachment(name, content, type);
  }

  static addFeature(name) {
    reporter.addFeature(name);
  }

  static addStory(name) {
    reporter.addStory(name);
  }

  static addDescription(description, type = 'text') {
    reporter.addDescription(description, type);
  }

  static startStep(name) {
    reporter.startStep(name);
  }

  static endStep(status = 'passed') {
    reporter.endStep(status);
  }
}

module.exports = AllureHelper;