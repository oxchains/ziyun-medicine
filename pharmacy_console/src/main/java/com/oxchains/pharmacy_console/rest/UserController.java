package com.oxchains.pharmacy_console.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.oxchains.pharmacy_console.data.LogRepo;
import com.oxchains.pharmacy_console.data.RegistertypeRepo;
import com.oxchains.pharmacy_console.data.UserRepo;
import com.oxchains.pharmacy_console.domain.Log;
import com.oxchains.pharmacy_console.domain.Registertype;
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

	@Resource
	private LogRepo logRepo;
	
	@Resource
	private RegistertypeRepo registertypeRepo;

	@Autowired
	HttpServletRequest request;
	
	@Value("${downloadapplyfile}") private String applyfiledownload;
	
	@PostMapping("/apply")
	public RestResp fileUpload(@RequestParam("applyfile") MultipartFile applyfile, @RequestParam String registertype,
			@RequestParam String email, @RequestParam String validatecode, @RequestParam String username,
			@RequestParam String password, @RequestParam String repeatpassword, @RequestParam String phone,
			@RequestParam("logo") MultipartFile logo, @RequestParam String company,
			@RequestParam("license") MultipartFile license, @RequestParam String person,
			@RequestParam("identityface") MultipartFile identityface,
			@RequestParam("identityback") MultipartFile identityback) {

		if (StringUtils.isEmpty(validatecode)) {
			return RestResp.fail("验证码不能为空");
		}
		String verifycode = (String) request.getSession().getAttribute("verifyCode");
		if (!validatecode.equals(verifycode)) {
			return RestResp.fail("验证码错误");
		}
		if (StringUtils.isEmpty(username)) {
			return RestResp.fail("用户名不能为空");
		}
		if (StringUtils.isEmpty(registertype)) {
			return RestResp.fail("注册类型不能为空");
		}
		if (StringUtils.isEmpty(password)) {
			return RestResp.fail("密码不能为空");
		}
		if (StringUtils.isEmpty(company)) {
			return RestResp.fail("公司名称不能为空");
		}
		if (StringUtils.isEmpty(person)) {
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
		if (identityface.isEmpty()) {
			return RestResp.fail("身份证不能为空");
		}
		if (identityback.isEmpty()) {
			return RestResp.fail("身份证不能为空");
		}

		// check username exists
		User user = userRepo.findByUsername(username);
		if (user != null) {
			return RestResp.fail("用户名已经存在");
		}

		try {
			User newuser = new User();
			String uploadFilePath = request.getSession().getServletContext().getRealPath("upload");
			// save file
			String filePath = uploadFilePath + "/" + System.nanoTime()  + applyfile.getOriginalFilename().substring(applyfile.getOriginalFilename().lastIndexOf("."));
			newuser.setApplyfile(filePath);
			log.debug("===applyfile===" + filePath);
			applyfile.transferTo(new File(filePath));

			filePath = uploadFilePath + "/" + System.nanoTime()  + logo.getOriginalFilename().substring(logo.getOriginalFilename().lastIndexOf("."));
			newuser.setLogo(filePath);
			log.debug("===logo===" + filePath);
			logo.transferTo(new File(filePath));

			filePath = uploadFilePath + "/" + System.nanoTime()  + license.getOriginalFilename().substring(license.getOriginalFilename().lastIndexOf("."));
			newuser.setLicense(filePath);
			log.debug("===license===" + filePath);
			license.transferTo(new File(filePath));

			filePath = uploadFilePath + "/" + System.nanoTime() + identityface.getOriginalFilename().substring(identityface.getOriginalFilename().lastIndexOf("."));
			newuser.setIdentityface(filePath);
			log.debug("===identityface===" + filePath);
			identityface.transferTo(new File(filePath));

			filePath = uploadFilePath + "/" + System.nanoTime() + identityback.getOriginalFilename().substring(identityback.getOriginalFilename().lastIndexOf("."));
			newuser.setIdentityback(filePath);
			log.debug("===identityback===" + filePath);
			identityback.transferTo(new File(filePath));

			// save userinfo
			newuser.setUsername(username);
			newuser.setPassword(Md5Utils.getMD5(password));
			newuser.setEmail(email);
			newuser.setRegistertype(registertype);
			newuser.setPhone(phone);
			newuser.setCompany(company);
			newuser.setPerson(person);
			newuser.setStatus("1");

			userRepo.save(newuser);

			// save log
			Log log = new Log();
			log.setApplydate(new Date());
			log.setUsername(username);
			logRepo.save(log);

			return RestResp.success(null);
		} catch (Exception e) {
			log.error(e.getMessage());
			return RestResp.fail();
		}
	}

	@RequestMapping(value = "/download", method = RequestMethod.GET)
	public RestResp downloadFile(HttpServletResponse response) {
		String downloadPath = request.getSession().getServletContext().getRealPath("applyfile");
		log.debug("===downloadPath===" + downloadPath);
		File file = new File(downloadPath + "/"+applyfiledownload);
		log.debug("===file.getPath()===" + file.getPath());
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
			return RestResp.fail();
		}
		return RestResp.success(null);
	}

	@RequestMapping(value = "/download/{username}", method = RequestMethod.GET)
	public RestResp downloadFileByUserName(@PathVariable String username, HttpServletResponse response) {
		User user = userRepo.findByUsername(username);
		if (user == null) {
			return RestResp.fail("没有用户信息");
		}
		log.debug("===downloadPath===" + user.getApplyfile());
		File file = new File(user.getApplyfile());
		try (OutputStream output = response.getOutputStream(); InputStream input = new FileInputStream(file);) {
			if (!file.exists()) {
				return RestResp.fail("没有找到文件");
			}
			byte[] buffer = new byte[1024];
			int len = -1;
			response.setHeader("content-disposition",
					"attachment;filename=" + URLEncoder.encode(file.getName(), "UTF-8"));
			while ((len = input.read(buffer)) != -1) {
				output.write(buffer, 0, len);
			}
		} catch (Exception e) {
			log.error(e.getMessage());
			return RestResp.fail();
		}
		return RestResp.success(null);
	}

	@RequestMapping(value = "/audit", method = RequestMethod.GET)
	public RestResp doAudit(@RequestParam String username, @RequestParam String status) {
		if (StringUtils.isEmpty(username)) {
			return RestResp.fail("用户名不能为空");
		}
		if (StringUtils.isEmpty(status)) {
			return RestResp.fail("审核状态不能为空");
		}
		try{
			User user = userRepo.findByUsername(username);
			if(user == null){
				return RestResp.fail("没有找到用户信息");
			}
			user.setStatus(status);
			userRepo.save(user);
		}
		catch(Exception e){
			log.error(e.getMessage());
			return RestResp.fail();
		}
		return RestResp.success(null);
	}
	
	@GetMapping("/auditlist")
	public RestResp getAuditList(){
		List<Log> list = new ArrayList<>();
		Iterator<Log> logs =  logRepo.findAll().iterator();
		while(logs.hasNext()){
			Log log = logs.next();
			list.add(log);
		}
		return RestResp.success(list);
	}
	
	@GetMapping("/auditlist/{username}")
	public RestResp getAuditListDetail(@PathVariable String username){
		User user =  userRepo.findByUsername(username);
		if(user!=null){
			return RestResp.success(user);
		}
		return RestResp.fail("没有找到用户信息");
	}
	
	@GetMapping("/registertype")
	public RestResp getRegistertype(){
		List<Registertype> list = new ArrayList<>();
		Iterator<Registertype> it = registertypeRepo.findAll().iterator();
		while(it.hasNext()){
			list.add(it.next());
		}
		return RestResp.success(list);
	}
}
