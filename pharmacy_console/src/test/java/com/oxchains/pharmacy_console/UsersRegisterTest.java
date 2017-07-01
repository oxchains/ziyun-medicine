package com.oxchains.pharmacy_console;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.junit.Test;

public class UsersRegisterTest {

	//@Test
	public void getCode() {
		String urlNameString = "http://localhost:8080/code/getCode";
		String result = "";
		try {
			HttpGet request = new HttpGet(urlNameString);
			HttpClient httpClient = HttpClientBuilder.create().build();
			HttpResponse response = httpClient.execute(request);

			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				result = EntityUtils.toString(response.getEntity(), "utf-8");
				System.out.println("===result===\n" + result);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	//@Test
	public void checkCode() {
		String urlNameString = "http://localhost:8080/code/checkCode?inputcode=Ewz2";
		String result = "";
		try {
			HttpGet request = new HttpGet(urlNameString);
			HttpClient httpClient = HttpClientBuilder.create().build();
			HttpResponse response = httpClient.execute(request);

			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				result = EntityUtils.toString(response.getEntity(), "utf-8");
				System.out.println("===result===\n" + result);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	//@Test
	@SuppressWarnings({ "deprecation", "deprecation" })
	public void testApply() throws ClientProtocolException, IOException {
		System.out.println("===testTest begin send post===");
		MultipartEntity multipartEntity = new MultipartEntity(HttpMultipartMode.BROWSER_COMPATIBLE,
				"----------ThIs_Is_tHe_bouNdaRY_$", Charset.defaultCharset());
		multipartEntity.addPart("applyfile",
				new FileBody(new File("/tmp/testapi/applyfile.txt"), "application/octet-stream"));
		multipartEntity.addPart("registertype", new StringBody("1", Charset.forName("UTF-8")));
		multipartEntity.addPart("email", new StringBody("1@qq.com", Charset.forName("UTF-8")));
		multipartEntity.addPart("validatecode", new StringBody("1234", Charset.forName("UTF-8")));
		multipartEntity.addPart("username", new StringBody("open", Charset.forName("UTF-8")));
		multipartEntity.addPart("password", new StringBody("adminpwd", Charset.forName("UTF-8")));
		multipartEntity.addPart("repeatpassword", new StringBody("adminpwd", Charset.forName("UTF-8")));
		multipartEntity.addPart("phone", new StringBody("136********", Charset.forName("UTF-8")));
		multipartEntity.addPart("logo", new FileBody(new File("/tmp/testapi/logo.png"), "image/png"));
		multipartEntity.addPart("company", new StringBody("chains", Charset.forName("UTF-8")));
		multipartEntity.addPart("license", new FileBody(new File("/tmp/testapi/license.png"), "image/png"));
		multipartEntity.addPart("person", new StringBody("fabric", Charset.forName("UTF-8")));
		multipartEntity.addPart("identityface", new FileBody(new File("/tmp/testapi/identityface.png"), "image/png"));
		multipartEntity.addPart("identityback", new FileBody(new File("/tmp/testapi/identityback.png"), "image/png"));

		HttpPost request = new HttpPost("http://localhost:8080/user/apply");
		request.setEntity(multipartEntity);
		request.addHeader("Content-Type", "multipart/form-data; boundary=----------ThIs_Is_tHe_bouNdaRY_$");

		HttpClient httpClient = HttpClientBuilder.create().build();
		HttpResponse response = httpClient.execute(request);

		InputStream is = response.getEntity().getContent();
		BufferedReader in = new BufferedReader(new InputStreamReader(is));
		StringBuffer buffer = new StringBuffer();
		String line = "";
		while ((line = in.readLine()) != null) {
			buffer.append(line);
		}
		System.out.println("发送消息收到的返回：" + buffer.toString());
	}

	@Test
	public void downloadFile() {
		String urlNameString = "http://localhost:8080/user/download";
		String result = "";
		try {
			HttpGet request = new HttpGet(urlNameString);
			HttpClient httpClient = HttpClientBuilder.create().build();
			HttpResponse response = httpClient.execute(request);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				result = EntityUtils.toString(response.getEntity(), "utf-8");
				System.out.println("===result===\n" + result);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	//@Test
	public void downloadFileByUsername() {
		String urlNameString = "http://localhost:8080/user/download/china";
		String result = "";
		try {
			HttpGet request = new HttpGet(urlNameString);
			HttpClient httpClient = HttpClientBuilder.create().build();
			HttpResponse response = httpClient.execute(request);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				result = EntityUtils.toString(response.getEntity(), "utf-8");
				System.out.println("===result===\n" + result);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	//@Test
	public void getAuditList() {
		String urlNameString = "http://localhost:8080/user/auditlist";
		String result = "";
		try {
			HttpGet request = new HttpGet(urlNameString);
			HttpClient httpClient = HttpClientBuilder.create().build();
			HttpResponse response = httpClient.execute(request);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				result = EntityUtils.toString(response.getEntity(), "utf-8");
				System.out.println("===result===\n" + result);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	//@Test
	public void getAuditListDetail() {
		String urlNameString = "http://localhost:8080/user/auditlist/china";
		String result = "";
		try {
			HttpGet request = new HttpGet(urlNameString);
			HttpClient httpClient = HttpClientBuilder.create().build();
			HttpResponse response = httpClient.execute(request);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				result = EntityUtils.toString(response.getEntity(), "utf-8");
				System.out.println("===result===\n" + result);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	//@Test
	public void doAudit() {
		String urlNameString = "http://localhost:8080/user/audit?username=admin&status=2";
		String result = "";
		try {
			HttpGet request = new HttpGet(urlNameString);
			HttpClient httpClient = HttpClientBuilder.create().build();
			HttpResponse response = httpClient.execute(request);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				result = EntityUtils.toString(response.getEntity(), "utf-8");
				System.out.println("===result===\n" + result);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	//@Test
	public void registertype() {
		String urlNameString = "http://localhost:8080/user/registertype";
		String result = "";
		try {
			HttpGet request = new HttpGet(urlNameString);
			HttpClient httpClient = HttpClientBuilder.create().build();
			HttpResponse response = httpClient.execute(request);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				result = EntityUtils.toString(response.getEntity(), "utf-8");
				System.out.println("===result===\n" + result);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
