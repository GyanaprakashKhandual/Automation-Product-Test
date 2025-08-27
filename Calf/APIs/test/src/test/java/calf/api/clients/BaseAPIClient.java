package calf.api.clients;

import io.restassured.RestAssured;
import io.restassured.config.RestAssuredConfig;
import io.restassured.config.LogConfig;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.HttpClientConfig;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;

import com.calf.api.config.FrameworkConfig;

import com.calf.api.utils.ConfigLoader;

import org.apache.http.params.CoreConnectionPNames;

import static io.restassured.config.EncoderConfig.encoderConfig;

public class BaseAPIClient {

    private static final FrameworkConfig CONFIG = ConfigLoader.getInstance().getConfig();

    static {
        setupRestAssured();
    }

    @SuppressWarnings("deprecation")
    private static void setupRestAssured() {
        RestAssured.config = RestAssuredConfig.config()
            .httpClient(HttpClientConfig.httpClientConfig()
                .setParam(CoreConnectionPNames.CONNECTION_TIMEOUT, CONFIG.timeout())
                .setParam(CoreConnectionPNames.SO_TIMEOUT, CONFIG.timeout()))
            .encoderConfig(encoderConfig().defaultContentCharset("UTF-8"))
            .logConfig(LogConfig.logConfig().enableLoggingOfRequestAndResponseIfValidationFails())
            .objectMapperConfig(new ObjectMapperConfig());
            
        RestAssured.baseURI = CONFIG.baseUrl();
        RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
    }
    
    public static RequestSpecification getRequestSpecification() {
        return RestAssured.given()
            .config(RestAssured.config)
            .contentType(ContentType.JSON)
            .accept(ContentType.JSON)
            .filter(new RequestLoggingFilter())
            .filter(new ResponseLoggingFilter())
            .header("Authorization", "Bearer " + CONFIG.authToken())
            .header("X-API-Version", CONFIG.apiVersion());
    }
    
    public static RequestSpecification getRequestSpecificationWithAuth(String token) {
        return getRequestSpecification()
            .header("Authorization", "Bearer " + token);
    }
}
