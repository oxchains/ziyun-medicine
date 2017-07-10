package com.oxchains.pharmacy.rest.common;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.hibernate.validator.constraints.Email;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Size;
import java.io.File;
import java.io.IOException;
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
public class UpdateUserInfoRequest {

  private MultipartFile logo;

  @Email(regexp = "^([_a-zA-Z0-9-]+(\\\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\\\.[a-zA-Z0-9-]+)*(\\\\.[a-zA-Z]{1,6}))?$")
  private String email;

  @Size(min = 11, max = 11)
  private String phone;

  public boolean inValid() {
    return logo == null && email == null && phone == null;
  }

  public boolean logoModified() {
    return logo != null;
  }

  public boolean phoneModified() {
    return phone != null && !phone.isEmpty();
  }

  public boolean emailModified() {
    return email != null && !email.isEmpty();
  }

  public Optional<String> cachedLogo(String username, String basePath) {
    String uniqueDir = randomUUID().toString();
    try {
      String cacheFilename = String.format("%s/%s/%s-%s-%s-%s", basePath, uniqueDir,
          username, "logo", now().format(ISO_LOCAL_DATE_TIME), logo.getOriginalFilename());
      File cacheFile = new File(cacheFilename);
      if (cacheFile.exists()) {
        return Optional.of(cacheFilename);
      } else {
        FileUtils.forceMkdir(cacheFile.getParentFile());
        logo.transferTo(cacheFile);
      }
      log.info("cached new logo for user {}: {}", username, cacheFilename);
      return Optional.of(cacheFilename.replace(basePath, ""));
    }catch (IOException ioe){
      log.error("failed to cache logo for user {}: {}", username, ioe.getMessage());
    }
    return empty();
  }

}
