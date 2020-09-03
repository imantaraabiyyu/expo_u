package com.team5.expoapi.services;

import com.team5.expoapi.dto.UserCredit;
import com.team5.expoapi.entities.Credit;
import com.team5.expoapi.entities.User;
import java.util.List;

public interface CreditService extends CommonService<Credit, Integer> {
  List<Credit> findByUser(User user);
  List<Credit> findHistoryCredit(User user, Integer id);
  UserCredit findTotalCredit(User user, Integer id);
}
