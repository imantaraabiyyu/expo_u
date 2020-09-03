package com.team5.expoapi.validation.annotations.enums;

import com.team5.expoapi.entities.enums.IdCardType;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class IdCardTypeAttributeConverter
  implements AttributeConverter<IdCardType, Integer> {

  @Override
  public Integer convertToDatabaseColumn(IdCardType attribute) {
    if (attribute == null) return null;

    switch (attribute) {
      case KTP:
        return 0;
      case PASSPORT:
        return 1;
      default:
        throw new IllegalArgumentException();
    }
  }

  @Override
  public IdCardType convertToEntityAttribute(Integer dbData) {
    if (dbData == null) return null;

    switch (dbData) {
      case 0:
        return IdCardType.KTP;
      case 1:
        return IdCardType.PASSPORT;
      default:
        throw new IllegalArgumentException();
    }
  }
}
