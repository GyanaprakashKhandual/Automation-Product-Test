module.exports = {
  timeout: 30000,
  require: ['./test-setup.js'],
  reporter: '@wdio/allure-reporter',
  recursive: true,
  exit: true,
};