package com.team5.expoapi.entities.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum IdCardType {
  KTP(0),
  PASSPORT(1);

  private final Integer value;

  IdCardType(Integer value) {
    this.value = value;
  }

  @JsonValue
  public Integer getValue() {
    return this.value;
  }

  public static IdCardType toEnum(Integer value) {
    for (IdCardType tier : values()) {
      if (tier.value == value) {
        return tier;
      }
    }
    throw new IllegalArgumentException();
  }
}
