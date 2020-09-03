package com.team5.expoapi.entities.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Gender {
  MALE(0),
  FEMALE(1);

  private final Integer value;

  Gender(Integer value) {
    this.value = value;
  }

  @JsonValue
  public Integer getValue() {
    return this.value;
  }

  public static Gender toEnum(Integer value) {
    for (Gender gender : values()) {
      if (gender.value == value) {
        return gender;
      }
    }
    throw new IllegalArgumentException();
  }
}
