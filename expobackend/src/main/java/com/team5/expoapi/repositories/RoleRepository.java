package com.team5.expoapi.repositories;

import com.team5.expoapi.entities.Role;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
  Set<Role> findByName(String names);
}
