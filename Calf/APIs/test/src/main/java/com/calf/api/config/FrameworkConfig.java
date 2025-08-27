package com.calf.api.config;

import org.aeonbits.owner.Config;

@Config.LoadPolicy(Config.LoadType.MERGE)
@Config.Sources({
    "classpath:config/application/properties",
    "system:properties",
    "system: env"
})

public interface  FrameworkConfig extends Config {
    
    @Key("env")
    String environment();

    @Key("base.url")
    String baseUrl();

    @Key("api.version")
    String apiVersion();

     @Key("timeout")
    @DefaultValue("30000")
    int timeout();
    
    @Key("auth.token")
    String authToken();
    
    @Key("extent.report.path")
    String extentReportPath();
    
    @Key("allure.results.directory")
    String allureResultsDirectory();
}
