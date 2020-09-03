package com.team5.expoapi.services.implement;

import com.team5.expoapi.entities.Category;
import com.team5.expoapi.repositories.CategoryRepository;
import com.team5.expoapi.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl
  extends CommonServiceImpl<Category, Integer>
  implements CategoryService {
  @Autowired
  private CategoryRepository repository;

  @Override
  protected JpaRepository<Category, Integer> getRepository() {
    return repository;
  }
}
