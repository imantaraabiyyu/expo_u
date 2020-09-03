package com.team5.expoapi.entities;

import com.team5.expoapi.entities.enums.IdCardType;
import com.team5.expoapi.entities.enums.Status;
import com.team5.expoapi.validation.annotations.enums.IdCardTypeAttributeConverter;
import com.team5.expoapi.validation.annotations.enums.StatusAttributeConverter;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Table(name = "merchant")
@Entity
public class Merchant extends AbstractEntity {
  
  private String name;
  private String phone;
  private String city;
  private String address;
  private String description;

  @Convert(converter = StatusAttributeConverter.class)
  private Status status;

  @Column(name = "id_card_type")
  @Convert(converter = IdCardTypeAttributeConverter.class)
  private IdCardType idCardType;

  @Column(name = "id_card_number", length = 16)
  private String idCardNumber;

  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(
    name = "USER_MERCHANT",
    joinColumns = {
      @JoinColumn(name = "MERCHANT_ID", referencedColumnName = "id")
    },
    inverseJoinColumns = {
      @JoinColumn(name = "USER_ID", referencedColumnName = "id")
    }
  )
  private User user;
  
  @OneToMany(fetch = FetchType.LAZY,targetEntity = EventMerchant.class , mappedBy = "pk.merchant", cascade=CascadeType.ALL)
  private Set<EventMerchant> eventMerchants = new HashSet<>();
    
  public Merchant() {}

  public Merchant(String name, String phone, String city, String address, String description, Status status, IdCardType idCardType, String idCardNumber, User user) {
    this.name = name;
    this.phone = phone;
    this.city = city;
    this.address = address;
    this.description = description;
    this.status = status;
    this.idCardType = idCardType;
    this.idCardNumber = idCardNumber;
    this.user = user;
  }

  public Set<EventMerchant> getEventMerchants() {
    return this.eventMerchants;
  }

  public void setEventMerchants(Set<EventMerchant> eventMerchants) {
    this.eventMerchants = eventMerchants;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPhone() {
    return this.phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getCity() {
    return this.city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getAddress() {
    return this.address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Status getStatus() {
    return this.status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }

  public IdCardType getIdCardType() {
    return this.idCardType;
  }

  public void setIdCardType(IdCardType idCardType) {
    this.idCardType = idCardType;
  }

  public String getIdCardNumber() {
    return this.idCardNumber;
  }

  public void setIdCardNumber(String idCardNumber) {
    this.idCardNumber = idCardNumber;
  }

  public User getUser() {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }


}
