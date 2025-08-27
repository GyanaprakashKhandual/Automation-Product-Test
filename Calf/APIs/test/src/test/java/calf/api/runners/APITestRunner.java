package calf.api.runners;

import org.testng.annotations.DataProvider;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;

@CucumberOptions(
    features = "src/test/resources/features",
    glue = {
        "com.calf.api.stepdefinitions",
        "com.calf.api.hooks"
    },
    plugin = {
        "pretty",
        "html:test-output/cucumber-reports/cucumber-pretty.html",
        "json:test-output/cucumber-reports/CucumberTestReport.json",
        "com.aventstack.extentreports.cucumber.adapter.ExtentCucumberAdapter:",
        "io.qameta.allure.cucumber7jvm.AllureCucumber7Jvm"
    },
    monochrome = true,
    tags = "@API"
)
public class APITestRunner extends AbstractTestNGCucumberTests {
    
    @Override
    @DataProvider(parallel = true)
    public Object[][] scenarios() {
        return super.scenarios();
    }
}