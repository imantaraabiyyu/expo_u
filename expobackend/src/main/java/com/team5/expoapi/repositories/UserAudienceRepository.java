package com.team5.expoapi.repositories;

import com.team5.expoapi.entities.Audience;
import com.team5.expoapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAudienceRepository
  extends JpaRepository<Audience, Integer> {
  Audience findByUser(User user);
}
