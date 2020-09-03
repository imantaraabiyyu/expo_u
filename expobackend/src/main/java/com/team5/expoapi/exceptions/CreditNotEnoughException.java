package com.team5.expoapi.exceptions;

import com.team5.expoapi.exceptions.enums.ResponseCodes;
import org.springframework.http.HttpStatus;

public class CreditNotEnoughException extends ApplicationException {
  private static final long serialVersionUID = 1L;

  public CreditNotEnoughException() {
    super(
      HttpStatus.BAD_REQUEST,
      "credit.not.enough",
      ResponseCodes.CREDIT_NOT_ENOUGH
    );
  }
}
