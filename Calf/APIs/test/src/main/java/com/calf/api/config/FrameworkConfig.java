package com.calf.api.config;

import org.aeonbits.owner.Config;

@Config.LoadPolicy(Config.LoadType.MERGE)
@Config.Sources({
    "classpath:config/application.properties",  // Add .properties extension
    "system:properties",
    "system:env"
})
public interface FrameworkConfig extends Config {
    
    @Key("env")
    @DefaultValue("staging")
    String environment();

    @Key("base.url")
    @DefaultValue("http://localhost:5000")
    String baseUrl();

    @Key("api.version")
    @DefaultValue("v1")
    String apiVersion();

    @Key("timeout")
    @DefaultValue("30000")
    int timeout();
    
    @Key("auth.token")
    @DefaultValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWFlNGU1NmZmOWFkYzUxMTQ2Y2MxNiIsImlhdCI6MTc1NjA0NDE5NiwiZXhwIjoxNzU4NjM2MTk2fQ.m2qOd0r2Xr_RftzWQ1UpQwkELAAWU2jP7tGzkLxU1K8")
    String authToken();
    
    @Key("extent.report.path")
    @DefaultValue("reports/Test-Report.html")
    String extentReportPath();
    
    @Key("allure.results.directory")
    @DefaultValue("reports/Test-Results")
    String allureResultsDirectory();
}