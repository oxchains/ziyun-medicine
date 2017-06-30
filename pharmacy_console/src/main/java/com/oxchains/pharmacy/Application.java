package com.oxchains.pharmacy;

import com.oxchains.pharmacy.auth.JwtAuthentication;
import com.oxchains.pharmacy.domain.FabricAccount;
import com.oxchains.pharmacy.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

import static com.oxchains.pharmacy.utils.ResponseUtil.extract;
import static org.springframework.security.core.context.SecurityContextHolder.getContext;

@Slf4j
@SpringBootApplication
public class Application {

  @Value("${fabric.manager.uri}")
  private String uri;

  @Value("${fabric.manager.enroll.path}")
  private String enrollPath;

  //TODO any affiliation's token for fabric manager should be saved periodically
  Optional<String> fabricManagerToken(String username, String password, String affiliation) {
    String resp = new RestTemplate().postForObject(uri + enrollPath, new FabricAccount(username, password, affiliation), String.class);
    Optional<String> tokenOptional = extract(resp, "/data/token");
    return tokenOptional.map(token -> "Bearer " + token);
  }

  public static Optional<User> userContext() {
    return ((JwtAuthentication) getContext().getAuthentication()).user();
  }

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
}
