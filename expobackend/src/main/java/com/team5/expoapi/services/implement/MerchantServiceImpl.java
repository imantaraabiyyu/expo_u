package com.team5.expoapi.services.implement;

import com.team5.expoapi.entities.Merchant;
import com.team5.expoapi.repositories.MerchantRepository;
import com.team5.expoapi.services.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class MerchantServiceImpl
  extends CommonServiceImpl<Merchant, Integer>
  implements MerchantService {
  @Autowired
  private MerchantRepository repository;

  @Override
  protected JpaRepository<Merchant, Integer> getRepository() {
    return repository;
  }
}
