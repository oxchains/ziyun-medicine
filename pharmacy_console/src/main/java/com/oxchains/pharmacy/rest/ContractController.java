package com.oxchains.pharmacy.rest;

import com.oxchains.pharmacy.data.ChaincodeData;
import com.oxchains.pharmacy.data.FabricTokenRepo;
import com.oxchains.pharmacy.rest.common.RestResp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.oxchains.pharmacy.Application.userContext;
import static com.oxchains.pharmacy.rest.common.RestResp.fail;

/**
 * @author aiet
 */
@Slf4j
@RestController
@RequestMapping("/contract")
public class ContractController {

  private ChaincodeData chaincodeData;
  private FabricTokenRepo fabricTokenRepo;

  public ContractController(
      @Autowired ChaincodeData chaincodeData,
      @Autowired FabricTokenRepo fabricTokenRepo) {
    this.chaincodeData = chaincodeData;
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

    log.info("sensor data by serial/equipment: {}/{}", serial, equipment);

    return userContext().map(u ->
        fabricTokenRepo.findByUser(u).map(fabricToken ->
            serial.isEmpty() ?
                chaincodeData.getSensorByEquipment(equipment, start, end, fabricToken.getToken())
                : chaincodeData.getSensorBySerial(serial, start, end, fabricToken.getToken())
        ).map(RestResp::success).orElse(fail("no sensor data"))
    ).orElse(fail());
  }

  @GetMapping("/stats")
  public RestResp stats(
      @RequestParam long start, @RequestParam long end) {
    return userContext().map(u ->
        fabricTokenRepo.findByUser(u).flatMap(fabricToken ->
            chaincodeData.getSensorStats(start, end, fabricToken.getToken())
        ).map(RestResp::success).orElse(fail("no stats data"))
    ).orElse(fail());
  }

}
