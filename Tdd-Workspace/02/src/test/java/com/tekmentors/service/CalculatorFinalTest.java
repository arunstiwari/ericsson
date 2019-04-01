package com.tekmentors.service;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class CalculatorFinalTest {
	
	private static final double DELTA = 0.1;
	CalculatorFinal calculator;
	
	@Before
	public void before() {
		calculator = new CalculatorFinal();
	}
	
	@Test
	public void whenIHaveAsAStringOfOneThenIGetADoubleOfOne() throws Exception {
		String equation="1";
		double expectedResult = 1.0;
		double actualResult = calculator.calculate(equation);
		
		assertEquals(expectedResult, actualResult,DELTA);
	}
	
	@Test
	public void whenIHaveAsAStringOfTwoThenIGetADoubleOfTwo() throws Exception {
		String equation="2";
		double expectedResult = 2.0;
		double actualResult = calculator.calculate(equation);
		
		assertEquals(expectedResult, actualResult,DELTA);
	}
	
	@Test
	public void whenIHaveAsAStringOfOnePlusOneThenIGetADoubleOfTwo() throws Exception {
		String equation="1+1";
		double expectedResult = 2.0;
		double actualResult = calculator.calculate(equation);
		
		assertEquals(expectedResult, actualResult,DELTA);
	}
	
	@Test
	public void whenIHaveAsAStringOfOnePlusOnePlusTwoThenIGetADoubleOfFour() throws Exception {
		String equation="1+1+2";
		double expectedResult = 4.0;
		double actualResult = calculator.calculate(equation);
		
		assertEquals(expectedResult, actualResult,DELTA);
	}
	
	@Test
	public void whenIHaveAsAStringOfTwoTimesTwoThenIGetADoubleFour() throws Exception {
		String equation="2*2";
		double expectedResult = 4.0;
		double actualResult = calculator.calculate(equation);
		
		assertEquals(expectedResult, actualResult,DELTA);
	}
	
	@Test
	public void whenIHaveAsAStringOfTwoMinusOneThenIGetADoubleOne() throws Exception {
		String equation="2-1";
		double expectedResult = 1.0;
		double actualResult = calculator.calculate(equation);
		
		assertEquals(expectedResult, actualResult,DELTA);
	}
	//4+5*3-7
	@Test
	public void whenIHaveAsAStringOfFourPlusFiveTimesThreeMinusSevenThenIGetADoubleTwelve() throws Exception {
		String equation="4+5*3-7";
		double expectedResult = 12.0;
		double actualResult = calculator.calculate(equation);
		
		assertEquals(expectedResult, actualResult,DELTA);
	}
}
