package com.team5.expoapi.services;

import com.team5.expoapi.entities.Role;
import java.util.Set;

public interface RoleService extends CommonService<Role, Integer> {
  Set<Role> findByName(String names);
}
