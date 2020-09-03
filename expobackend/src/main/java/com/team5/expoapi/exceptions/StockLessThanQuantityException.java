package com.team5.expoapi.exceptions;

import com.team5.expoapi.exceptions.enums.ResponseCodes;
import org.springframework.http.HttpStatus;

public class StockLessThanQuantityException extends ApplicationException {
    private static final long serialVersionUID = 1L;

    public StockLessThanQuantityException() {
    super(
      HttpStatus.BAD_REQUEST,
      "stock.less.than.quantity",
      ResponseCodes.STOCK_LESS_THAN_QUANTITY
    );
  }
}
