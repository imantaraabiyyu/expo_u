package com.team5.expoapi.entities;

import com.team5.expoapi.entities.enums.Gender;
import com.team5.expoapi.validation.annotations.enums.GenderAttributeConverter;
import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Table(name = "admin")
@Entity
public class Admin extends AbstractEntity {
  private Integer age;

  private String phone;

  @Convert(converter = GenderAttributeConverter.class)
  private Gender gender;

  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(
    name = "USER_ADMIN",
    joinColumns = {
      @JoinColumn(name = "ADMIN_ID", referencedColumnName = "id")
    },
    inverseJoinColumns = {
      @JoinColumn(name = "USER_ID", referencedColumnName = "id")
    }
  )
  private User user;

  public Admin() {}

  public Admin(Integer age, String phone, Gender gender, User user) {
    this.age = age;
    this.phone = phone;
    this.gender = gender;
    this.user = user;
  }

  public Integer getAge() {
    return this.age;
  }

  public void setAge(Integer age) {
    this.age = age;
  }

  public String getPhone() {
    return this.phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public Gender getGender() {
    return this.gender;
  }

  public void setGender(Gender gender) {
    this.gender = gender;
  }

  public User getUser() {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }
}
