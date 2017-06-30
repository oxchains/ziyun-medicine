package com.oxchains.pharmacy.rest;

import com.oxchains.pharmacy.auth.JwtService;
import com.oxchains.pharmacy.data.UserRepo;
import com.oxchains.pharmacy.data.UserTokenRepo;
import com.oxchains.pharmacy.domain.UserToken;
import com.oxchains.pharmacy.rest.common.RestResp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.oxchains.pharmacy.rest.common.RestResp.fail;
import static com.oxchains.pharmacy.rest.common.RestResp.success;

/**
 * @author aiet
 */
@Slf4j
@RestController
@RequestMapping("/token")
public class TokenController {

  private JwtService jwtService;
  private UserRepo userRepo;
  private UserTokenRepo userTokenRepo;

  public TokenController(
      @Autowired JwtService jwtService,
      @Autowired UserRepo userRepo,
      @Autowired UserTokenRepo userTokenRepo) {
    this.jwtService = jwtService;
    this.userRepo = userRepo;
    this.userTokenRepo = userTokenRepo;
  }

  @PostMapping
  public RestResp token(@RequestParam String username, @RequestParam String password) {
    return userRepo.findByUsernameAndPassword(username, password)
        .map(u -> {
          UserToken userToken = new UserToken(jwtService.generate(u));
          log.info("{} enrolled", username);
          return success(userTokenRepo.save(userToken));
        })
        .orElse(fail());
  }

}
