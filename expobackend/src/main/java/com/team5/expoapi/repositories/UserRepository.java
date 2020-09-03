package com.team5.expoapi.repositories;

import com.team5.expoapi.entities.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByUsername(String username);

  Optional<User> findByEmail(String email);
}
