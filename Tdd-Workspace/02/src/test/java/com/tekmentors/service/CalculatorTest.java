package com.tekmentors.service;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class CalculatorTest {
	
	/*
	 * Objective is to create a calculation engine which calculates a given equation 
	 * provided as input
	 * 5+3*7-4
	 */
	
	private Calculator calculator;
	private final double DELTA=0.1;
	@Before
	public void before() {
		calculator = new Calculator();
	}

	@Test
	public void whenIHaveAsAStringOfOneThenIGetADoubleOfOne() throws Exception {
	
		double expectedResult= 1.0;
		String equation = "1";
		double actualResult = calculator.calculate(equation );
		assertEquals(expectedResult, actualResult, DELTA);
		
	}
	
	@Test
	public void whenIHaveAsAStringOfTwoThenIGetADoubleOfTwo() throws Exception {
		double expectedResult= 2.0;
		String equation = "2";
		double actualResult = calculator.calculate(equation );
		assertEquals(expectedResult, actualResult, DELTA);
	}
	
	@Test
	public void whenIHaveAsAStringOfOnePlusTwoThenIGetADoubleOfThree() throws Exception {
		double expectedResult= 3.0;
		String equation = "1+2";
		double actualResult = calculator.calculate(equation );
		assertEquals(expectedResult, actualResult, DELTA);
	}
	
	@Test
	public void whenIHaveAsAStringOfOnePlusTwoPlusThreeThenIGetADoubleOfSix() throws Exception {
		double expectedResult= 6.0;
		String equation = "1+2+3";
		double actualResult = calculator.calculate(equation );
		assertEquals(expectedResult, actualResult, DELTA);
	}
	
	@Test
	public void whenIHaveAsAStringOfTwoTimesTwoThenIGetADoubleOfFour() throws Exception {
		double expectedResult= 4.0;
		String equation = "2*2";
		double actualResult = calculator.calculate(equation );
		assertEquals(expectedResult, actualResult, DELTA);
	}
	@Test
	public void whenIHaveAsAStringOfTwoTimesTwoTimesTwoThenIGetADoubleOfEight() throws Exception {
		double expectedResult= 8.0;
		String equation = "2*2*2";
		double actualResult = calculator.calculate(equation );
		assertEquals(expectedResult, actualResult, DELTA);
	}

}
