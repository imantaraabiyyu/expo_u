package com.team5.expoapi.entities.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ImageTypes {
  PROFILE(0),
  THUMBNAIL(1),
  BANNER(2),
  ID_CARD(3),
  SIUP(4),
  NPWP(5);

  private final Integer value;

  ImageTypes(Integer value) {
    this.value = value;
  }

  @JsonValue
  public Integer getValue() {
    return this.value;
  }

  public static ImageTypes toEnum(Integer value) {
    for (ImageTypes tier : values()) {
      if (tier.value == value) {
        return tier;
      }
    }
    throw new IllegalArgumentException();
  }
}
