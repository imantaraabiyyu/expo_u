package com.team5.expoapi.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Table(name = "pricing")
@Entity
public class Pricing extends AbstractEntity {
  private String name;
  private Integer stock;
  private Integer price;
  private String codename;
  private String description;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "pricing_id")
  private Event event;

  public Pricing() {}

  public Pricing(
    String name,
    Integer stock,
    Integer price,
    String codename,
    String description,
    Event event
  ) {
    this.name = name;
    this.stock = stock;
    this.price = price;
    this.codename = codename;
    this.description = description;
    this.event = event;
  }

  public Event getEvent() {
    return this.event;
  }

  public void setEvent(Event event) {
    this.event = event;
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
}
