package com.oxchains.pharmacy.rest.common;

import lombok.Builder;
import lombok.Data;

/**
 * @author aiet
 */
@Builder
@Data
public class RangeStats {

  private String range;
  private long days;
  private long sensordata;

}
