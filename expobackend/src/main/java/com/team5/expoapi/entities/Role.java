package com.team5.expoapi.entities;

import javax.persistence.Entity;
import org.springframework.security.core.GrantedAuthority;


@Entity
public class Role extends AbstractEntity implements GrantedAuthority {
  private static final long serialVersionUID = 2774027500119780514L;

  private String name;


  public Role() {
  }


  public Role(String name) {
    this.name = name;
  }
  
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String getAuthority() {
    return this.name;
  }

  
}
