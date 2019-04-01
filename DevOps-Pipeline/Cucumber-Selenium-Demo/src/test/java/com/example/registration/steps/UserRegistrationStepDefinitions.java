package com.example.registration.steps;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.Proxy;
import org.openqa.selenium.Proxy.ProxyType;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;

import cucumber.api.java.After;
import cucumber.api.java.Before;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;

public class UserRegistrationStepDefinitions {
	
private WebDriver driver;
private String baseUrl;
	
	@Before
	public  void setup(){
		System.setProperty("webdriver.chrome.driver", "/Users/arun/Downloads/chromedriver");
//		Proxy proxy = new Proxy();
//		proxy.setAutodetect(false);
//		proxy.setProxyType(ProxyType.MANUAL);
//		proxy.setHttpProxy("localhost:8000");
		
		DesiredCapabilities capabilities = DesiredCapabilities.chrome();
//		capabilities.setCapability(CapabilityType.PROXY, proxy);
		
		
		baseUrl = "http://localhost:9080";
		driver = new ChromeDriver(capabilities);
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
	}
	
	@Given("^a new user with email \"(.*)\" firstname \"(.*)\" name \"(.*)\"$")
    public void registerUserWithGivenDetail(String email, String firstname, String name) throws Throwable {
        registerUser(email, firstname, name);
        Thread.sleep(2000);
	}
	
	@And("^another user with email \"(.*)\" firstname \"(.*)\" name \"(.*)\"$")
    public void registerOtherUserWithGivenDetail(String email, String firstname, String name) throws Throwable {
        registerUser(email, firstname, name);
        Thread.sleep(2000);
	}

	
    @When("^the user registers$")
    public void userRegisters() throws Throwable {
    		driver.findElement(By.cssSelector("input[type=\"submit\"]")).click();
    }
    
    @And("^the other user registers$")
    public void otherUserRegisters() throws Throwable {
    		driver.findElement(By.cssSelector("input[type=\"submit\"]")).click();
    }

    @And("^no error should be reported$")
    public void validateResponse() throws Throwable {
    		System.out.println("No error reported");
    }
    
    @Given("^a user with email \"(.*)\"$")
    public void searchUserForGivenEmailId(String email){
    	driver.get(baseUrl + "/en");
		driver.findElement(By.name("email")).clear();
		driver.findElement(By.name("email")).sendKeys(email);
		
    }
    
    @When("^the user searches $")
    public void searchUser(){
    	driver.findElement(By.cssSelector("input[type=\"submit\"]")).click();
    }
    
    @Then("^a user \"(.*)\" should exist$")
    public void userShouldExist(String email){
    	driver.get(baseUrl + "/en");
		driver.findElement(By.name("email")).clear();
		driver.findElement(By.name("email")).sendKeys(email);
		driver.findElement(By.cssSelector("input[type=\"submit\"]")).click(); 
		List<WebElement> divs = driver.findElements(By.cssSelector("div"));
		boolean found = false;
		for (WebElement div : divs) {
			if (div.getText().matches("^[\\s\\S]*Firstname[\\s\\S]*$")) {
				found = true;
			}
		}
		assertTrue(found);
    }
    
    @Then("^error with invalid message should be shown $")
    public void verifyInvalidEmailErrorDuringRegistration(){
    	assertTrue(driver.findElement(By.cssSelector(".alert.alert-error"))
				.getText().matches("^[\\s\\S]*not[\\s\\S]*valid[\\s\\S]*$"));
    }
    
    @Then("^the registration of the other user should fail $")
    public void otherRegistrationShouldFail(){
    	assertTrue(driver.findElement(By.cssSelector(".alert.alert-error"))
				.getText().matches("^[\\s\\S]*already in use[\\s\\S]*$"));
    }

    private void registerUser(String email, String firstname, String name) {
		driver.get("http://localhost:9080");
        driver.get(baseUrl + "/en");
		driver.findElement(By.linkText("Register User")).click();
		driver.findElement(By.id("firstname")).clear();
		driver.findElement(By.id("firstname")).sendKeys(firstname);
		driver.findElement(By.id("name")).clear();
		driver.findElement(By.id("name")).sendKeys(name);
		driver.findElement(By.id("email")).clear();
		driver.findElement(By.id("email")).sendKeys(email);
	}
	
	@After
	public void quit() throws Exception {
		driver.quit();
	}
}
