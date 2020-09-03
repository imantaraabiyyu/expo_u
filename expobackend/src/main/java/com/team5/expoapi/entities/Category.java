package com.team5.expoapi.entities;

import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "category")
@Entity
public class Category extends AbstractEntity {
  private String name;

  public Category() {}

  public Category(String name) {
    this.name = name;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
