package com.team5.expoapi.services.implement;

import com.team5.expoapi.entities.Audience;
import com.team5.expoapi.repositories.AudienceRepository;
import com.team5.expoapi.services.AudienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class AudienceServiceImpl
  extends CommonServiceImpl<Audience, Integer>
  implements AudienceService {
  @Autowired
  private AudienceRepository repository;

  @Override
  protected JpaRepository<Audience, Integer> getRepository() {
    return repository;
  }
}
