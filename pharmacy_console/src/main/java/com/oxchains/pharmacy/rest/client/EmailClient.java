package com.oxchains.pharmacy.rest.client;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import static java.util.concurrent.CompletableFuture.runAsync;

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
  private String resetSubject;
  @Value("${mail.reset.text}")
  private String resetText;

  @Value("${mail.reset.from}")
  private String from;

  @Value("${mail.authentication.pass.subject}")
  private String authenticationSuccessSubject;
  @Value("${mail.authentication.pass.text}")
  private String authenticationSuccessText;

  @Value("${mail.authentication.deny.subject}")
  private String authenticationFailSubject;
  @Value("${mail.authentication.deny.text}")
  private String authenticationFailText;

  public void sendResetVcode(String vcode, String email) {
    runAsync(() -> {
      log.info("sending secret reset email to {}", email);
      SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
      simpleMailMessage.setFrom(from);
      simpleMailMessage.setTo(email);
      simpleMailMessage.setSubject(resetSubject);
      simpleMailMessage.setText(String.format(resetText, vcode));
      mailSender.send(simpleMailMessage);
      log.info("reset email sent to {}", email);
    }).exceptionally(t -> {
      log.error("failed to send reset vcode to {}: {}", email, t.getMessage());
      return null;
    });
  }

  public void sendAuthenticationResultAsync(boolean authenticated, String email, String username, String remark) {
    runAsync(() -> {
      log.info("sending authentication result email to {}", email);
      SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
      simpleMailMessage.setFrom(from);
      simpleMailMessage.setTo(email);
      simpleMailMessage.setSubject(authenticated ? authenticationSuccessSubject : authenticationFailSubject);
      simpleMailMessage.setText(
          String.format(authenticated ? authenticationSuccessText : authenticationFailText, username, remark)
      );
      mailSender.send(simpleMailMessage);
      log.info("authentication result sent to {}", email);
    }).exceptionally(t -> {
      log.error("failed to send authentication confirm email to {}: {}", username, t.getMessage());
      return null;
    });
  }

}
