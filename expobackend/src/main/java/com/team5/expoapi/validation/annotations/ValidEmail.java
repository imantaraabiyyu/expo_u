package com.team5.expoapi.validation.annotations;

import com.team5.expoapi.validation.EmailValidator;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ ElementType.PARAMETER, ElementType.FIELD, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EmailValidator.class)
public @interface ValidEmail {
  String message() default "{email.format.invalid}";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
