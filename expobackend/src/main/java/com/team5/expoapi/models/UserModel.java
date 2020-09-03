package com.team5.expoapi.models;

import com.team5.expoapi.entities.Role;
import com.team5.expoapi.validation.annotations.ValidEmail;
import com.team5.expoapi.validation.annotations.ValidPassword;
import java.util.HashSet;
import java.util.Set;

public class UserModel {
  private Integer id;
  private String username;

  @ValidPassword
  private String password;

  @ValidEmail
  private String email;

  private boolean activated;
  private Set<Role> authorities = new HashSet<>();

  private boolean verified;

  public UserModel() {}

  public UserModel(
    Integer id,
    String username,
    String password,
    String email,
    boolean activated
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.activated = activated;
  }

  public UserModel(
    Integer id,
    String username,
    String password,
    String email,
    boolean activated,
    Set<Role> authorities
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.activated = activated;
    this.authorities = authorities;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getUsername() {
    return this.username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Set<Role> getAuthorities() {
    return this.authorities;
  }

  public void setAuthorities(Set<Role> authorities) {
    this.authorities = authorities;
  }

  public boolean isActivated() {
    return this.activated;
  }

  public boolean getActivated() {
    return this.activated;
  }

  public void setActivated(boolean activated) {
    this.activated = activated;
  }

  public boolean isVerified() {
    return verified;
  }

  public void setVerified(boolean verified) {
    this.verified = verified;
  }
}
