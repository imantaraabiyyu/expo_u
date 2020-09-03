package com.team5.expoapi.services.implement;

import com.team5.expoapi.entities.Pricing;
import com.team5.expoapi.repositories.PricingRepository;
import com.team5.expoapi.services.PricingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class PricingServiceImpl
  extends CommonServiceImpl<Pricing, Integer>
  implements PricingService {
  @Autowired
  private PricingRepository repository;

  @Override
  protected JpaRepository<Pricing, Integer> getRepository() {
    return repository;
  }
}
