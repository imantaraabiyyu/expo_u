package com.team5.expoapi.validation.annotations.enums;

import com.team5.expoapi.entities.enums.Status;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class StatusAttributeConverter
  implements AttributeConverter<Status, Integer> {

  @Override
  public Integer convertToDatabaseColumn(Status attribute) {
    if (attribute == null) return null;

    switch (attribute) {
      case ACTIVE:
        return 0;
      case NON_ACTIVE:
        return 1;
      case PENDING:
        return 2;
      case REJECTED:
        return 3;
      case SUSPENDED:
        return 4;
      default:
        throw new IllegalArgumentException();
    }
  }

  @Override
  public Status convertToEntityAttribute(Integer dbData) {
    if (dbData == null) return null;

    switch (dbData) {
      case 0:
        return Status.ACTIVE;
      case 1:
        return Status.NON_ACTIVE;
      case 2:
        return Status.PENDING;
      case 3:
        return Status.REJECTED;
      case 4:
        return Status.SUSPENDED;
      default:
        throw new IllegalArgumentException();
    }
  }
}
