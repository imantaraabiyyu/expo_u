package com.team5.expoapi.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Table(name = "credit")
@Entity
public class Credit extends AbstractEntity {

  private Integer amount;

  @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
  @JoinTable(
    name = "USER_CREDIT",
    joinColumns = {
      @JoinColumn(name = "CREDIT_ID", referencedColumnName = "id")
    },
    inverseJoinColumns = {
      @JoinColumn(name = "USER_ID",referencedColumnName = "id")
    }
  )
  private User user;

  public Credit() {}

  public Credit(Integer amount, User user) {
    this.amount = amount;
    this.user = user;
  }

  public Integer getAmount() {
    return this.amount;
  }

  public void setAmount(Integer amount) {
    this.amount = amount;
  }

  public User getUser() {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }
}
