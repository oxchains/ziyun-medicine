package com.oxchains.pharmacy.rest.common;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.oxchains.pharmacy.domain.User;
import com.oxchains.pharmacy.domain.UserType;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.hibernate.validator.constraints.Email;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.Optional;

import static java.time.LocalDateTime.now;
import static java.time.format.DateTimeFormatter.ISO_LOCAL_DATE_TIME;
import static java.util.Optional.empty;
import static java.util.UUID.randomUUID;

/**
 * @author aiet
 */
@Slf4j
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class RegisterRequest {

  @NotNull
  private MultipartFile application;
  @NotNull
  private MultipartFile license;
  @NotNull
  private MultipartFile idfront;
  @NotNull
  private MultipartFile idback;
  @NotNull
  private MultipartFile logo;

  @Min(0)
  @Max(9)
  private int type;

  @Email(regexp = "^([_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{1,6}))?$")
  @NotNull
  private String email;

  @NotNull
  @Size(min = 4, max = 32)
  private String username;

  @NotNull
  @Size(min = 6, max = 24)
  private String password;

  @NotNull
  @Size(min = 11, max = 11)
  private String phone;

  @NotNull
  @Size(min = 2, max = 128)
  private String company;

  @NotNull
  @Size(min = 2, max = 25)
  private String representative;

  @NotNull
  @Size(min = 4, max = 4)
  @Pattern(regexp = "[A-Za-z0-9]+")
  private String vcode;

  public Optional<User> toUser(UserType userType, String basePath) {
    try {
      String uniqueDir = randomUUID().toString();
      User newUser = User.builder().username(username).company(company).email(email).userType(userType).password(password)
          .representative(representative).phone(phone)
          .application(cacheFile(application, basePath, uniqueDir, "application"))
          .license(cacheFile(license, basePath, uniqueDir, "license"))
          .identityback(cacheFile(idback, basePath, uniqueDir, "idback"))
          .identityface(cacheFile(idfront, basePath, uniqueDir, "idfront"))
          .logo(cacheFile(logo, basePath, uniqueDir, "logo"))
          .applydate(new Date())
          .authenticated(0).build();
      return Optional.of(newUser);
    } catch (Exception e) {
      log.error("failed to cache file:", e);
    }
    return empty();
  }

  private String cacheFile(MultipartFile file, String basePath, String uniqueDir, String kind) throws IOException {
    String cacheFilename = String.format("%s/%s/%s-%s-%s-%s", basePath, uniqueDir,
        username, kind, now().format(ISO_LOCAL_DATE_TIME), file.getOriginalFilename());
    File cacheFile = new File(cacheFilename);
    if (cacheFile.exists()) {
      return cacheFilename;
    } else {
      FileUtils.forceMkdir(cacheFile.getParentFile());
      file.transferTo(cacheFile);
    }
    log.info("cached {} for user {}: {}", kind, username, cacheFilename);
    return cacheFilename.replace(basePath, "");
  }


}
