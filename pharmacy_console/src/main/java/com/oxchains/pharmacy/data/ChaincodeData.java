package com.oxchains.pharmacy.data;

import com.oxchains.pharmacy.rest.common.ChaincodeResp;
import com.oxchains.pharmacy.rest.common.PeerInfo;
import com.oxchains.pharmacy.rest.common.SensorData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collection;
import java.util.Optional;

import static com.oxchains.pharmacy.utils.ResponseUtil.*;
import static java.util.Collections.emptyList;
import static java.util.Optional.empty;
import static org.springframework.http.HttpMethod.GET;

/**
 * chaincode operations
 *
 * @author aiet
 */
@Slf4j
@Service
public class ChaincodeData {

  @Value("${fabric.manager.uri}")
  private String uri;
  @Value("${fabric.manager.tx.path}")
  private String txUri;
  @Value("${fabric.manager.peer.path}")
  private String peerUri;

  private RestTemplate restTemplate = new RestTemplate();

  public Optional<PeerInfo> getPeer(String token) {
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.set(HttpHeaders.AUTHORIZATION, "Bearer " + token);
    HttpEntity<String> entity = new HttpEntity<>(httpHeaders);
    return extractOne(restTemplate.exchange(uri + peerUri, GET, entity, String.class).getBody(), "/data")
        .map(data -> resolve(data, PeerInfo.class));
  }

  public Collection<SensorData> getSensorByEquipment(String serial, long startTime, long endTime, String token) {
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.set(HttpHeaders.AUTHORIZATION, "Bearer " + token);
    HttpEntity<String> entity = new HttpEntity<>(httpHeaders);
    return extractOne(restTemplate.exchange(
        String.format("%s%s,%s,%s,%s", uri + txUri,
            "getSensorDataByEquipmentNum", serial, startTime, endTime),
        GET, entity, String.class).getBody(),
        "/data"
    ).map(data -> resolve(data, ChaincodeResp.class)
    ).filter(ChaincodeResp::succeeded).flatMap(chaincodeResp ->
        extractMany(chaincodeResp.getPayload(), "/list")
            .map(sensorData -> resolveCollection(sensorData, SensorData.class))
    ).orElse(emptyList());
  }

  public Collection<SensorData> getSensorBySerial(String serial, long startTime, long endTime, String token) {
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.set(HttpHeaders.AUTHORIZATION, "Bearer " + token);
    HttpEntity<String> entity = new HttpEntity<>(httpHeaders);
    return extractOne(restTemplate.exchange(
        String.format("%s%s,%s,%s,%s", uri + txUri,
            "getSensorDataBySensorNum", serial, startTime, endTime),
        GET, entity, String.class).getBody(),
        "/data"
    ).map(data -> resolve(data, ChaincodeResp.class)
    ).filter(ChaincodeResp::succeeded).flatMap(chaincodeResp ->
        extractMany(chaincodeResp.getPayload(), "/list")
            .map(sensorData -> resolveCollection(sensorData, SensorData.class))
    ).orElse(emptyList());
  }

  public Optional<Long> getSensorStats(long startTime, long endTime, String token) {
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.set(HttpHeaders.AUTHORIZATION, "Bearer " + token);
    HttpEntity<String> entity = new HttpEntity<>(httpHeaders);
    return extractOne(restTemplate.exchange(
        String.format("%s%s,%s,%s", uri + txUri,
            "getNumberOfSensorDataByTime", startTime, endTime),
        GET, entity, String.class).getBody(),
        "/data/payload"
    ).map(data -> resolve(data, ChaincodeResp.class)
    ).filter(ChaincodeResp::succeeded).flatMap(chaincodeResp -> {
      try {
        return Optional.of(Long.valueOf(chaincodeResp.getPayload()));
      } catch (Exception e) {
        log.error("invalid response of sensor data stats query from {} to {}: {}", startTime, endTime, e.getMessage());
      }
      return empty();
    });
  }

}
