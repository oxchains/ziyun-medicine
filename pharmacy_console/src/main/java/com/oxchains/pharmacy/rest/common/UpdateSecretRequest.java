package com.oxchains.pharmacy.rest.common;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author aiet
 */
@Data
public class UpdateSecretRequest {

  @NotNull
  @Size(min = 6, max = 24)
  private String oldpass;

  @NotNull
  @Size(min = 6, max = 24)
  private String newpass;

  public boolean invalid(){
    return oldpass.equals(newpass);
  }

}
