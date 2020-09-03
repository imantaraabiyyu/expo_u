package com.team5.expoapi.services.implement;

import java.util.List;

import com.team5.expoapi.dto.UserCredit;
import com.team5.expoapi.entities.Credit;
import com.team5.expoapi.entities.User;
import com.team5.expoapi.repositories.CreditRepository;
import com.team5.expoapi.services.CreditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class CreditServiceImpl extends CommonServiceImpl<Credit, Integer> implements CreditService {
  @Autowired
  private CreditRepository repository;

  @Override
  protected JpaRepository<Credit, Integer> getRepository() {
    return repository;
  }

  @Override
  public List<Credit> findByUser(User user) {
    return repository.findByUser(user);
  }

  @Override
  public UserCredit findTotalCredit(User user,  Integer id){
        return repository.findTotalCredit(id,user);
      
  }

  @Override
  public List<Credit> findHistoryCredit(User user, Integer id) {
    return null;
  }
}
