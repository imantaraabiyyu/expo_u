package com.team5.expoapi.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.team5.expoapi.entities.User;
import com.team5.expoapi.entities.enums.Status;
import com.team5.expoapi.validation.annotations.ValidPhone;
import java.util.List;

public class MerchantRequestModel {
  private Integer id;
  private String name;

  @ValidPhone
  private String phone;

  private String city;
  private String address;
  private String description;
  private Status status;
  private Integer idCardType;
  private String idCardNumber;

  @JsonInclude(Include.NON_NULL)
  private List<ImageModel> images;

  public MerchantRequestModel() {}

  public MerchantRequestModel(
    Integer id,
    String name,
    String phone,
    String city,
    String address,
    String description,
    Status status,
    Integer idCardType,
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

  public Integer getIdCardType() {
    return this.idCardType;
  }

  public void setIdCardType(Integer idCardType) {
    this.idCardType = idCardType;
  }

  public String getIdCardNumber() {
    return this.idCardNumber;
  }

  public void setIdCardNumber(String idCardNumber) {
    this.idCardNumber = idCardNumber;
  }

  public List<ImageModel> getImages() {
    return images;
  }

  public void setImages(List<ImageModel> images) {
    this.images = images;
  }
}
