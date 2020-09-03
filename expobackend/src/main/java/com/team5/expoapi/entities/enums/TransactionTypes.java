package com.team5.expoapi.entities.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum TransactionTypes {
    BUY_TICKET(0),
    EVENT_REGISTRATION(1);


  private final Integer value;

  TransactionTypes(Integer value) {
    this.value = value;
  }

  @JsonValue
  public Integer getValue() {
    return this.value;
  }

  public static TransactionTypes toEnum(Integer value) {
    for (TransactionTypes transactionTypes : values()) {
      if (transactionTypes.value == value) {
        return transactionTypes;
      }
    }
    throw new IllegalArgumentException();
  }
}