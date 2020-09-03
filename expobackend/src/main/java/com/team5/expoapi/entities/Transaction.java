package com.team5.expoapi.entities;

import com.team5.expoapi.entities.enums.TransactionTypes;
import com.team5.expoapi.entities.sequence.StringPrefixedSequenceIdGenerator;
import java.time.LocalDateTime;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import org.apache.commons.lang3.RandomStringUtils;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Table(name = "transaction")
@Entity
public class Transaction {
  @Id
  @GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "transaction_seq"
  )
  @GenericGenerator(
    name = "transaction_seq",
    strategy = "com.team5.expoapi.entities.sequence.StringPrefixedSequenceIdGenerator",
    parameters = {
      @Parameter(
        name = StringPrefixedSequenceIdGenerator.INCREMENT_PARAM,
        value = "50"
      ),
      @Parameter(
        name = StringPrefixedSequenceIdGenerator.NUMBER_FORMAT_PARAMETER,
        value = "%05d"
      )
    }
  )
  private String id;

  @Column(name = "created_date")
  private LocalDateTime createdDate;

  @Column(name = "modified_date")
  private LocalDateTime modifiedDate;

  @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
  @JoinColumn(nullable = false)
  private Pricing pricing;

  @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
  @JoinColumn(nullable = false)
  private User user;

  private Integer quantity;
  private Integer grand;

  @Column(name = "trans_type")
  private TransactionTypes transactionTypes;

  public Transaction() {}

  public Transaction(TransactionTypes transactionTypes) {
    this.transactionTypes = transactionTypes;
  }

  public Transaction(
    Pricing pricing,
    User user,
    Integer quantity,
    Integer grand,
    TransactionTypes transactionTypes
  ) {
    this.pricing = pricing;
    this.user = user;
    this.quantity = quantity;
    this.grand = grand;
    this.transactionTypes = transactionTypes;
  }

  @PrePersist
  public void PrePersist() {
    createdDate = LocalDateTime.now();
  }

  @PreUpdate
  public void PreUpdate() {
    modifiedDate = LocalDateTime.now();
  }

  public Pricing getPricing() {
    return this.pricing;
  }

  public void setPricing(Pricing pricing) {
    this.pricing = pricing;
  }

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

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
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
}
