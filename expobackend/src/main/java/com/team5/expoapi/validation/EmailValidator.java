package com.team5.expoapi.validation;

import com.team5.expoapi.validation.annotations.ValidEmail;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class EmailValidator implements ConstraintValidator<ValidEmail, String> {

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    String regex =
      "^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";

    Pattern pattern = Pattern.compile(regex);

    Matcher matcher = pattern.matcher(value);
    return matcher.matches();
  }
}
