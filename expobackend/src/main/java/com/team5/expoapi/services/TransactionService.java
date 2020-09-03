package com.team5.expoapi.services;

import com.team5.expoapi.entities.Transaction;
import com.team5.expoapi.entities.User;
import java.util.List;

public interface TransactionService extends CommonService<Transaction, String> {
  public Transaction buy(Transaction entity, Integer pricing_id);

  List<Transaction> findByUserOrderByIdDesc(User user);
}
