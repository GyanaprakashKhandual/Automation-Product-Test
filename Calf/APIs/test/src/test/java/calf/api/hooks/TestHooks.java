package calf.api.hooks;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import io.restassured.RestAssured;
import com.calf.api.config.FrameworkConfig;
import com.calf.api.utils.ConfigLoader;


public class TestHooks {
    
    private static final FrameworkConfig CONFIG = ConfigLoader.getInstance().getConfig();
    
    @Before
    public void beforeScenario(Scenario scenario) {
        System.out.println("Starting scenario: " + scenario.getName());
        RestAssured.baseURI = CONFIG.baseUrl();
    }
    
    @After
    public void afterScenario(Scenario scenario) {
        System.out.println("Finished scenario: " + scenario.getName() + 
            " with status: " + scenario.getStatus());
    }
    
    @Before("@Auth")
    public void setupAuthentication() {
        // Setup authentication logic
    }
}