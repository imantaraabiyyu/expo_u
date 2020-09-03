package com.team5.expoapi.services;

import com.team5.expoapi.entities.User;
import com.team5.expoapi.entities.enums.EntityTypes;
import java.util.Optional;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService
  extends CommonService<User, Integer>, UserDetailsService {
  public User register(User entity, EntityTypes type);

  Optional<User> findByUsername(String username);

  Optional<User> findByEmail(String email);

}

