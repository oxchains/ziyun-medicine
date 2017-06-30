package com.oxchains.pharmacy_console.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String applyfile;
    private String registertype;
    private String email;
    private String username;
    private String password;
    private String phone;
    private String logo;
    private String company;
    private String license;
    private String person;
    private String identityface;
    private String identityback;
    private String status;

    public String getIdentityback() {
		return identityback;
	}
    public void setIdentityback(String identityback) {
		this.identityback = identityback;
	}
    
    public String getIdentityface() {
		return identityface;
	}
    public void setIdentityface(String identityface) {
		this.identityface = identityface;
	}
    
    public String getStatus() {
		return status;
	}
    
    public void setStatus(String status) {
		this.status = status;
	}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

	public String getApplyfile() {
		return applyfile;
	}

	public void setApplyfile(String applyfile) {
		this.applyfile = applyfile;
	}

	public String getRegistertype() {
		return registertype;
	}

	public void setRegistertype(String registertype) {
		this.registertype = registertype;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getLicense() {
		return license;
	}

	public void setLicense(String license) {
		this.license = license;
	}

	public String getPerson() {
		return person;
	}

	public void setPerson(String person) {
		this.person = person;
	}

}
