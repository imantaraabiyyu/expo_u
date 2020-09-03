package com.team5.expoapi.validation;

import com.team5.expoapi.validation.annotations.ValidImage;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

public class ImageFileValidator
  implements ConstraintValidator<ValidImage, MultipartFile> {

  @Override
  public void initialize(ValidImage constraintAnnotation) {}

  @Override
  public boolean isValid(
    MultipartFile file,
    ConstraintValidatorContext context
  ) {
    boolean result = true;

    String contentType = file.getContentType();

    if (!isSupportedContentType(contentType)) {
      return false;
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
