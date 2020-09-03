package com.team5.expoapi.validation;

import com.google.gwt.thirdparty.guava.common.base.Joiner;
import com.team5.expoapi.validation.annotations.ValidPassword;
import java.util.Arrays;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.passay.DigitCharacterRule;
import org.passay.LengthRule;
import org.passay.PasswordData;
import org.passay.PasswordValidator;
import org.passay.RuleResult;
import org.passay.UppercaseCharacterRule;
import org.passay.WhitespaceRule;

public class PasswordConstraintValidator
  implements ConstraintValidator<ValidPassword, String> {

  @Override
  public void initialize(ValidPassword arg0) {}

  @Override
  public boolean isValid(String password, ConstraintValidatorContext context) {
    PasswordValidator validator = new PasswordValidator(
      Arrays.asList(
        new LengthRule(8, 30),
        new UppercaseCharacterRule(1),
        new DigitCharacterRule(1),
        new WhitespaceRule()
      )
    );

    RuleResult result = validator.validate(new PasswordData(password));
    if (result.isValid()) {
      return true;
    }
    context.disableDefaultConstraintViolation();
    context
      .buildConstraintViolationWithTemplate(
        Joiner.on(",").join(validator.getMessages(result))
      )
      .addConstraintViolation();
    return false;
  }
}