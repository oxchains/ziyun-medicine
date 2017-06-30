package com.oxchains.pharmacy.rest;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.concurrent.TimeUnit;

import static com.oxchains.pharmacy.utils.VerifyCodeUtil.*;
import static java.util.UUID.randomUUID;
import static java.util.concurrent.TimeUnit.MINUTES;
import static org.springframework.http.HttpHeaders.*;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;

@Slf4j
@RestController
@RequestMapping("/vcode")
public class VCodeController {

  static final Cache<String, String> VCODE_CACHE = CacheBuilder.newBuilder().expireAfterWrite(2, MINUTES)
      .concurrencyLevel(4).initialCapacity(10).maximumSize(1000).build();

  /**
   * 获取验证码图片和文本(验证码文本会保存在缓存中)
   */
  @GetMapping
  public void vcode(HttpServletRequest request, HttpServletResponse response) {
    try {
      response.setHeader(HttpHeaders.PRAGMA, "no-cache");
      response.setHeader(CACHE_CONTROL, "no-cache");
      response.setDateHeader(EXPIRES, 0);
      String mockSessionId = randomUUID().toString();
      response.setHeader(SET_COOKIE, String.format("JSESSIONID=%s;path=/", mockSessionId));
      String vcode = generateTextCode(TYPE_NUM_LOWER, 4, null);
      log.debug("vcode for {}: {}", mockSessionId, vcode);
      response.setContentType(IMAGE_JPEG_VALUE);
      BufferedImage bufferedImage = generateImageCode(vcode, 90, 25, 4,
          true, Color.WHITE, Color.BLACK, null);
      ImageIO.write(bufferedImage, "JPEG", response.getOutputStream());
      VCODE_CACHE.put(mockSessionId, vcode);
    } catch (Exception e) {
      log.error("failed to generate vcode {}: {}", request.getRemoteAddr(), e.getMessage());
    }
  }

}
