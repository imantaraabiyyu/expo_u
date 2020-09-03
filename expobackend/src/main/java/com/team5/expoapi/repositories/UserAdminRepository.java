package com.team5.expoapi.repositories;

import com.team5.expoapi.entities.Admin;
import com.team5.expoapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAdminRepository extends JpaRepository<Admin, Integer> {
  Admin findByUser(User user);
}
