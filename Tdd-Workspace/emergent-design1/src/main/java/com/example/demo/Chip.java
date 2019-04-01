package com.example.demo;

public class Chip {

	private String status="Non Encrypted";
	private Encrypt encrypt;
	private Transmit transmitter;
	

	public String getAndSendStatus() {
		encrypt();
		transmit();
		return getStatus();
	}

	private void transmit() {
		transmitter.transmit(getStatus());
	}

	private void encrypt() {
		this.status= encrypt.encrypt(getStatus());
	}

	private String getStatus() {
		return status;
	}

	public void setEncryptionForm(Encrypt encrypt) {
		this.encrypt = encrypt;
	}

	public void setTransmitter(Transmit transmitter) {
		this.transmitter = transmitter;
	}

}
