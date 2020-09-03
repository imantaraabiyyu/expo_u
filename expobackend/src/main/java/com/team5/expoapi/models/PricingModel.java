package com.team5.expoapi.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.team5.expoapi.entities.Event;

public class PricingModel {
  private Integer id;
  private String name;
  private Integer stock;
  private Integer price;
  private String codename;
  private String description;
  private Event event;

  public PricingModel() {}

  public PricingModel(Integer id, String name, Integer stock, Integer price, String codename, String description, Event event) {
    this.id = id;
    this.name = name;
    this.stock = stock;
    this.price = price;
    this.codename = codename;
    this.description = description;
    this.event = event;
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

  public Integer getStock() {
    return this.stock;
  }

  public void setStock(Integer stock) {
    this.stock = stock;
  }

  public Integer getPrice() {
    return this.price;
  }

  public void setPrice(Integer price) {
    this.price = price;
  }

  public String getCodename() {
    return this.codename;
  }

  public void setCodename(String codename) {
    this.codename = codename;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  @JsonIgnoreProperties({ "createdDate", "modifiedDate" })
  public Event getEvent() {
    return this.event;
  }

  public void setEvent(Event event) {
    this.event = event;
  }

}
