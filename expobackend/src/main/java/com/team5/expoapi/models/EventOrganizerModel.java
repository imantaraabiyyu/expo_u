package com.team5.expoapi.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.team5.expoapi.entities.User;
import com.team5.expoapi.entities.enums.Status;
import com.team5.expoapi.validation.annotations.ValidPhone;
import java.util.List;

public class EventOrganizerModel {
  private Integer id;
  private Status status;

  @ValidPhone
  private String phone;

  private String name;
  private String address;
  private String city;

  private String description;
  private String npwpNumber;
  private String siupNumber;
  private User user;

  @JsonInclude(Include.NON_NULL)
  private List<ImageModel> images;

  public EventOrganizerModel() {}

  public EventOrganizerModel(
    Integer id,
    Status status,
    String phone,
    String name,
    String address,
    String city,
    String description,
    String npwpNumber,
    String siupNumber,
    User user
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
    this.user = user;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Status getStatus() {
    return this.status;
  }

  public void setStatus(Status status) {
    this.status = status;
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
}
