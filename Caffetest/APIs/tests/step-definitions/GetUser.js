const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('../../src/assertions/custom-assertions');
const ApiClient = require('../../src/core/api-client');
const AllureHelper = require('../../src/utils/allure-helper'); // Use the simple helper

let apiClient;
let response;

Given('I have a valid authentication token', function () {
  AllureHelper.addStep('Using valid authentication token');
  apiClient = new ApiClient();
});

Given('I have an invalid authentication token', function () {
  AllureHelper.addStep('Using invalid authentication token');
  apiClient = new ApiClient();
  apiClient.setHeader('Authorization', 'Bearer invalid_token_123');
});

Given('I don\'t have an authentication token', function () {
  AllureHelper.addStep('No authentication token provided');
  apiClient = new ApiClient();
  apiClient.removeHeader('Authorization');
});

When('I send a GET request to {string}', async function (endpoint) {
  AllureHelper.startStep(`Sending GET request to ${endpoint}`);
  try {
    response = await apiClient.get(endpoint);
    AllureHelper.addAttachment('Response', JSON.stringify(response.body, null, 2), 'application/json');
    AllureHelper.endStep('passed');
  } catch (error) {
    response = error.response || error;
    AllureHelper.addAttachment('Error', JSON.stringify(response.body, null, 2), 'application/json');
    AllureHelper.endStep('failed');
  }
});

Then('the response status should be {int}', function (statusCode) {
  AllureHelper.addStep(`Verifying status code is ${statusCode}`);
  expect(response.status).to.equal(statusCode);
});

Then('the response should contain user details', function () {
  AllureHelper.addStep('Verifying user details in response');
  expect(response.body).to.have.property('message');
  expect(response.body).to.have.property('user');
  expect(response.body.user).to.have.property('_id');
  expect(response.body.user).to.have.property('name');
  expect(response.body.user).to.have.property('email');
  expect(response.body.user).to.have.property('isVerified');
});

Then('the response should contain an error message', function () {
  AllureHelper.addStep('Verifying error message in response');
  expect(response.body).to.have.property('message');
  expect(response.body.message).to.be.a('string');
});

Then('the response should match JSON schema:', function (docString) {
  AllureHelper.addStep('Validating response against JSON schema');
  const schema = JSON.parse(docString);
  
  expect(response.body).to.have.property('message');
  expect(response.body).to.have.property('user');
  expect(response.body.user).to.have.property('_id');
  expect(response.body.user).to.have.property('name');
  expect(response.body.user).to.have.property('email');
  expect(response.body.user).to.have.property('isVerified');
  expect(response.body.user).to.have.property('createdAt');
  expect(response.body.user).to.have.property('updatedAt');
  expect(response.body.user).to.have.property('__v');
  
  expect(response.body.message).to.be.a('string');
  expect(response.body.user._id).to.be.a('string');
  expect(response.body.user.name).to.be.a('string');
  expect(response.body.user.email).to.be.a('string');
  expect(response.body.user.isVerified).to.be.a('boolean');
  expect(response.body.user.createdAt).to.be.a('string');
  expect(response.body.user.updatedAt).to.be.a('string');
  expect(response.body.user.__v).to.be.a('number');
});