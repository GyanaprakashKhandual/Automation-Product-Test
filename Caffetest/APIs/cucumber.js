module.exports = {
  default: {
    require: ["./tests/step-definitions/**/*.js"],
    format: [
      "./allure.config.js",  // 👈 use your custom allure formatter
      "progress"
    ]
  }
};



