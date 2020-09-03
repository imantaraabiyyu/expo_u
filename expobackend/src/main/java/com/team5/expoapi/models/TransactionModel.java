package com.team5.expoapi.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.team5.expoapi.entities.Pricing;
import com.team5.expoapi.entities.User;
import com.team5.expoapi.entities.enums.TransactionTypes;

public class TransactionModel {
  private String id;
  private Pricing pricing;
  private User user;
  private Integer quantity;
  private Integer grand;
  private TransactionTypes transactionTypes;

  public TransactionModel() {}

  public TransactionModel(
    String id,
    Pricing pricing,
    User user,
    Integer quantity,
    Integer grand,
    TransactionTypes transactionTypes
  ) {
    this.id = id;
    this.pricing = pricing;
    this.user = user;
    this.quantity = quantity;
    this.grand = grand;
    this.transactionTypes = transactionTypes;
  }

  public String getId() {
    return this.id;
  }

  public void setId(String id) {
    this.id = id;
  }

  @JsonIgnoreProperties({ "createdDate", "modifiedDate" })
  public Pricing getPricing() {
    return this.pricing;
  }

  public void setPricing(Pricing pricing) {
    this.pricing = pricing;
  }

  @JsonIgnoreProperties(
    {
      "password",
      "createdDate",
      "modifiedDate",
      "loginMethod",
      "enabled",
      "accountNonExpired",
      "accountNonLocked",
      "credentialsNonExpired"
    }
  )
  public User getUser() {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Integer getQuantity() {
    return this.quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public Integer getGrand() {
    return this.grand;
  }

  public void setGrand(Integer grand) {
    this.grand = grand;
  }

  public TransactionTypes getTransactionTypes() {
    return this.transactionTypes;
  }

  public void setTransactionTypes(TransactionTypes transactionTypes) {
    this.transactionTypes = transactionTypes;
  }
}
