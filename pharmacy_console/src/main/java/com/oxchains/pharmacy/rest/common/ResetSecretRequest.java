package com.oxchains.pharmacy.rest.common;

import lombok.Data;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * @author aiet
 */
@Data
public class ResetSecretRequest {

  @Email(regexp = "^([_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{1,6}))?$")
  @NotNull
  private String email;

  @NotNull
  @Size(min = 4, max = 4)
  @Pattern(regexp = "[A-Za-z0-9]+")
  private String vcode;

  @NotNull
  @Size(min = 6, max = 24)
  private String password;

}
