package com.oxchains.pharmacy.rest;

import com.oxchains.pharmacy.data.GpsUserRepo;
import com.oxchains.pharmacy.data.UserRepo;
import com.oxchains.pharmacy.data.UserTypeRepo;
import com.oxchains.pharmacy.domain.User;
import com.oxchains.pharmacy.rest.client.ChaincodeClient;
import com.oxchains.pharmacy.rest.client.EmailClient;
import com.oxchains.pharmacy.rest.common.AuthenticateRequest;
import com.oxchains.pharmacy.rest.common.RegisterRequest;
import com.oxchains.pharmacy.rest.common.RestResp;
import com.oxchains.pharmacy.rest.common.UpdateUserInfoRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.net.HttpHeaders.CONTENT_DISPOSITION;
import static com.oxchains.pharmacy.Application.userContext;
import static com.oxchains.pharmacy.rest.VCodeController.VCODE_CACHE;
import static com.oxchains.pharmacy.rest.common.RestResp.fail;
import static com.oxchains.pharmacy.rest.common.RestResp.success;
import static java.net.URLConnection.guessContentTypeFromName;
import static javax.servlet.http.HttpServletResponse.SC_NOT_FOUND;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

  private UserRepo userRepo;
  private UserTypeRepo userTypeRepo;
  private GpsUserRepo gpsUserRepo;
  private EmailClient emailClient;
  @Resource
  private ChaincodeClient chaincodeClient;

  public UserController(
          @Autowired UserRepo userRepo,
          @Autowired UserTypeRepo userTypeRepo,
          @Autowired EmailClient emailClient,
          @Autowired GpsUserRepo gpsUserRepo) {
    this.userRepo = userRepo;
    this.userTypeRepo = userTypeRepo;
    this.gpsUserRepo = gpsUserRepo;
    this.emailClient = emailClient;
  }

  @Value("${file.upload.dir}")
  private String uploadDir;

  @PostMapping
  public RestResp register(
          @CookieValue(value = "JSESSIONID") String mockSessionId,
          @ModelAttribute @Valid RegisterRequest registerRequest, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      FieldError err = bindingResult.getFieldError();
      log.warn("invalid registration request {}: ", registerRequest, err);
      return fail(err.getField());
    }

    String originalVcode = VCODE_CACHE.getIfPresent(mockSessionId);
    if (!registerRequest.getVcode().equals(originalVcode)) {
      return fail("invalid vcode");
    }

    return userRepo.findByUsernameOrEmail(
            registerRequest.getUsername(), registerRequest.getEmail()
    ).map(
            existingUser -> fail("user or email exist")
    ).orElseGet(
            () -> userTypeRepo.findByCode(registerRequest.getType()).map(
                    userType -> registerRequest.toUser(userType, uploadDir).map(
                            newUser -> {
                              User savedUser = userRepo.save(newUser);
                              log.info("new registration {}({})", savedUser.getUsername(), savedUser.getId());
                              return success(null);
                            }).orElse(fail("system error"))
            ).orElse(fail("invalid type"))
    );
  }

  @PostMapping("/info")
  public RestResp updateInfo(
          @ModelAttribute @Valid UpdateUserInfoRequest updateRequest, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      FieldError err = bindingResult.getFieldError();
      log.warn("invalid update request {}: ", updateRequest, err);
      return fail(err.getField());
    }

    if (updateRequest.inValid()) {
      return fail("update at lease one field: email, phone, logo");
    }

    if(updateRequest.emailModified()
            && userRepo.findByEmail(updateRequest.getEmail()).isPresent()){
      return fail("email exist");
    }

    return userContext().map(u -> {
      if (updateRequest.emailModified()) u.setEmail(updateRequest.getEmail());
      if (updateRequest.phoneModified()) u.setPhone(updateRequest.getPhone());
      if (updateRequest.logoModified()) updateRequest.cachedLogo(u.getUsername(), uploadDir).ifPresent(u::setLogo);
      return userRepo.save(u);
    }).map(RestResp::success).orElse(fail());

  }


  private void fileNotFound(HttpServletResponse response) {
    try {
      response.setStatus(SC_NOT_FOUND);
      response.getWriter().write("file not found");
    } catch (Exception e) {
      log.warn("failed to write response");
    }
  }

  @GetMapping("/application")
  public void downloadApplyFile(HttpServletRequest request, HttpServletResponse response) {
    log.debug("==path==="+UserController.class.getClassLoader().getResource("apply.docx").getPath());
    File applicationFile = new File(UserController.class.getClassLoader().getResource("apply.docx").getPath());
    if (applicationFile.exists()) {
      try {
        Path filePath = applicationFile.toPath();
        response.setHeader(CONTENT_DISPOSITION, "attachment; filename=" + applicationFile.getName());
        response.setContentType(guessContentTypeFromName(applicationFile.getName()));
        response.setContentLengthLong(applicationFile.length());
        Files.copy(filePath, response.getOutputStream());
      } catch (Exception e) {
        log.warn("failed to downloadApplyFile",  e.getMessage());
      }
    } else {
      fileNotFound(response);
    }
  }

  @GetMapping("/{uid}/application")
  public void downloadFileByUserName(@PathVariable Long uid, HttpServletRequest request, HttpServletResponse response) {
    userRepo.findById(uid).map(user -> {
      File applicationFile = new File(uploadDir + user.getApplication());
      if (applicationFile.exists()) {
        try {
          Path filePath = applicationFile.toPath();
          response.setHeader(CONTENT_DISPOSITION, "attachment; filename=" + applicationFile.getName());
          response.setContentType(guessContentTypeFromName(applicationFile.getName()));
          response.setContentLengthLong(applicationFile.length());
          Files.copy(filePath, response.getOutputStream());
        } catch (Exception e) {
          log.warn("failed to deliver application file of user {}: {}", user, e.getMessage());
        }
      } else {
        fileNotFound(response);
      }
      return null;
    }).orElseGet(() -> {
      fileNotFound(response);
      return null;
    });
  }


  @GetMapping("/{uuid}/downloadfile")
  public void downloadFile(@PathVariable String uuid, HttpServletRequest request, HttpServletResponse response) {
    chaincodeClient.downloadFile(uuid.toString(),response);
  }

  @GetMapping("/{uid:(?!application).*$}")
  public RestResp user(@PathVariable Long uid) {
    return userRepo.findById(uid).map(RestResp::success).orElse(fail("user not found"));
  }

  @GetMapping
  public RestResp list(@RequestParam(defaultValue = "true") boolean authenticated) {
    return success(newArrayList(userRepo.findByAuthenticated(authenticated ? 1 : 0)));
  }

  @PutMapping("/{uid}/authentication")
  public RestResp authenticate(
          @PathVariable Long uid,
          @RequestBody AuthenticateRequest authenticateRequest) {
    return userContext().flatMap(u ->
            userRepo.findById(uid).map(userToAuthenticate -> {
              final boolean authenticated = authenticateRequest.getAction() > 0;
              userToAuthenticate.setAuthenticated(authenticated ? 1 : -1);
              User savedUser = userRepo.save(userToAuthenticate);
              //call ziyun-api,register user
              if(authenticated){//审核通过
                log.debug("===register==="+chaincodeClient.register(savedUser));
              }
              emailClient.sendAuthenticationResultAsync(authenticated,
                  userToAuthenticate.getEmail(), userToAuthenticate.getUsername(), authenticateRequest.getRemark());
              return success(savedUser);
            })
    ).orElse(fail());
  }

  @GetMapping("/simple")
  public RestResp list() {
    return success(newArrayList(gpsUserRepo.findAll()));
  }

  @GetMapping("/type")
  public RestResp userTypeList() {
    return success(newArrayList(userTypeRepo.findAll()));
  }


  @PostMapping("/auth/allow")
  public String allow(@RequestBody String body){
    System.out.println("body==="+body);
    return chaincodeClient.allow(body,userContext().get().getUsername(),userContext().get().getPassword());
  }

  @GetMapping("/auth/query")
  public String query(){
    return chaincodeClient.query(userContext().get().getUsername(),userContext().get().getPassword());
  }


  @GetMapping("/queryuser")
  public String queryuser(){
    return chaincodeClient.queryuser(userContext().get().getUsername(),userContext().get().getPassword());
  }
}
