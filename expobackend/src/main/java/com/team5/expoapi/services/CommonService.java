package com.team5.expoapi.services;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort.Direction;

public interface CommonService<T, ID> {

  public T save(T entity);

  public T removeById(ID id);

  public List<T> removeAll(ID[] ids);

  public T findById(ID id);

  public Page<T> findAll(T entity, int page, int size, Direction sort);
  public default int getNumber() {
    return 0; 
  }
}
