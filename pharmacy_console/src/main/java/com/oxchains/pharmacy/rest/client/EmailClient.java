package com.oxchains.pharmacy.rest.client;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * @author aiet
 */
@Slf4j
@Service
public class EmailClient {

  private JavaMailSender mailSender;

  public EmailClient(JavaMailSender mailSender) {
    this.mailSender = mailSender;
  }

  @Value("${mail.reset.subject}")
  private String subject;
  @Value("${mail.reset.text}")
  private String text;
  @Value("${mail.reset.from}")
  private String from;

  public void sendResetVcode(String vcode, String email) {
    log.info("sent secret reset email to {}", email);
    SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
    simpleMailMessage.setFrom(from);
    simpleMailMessage.setTo(email);
    simpleMailMessage.setSubject(subject);
    simpleMailMessage.setText(String.format(text, vcode));
    mailSender.send(simpleMailMessage);
  }

}
