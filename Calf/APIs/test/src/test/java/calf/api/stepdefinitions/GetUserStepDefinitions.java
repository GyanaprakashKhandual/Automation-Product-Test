package calf.api.stepdefinitions;

import org.testng.Assert;

import calf.api.clients.BaseAPIClient;
import calf.api.utils.TestDataProvider;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

public class GetUserStepDefinitions {

    protected Response response;
    protected RequestSpecification request;
    protected TestDataProvider testDataManager;

    public GetUserStepDefinitions(TestDataProvider testDataManager) {
        this.testDataManager = testDataManager;
        this.request = BaseAPIClient.getRequestSpecification();
    }

    @Given("I set the base API URL")
    public void setBaseAPIUrl() {
        // Already set in BaseAPIClient
    }

    @Given("I set the request headers")
    public void setRequestHeaders() {
        request.header("Content-Type", "application/json");
        request.header("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWFlNGU1NmZmOWFkYzUxMTQ2Y2MxNiIsImlhdCI6MTc1NjA0NDE5NiwiZXhwIjoxNzU4NjM2MTk2fQ.m2qOd0r2Xr_RftzWQ1UpQwkELAAWU2jP7tGzkLxU1K8");
    }

    @When("I send a GET request to {string}")
    public void sendGetRequest(String endpoint) {
        response = request.get(endpoint);
    }

    @Then("the response status code should be {int}")
    public void verifyStatusCode(int expectedStatusCode) {
        Assert.assertEquals(response.getStatusCode(), expectedStatusCode,
            "Expected status code: " + expectedStatusCode + " but got: " + response.getStatusCode());
    }

    @Then("the response should contain {string}")
    public void responseShouldContain(String expectedText) {
        Assert.assertTrue(response.getBody().asString().contains(expectedText),
            "Response body should contain: " + expectedText);
    }

    @Then("the response should have valid user details")
    public void verifyUserDetails() {
        String message = response.jsonPath().getString("message");
        Assert.assertEquals(message, "User details fetched successfully");

        String id = response.jsonPath().getString("user._id");
        String name = response.jsonPath().getString("user.name");
        String email = response.jsonPath().getString("user.email");
        boolean isVerified = response.jsonPath().getBoolean("user.isVerified");

        Assert.assertNotNull(id, "User ID should not be null");
        Assert.assertEquals(name, "Gyana prakash Khandual");
        Assert.assertEquals(email, "gyan@avidusinteractive.com");
        Assert.assertTrue(isVerified, "User should be verified");
    }
}
