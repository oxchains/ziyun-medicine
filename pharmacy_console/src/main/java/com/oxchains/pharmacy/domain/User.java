package com.oxchains.pharmacy.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(
    uniqueConstraints = @UniqueConstraint(columnNames = {"username", "email"})
)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String application;

  @JsonIgnore
  @OneToOne
  @JoinColumn(name = "user_type")
  private UserType userType;

  private String email;
  private String username;

  @JsonIgnore
  private String password;
  private String phone;
  private String logo;
  private String company;
  private String license;
  private String representative;
  private String identityface;
  private String identityback;
  private int authenticated;
  private String remark;

  @JsonSetter("password")
  public void setPassword(String password) {
    this.password = password;
  }

  @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
  private Date applydate;

}
