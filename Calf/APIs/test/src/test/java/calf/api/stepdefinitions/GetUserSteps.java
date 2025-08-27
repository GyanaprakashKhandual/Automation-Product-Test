package calf.api.stepdefinitions;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;

import com.calf.api.utils.ConfigLoader;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

public class GetUserSteps {

    private Response response;
    private RequestSpecification requestSpec;

    @Given("I set the base API URL")
    public void i_set_the_base_api_url() {
        // Get base URL from configuration
        String baseUrl = ConfigLoader.getInstance().getBaseUrl();
        RestAssured.baseURI = baseUrl;
    }

    @Given("I set the request headers")
    public void i_set_the_request_headers() {
        // Get auth token from configuration
        String authToken = ConfigLoader.getInstance().getAuthToken();
        
        requestSpec = RestAssured.given()
                   .header("Content-Type", "application/json")
                   .header("Authorization", "Bearer " + authToken);
    }

    @When("I send a GET request to {string}")
    public void i_send_a_get_request_to(String endpoint) {
        response = requestSpec.get(endpoint);
    }

    @Then("the response status code should be {int}")
    public void the_response_status_code_should_be(Integer statusCode) {
        response.then().statusCode(statusCode);
    }

    @Then("the response should contain {string}")
    public void the_response_should_contain(String message) {
        response.then().body("message", equalTo(message));
    }

    @Then("the response should have valid user details")
    public void the_response_should_have_valid_user_details() {
        response.then()
                .body("user._id", notNullValue())
                .body("user.name", notNullValue())
                .body("user.email", notNullValue())
                .body("user.isVerified", notNullValue())
                .body("user.createdAt", notNullValue())
                .body("user.updatedAt", notNullValue());
    }
}