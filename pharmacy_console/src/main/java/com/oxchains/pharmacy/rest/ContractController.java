package com.oxchains.pharmacy.rest;

import com.oxchains.pharmacy.data.ChaincodeData;
import com.oxchains.pharmacy.data.FabricTokenRepo;
import com.oxchains.pharmacy.rest.common.ChaincodeResp;
import com.oxchains.pharmacy.rest.common.RestResp;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.oxchains.pharmacy.Application.userContext;
import static com.oxchains.pharmacy.rest.common.RestResp.fail;
import static com.oxchains.pharmacy.rest.common.RestResp.success;

/**
 * @author aiet
 */
@RestController
@RequestMapping("/contract")
public class ContractController {

  private ChaincodeData chaincodeData;
  private FabricTokenRepo fabricTokenRepo;

  @GetMapping("/sensor")
  public RestResp sensor(
      @RequestParam(required = false, defaultValue = "") String serial,
      @RequestParam(required = false, defaultValue = "") String equipment) {

    if (serial.isEmpty() && equipment.isEmpty()) {
      return fail("serial or equipment required");
    }

    return userContext().flatMap(u ->
        fabricTokenRepo.findByUser(u).flatMap(fabricToken ->
            serial.isEmpty() ?
                chaincodeData.getSensorByEquipment(equipment, fabricToken.getToken())
                : chaincodeData.getSensorBySerial(serial, fabricToken.getToken())
        ).filter(ChaincodeResp::succeeded)
            .map(resp -> {
              //TODO
              return success(null);
            })
    ).orElse(fail());
  }

}
