package com.calf.api.utils;

import com.calf.api.config.FrameworkConfig;
import org.aeonbits.owner.ConfigFactory;
import java.util.HashMap;
import java.util.Map;

public class ConfigLoader {
    
    private static ConfigLoader instance;
    private final FrameworkConfig config;
    
    // Private constructor to prevent instantiation
    private ConfigLoader() {
        this.config = ConfigFactory.create(FrameworkConfig.class, getSystemProperties());
    }
    
    /**
     * Singleton instance getter
     */
    public static synchronized ConfigLoader getInstance() {
        if (instance == null) {
            instance = new ConfigLoader();
        }
        return instance;
    }
    
    /**
     * Get the configuration instance
     */
    public FrameworkConfig getConfig() {
        return config;
    }
    
    /**
     * Get system properties with environment variable overrides
     */
    private Map<String, String> getSystemProperties() {
        Map<String, String> properties = new HashMap<>();
        
        // Add all system properties
        System.getProperties().forEach((key, value) -> 
            properties.put(key.toString(), value.toString()));
        
        // Add environment variables (they take precedence over system properties)
        System.getenv().forEach(properties::put);
        
        return properties;
    }
    
    /**
     * Reload configuration (useful for dynamic property changes)
     */
    public void reload() {
        instance = new ConfigLoader();
    }
    
    /**
     * Helper methods for commonly used properties
     */
    public String getBaseUrl() {
        return config.baseUrl();
    }
    
    public String getEnvironment() {
        return config.environment();
    }
    
    public int getTimeout() {
        return config.timeout();
    }
    
    public String getAuthToken() {
        return config.authToken();
    }
    
    public String getApiVersion() {
        return config.apiVersion();
    }
    
    /**
     * Check if running in specific environment
     */
    public boolean isDevEnvironment() {
        return "dev".equalsIgnoreCase(config.environment());
    }
    
    public boolean isStagingEnvironment() {
        return "staging".equalsIgnoreCase(config.environment());
    }
    
    public boolean isProductionEnvironment() {
        return "prod".equalsIgnoreCase(config.environment());
    }
}