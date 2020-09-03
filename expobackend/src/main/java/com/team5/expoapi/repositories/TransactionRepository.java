package com.team5.expoapi.repositories;

import com.team5.expoapi.entities.Transaction;
import com.team5.expoapi.entities.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository
  extends JpaRepository<Transaction, String> {
  List<Transaction> findByUserOrderByIdDesc(User user);
}
