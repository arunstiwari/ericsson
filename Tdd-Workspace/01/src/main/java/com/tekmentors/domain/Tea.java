package com.tekmentors.domain;

public class Tea {

	private String type;

	public Tea(String type) {
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public boolean isPrepared() {
		return false;
	}

}
