package com.oxchains.pharmacy.rest;

import com.oxchains.pharmacy.rest.client.ChaincodeClient;
import com.oxchains.pharmacy.rest.common.RestResp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

import static com.oxchains.pharmacy.rest.common.RestResp.fail;
import static com.oxchains.pharmacy.rest.common.RestResp.success;
import static com.oxchains.pharmacy.Application.userContext;
/**
 * Created by root on 17-8-26.
 */
@Slf4j
@RestController
@RequestMapping("/productGmp")
public class ProductGmpController {
    @Resource
    ChaincodeClient chaincodeClient;


    @RequestMapping(value = "/{ProducName}", method = RequestMethod.GET)
    public RestResp getProductGmpByProducName(@PathVariable String ProducName){
        String result = chaincodeClient.getProductGmpByProducName(ProducName);
        log.debug("===result==="+result);
        if("".equals(result)){
            return fail();
        }
        return success(result);
    }
}
