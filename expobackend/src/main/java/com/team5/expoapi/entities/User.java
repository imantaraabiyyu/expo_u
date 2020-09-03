package com.team5.expoapi.entities;

import com.team5.expoapi.entities.enums.LoginMethod;
import com.team5.expoapi.validation.annotations.enums.LoginMethodAttributeConverter;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "user")
public class User extends AbstractEntity implements UserDetails {
  private static final long serialVersionUID = -845666734745793525L;

  private String username;

  private String password;

  private String email;

  private Boolean verified;

  @NotNull
  @Convert(converter = LoginMethodAttributeConverter.class)
  private LoginMethod loginMethod;

  private Boolean activated;

  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(
    name = "USER_ROLE",
    joinColumns = @JoinColumn(name = "USER_ID"),
    inverseJoinColumns = @JoinColumn(name = "ROLE_ID")
  )
  private Set<Role> authorities = new HashSet<>();

  public User() {}

  public User(String username, String password) {
    this.username = username;
    this.password = password;
  }

  public User(String username, String password, String email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  public User(
    String username,
    String password,
    String email,
    @NotNull LoginMethod loginMethod,
    Boolean activated,
    Set<Role> authorities,
    Boolean verified
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.loginMethod = loginMethod;
    this.activated = activated;
    this.authorities = authorities;
    this.verified = verified;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Boolean isActivated() {
    return activated;
  }

  public void setActivated(Boolean activated) {
    this.activated = activated;
  }

  public Set<Role> getAuthorities() {
    return authorities;
  }

  public void setAuthorities(Set<Role> authorities) {
    this.authorities = authorities;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public static long getSerialversionuid() {
    return serialVersionUID;
  }

  public LoginMethod getLoginMethod() {
    return loginMethod;
  }

  public void setLoginMethod(LoginMethod loginMethod) {
    this.loginMethod = loginMethod;
  }

  public Boolean getVerified() {
    return verified;
  }

  public void setVerified(Boolean verified) {
    this.verified = verified;
  }

  public Boolean getActivated() {
    return activated;
  }
}
