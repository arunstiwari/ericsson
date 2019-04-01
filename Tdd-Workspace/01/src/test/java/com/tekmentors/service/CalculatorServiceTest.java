package com.tekmentors.service;

import static org.junit.Assert.*;

import org.junit.Test;

public class CalculatorServiceTest {
	
	/*
	 * 1 
	 * 1+1
	 * 
	 */
	
	@Test
	public void whenIUseStringOfOneIShouldGetDoubleOne() throws Exception {
		String equation = "1";
		CalculatorService calculatorService = new CalculatorService();
		double actualResult = calculatorService.calculate(equation );
		assertEquals(1.0, actualResult,0.0);
	}
	
	/*
	 * 2
	 */
	
	@Test
	public void whenIUseStringOfTwoIShouldGetDoubleTwo() throws Exception {
		String equation = "2";
		CalculatorService calculatorService = new CalculatorService();
		double actualResult = calculatorService.calculate(equation );
		assertEquals(2.0, actualResult,0.0);
	}
	
	/*
	 * 1+1
	 */
	@Test
	public void whenIUseStringOfOnePlusOneIShouldGetDoubleTwo() throws Exception {
		String equation = "1+1";
		CalculatorService calculatorService = new CalculatorService();
		double actualResult = calculatorService.calculate(equation );
		assertEquals(2.0, actualResult,0.0);
	}
	
	/*
	 * 1+1+1
	 */
	@Test
	public void whenIUseStringOfOnePlusOnePlusOneIShouldGetDoubleThree() throws Exception {
		String equation = "1+1+1";
		CalculatorService calculatorService = new CalculatorService();
		double actualResult = calculatorService.calculate(equation );
		assertEquals(3.0, actualResult,0.0);
	}
	
	/*
	 * 2*2
	 */
	@Test
	public void whenIUseStringOfTwoMultiplyTwoIShouldGetDoubleFour() throws Exception {
		String equation = "2*2";
		CalculatorService calculatorService = new CalculatorService();
		double actualResult = calculatorService.calculate(equation );
		assertEquals(4.0, actualResult,0.0);
	}

	/*
	 * 2*2*2
	 */
	@Test
	public void whenIUseStringOfTwoMultiplyTwoMultiplyTwoIShouldGetDoubleFour() throws Exception {
		String equation = "2*2*2";
		CalculatorService calculatorService = new CalculatorService();
		double actualResult = calculatorService.calculate(equation );
		assertEquals(8.0, actualResult,0.0);
	}



}
