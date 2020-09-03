package com.team5.expoapi.services.implement;

import com.team5.expoapi.entities.Role;
import com.team5.expoapi.repositories.RoleRepository;
import com.team5.expoapi.services.RoleService;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl
  extends CommonServiceImpl<Role, Integer>
  implements RoleService {
  @Autowired
  private RoleRepository repository;

  @Override
  protected JpaRepository<Role, Integer> getRepository() {
    return repository;
  }

  @Override
  public Set<Role> findByName(String names) {
    return repository.findByName(names);
  }
}
