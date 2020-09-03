package com.team5.expoapi.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.team5.expoapi.validation.annotations.ValidPhone;
import java.util.List;

public class EventOrganizerRequestModel {
  private Integer id;
  private Integer status;

  @ValidPhone
  private String phone;

  private String name;
  private String address;
  private String city;

  private String description;
  private String npwpNumber;
  private String siupNumber;

  @JsonInclude(Include.NON_NULL)
  private List<ImageModel> images;

  public EventOrganizerRequestModel() {}

  public EventOrganizerRequestModel(
    Integer id,
    Integer status,
    String phone,
    String name,
    String address,
    String city,
    String description,
    String npwpNumber,
    String siupNumber
  ) {
    this.id = id;
    this.status = status;
    this.phone = phone;
    this.name = name;
    this.address = address;
    this.city = city;
    this.description = description;
    this.npwpNumber = npwpNumber;
    this.siupNumber = siupNumber;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getPhone() {
    return this.phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAddress() {
    return this.address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getCity() {
    return this.city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getNpwpNumber() {
    return this.npwpNumber;
  }

  public void setNpwpNumber(String npwpNumber) {
    this.npwpNumber = npwpNumber;
  }

  public String getSiupNumber() {
    return this.siupNumber;
  }

  public void setSiupNumber(String siupNumber) {
    this.siupNumber = siupNumber;
  }

  public List<ImageModel> getImages() {
    return images;
  }

  public void setImages(List<ImageModel> images) {
    this.images = images;
  }

  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }
}
