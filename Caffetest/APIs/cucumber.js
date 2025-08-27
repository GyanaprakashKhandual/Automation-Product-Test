module.exports = {
  default: {
    require: ['./tests/stepsdefinitions/**/*.js', './src/hooks/hooks.js'],
    requireModule: ['@babel/register'],
    format: [
      'progress-bar',
      'html:tests/reports/cucumber-report.html',
      'json:tests/reports/cucumber-report.json',
      '@cucumber/pretty-formatter'
    ],
    parallel: 2,
    publishQuiet: true
  }
};