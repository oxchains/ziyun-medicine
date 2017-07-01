package com.oxchains.pharmacy.rest.common;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

import static java.util.Collections.emptyList;
import static java.util.stream.Collectors.toList;

/**
 * @author aiet
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class PeerInfo {

  private String id;
  private String endpoint;
  private String status;
  private String affiliation;
  private List<ChainCodeInfo> chaincodes = emptyList();
  private List<String> chains = emptyList();

  @JsonIgnore
  public List<ChainCodeInfo> getChaincodes() {
    return this.chaincodes;
  }

  @JsonGetter("chaincodes")
  public List<String> chaincodes() {
    return this.chaincodes.stream().map(ChainCodeInfo::getPath).collect(toList());
  }

  @Override
  public String toString() {
    return String.format("%s - %s", id, endpoint);
  }

}
