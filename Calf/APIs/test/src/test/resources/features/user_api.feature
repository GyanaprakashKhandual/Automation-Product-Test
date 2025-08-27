@API @User
Feature: User API Tests

  Scenario: Get user by ID - Valid user
    Given I set the base API URL
    And I set the request headers
    When I send a GET request to "/users/1"
    Then the response status code should be 200
    And the response should contain "Leanne Graham"

  Scenario Outline: Create new user
    Given I set the base API URL
    And I set the request headers
    When I send a POST request to "/users" with body:
      """
      {
        "name": "<name>",
        "email": "<email>",
        "username": "<username>"
      }
      """
    Then the response status code should be 201
    And the response should contain "id"

    Examples:
      | name          | email               | username    |
      | John Doe      | john.doe@email.com  | johndoe     |
      | Jane Smith    | jane.smith@email.com| janesmith   |