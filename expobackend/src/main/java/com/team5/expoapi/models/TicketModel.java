package com.team5.expoapi.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.team5.expoapi.entities.Transaction;
import com.team5.expoapi.entities.enums.Status;

public class TicketModel {
  private Integer id;
  private Transaction transaction;
  private String codePrefix;
  private Integer codeSeq;
  private Status status;

  public TicketModel() {
  }

  public TicketModel(Integer id, Transaction transaction, String codePrefix, Integer codeSeq, Status status) {
    this.id = id;
    this.transaction = transaction;
    this.codePrefix = codePrefix;
    this.codeSeq = codeSeq;
    this.status = status;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }
  
  @JsonIgnoreProperties({ "createdDate", "modifiedDate" })
  public Transaction getTransaction() {
    return this.transaction;
  }

  public void setTransaction(Transaction transaction) {
    this.transaction = transaction;
  }

  public String getCodePrefix() {
    return this.codePrefix;
  }

  public void setCodePrefix(String codePrefix) {
    this.codePrefix = codePrefix;
  }

  public Integer getCodeSeq() {
    return this.codeSeq;
  }

  public void setCodeSeq(Integer codeSeq) {
    this.codeSeq = codeSeq;
  }

  public Status getStatus() {
    return this.status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }


}
