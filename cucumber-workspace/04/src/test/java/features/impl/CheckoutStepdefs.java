package features.impl;



import org.junit.Assert;

import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;

public class CheckoutStepdefs {
	int bananaPrice = 0;
	int applePrice = 0;
	Checkout checkout = new Checkout();

	@Given("the price of a {string} is {int}c")
	public void the_price_of_a_is_c(String name, Integer price) {
		 if(name.equals("apple")) {
			 applePrice = price;
		 }
		 else
			 bananaPrice = price;
	}
	

	@When("I checkout {int} {string}")
	public void i_checkout(Integer itemCount, String itemName) {	
		
		if(itemName.equals("banana"))
			checkout.add(itemCount, bananaPrice);
		else
			checkout.add(itemCount, applePrice);
	}
	
	

	@Then("the total price should be {int}c")
	public void the_total_price_should_be_c(Integer total) {
	    Assert.assertEquals(total.intValue(), checkout.total());
	}
}
