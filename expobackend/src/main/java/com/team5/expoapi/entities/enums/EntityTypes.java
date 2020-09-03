package com.team5.expoapi.entities.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum EntityTypes {
  Event(0),
  Admin(1),
  Audience(2),
  Merchants(3),
  EO(4);

  private final Integer value;

  EntityTypes(Integer value) {
    this.value = value;
  }

  @JsonValue
  public Integer getValue() {
    return this.value;
  }

  public static EntityTypes toEnum(Integer value) {
    for (EntityTypes tier : values()) {
      if (tier.value == value) {
        return tier;
      }
    }
    throw new IllegalArgumentException();
  }
}
