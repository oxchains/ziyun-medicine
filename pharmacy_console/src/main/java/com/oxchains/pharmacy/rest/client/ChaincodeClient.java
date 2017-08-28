package com.oxchains.pharmacy.rest.client;

import com.google.gson.*;
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
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static com.oxchains.pharmacy.utils.ResponseUtil.*;
import static java.time.LocalDateTime.now;
import static java.util.Collections.emptyList;
import static java.util.Optional.empty;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

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

  public String getEnterpriseGmpByEnterpriseNameAndType(String EnterpriseName, String EnterpriseType,String username,String password) {

    Gson gson = new GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE).create();
    log.debug("===getEnterpriseGmpByEnterpriseNameAndType===");
    String loginJson = "{\"Username\":\""+username+"\",\"Password\":\""+password+"\"}";
    try {

      restTemplate = new RestTemplate();
      ResponseEntity<String> stringResponseEntity = restTemplate.postForEntity(ziyunUri + "/user/login", loginJson, String.class);
      String body = stringResponseEntity.getBody();
      body = body.replace("\":\"{","\":{").replace("}\"}","}}").replace("{\\","{").replace("\\\":\\\"","\":\"").replace("\\\",\\\"","\",\"").replace("\\\":","\":");
      log.debug("===body===" + body);
      JsonObject jsonObject = gson.fromJson(body, JsonObject.class);
      if ("0".equals(jsonObject.get("status").getAsString())) {
        String token = jsonObject.get("data").getAsJsonObject().get("Token").getAsString();
        restTemplate = new RestTemplate();
        ResponseEntity responseEntity = restTemplate.getForEntity(ziyunUri+ "/enterpriseGmp/{EnterpriseName}/{EnterpriseType}?Token=" + token, String.class,EnterpriseName,EnterpriseType);
        log.error("===getEnterpriseGmpByEnterpriseNameAndType===\n" + responseEntity.getBody());
        return responseEntity.getBody().toString();
      }
    }
    catch(Exception e){
      log.error(e.toString());
    }
    return "";
  }

  public String getProductGmpByProducName(String ProductName,String username,String password) {

    Gson gson = new GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE).create();
    log.debug("===getProductGmpByProducName==="+ProductName);
    String loginJson = "{\"Username\":\""+username+"\",\"Password\":\""+password+"\"}";
    try {
      restTemplate = new RestTemplate();
      ResponseEntity<String> stringResponseEntity = restTemplate.postForEntity(ziyunUri + "/user/login", loginJson, String.class);
      String body = stringResponseEntity.getBody();
      body = body.replace("\":\"{","\":{").replace("}\"}","}}").replace("{\\","{").replace("\\\":\\\"","\":\"").replace("\\\",\\\"","\",\"").replace("\\\":","\":");
      log.debug("===body===" + body);
      JsonObject jsonObject = gson.fromJson(body, JsonObject.class);
      System.out.println(jsonObject);
      if ("0".equals(jsonObject.get("status").getAsString())) {
        String token = jsonObject.get("data").getAsJsonObject().get("Token").getAsString();
        restTemplate = new RestTemplate();
        ResponseEntity responseEntity = restTemplate.getForEntity(ziyunUri+ "/productGmp/{ProducName}?Token=" + token, String.class,ProductName);
        log.error("===getProductGmpByProducName===\n" + responseEntity.getBody());
        return responseEntity.getBody().toString();
      }
    }
    catch(Exception e){
      log.error(e.toString());
    }
    return "";
  }

  public boolean register(User user){
    Gson gson = new GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE).create();
    log.debug("===register===ziyun api===");
    String loginJson = "{\"Username\":\"ziyun110\",\"Password\":\"ziyun110\"}";
    String registerJson = "{\"Username\":\""+user.getUsername()+"\",\"Password\":\""+user.getPassword()+"\",\"Realname\":\""+user.getUsername()+"\"}";
    try{
      restTemplate = new RestTemplate();
      ResponseEntity<String> stringResponseEntity = restTemplate.postForEntity(ziyunUri+"/user/login",loginJson,String.class);
      String body = stringResponseEntity.getBody();
      body = body.replace("\":\"{","\":{").replace("}\"}","}}").replace("{\\","{").replace("\\\":\\\"","\":\"").replace("\\\",\\\"","\",\"").replace("\\\":","\":");
      log.debug("===body==="+body);
      JsonObject jsonObject = gson.fromJson(body,JsonObject.class);
      if("0".equals(jsonObject.get("status").getAsString())){
        String Token = jsonObject.get("data").getAsJsonObject().get("Token").getAsString();
        log.debug("===Token==="+Token);
        restTemplate = new RestTemplate();
        stringResponseEntity = restTemplate.postForEntity(ziyunUri+ "/user/register?Token="+Token,registerJson,String.class);
        String result = stringResponseEntity.getBody();
        log.debug("===result==="+result);
        jsonObject = gson.fromJson(result,JsonObject.class);
        if("0".equals(jsonObject.get("status").getAsString())){
          return true;
        }
      }
    }
    catch(Exception e){
      log.error(e.toString());
    }
    return false;
  }

  public void downloadFile(String uuid, HttpServletResponse response){
    Gson gson = new GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE).create();
    log.debug("===downloadFile==="+uuid);
    String loginJson = "{\"Username\":\"ziyun110\",\"Password\":\"ziyun110\"}";
    try {
      restTemplate = new RestTemplate();
      ResponseEntity<String> stringResponseEntity = restTemplate.postForEntity(ziyunUri + "/user/login", loginJson, String.class);
      String body = stringResponseEntity.getBody();
      body = body.replace("\":\"{","\":{").replace("}\"}","}}").replace("{\\","{").replace("\\\":\\\"","\":\"").replace("\\\",\\\"","\",\"").replace("\\\":","\":");
      log.debug("===body===" + body);
      JsonObject jsonObject = gson.fromJson(body, JsonObject.class);
      System.out.println(jsonObject);
      if ("0".equals(jsonObject.get("status").getAsString())) {
        String token = jsonObject.get("data").getAsJsonObject().get("Token").getAsString();
        String url = ziyunUri+ "/user/"+uuid+"/downloadfile?Token=" + token;
        storeFile(url,response);
      }
    }
    catch(Exception e){
      log.error(e.toString());
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
      //System.out.println("===head==="+head);

      //读文件流
      fis = new BufferedInputStream(urlCon.getInputStream());

      byte[] buffer = new byte[fis.available()];
      fis.read(buffer);
      fis.close();
      // 清空response
      response.reset();
      // 设置response的Header
      System.err.println("length==="+urlCon.getContentLength()+"==filename==="+filename);
      response.addHeader("Content-Disposition", "attachment;filename=" + new String(filename.getBytes()));
      response.addHeader("Content-Length", "" + urlCon.getContentLength());
      OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
      response.setContentType("application/octet-stream");
      toClient.write(buffer);
      toClient.flush();
      toClient.close();

    } catch (Exception e) {
      log.error(e.toString());
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

  public String allow(String userlist,String username,String password) {

    Gson gson = new GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE).create();
    log.debug("===allow==="+userlist);
    String loginJson = "{\"Username\":\""+username+"\",\"Password\":\""+password+"\"}";
    try {
      restTemplate = new RestTemplate();
      ResponseEntity<String> stringResponseEntity = restTemplate.postForEntity(ziyunUri + "/user/login", loginJson, String.class);
      String body = stringResponseEntity.getBody();
      body = body.replace("\":\"{","\":{").replace("}\"}","}}").replace("{\\","{").replace("\\\":\\\"","\":\"").replace("\\\",\\\"","\",\"").replace("\\\":","\":");
      log.debug("===body===" + body);
      JsonObject jsonObject = gson.fromJson(body, JsonObject.class);
      System.out.println(jsonObject);
      if ("0".equals(jsonObject.get("status").getAsString())) {
        String token = jsonObject.get("data").getAsJsonObject().get("Token").getAsString();
        restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        MediaType type = MediaType.parseMediaType("application/json; charset=UTF-8");
        headers.setContentType(type);
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());
        HttpEntity<String> formEntity = new HttpEntity<String>(userlist,headers);
        String result =  restTemplate.postForObject(ziyunUri+ "/user/auth/allow?Token=" + token,formEntity,String.class);
        log.error("===allow===\n" + result);
        return result;
      }
    }
    catch(Exception e){
      log.error(e.toString());
    }
    return "";
  }

  public String query(String username,String password) {

    Gson gson = new GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE).create();
    log.debug("===query===");
    String loginJson = "{\"Username\":\""+username+"\",\"Password\":\""+password+"\"}";
    try {
      restTemplate = new RestTemplate();
      ResponseEntity<String> stringResponseEntity = restTemplate.postForEntity(ziyunUri + "/user/login", loginJson, String.class);
      String body = stringResponseEntity.getBody();
      body = body.replace("\":\"{","\":{").replace("}\"}","}}").replace("{\\","{").replace("\\\":\\\"","\":\"").replace("\\\",\\\"","\",\"").replace("\\\":","\":");
      log.debug("===body===" + body);
      JsonObject jsonObject = gson.fromJson(body, JsonObject.class);
      System.out.println(jsonObject);
      if ("0".equals(jsonObject.get("status").getAsString())) {
        String token = jsonObject.get("data").getAsJsonObject().get("Token").getAsString();
        restTemplate = new RestTemplate();
        String result =  restTemplate.getForObject(ziyunUri+ "/user/auth/query?Token=" + token,String.class);
        log.error("===query===\n" + result);
        return result;
      }
    }
    catch(Exception e){
      log.error(e.toString());
    }
    return "";
  }

  public String queryuser(String username,String password) {

    Gson gson = new GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE).create();
    log.debug("===queryuser===");
    String loginJson = "{\"Username\":\""+username+"\",\"Password\":\""+password+"\"}";
    try {
      restTemplate = new RestTemplate();
      ResponseEntity<String> stringResponseEntity = restTemplate.postForEntity(ziyunUri + "/user/login", loginJson, String.class);
      String body = stringResponseEntity.getBody();
      body = body.replace("\":\"{","\":{").replace("}\"}","}}").replace("{\\","{").replace("\\\":\\\"","\":\"").replace("\\\",\\\"","\",\"").replace("\\\":","\":");
      log.debug("===body===" + body);
      JsonObject jsonObject = gson.fromJson(body, JsonObject.class);
      System.out.println(jsonObject);
      if ("0".equals(jsonObject.get("status").getAsString())) {
        String token = jsonObject.get("data").getAsJsonObject().get("Token").getAsString();
        restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(ziyunUri+ "/user/queryuser?Token=" + token, String.class);
        log.error("===queryuser===\n" + result);
        return result;
      }
    }
    catch(Exception e){
      log.error(e.toString());
    }
    return "";
  }
}
