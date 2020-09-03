package com.team5.expoapi.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.team5.expoapi.entities.enums.Status;

@Table(name = "ticket")
@Entity
public class Ticket extends AbstractEntity {
  @ManyToOne
  @JoinColumn(nullable = false)
  private Transaction transaction;

  @Column(name = "code_prefix")
  private String codePrefix;
  
  @Column(name = "code_seq")
  private Integer codeSeq;

  private Status status;

  public Ticket() {}

  public Ticket(Transaction transaction, String codePrefix, Integer codeSeq, Status status) {
    this.transaction = transaction;
    this.codePrefix = codePrefix;
    this.codeSeq = codeSeq;
    this.status = status;
  }


  
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

  // @PrePersist
  // public void PrePersist() {
  //   createdDate = LocalDateTime.now();
  // }
}
