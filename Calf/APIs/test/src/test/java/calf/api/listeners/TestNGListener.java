package calf.api.listeners;

import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;

import calf.api.utils.ExtentReportManager;


public class TestNGListener implements ITestListener {
    
    private static final ThreadLocal<ExtentTest> test = new ThreadLocal<>();
    private static final ExtentReports extent = ExtentReportManager.getInstance();
    
    @Override
    public void onTestStart(ITestResult result) {
        ExtentTest extentTest = extent.createTest(result.getMethod().getMethodName());
        test.set(extentTest);
    }
    
    @Override
    public void onTestSuccess(ITestResult result) {
        test.get().log(Status.PASS, "Test passed");
    }
    
    @Override
    public void onTestFailure(ITestResult result) {
        Throwable throwable = result.getThrowable();
        String errorMessage = throwable != null ? throwable.toString() : "Unknown error";
        test.get().log(Status.FAIL, "Test failed: " + errorMessage);
    }
    
    @Override
    public void onFinish(ITestContext context) {
        extent.flush();
    }
}