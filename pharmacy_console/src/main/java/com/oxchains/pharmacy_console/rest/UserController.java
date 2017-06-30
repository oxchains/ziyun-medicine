package com.oxchains.pharmacy_console.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.oxchains.pharmacy_console.data.UserRepo;
import com.oxchains.pharmacy_console.domain.User;
import com.oxchains.pharmacy_console.rest.common.RestResp;
import com.oxchains.pharmacy_console.utils.Md5Utils;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

	@Resource
	private UserRepo userRepo;
	
	@Autowired
	HttpServletRequest request; 
	
	@RequestMapping("/uploadFile")
	public RestResp fileUpload(@RequestParam("applyfile") MultipartFile applyfile, @RequestParam String registertype,
			@RequestParam String email, @RequestParam String validatecode, @RequestParam String username,
			@RequestParam String password, @RequestParam String repeatpassword, @RequestParam String phone,
			@RequestParam("logo") MultipartFile logo, @RequestParam String company,
			@RequestParam("license") MultipartFile license, @RequestParam String person,
			@RequestParam("identity") MultipartFile identity) {
		
		if(StringUtils.isEmpty(validatecode)){
			return RestResp.fail("不能为空");
		}
		String verifycode = (String)request.getSession().getAttribute("verifyCode");
		if(!validatecode.equals(verifycode)){
			return RestResp.fail("验证码错误");
		}
		if(StringUtils.isEmpty(username)){
			return RestResp.fail("用户名不能为空");
		}
		if(StringUtils.isEmpty(registertype)){
			return RestResp.fail("注册类型不能为空");
		}
		if(StringUtils.isEmpty(password)){
			return RestResp.fail("密码不能为空");
		}
		if(StringUtils.isEmpty(company)){
			return RestResp.fail("公司名称不能为空");
		}
		if(StringUtils.isEmpty(person)){
			return RestResp.fail("法人姓名不能为空");
		}
		
		if (applyfile.isEmpty()) {
			return RestResp.fail("申请文件不能为空");
		}
		if (logo.isEmpty()) {
			return RestResp.fail("logo不能为空");
		}
		if (license.isEmpty()) {
			return RestResp.fail("营业执照不能为空");
		}
		if (identity.isEmpty()) {
			return RestResp.fail("身份证不能为空");
		}
		
		//check username exists
		User user = userRepo.findByUsername(username);
		if(user!=null){
			return RestResp.fail("用户名已经存在");
		}
		
		try {
			User newuser = new User();
			
			String uploadFilePath = request.getSession().getServletContext().getRealPath("upload");
			// save file
			String filePath = uploadFilePath + "/" + username + "_" + applyfile.getOriginalFilename();
			newuser.setApplyfile(filePath);
			log.debug("===applyfile===" + filePath);
			applyfile.transferTo(new File(filePath));

			filePath = uploadFilePath + "/" + username + "_"  + logo.getOriginalFilename();
			newuser.setLogo(filePath);
			log.debug("===logo===" + filePath);
			logo.transferTo(new File(filePath));

			filePath = uploadFilePath + "/" + username + "_" + license.getOriginalFilename();
			newuser.setLicense(filePath);
			log.debug("===license===" + filePath);
			license.transferTo(new File(filePath));

			filePath = uploadFilePath + "/" + username + "_" + identity.getOriginalFilename();
			newuser.setIdentity(filePath);
			log.debug("===identity===" + filePath);
			identity.transferTo(new File(filePath));

			// save userinfo
			newuser.setUsername(username);
			newuser.setPassword(Md5Utils.getMD5(password));
			newuser.setEmail(email);
			newuser.setRegistertype(registertype);
			newuser.setPhone(phone);
			newuser.setCompany(company);
			newuser.setPerson(person);
			
			userRepo.save(newuser);
			
			return RestResp.success(null);
		} catch (Exception e) {
			log.error(e.getMessage());
			return RestResp.fail();
		}
	}

	@RequestMapping(value = "/download", method = RequestMethod.GET)
	public void downloadFile(HttpServletRequest request, HttpServletResponse response) {
		String downloadPath = request.getSession().getServletContext().getRealPath("download");
		System.out.println("===downloadPath===" + downloadPath);
		File file = new File(downloadPath + "/apply.txt");
		System.out.println("===file.getPath()===" + file.getPath());
		byte[] buffer = new byte[1024];
		int len = -1;
		try (OutputStream output = response.getOutputStream(); InputStream input = new FileInputStream(file);) {
			response.setHeader("content-disposition",
					"attachment;filename=" + URLEncoder.encode(file.getName(), "UTF-8"));
			while ((len = input.read(buffer)) != -1) {
				output.write(buffer, 0, len);
			}
		} catch (Exception e) {
			log.error(e.getMessage());
		}
	}
}
