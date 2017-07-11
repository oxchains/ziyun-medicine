package com.oxchains.pharmacy.rest;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.oxchains.pharmacy.data.UserRepo;
import com.oxchains.pharmacy.rest.client.EmailClient;
import com.oxchains.pharmacy.rest.common.ResetSecretRequest;
import com.oxchains.pharmacy.rest.common.RestResp;
import com.oxchains.pharmacy.rest.common.UpdateSecretRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.regex.Pattern;

import static com.oxchains.pharmacy.Application.userContext;
import static com.oxchains.pharmacy.rest.common.RestResp.fail;
import static com.oxchains.pharmacy.rest.common.RestResp.success;
import static com.oxchains.pharmacy.utils.VerifyCodeUtil.TYPE_NUM_LOWER;
import static com.oxchains.pharmacy.utils.VerifyCodeUtil.generateTextCode;
import static java.util.concurrent.TimeUnit.MINUTES;

/**
 * @author aiet
 */
@Slf4j
@RestController
@RequestMapping("/user/secret")
public class UserSecretController {

  private final static Pattern EMAIL_PATTERN =
      Pattern.compile("^([_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{1,6}))?$");


  private static final Cache<String, String> VCODE_CACHE = CacheBuilder.newBuilder().expireAfterWrite(10, MINUTES)
      .concurrencyLevel(2).initialCapacity(5).maximumSize(100).build();

  private UserRepo userRepo;
  private EmailClient emailClient;

  public UserSecretController(
      @Autowired UserRepo userRepo,
      @Autowired EmailClient emailClient) {
    this.userRepo = userRepo;
    this.emailClient = emailClient;
  }

  @GetMapping("/reset/vcode")
  public RestResp resetVcode(@RequestParam String email) {
    if (!EMAIL_PATTERN.matcher(email).matches()) {
      return fail();
    }

    return userRepo.findByEmail(email).map(u -> {
      emailClient.sendResetVcode(genVcode(u.getEmail()), u.getEmail());
      return success(null);
    }).orElse(fail());
  }

  private String genVcode(String email) {
    String vcode = generateTextCode(TYPE_NUM_LOWER, 4, null);
    VCODE_CACHE.put(email, vcode);
    return vcode;
  }

  @PostMapping("/reset")
  public RestResp resetSecret(
      @RequestBody @Validated ResetSecretRequest resetSecretRequest,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      FieldError err = bindingResult.getFieldError();
      log.warn("invalid reset secret request {}: ", resetSecretRequest, err);
      return fail(err.getField());
    }

    String originalVcode = VCODE_CACHE.getIfPresent(resetSecretRequest.getEmail());
    if (!resetSecretRequest.getVcode().equals(originalVcode)) {
      return fail("invalid vcode");
    }

    return userRepo.findByEmail(resetSecretRequest.getEmail()).map(u -> {
      u.setPassword(resetSecretRequest.getPassword());
      userRepo.save(u);
      //TODO expire current token?
      return success(null);
    }).orElse(fail());

  }

  @PutMapping
  public RestResp updateSecret(
      @RequestBody @Validated UpdateSecretRequest updateSecretRequest,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      FieldError err = bindingResult.getFieldError();
      log.warn("invalid update secret request {}: ", updateSecretRequest, err);
      return fail(err.getField());
    }

    if (updateSecretRequest.invalid()) {
      return fail("old pass and new pass cannot be the same");
    }

    return userContext().flatMap(u ->
        userRepo.findByUsernameAndPassword(u.getUsername(), updateSecretRequest.getOldpass()).map(existingU -> {
          existingU.setPassword(updateSecretRequest.getNewpass());
          userRepo.save(existingU);
          //TODO expire current token?
          return success(null);
        })
    ).orElse(fail());
  }

}
