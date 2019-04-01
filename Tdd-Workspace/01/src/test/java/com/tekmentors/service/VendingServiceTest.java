package com.tekmentors.service;

import static org.junit.Assert.*;

import org.junit.Test;

import com.tekmentors.domain.Tea;

public class VendingServiceTest {
	
	@Test
	public void prepareTeaWithNormalFlavour() throws Exception {
		VendingMachine vendingMachine = new VendingMachine();
		Tea normalTea = vendingMachine.prepareTea();
		assertEquals("Normal", normalTea.getType());
		assertEquals(true, normalTea.isPrepared());
	}

}
