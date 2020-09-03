package com.team5.expoapi.exceptions;

import com.team5.expoapi.exceptions.enums.ResponseCodes;
import org.springframework.http.HttpStatus;

public class EmailAlreadyExistException extends ApplicationException {
  private static final long serialVersionUID = 1L;

  public EmailAlreadyExistException() {
    super(
      HttpStatus.BAD_REQUEST,
      "email.already.exist",
      ResponseCodes.EMAIL_ALREADY_EXIST
    );
  }
}
