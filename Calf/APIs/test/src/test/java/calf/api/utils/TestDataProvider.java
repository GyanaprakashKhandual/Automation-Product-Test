package calf.api.utils;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.*;

import org.testng.annotations.DataProvider;

public class TestDataProvider {
    
    private static final ObjectMapper yamlMapper = new ObjectMapper(new YAMLFactory());
    private static final ObjectMapper jsonMapper = new ObjectMapper();
    
    @SuppressWarnings("unchecked")
    @DataProvider(name = "apiTestData")
    public static Iterator<Object[]> provideTestData(Method method) {
        String testName = method.getName();
        String className = method.getDeclaringClass().getSimpleName();
        
        try {
            // Load YAML test data
            File yamlFile = new File("src/test/resources/testdata/" + className + "/" + testName + ".yaml");
            if (yamlFile.exists()) {
                Map<String, Object> testData = yamlMapper.readValue(yamlFile, Map.class);
                return convertTestDataToIterator(testData);
            }
            
            // Load JSON test data
            File jsonFile = new File("src/test/resources/testdata/" + className + "/" + testName + ".json");
            if (jsonFile.exists()) {
                Map<String, Object> testData = jsonMapper.readValue(jsonFile, Map.class);
                return convertTestDataToIterator(testData);
            }
            
        } catch (IOException e) {
            throw new RuntimeException("Failed to load test data for " + testName, e);
        }
        
        throw new RuntimeException("No test data found for " + testName);
    }
    
    private static Iterator<Object[]> convertTestDataToIterator(Map<String, Object> testData) {
        List<Object[]> data = new ArrayList<>();
        testData.forEach((key, value) -> data.add(new Object[]{key, value}));
        return data.iterator();
    }
    
    public static <T> T getTestData(String filePath, Class<T> valueType) {
        try {
            File file = new File("src/test/resources/testdata/" + filePath);
            if (file.getName().endsWith(".yaml") || file.getName().endsWith(".yml")) {
                return yamlMapper.readValue(file, valueType);
            } else {
                return jsonMapper.readValue(file, valueType);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to load test data from " + filePath, e);
        }
    }
}