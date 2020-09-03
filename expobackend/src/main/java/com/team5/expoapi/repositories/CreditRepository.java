package com.team5.expoapi.repositories;

import java.util.List;

import com.team5.expoapi.dto.UserCredit;
import com.team5.expoapi.entities.Credit;
import com.team5.expoapi.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CreditRepository extends JpaRepository<Credit, Integer> {

    List<Credit> findByUser(User user);

    @Query(value = "select c.user.id, SUM(c.amount) as amount from Credit c where c.user.id=?1")
    UserCredit findTotalCredit(Integer id, User user);

}
