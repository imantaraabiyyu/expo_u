package com.team5.expoapi.validation.annotations;

import com.team5.expoapi.validation.ImagesFileValidator;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ ElementType.PARAMETER, ElementType.FIELD, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ImagesFileValidator.class)
@Documented
public @interface ValidImages {
  String message() default "{valid.image.message}";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
