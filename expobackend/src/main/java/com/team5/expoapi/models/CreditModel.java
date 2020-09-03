package com.team5.expoapi.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.team5.expoapi.entities.User;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

public class CreditModel {
  private Integer id;
  private Integer amount;
  private User user;

  private LocalDateTime createdDate;
  private LocalDateTime modifiedDate;
  
  public CreditModel() {}

  public CreditModel(Integer id, Integer amount, User user) {
    this.id = id;
    this.amount = amount;
    this.user = user;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getAmount() {
    return this.amount;
  }

  public void setAmount(Integer amount) {
    this.amount = amount;
  }

  @JsonIgnoreProperties({ "password","createdDate", "modifiedDate","loginMethod","enabled", "accountNonExpired", "accountNonLocked","credentialsNonExpired" })
  public User getUser() {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }
  public LocalDateTime getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(LocalDateTime createdDate) {
    this.createdDate = createdDate;
  }

  public LocalDateTime getModifiedDate() {
    return modifiedDate;
  }

  public void setModifiedDate(LocalDateTime modifiedDate) {
    this.modifiedDate = modifiedDate;
  }

  @PrePersist
  public void PrePersist() {
    createdDate = LocalDateTime.now();
  }

  @PreUpdate
  public void PreUpdate() {
    modifiedDate = LocalDateTime.now();
  }
}
