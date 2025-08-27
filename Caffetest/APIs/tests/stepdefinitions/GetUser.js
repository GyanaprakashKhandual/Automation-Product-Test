const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('../../src/assertions/custom-assertions');
const ApiClient = require('../../src/core/api-client');
const AllureReporter = require('../../src/reporters/cucumber-allure-reporter');

let apiClient;
let response;

Given('I have a valid authentication token', function () {
  apiClient = new ApiClient();
  AllureReporter.addStep('Using valid authentication token');
});

Given('I have an invalid authentication token', function () {
  apiClient = new ApiClient();
  apiClient.setHeader('Authorization', 'Bearer invalid_token_123');
  AllureReporter.addStep('Using invalid authentication token');
});

Given('I don\'t have an authentication token', function () {
  apiClient = new ApiClient();
  apiClient.removeHeader('Authorization');
  AllureReporter.addStep('No authentication token provided');
});

When('I send a GET request to {string}', async function (endpoint) {
  try {
    AllureReporter.addStep(`Sending GET request to ${endpoint}`);
    response = await apiClient.get(endpoint);
    AllureReporter.addAttachment('Request', `GET ${endpoint}`, 'text/plain');
    AllureReporter.addAttachment('Response', JSON.stringify(response.body, null, 2), 'application/json');
    AllureReporter.addAttachment('Response Headers', JSON.stringify(response.headers, null, 2), 'application/json');
  } catch (error) {
    response = error.response || error;
    AllureReporter.addStep('Request failed', 'failed', error.message);
    AllureReporter.addAttachment('Error', JSON.stringify(response.body, null, 2), 'application/json');
  }
});

Then('the response status should be {int}', function (statusCode) {
  AllureReporter.addStep(`Verifying response status is ${statusCode}`);
  expect(response).to.have.status(statusCode);
});

Then('the response should contain user details', function () {
  AllureReporter.addStep('Verifying user details in response');
  
  expect(response.body).to.have.property('message', 'User details fetched successfully');
  expect(response.body).to.have.property('user');
  expect(response.body.user).to.have.property('_id');
  expect(response.body.user).to.have.property('name');
  expect(response.body.user).to.have.property('email');
  expect(response.body.user).to.have.property('isVerified');
  expect(response.body.user).to.have.property('createdAt');
  expect(response.body.user).to.have.property('updatedAt');
});

Then('the response should contain an error message', function () {
  AllureReporter.addStep('Verifying error message in response');
  expect(response.body).to.have.property('message');
  expect(response.body.message).to.be.a('string');
});

Then('the response should match JSON schema:', function (jsonSchema) {
  AllureReporter.addStep('Validating response against JSON schema');
  
  // Parse the schema from the docstring
  const schema = JSON.parse(jsonSchema);
  
  // Custom assertion to validate schema
  expect(response.body).to.matchSchema(schema);
});

Then('the response time should be less than {int} ms', function (maxTime) {
  AllureReporter.addStep(`Verifying response time is under ${maxTime}ms`);
  expect(response.responseTime).to.be.lessThan(maxTime);
});