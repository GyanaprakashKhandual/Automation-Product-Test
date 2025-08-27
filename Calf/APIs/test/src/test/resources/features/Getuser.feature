@API
Feature: Get User Details API

  Scenario: Verify user details are fetched successfully
    Given I set the base API URL
    And I set the request headers
    When I send a GET request to "/api/v1/auth/me"
    Then the response status code should be 200
    And the response should contain "User details fetched successfully"
    And the response should have valid user details
