package com.oxchains.pharmacy.rest.common;

import lombok.Data;

import java.util.List;

/**
 * @author aiet
 */
@Data
public class SensorData {

  private String SensorNumber;
  private String SensorType;
  private String EquipmentNumber;
  private String EquipmentType;
  private long Time;
  private List<Double> Temperature;
  private List<Double> Humidity;
  private String GPSLongitude;
  private String GPSLatitude;
  private String Address;

}
