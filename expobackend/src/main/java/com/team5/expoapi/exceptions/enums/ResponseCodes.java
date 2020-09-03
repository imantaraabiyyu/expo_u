package com.team5.expoapi.exceptions.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ResponseCodes {
  SUCCESS(1),
  UNKNOWN(0),
  PATH_NOT_FOUND(-1),
  ENTITY_NOT_FOUND(-2),
  INVALID_INPUT_FORMAT(-3),
  INVALID_MEDIA_TYPE_REQUEST(-4),
  FILE_NOT_FOUND(-5),
  ILLEGAL_ARGUMENT(-6),
  EMAIL_ALREADY_EXIST(-7),
  STOCK_LESS_THAN_QUANTITY(-8),
  CREDIT_NOT_ENOUGH(-9);

  private final Integer value;

  private ResponseCodes(Integer value) {
    this.value = value;
  }

  @JsonValue
  public Integer getValue() {
    return value;
  }
}
