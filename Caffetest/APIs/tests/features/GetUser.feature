Feature: User Details API
  As an API consumer
  I want to retrieve user details
  So that I can display user information in the application

  Background:
    Given I have a valid authentication token

  @smoke @user
  Scenario: Successfully fetch user details
    When I send a GET request to "/api/v1/auth/me"
    Then the response status should be 200
    And the response should contain user details
    And the response should match JSON schema:
      """
      {
        "message": "string",
        "user": {
          "_id": "string",
          "name": "string",
          "email": "string",
          "isVerified": "boolean",
          "createdAt": "string",
          "updatedAt": "string",
          "__v": "number"
        }
      }
      """

  @user @validation
  Scenario: Fetch user details with invalid token
    Given I have an invalid authentication token
    When I send a GET request to "/api/v1/auth/me"
    Then the response status should be 401
    And the response should contain an error message

  @user @validation
  Scenario: Fetch user details without authentication
    Given I don't have an authentication token
    When I send a GET request to "/api/v1/auth/me"
    Then the response status should be 401