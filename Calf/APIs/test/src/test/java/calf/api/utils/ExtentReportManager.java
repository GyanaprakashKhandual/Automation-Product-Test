package calf.api.utils;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;
import com.calf.api.config.FrameworkConfig;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.calf.api.utils.ConfigLoader;


public class ExtentReportManager {
    
    private static ExtentReports extent;
    private static final ThreadLocal<ExtentTest> test = new ThreadLocal<>();
    
    public static ExtentReports getInstance() {
        if (extent == null) {
            createInstance();
        }
        return extent;
    }
    
    private static void createInstance() {
        FrameworkConfig config = ConfigLoader.getInstance().getConfig();
        String timeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());
        String reportName = "Test-Report-" + timeStamp + ".html";
        
        ExtentSparkReporter htmlReporter = new ExtentSparkReporter(config.extentReportPath() + reportName);
        htmlReporter.config().setDocumentTitle("API Test Automation Report");
        htmlReporter.config().setReportName("Rest Assured API Test Report");
        htmlReporter.config().setTheme(Theme.STANDARD);
        htmlReporter.config().setTimeStampFormat("EEEE, MMMM dd, yyyy, hh:mm a '('zzz')'");
        
        extent = new ExtentReports();
        extent.attachReporter(htmlReporter);
        extent.setSystemInfo("Host Name", "API Test Server");
        extent.setSystemInfo("Environment", config.environment());
        extent.setSystemInfo("User", System.getProperty("user.name"));
    }
    
    public static ExtentTest getTest() {
        return test.get();
    }
    
    public static void setTest(ExtentTest extentTest) {
        test.set(extentTest);
    }
}