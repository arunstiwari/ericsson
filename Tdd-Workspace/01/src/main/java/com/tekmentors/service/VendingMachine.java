package com.tekmentors.service;

import com.tekmentors.domain.Tea;

public class VendingMachine {

	public Tea prepareTea() {
		/**
		 * 1. Boil Water
		 * 2. Add sugar
		 * 3. Add Tea
		 * 4. Add milk
		 * 5. Pour the Tea
		 */
		 boilWater();
		 addSugar();
		 addTea();
		 addMilk();
		 pourTea();
		
		return new Tea("Normal");
		
	}

	private void pourTea() {
		
	}

	private void addMilk() {
		
	}

	private void addTea() {
		
	}

	private void addSugar() {
		
	}

	private void boilWater() {
		
	}

}
