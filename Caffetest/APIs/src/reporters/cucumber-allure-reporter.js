const allure = require('@wdio/allure-reporter').default;

class CucumberAllureReporter {
  static addCucumberFeature(feature) {
    allure.addFeature(feature.name);
    allure.addDescription(feature.description, 'text');
  }

  static addCucumberScenario(scenario) {
    allure.addStory(scenario.name);
    scenario.tags.forEach(tag => {
      allure.addLabel('tag', tag.name);
    });
  }

  static addCucumberStep(step) {
    allure.startStep(step.text);
    return {
      end: (status = 'passed') => allure.endStep(status)
    };
  }

  static addDataTable(table) {
    if (table && table.rows) {
      const tableData = table.rows.map(row => row.cells.map(cell => cell.value));
      allure.addAttachment('Data Table', JSON.stringify(tableData), 'application/json');
    }
  }

  static addDocString(docString) {
    if (docString) {
      allure.addAttachment('Doc String', docString.content, 'text/plain');
    }
  }
}

module.exports = CucumberAllureReporter;