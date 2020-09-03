package com.team5.expoapi.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.team5.expoapi.entities.EventMerchant;
import com.team5.expoapi.entities.User;
import com.team5.expoapi.entities.enums.IdCardType;
import com.team5.expoapi.entities.enums.Status;
import com.team5.expoapi.validation.annotations.ValidPhone;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class MerchantModel {
  private Integer id;
  private String name;

  @ValidPhone
  private String phone;

  private String city;
  private String address;
  private String description;
  private Status status;
  private IdCardType idCardType;
  private String idCardNumber;
  private User user;
  private Set<EventMerchant> eventMerchants = new HashSet<EventMerchant>(0);

  @JsonInclude(Include.NON_NULL)
  private List<ImageModel> images;

  public MerchantModel() {}

  public MerchantModel(
    Integer id,
    String name,
    String phone,
    String city,
    String address,
    String description,
    Status status,
    IdCardType idCardType,
    String idCardNumber,
    User user
  ) {
    this.id = id;
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

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
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

  @JsonIgnoreProperties({ "createdDate", "modifiedDate" })
  public User getUser() {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public List<ImageModel> getImages() {
    return images;
  }

  public void setImages(List<ImageModel> images) {
    this.images = images;
  }

  public Set<EventMerchant> getEventMerchants() {
    return this.eventMerchants;
  }

  public void setEventMerchants(Set<EventMerchant> eventMerchants) {
    this.eventMerchants = eventMerchants;
  }

}
