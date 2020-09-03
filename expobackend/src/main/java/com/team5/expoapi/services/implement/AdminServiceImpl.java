package com.team5.expoapi.services.implement;

import com.team5.expoapi.entities.Admin;
import com.team5.expoapi.repositories.AdminRepository;
import com.team5.expoapi.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl
  extends CommonServiceImpl<Admin, Integer>
  implements AdminService {
  @Autowired
  private AdminRepository repository;

  @Override
  protected JpaRepository<Admin, Integer> getRepository() {
    return repository;
  }
}
