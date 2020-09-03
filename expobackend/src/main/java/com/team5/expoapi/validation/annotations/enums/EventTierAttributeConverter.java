package com.team5.expoapi.validation.annotations.enums;

import com.team5.expoapi.entities.enums.EventTier;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class EventTierAttributeConverter
  implements AttributeConverter<EventTier, Integer> {

  @Override
  public Integer convertToDatabaseColumn(EventTier attribute) {
    if (attribute == null) return null;

    switch (attribute) {
      case BRONZE:
        return 0;
      case SILVER:
        return 1;
      case GOLD:
        return 2;
      case PLATINUM:
        return 3;
      default:
        throw new IllegalArgumentException();
    }
  }

  @Override
  public EventTier convertToEntityAttribute(Integer dbData) {
    if (dbData == null) return null;

    switch (dbData) {
      case 0:
        return EventTier.BRONZE;
      case 1:
        return EventTier.SILVER;
      case 2:
        return EventTier.GOLD;
      case 3:
        return EventTier.PLATINUM;
      default:
        throw new IllegalArgumentException();
    }
  }
}
