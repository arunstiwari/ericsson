package features.impl;



import org.junit.Assert;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;

public class CheckoutStepdefs {
	int bananaPrice = 0;
	Checkout checkout;

	@Given("the price of a {string} is {int}c")
	public void the_price_of_a_is_c(String name, Integer price) {
	     bananaPrice = price;
	}

	@When("I checkout {int} {string}")
	public void i_checkout(Integer itemCount, String itemName) {
		checkout = new Checkout();
        checkout.add(itemCount, bananaPrice);
	}

	@Then("the total price should be {int}c")
	public void the_total_price_should_be_c(Integer total) {
	    Assert.assertEquals(total.intValue(), checkout.total());
	}
}
