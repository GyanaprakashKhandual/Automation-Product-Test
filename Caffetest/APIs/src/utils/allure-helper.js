const { AllureRuntime } = require("allure-js-commons ");

const runtime = new AllureRuntime({ resultsDir: "./allure-results" });

class AllureHelper {
  static addStep(name, status = "passed") {
    // Valid statuses: "passed" | "failed" | "broken" | "skipped"
    runtime.writeAttachment(
      Buffer.from(`Step: ${name}, Status: ${status}`),
      { contentType: "text/plain" }
    );
  }

  static addAttachment(name, content, type = "text/plain") {
    runtime.writeAttachment(content, { contentType: type });
  }

  static addFeature(name) {
    runtime.writeAttachment(Buffer.from(`Feature: ${name}`), {
      contentType: "text/plain",
    });
  }

  static addStory(name) {
    runtime.writeAttachment(Buffer.from(`Story: ${name}`), {
      contentType: "text/plain",
    });
  }

  static addDescription(description, type = "text") {
    runtime.writeAttachment(description, { contentType: type });
  }
}

module.exports = AllureHelper;
