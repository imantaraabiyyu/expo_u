package com.team5.expoapi.repositories;

import com.team5.expoapi.entities.Pricing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PricingRepository extends JpaRepository<Pricing, Integer> {}
