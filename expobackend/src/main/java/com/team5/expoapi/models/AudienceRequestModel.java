package com.team5.expoapi.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.team5.expoapi.entities.enums.Gender;
import com.team5.expoapi.validation.annotations.ValidPhone;
import java.util.List;

public class AudienceRequestModel {
  private Integer id;
  private Integer age;
  private Gender gender;

  @JsonInclude(Include.NON_NULL)
  private List<ImageModel> images;

  @ValidPhone
  private String phone;

  public AudienceRequestModel() {}

  public AudienceRequestModel(
    Integer id,
    Integer age,
    Gender gender,
    String phone
  ) {
    this.id = id;
    this.age = age;
    this.gender = gender;
    this.phone = phone;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getAge() {
    return this.age;
  }

  public void setAge(Integer age) {
    this.age = age;
  }

  public Gender getGender() {
    return this.gender;
  }

  public void setGender(Gender gender) {
    this.gender = gender;
  }

  public String getPhone() {
    return this.phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public List<ImageModel> getImages() {
    return images;
  }

  public void setImages(List<ImageModel> images) {
    this.images = images;
  }
}
