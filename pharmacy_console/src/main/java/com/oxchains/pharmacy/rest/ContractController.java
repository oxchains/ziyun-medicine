package com.oxchains.pharmacy.rest;

import com.oxchains.pharmacy.rest.client.ChaincodeClient;
import com.oxchains.pharmacy.data.FabricTokenRepo;
import com.oxchains.pharmacy.rest.common.RangeStats;
import com.oxchains.pharmacy.rest.common.RestResp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import static com.oxchains.pharmacy.Application.userContext;
import static com.oxchains.pharmacy.rest.common.RestResp.fail;
import static com.oxchains.pharmacy.rest.common.RestResp.success;
import static java.time.Instant.ofEpochSecond;

/**
 * @author aiet
 */
@Slf4j
@RestController
@RequestMapping("/contract")
public class ContractController {

  private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy年MM月dd日").withZone(ZoneId.systemDefault());

  private ChaincodeClient chaincodeClient;
  private FabricTokenRepo fabricTokenRepo;

  public ContractController(
      @Autowired ChaincodeClient chaincodeClient,
      @Autowired FabricTokenRepo fabricTokenRepo) {
    this.chaincodeClient = chaincodeClient;
    this.fabricTokenRepo = fabricTokenRepo;
  }

  @GetMapping("/sensor")
  public RestResp sensor(
      @RequestParam(required = false, defaultValue = "") String serial,
      @RequestParam(required = false, defaultValue = "") String equipment,
      @RequestParam long start, @RequestParam long end) {

    if (serial.isEmpty() && equipment.isEmpty()) {
      return fail("one of serial and equipment must be specified");
    }

    if (!validTimeBoundary(start, end)) {
      return fail("invalid range");
    }

    log.info("sensor data by serial/equipment: {}/{}", serial, equipment);

    return userContext().map(u ->
        fabricTokenRepo.findByUser(u).map(fabricToken ->
            serial.isEmpty() ?
                chaincodeClient.getSensorByEquipment(equipment, start, end, fabricToken.getToken())
                : chaincodeClient.getSensorBySerial(serial, start, end, fabricToken.getToken())
        ).map(RestResp::success).orElse(fail("no sensor data"))
    ).orElse(fail());
  }

  private boolean validTimeBoundary(long start, long end) {
    return start <= end
        && String.valueOf(start).length() == 10
        && String.valueOf(end).length() == 10;
  }

  @GetMapping("/stats")
  public RestResp stats(
      @RequestParam long start, @RequestParam long end) {

    if (!validTimeBoundary(start, end)) {
      return fail("invalid range");
    }

    return userContext().map(u ->
        fabricTokenRepo.findByUser(u).flatMap(fabricToken ->
            chaincodeClient.getSensorStats(start, end, fabricToken.getToken())
        ).map(sensorStats -> {
          Instant startTemporal = ofEpochSecond(start), endTemporal = ofEpochSecond(end);
          long days = Duration.between(startTemporal, endTemporal).toDays();
          String range = DATE_FORMATTER.format(startTemporal) + " - " + DATE_FORMATTER.format(endTemporal);
          return success(RangeStats.builder().range(range).days(days).sensordata(sensorStats).build());
        }).orElse(fail("no stats data"))
    ).orElse(fail());
  }


}
