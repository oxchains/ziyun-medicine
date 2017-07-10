package com.oxchains.pharmacy.rest.client;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * @author aiet
 */
@Slf4j
@Service
public class EmailClient {

  public void sendResetVcode(String vcode, String email) {
    log.info("sent secret reset email to {}", email);
    //TODO
  }

}
