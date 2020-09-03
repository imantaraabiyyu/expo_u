package com.team5.expoapi.exceptions;

import com.team5.expoapi.exceptions.enums.ResponseCodes;
import org.springframework.http.HttpStatus;

public class IllegalArgumentException extends ApplicationException {
  private static final long serialVersionUID = 1L;

  public IllegalArgumentException() {
    super(
      HttpStatus.BAD_REQUEST,
      "exception.illegal.argument",
      ResponseCodes.ILLEGAL_ARGUMENT
    );
  }
}
