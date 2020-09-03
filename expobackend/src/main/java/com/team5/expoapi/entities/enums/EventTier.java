package com.team5.expoapi.entities.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum EventTier {
  BRONZE(0),
  SILVER(1),
  GOLD(2),
  PLATINUM(3);

  private final Integer value;

  EventTier(Integer value) {
    this.value = value;
  }

  @JsonValue
  public Integer getValue() {
    return this.value;
  }

  public static EventTier toEnum(Integer value) {
    for (EventTier tier : values()) {
      if (tier.value == value) {
        return tier;
      }
    }
    throw new IllegalArgumentException();
  }
}
