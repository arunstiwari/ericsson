package com.example.demo;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ClientTest {
	
	@Mock
	Encrypt encrypt;
	
	@Mock
	Transmit transmitter;
	
	@Test
	public void getAndSendStatusOfAChip() throws Exception {
		Client client = new Client();
		String ENCRYPTED_STATUS = "PGP64 Encryption";
		Mockito.when(encrypt.encrypt(Mockito.any())).thenReturn(ENCRYPTED_STATUS);
		Mockito.doCallRealMethod().when(transmitter).transmit(ENCRYPTED_STATUS);
		Chip chip = client.createChip();
		chip.setTransmitter(transmitter);
		chip.setEncryptionForm(encrypt);
		String status = chip.getAndSendStatus();
		assertEquals(ENCRYPTED_STATUS, status);
	}

}
