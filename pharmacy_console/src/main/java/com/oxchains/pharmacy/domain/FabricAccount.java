package com.oxchains.pharmacy.domain;

import lombok.Data;

/**
 * @author aiet
 */
@Data
public class FabricAccount {

  private String username;
  private String password;
  private String affiliation;

  public FabricAccount(String username, String password, String affiliation) {
    this.username = username;
    this.password = password;
    this.affiliation = affiliation;
  }

}
