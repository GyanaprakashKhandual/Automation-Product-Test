const { expect } = require('../../src/assertions/custom-assertions');
const UserAPI = require('../../src/api/user-api');
const TestDataFactory = require('../../src/data/test-data-factory');
const AllureReporter = require('../../src/reporters/cucumber-allure-reporter');

describe('User API Smoke Tests', function () {
  this.timeout(30000);

  let userAPI;
  let testUser;

  before(() => {
    userAPI = new UserAPI();
    AllureReporter.addFeature('User Management');
  });

  beforeEach(() => {
    testUser = TestDataFactory.generateUser();
    AllureReporter.addStory('User CRUD Operations');
  });

  it('should create a new user', async function () {
    AllureReporter.addSeverity('critical');
    
    const response = await userAPI.createUser(testUser);
    
    expect(response).to.have.status(201);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('name', testUser.name);
    expect(response.body).to.have.property('email', testUser.email);
    expect(response).to.have.acceptableResponseTime;
  });

  it('should retrieve user details', async function () {
    AllureReporter.addSeverity('high');
    
    // First create a user
    const createResponse = await userAPI.createUser(testUser);
    const userId = createResponse.body.id;
    
    // Then retrieve it
    const getResponse = await userAPI.getUser(userId);
    
    expect(getResponse).to.have.status(200);
    expect(getResponse.body).to.have.property('id', userId);
    expect(getResponse.body).to.have.property('name', testUser.name);
  });

  it('should update user information', async function () {
    AllureReporter.addSeverity('high');
    
    // Create a user first
    const createResponse = await userAPI.createUser(testUser);
    const userId = createResponse.body.id;
    
    // Update the user
    const updatedData = { name: 'Updated Name' };
    const updateResponse = await userAPI.updateUser(userId, updatedData);
    
    expect(updateResponse).to.have.status(200);
    expect(updateResponse.body).to.have.property('name', 'Updated Name');
  });

  it('should delete a user', async function () {
    AllureReporter.addSeverity('high');
    
    // Create a user first
    const createResponse = await userAPI.createUser(testUser);
    const userId = createResponse.body.id;
    
    // Delete the user
    const deleteResponse = await userAPI.deleteUser(userId);
    
    expect(deleteResponse).to.have.status(204);
    
    // Verify user is deleted
    const getResponse = await userAPI.getUser(userId).catch(err => err);
    expect(getResponse.status).to.equal(404);
  });
});