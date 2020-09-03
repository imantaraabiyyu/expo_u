package com.team5.expoapi.repositories;

import com.team5.expoapi.entities.Merchant;
import com.team5.expoapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMerchantRepository
  extends JpaRepository<Merchant, Integer> {
  Merchant findByUser(User user);
}
