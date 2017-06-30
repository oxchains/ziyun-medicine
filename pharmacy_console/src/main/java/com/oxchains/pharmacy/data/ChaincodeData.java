package com.oxchains.pharmacy.data;

import com.oxchains.pharmacy.rest.common.ChaincodeResp;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

import static com.oxchains.pharmacy.utils.ResponseUtil.extract;
import static com.oxchains.pharmacy.utils.ResponseUtil.resolve;

/**
 * chaincode operations
 *
 * @author aiet
 */
@Service
public class ChaincodeData {

  @Value("${fabric.manager.uri}")
  private String uri;
  @Value("${fabric.manager.tx.path}")
  private String txUri;
  @Value("${fabric.manager.peer.path}")
  private String peerUri;

  private RestTemplate restTemplate = new RestTemplate();

  public Optional<String> getPeers(String token) {
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.set(HttpHeaders.AUTHORIZATION, token);
    HttpEntity<String> entity = new HttpEntity<>(httpHeaders);
    return extract(restTemplate.postForObject(uri + peerUri, entity, String.class), "/data");
  }

  @Value("${fabric.chain.name}")
  private String chain;

  @Value("${fabric.chaincode.name")
  private String chaincode;

  @Value("${fabric.chaincode.version}")
  private String version;

  public Optional<ChaincodeResp> getSensorByEquipment(String serial, String token) {
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.set(HttpHeaders.AUTHORIZATION, token);
    HttpEntity<String> entity = new HttpEntity<>(httpHeaders);
    //TODO
    return extract(restTemplate.postForObject(uri + txUri, entity, String.class), "/data").map(data -> resolve(data, ChaincodeResp.class));
  }

  public Optional<ChaincodeResp> getSensorBySerial(String serial, String token) {
    //TODO
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.set(HttpHeaders.AUTHORIZATION, token);
    HttpEntity<String> entity = new HttpEntity<>(httpHeaders);
    return extract(restTemplate.postForObject(uri + txUri, entity, String.class), "/data").map(data -> resolve(data, ChaincodeResp.class));
  }

}
