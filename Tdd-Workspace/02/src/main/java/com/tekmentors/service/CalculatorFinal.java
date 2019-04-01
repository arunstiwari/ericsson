package com.tekmentors.service;

public class CalculatorFinal {

	public double calculate(String equation) {
		if(equation.contains("+")) {
			return processAddition(equation);
		}
		if(equation.contains("-")) {
			return processSubtraction(equation);
		}
		if(equation.contains("*")) {
			return processMultiplication(equation);
		}
		
		if(equation.matches("[0-9]+")) {
			return Double.parseDouble(equation);
		}
		return Double.NaN;
	}

	private double processMultiplication(String equation) {
		String[] components =  equation.split("\\*");
		return calculate(components[0]) * calculate(components[1]);
	}

	private double processSubtraction(String equation) {
		String[] components =  equation.split("-");
		return calculate(components[0]) - calculate(components[1]);
	}

	private double processAddition(String equation) {
		String[] components =  equation.split("\\+");
		double result =0.0;
		for(String component: components) {
			result += calculate(component);
		}
		return result;
	}
	
}
