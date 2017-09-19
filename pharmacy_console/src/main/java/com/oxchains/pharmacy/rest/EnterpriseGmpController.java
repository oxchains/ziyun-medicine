package com.oxchains.pharmacy.rest;

import com.oxchains.pharmacy.rest.client.ChaincodeClient;
import com.oxchains.pharmacy.rest.common.RestResp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

import static com.oxchains.pharmacy.Application.userContext;
import static com.oxchains.pharmacy.rest.common.RestResp.fail;
import static com.oxchains.pharmacy.rest.common.RestResp.success;

/**
 * Created by root on 17-8-26.
 */
@Slf4j
@RestController
@RequestMapping("/enterpriseGmp")
public class EnterpriseGmpController {
    @Resource
    ChaincodeClient chaincodeClient;


    @RequestMapping(value = "/{EnterpriseName}/{EnterpriseType}", method = RequestMethod.GET)
    public RestResp getEnterpriseGmpByEnterpriseNameAndType(@PathVariable String EnterpriseName,@PathVariable String EnterpriseType){
        String result = chaincodeClient.getEnterpriseGmpByEnterpriseNameAndType(EnterpriseName,EnterpriseType);
        log.debug("===result==="+result);
        if("".equals(result)){
            return fail();
        }
        return success(result);
    }
}
