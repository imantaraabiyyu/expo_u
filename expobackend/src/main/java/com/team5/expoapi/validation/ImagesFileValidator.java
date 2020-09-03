package com.team5.expoapi.validation;

import com.team5.expoapi.validation.annotations.ValidImages;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

public class ImagesFileValidator
  implements ConstraintValidator<ValidImages, MultipartFile[]> {

  @Override
  public void initialize(ValidImages constraintAnnotation) {}

  @Override
  public boolean isValid(
    MultipartFile[] files,
    ConstraintValidatorContext context
  ) {
    boolean result = true;

    for (MultipartFile file : files) {
      String contentType = file.getContentType();

      if (!isSupportedContentType(contentType)) {
        return false;
      }
    }
    return result;
  }

  private boolean isSupportedContentType(String contentType) {
    return (
      contentType.equals("image/png") ||
      contentType.equals("image/jpg") ||
      contentType.equals("image/jpeg")
    );
  }
}
