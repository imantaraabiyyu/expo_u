package com.team5.expoapi.entities.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum LoginMethod {
  EXPO(0),
  FACEBOOK(1),
  GOOGLE(2);

  private final Integer value;

  LoginMethod(Integer value) {
    this.value = value;
  }

  @JsonValue
  public Integer getValue() {
    return this.value;
  }

  public static LoginMethod toEnum(Integer value) {
    for (LoginMethod gender : values()) {
      if (gender.value == value) {
        return gender;
      }
    }
    throw new IllegalArgumentException();
  }
}
