package com.team5.expoapi.entities.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Status {
  ACTIVE(0),
  NON_ACTIVE(1),
  PENDING(2),
  REJECTED(3),
  SUSPENDED(4);

  private final Integer value;

  Status(Integer value) {
    this.value = value;
  }

  @JsonValue
  public Integer getValue() {
    return this.value;
  }

  public static Status toEnum(Integer value) {
    for (Status status : values()) {
      if (status.value == value) {
        return status;
      }
    }
    throw new IllegalArgumentException();
  }
}
