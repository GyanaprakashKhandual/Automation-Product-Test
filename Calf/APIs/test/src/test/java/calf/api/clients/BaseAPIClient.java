package calf.api.clients;

import org.apache.http.params.CoreConnectionPNames;

import com.calf.api.utils.ConfigLoader;

import io.restassured.RestAssured;
import static io.restassured.config.EncoderConfig.encoderConfig;
import io.restassured.config.HttpClientConfig;
import io.restassured.config.LogConfig;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;

public class BaseAPIClient {

    private static final ConfigLoader CONFIG_LOADER = ConfigLoader.getInstance();

    static {
        setupRestAssured();
    }

    @SuppressWarnings("deprecation")
    private static void setupRestAssured() {
        RestAssured.config = RestAssuredConfig.config()
            .httpClient(HttpClientConfig.httpClientConfig()
                .setParam(CoreConnectionPNames.CONNECTION_TIMEOUT, CONFIG_LOADER.getTimeout())
                .setParam(CoreConnectionPNames.SO_TIMEOUT, CONFIG_LOADER.getTimeout()))
            .encoderConfig(encoderConfig().defaultContentCharset("UTF-8"))
            .logConfig(LogConfig.logConfig().enableLoggingOfRequestAndResponseIfValidationFails())
            .objectMapperConfig(new ObjectMapperConfig());
            
        RestAssured.baseURI = CONFIG_LOADER.getBaseUrl();
        RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
    }
    
    public static RequestSpecification getRequestSpecification() {
        return RestAssured.given()
            .config(RestAssured.config)
            .contentType(ContentType.JSON)
            .accept(ContentType.JSON)
            .filter(new RequestLoggingFilter())
            .filter(new ResponseLoggingFilter())
            .header("Authorization", "Bearer " + CONFIG_LOADER.getAuthToken())
            .header("X-API-Version", CONFIG_LOADER.getApiVersion());
    }
    
    public static RequestSpecification getRequestSpecificationWithAuth(String token) {
        return getRequestSpecification()
            .header("Authorization", "Bearer " + token);
    }
}