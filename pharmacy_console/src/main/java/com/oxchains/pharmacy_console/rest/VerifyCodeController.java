package com.oxchains.pharmacy_console.rest;

import java.awt.Color;
import java.awt.image.BufferedImage;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oxchains.pharmacy_console.rest.common.RestResp;
import com.oxchains.pharmacy_console.utils.VerifyCodeUtil;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/code")
@Slf4j
public class VerifyCodeController {

	/**
	 * 获取验证码图片和文本(验证码文本会保存在HttpSession中)
	 */
	@RequestMapping("/getCode")
	public RestResp getVerifyCodeImage(HttpServletRequest request, HttpServletResponse response){
		try {
			response.setHeader("Pragma", "no-cache");
			response.setHeader("Cache-Control", "no-cache");
			response.setDateHeader("Expires", 0);
			String verifyCode = VerifyCodeUtil.generateTextCode(VerifyCodeUtil.TYPE_ALL_MIXED, 4, null);
			request.getSession().setAttribute("verifyCode", verifyCode);
			log.debug("===verifyCode==="+verifyCode);
			response.setContentType("image/jpeg");
			BufferedImage bufferedImage = VerifyCodeUtil.generateImageCode(verifyCode, 90, 25, 4, true, Color.WHITE,
					Color.BLACK, null);
			ImageIO.write(bufferedImage, "JPEG", response.getOutputStream());
			return RestResp.success(null);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return RestResp.fail("服务器内部错误");
	}

	@RequestMapping("/checkCode")
	public RestResp doCheckVerifyCodeImage(HttpServletRequest request) {
		try{
			String verifyCode = (String) request.getSession().getAttribute("verifyCode");
			String inputCode = request.getParameter("inputcode");
			log.debug("===verifyCode==="+verifyCode+"===inputCode==="+inputCode);
			if (verifyCode.equals(inputCode)) {
				return RestResp.success(null);
			}
		}
		catch(Exception e){
			log.error(e.getMessage());
		}
		return RestResp.fail("验证码错误");
	}
}
