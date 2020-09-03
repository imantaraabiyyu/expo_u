package com.team5.expoapi.entities;

import com.team5.expoapi.entities.enums.Status;
import com.team5.expoapi.validation.annotations.enums.StatusAttributeConverter;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Table(name = "event_organizer")
@Entity
public class EventOrganizer extends AbstractEntity {
  @Convert(converter = StatusAttributeConverter.class)
  private Status status;  

  private String phone;
  private String name;
  private String address;
  private String city;
  private String description;

  @Column(name = "npwp_number", length = 25)
  private String npwpNumber;

  @Column(name = "siup_number", length = 30)
  private String siupNumber;

  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(
    name = "USER_EO",
    joinColumns = { @JoinColumn(name = "EO_ID", referencedColumnName = "id") },
    inverseJoinColumns = {
      @JoinColumn(name = "USER_ID", referencedColumnName = "id")
    }
  )
  private User user;

  public EventOrganizer() {}


  public EventOrganizer(Status status, String phone, String name, String address, String city, String description, String npwpNumber, String siupNumber, User user) {
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

  public User getUser() {
    return this.user;
  }

  public void setUser(User user) {
    this.user = user;
  }

}
