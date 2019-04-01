package features.impl;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;

public class CheckoutStepdefs {

	@Given("the price of a {string} is {int}c")
	public void the_price_of_a_is_c(String string, Integer int1) {
	    // Write code here that turns the phrase above into concrete actions
	    throw new cucumber.api.PendingException();
	}

	@When("I checkout {int} {string}")
	public void i_checkout(Integer int1, String string) {
	    // Write code here that turns the phrase above into concrete actions
	    throw new cucumber.api.PendingException();
	}

	@Then("the total price should be {int}c")
	public void the_total_price_should_be_c(Integer int1) {
	    // Write code here that turns the phrase above into concrete actions
	    throw new cucumber.api.PendingException();
	}
}
