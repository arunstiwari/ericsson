package com.tekmentors.service;

public class CalculatorService {

	public double calculate(String equation) {
		if(equation.contains("+")) {
			return processAddition(equation);
		}
		if(equation.contains("*")) {
			return processMultiplication(equation);
		}
		return Double.parseDouble(equation);
	}

	private double processAddition(String equation) {
		String[] components = equation.split("\\+");
		double result=0.0;
		for(String component: components) {
			result +=calculate(component);
		}
		return result;
	}
	
	private double processMultiplication(String equation) {
		String[] components = equation.split("\\*");
		double result=1.0;
		for(String component: components) {
			result *=calculate(component);
		}
		return result;
	}

}
