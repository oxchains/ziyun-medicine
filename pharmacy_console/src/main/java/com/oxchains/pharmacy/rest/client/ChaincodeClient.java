package com.oxchains.pharmacy.rest.client;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.oxchains.pharmacy.domain.User;
import com.oxchains.pharmacy.rest.common.ChaincodeResp;
import com.oxchains.pharmacy.rest.common.PeerInfo;
import com.oxchains.pharmacy.rest.common.SensorData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
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
public class ChaincodeClient {

  @Value("${fabric.manager.uri}")
  private String uri;
  @Value("${fabric.manager.tx.path}")
  private String txUri;
  @Value("${fabric.manager.peer.path}")
  private String peerUri;

  @Value("${ziyun.api.uri}")
  private String ziyunUri;

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
            "/data"
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

  public String getEnterpriseGmpByEnterpriseNameAndType(String EnterpriseName, String EnterpriseType) {
    log.debug("===getEnterpriseGmpByEnterpriseNameAndType===");
    try {
      String token = (String) SecurityContextHolder.getContext().getAuthentication().getCredentials();
      log.debug("===token==="+token);
      restTemplate = new RestTemplate();
      ResponseEntity responseEntity = restTemplate.getForEntity(ziyunUri+ "/enterpriseGmp/{EnterpriseName}/{EnterpriseType}?Token=" + token, String.class,EnterpriseName,EnterpriseType);
      log.debug("===getEnterpriseGmpByEnterpriseNameAndType===\n" + responseEntity.getBody());
      return responseEntity.getBody().toString();
    }
    catch(Exception e){
      log.error("getEnterpriseGmpByEnterpriseNameAndType error: ",e);
    }
    return "";
  }

  public String getProductGmpByProducName(String ProductName) {
    log.debug("===getProductGmpByProducName==="+ProductName);
    try {
      String token = (String) SecurityContextHolder.getContext().getAuthentication().getCredentials();
      log.debug("===token==="+token);
      restTemplate = new RestTemplate();
      ResponseEntity responseEntity = restTemplate.getForEntity(ziyunUri+ "/productGmp/{ProducName}?Token=" + token, String.class,ProductName);
      log.debug("===getProductGmpByProducName===\n" + responseEntity.getBody());
      return responseEntity.getBody().toString();
    }
    catch(Exception e){
      log.error("getProductGmpByProducName error: ",e);
    }
    return "";
  }

  public boolean register(User user){
    Gson gson = new GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE).create();
    log.debug("===register===ziyun api===");
    String registerJson = "{\"Username\":\""+user.getUsername()+"\",\"Password\":\""+user.getPassword()+"\",\"Realname\":\""+user.getUsername()+"\"}";
    try{
      String token = (String) SecurityContextHolder.getContext().getAuthentication().getCredentials();
      log.debug("===token==="+token);
      restTemplate = new RestTemplate();
      ResponseEntity<String> stringResponseEntity = restTemplate.postForEntity(ziyunUri+ "/user/register?Token="+token,registerJson,String.class);
      String result = stringResponseEntity.getBody();
      log.debug("===result==="+result);
      JsonObject jsonObject = gson.fromJson(result,JsonObject.class);
      if("0".equals(jsonObject.get("status").getAsString())){
        return true;
      }
    }
    catch(Exception e){
      log.error("register user error: ",e);
    }
    return false;
  }

  public void downloadFile(String uuid, HttpServletResponse response){
    log.debug("===downloadFile==="+uuid);
    try {
      String url = ziyunUri+ "/user/"+uuid+"/downloadfile";
      storeFile(url,response);
    }
    catch(Exception e){
      log.error("downloadFile error: ",e);
    }
  }

  private String storeFile(String fileUrl, HttpServletResponse response){
    String fileName = "";
    InputStream fis = null;
    try {
      URL url = new URL(fileUrl);
      HttpURLConnection urlCon = (HttpURLConnection) url.openConnection();
      urlCon.setConnectTimeout(3000);
      urlCon.setReadTimeout(3000);
      int code = urlCon.getResponseCode();
      if (code != HttpURLConnection.HTTP_OK) {
        log.error("===getfile error===" + fileUrl);
      }
      String head = urlCon.getHeaderField("Content-Disposition");
      String filename = head.split("filename=")[1].replace("\"","");

      //读文件流
      fis = new BufferedInputStream(urlCon.getInputStream());

      byte[] buffer = new byte[fis.available()];
      fis.read(buffer);
      fis.close();
      // 清空response
      response.reset();
      // 设置response的Header
      log.debug("length==="+urlCon.getContentLength()+"==filename==="+filename);
      response.addHeader("Content-Disposition", "attachment;filename=" + new String(filename.getBytes()));
      response.addHeader("Content-Length", "" + urlCon.getContentLength());
      OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
      response.setContentType("application/octet-stream");
      toClient.write(buffer);
      toClient.flush();
      toClient.close();

    } catch (Exception e) {
      log.error("storeFile error: ",e);
    }finally {
      if(fis!=null){
        try {
          fis.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }
    return fileName;
  }

  public String allow(String userlist) {
    try {
      String token = (String) SecurityContextHolder.getContext().getAuthentication().getCredentials();
      log.debug("===token==="+token);
      restTemplate = new RestTemplate();
      HttpHeaders headers = new HttpHeaders();
      MediaType type = MediaType.parseMediaType("application/json; charset=UTF-8");
      headers.setContentType(type);
      headers.add("Accept", MediaType.APPLICATION_JSON.toString());
      HttpEntity<String> formEntity = new HttpEntity<String>(userlist,headers);
      String result =  restTemplate.postForObject(ziyunUri+ "/user/auth/allow?Token=" + token,formEntity,String.class);
      log.debug("===allow===\n" + result);
      return result;
    }
    catch(Exception e){
      log.error("user auth allow error: ",e);
    }
    return "";
  }

  public String query() {
    log.debug("===query===");
    try {
      String token = (String) SecurityContextHolder.getContext().getAuthentication().getCredentials();
      log.debug("===token==="+token);
      restTemplate = new RestTemplate();
      String result =  restTemplate.getForObject(ziyunUri+ "/user/auth/query?Token=" + token,String.class);
      log.debug("===query===\n" + result);
      return result;
    }
    catch(Exception e){
      log.error("user auth query error: ",e);
    }
    return "";
  }

  public String queryuser() {
    log.debug("===queryuser===");
    try {
      String token = (String) SecurityContextHolder.getContext().getAuthentication().getCredentials();
      log.debug("===token==="+token);
      restTemplate = new RestTemplate();
      String result = restTemplate.getForObject(ziyunUri+ "/user/queryuser?Token=" + token, String.class);
      log.debug("===queryuser===\n" + result);
      return result;
    }
    catch(Exception e){
      log.error("queryuser error: ",e);
    }
    return "";
  }
}
