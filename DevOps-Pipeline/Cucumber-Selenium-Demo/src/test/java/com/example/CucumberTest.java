package com.example;

import org.junit.runner.RunWith;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;

@RunWith(Cucumber.class)
//@CucumberOptions(format = { "pretty", "html:target/cucumber", "json:target/cucumber.json" }, glue = "com.example.registration.steps")
@CucumberOptions(plugin = {"pretty", "html:target/cucumber"})
public class CucumberTest {

}

