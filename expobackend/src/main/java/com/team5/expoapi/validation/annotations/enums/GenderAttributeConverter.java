package com.team5.expoapi.validation.annotations.enums;

import com.team5.expoapi.entities.enums.Gender;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class GenderAttributeConverter
  implements AttributeConverter<Gender, Integer> {

  @Override
  public Integer convertToDatabaseColumn(Gender attribute) {
    if (attribute == null) return null;

    switch (attribute) {
      case MALE:
        return 0;
      case FEMALE:
        return 1;
      default:
        throw new IllegalArgumentException();
    }
  }

  @Override
  public Gender convertToEntityAttribute(Integer dbData) {
    if (dbData == null) return null;

    switch (dbData) {
      case 0:
        return Gender.MALE;
      case 1:
        return Gender.FEMALE;
      default:
        throw new IllegalArgumentException();
    }
  }
}
