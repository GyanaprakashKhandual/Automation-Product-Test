package calf.api.stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import calf.api.clients.BaseAPIClient;
import calf.api.utils.TestDataProvider;
import org.testng.Assert;

public class BaseStepDefinitions {
    
    protected Response response;
    protected RequestSpecification request;
    protected TestDataProvider testDataManager;
    
    public BaseStepDefinitions(TestDataProvider testDataManager) {
        this.testDataManager = testDataManager;
        this.request = BaseAPIClient.getRequestSpecification();
    }
    
    @Given("I set the base API URL")
    public void setBaseAPIUrl() {
        // Base URL is already set in BaseAPIClient
    }
    
    @Given("I set the request headers")
    public void setRequestHeaders() {
        request.header("Content-Type", "application/json");
    }
    
    @When("I send a GET request to {string}")
    public void sendGetRequest(String endpoint) {
        response = request.get(endpoint);
    }
    
    @When("I send a POST request to {string} with body:")
    public void sendPostRequest(String endpoint, String body) {
        response = request.body(body).post(endpoint);
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
}