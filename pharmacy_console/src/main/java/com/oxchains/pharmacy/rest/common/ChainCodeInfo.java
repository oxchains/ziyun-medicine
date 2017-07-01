package com.oxchains.pharmacy.rest.common;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.Date;

/**
 * @author aiet
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ChainCodeInfo {

  private String name;
  private String path;
  private String version;
  private String lang;
  private Date createtime;

}
