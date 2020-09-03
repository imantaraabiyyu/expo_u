package com.team5.expoapi.validation.annotations.enums;

import com.team5.expoapi.entities.enums.LoginMethod;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class LoginMethodAttributeConverter
  implements AttributeConverter<LoginMethod, Integer> {

  @Override
  public Integer convertToDatabaseColumn(LoginMethod attribute) {
    if (attribute == null) return null;

    switch (attribute) {
      case EXPO:
        return 0;
      case FACEBOOK:
        return 1;
      case GOOGLE:
        return 2;
      default:
        throw new IllegalArgumentException();
    }
  }

  @Override
  public LoginMethod convertToEntityAttribute(Integer dbData) {
    if (dbData == null) return null;

    switch (dbData) {
      case 0:
        return LoginMethod.EXPO;
      case 1:
        return LoginMethod.FACEBOOK;
      case 2:
        return LoginMethod.GOOGLE;
      default:
        throw new IllegalArgumentException();
    }
  }
}
