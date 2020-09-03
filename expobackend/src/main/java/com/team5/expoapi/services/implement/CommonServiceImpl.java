package com.team5.expoapi.services.implement;

import com.team5.expoapi.exceptions.EntityNotFoundException;
import com.team5.expoapi.services.CommonService;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.repository.JpaRepository;

@Transactional
public abstract class CommonServiceImpl<T, ID> implements CommonService<T, ID> {

  protected abstract JpaRepository<T, ID> getRepository();

  @Override
  public T save(T entity) {
    return getRepository().save(entity);
  }

  @Override
  public T removeById(ID id) {
    T entity = findById(id);
    getRepository().delete(entity);
    return entity;
  }

  @Override
  public List<T> removeAll(ID[] ids) {
    List<T> items = new ArrayList<>();
    for (ID id : ids) {
      T item = findById(id);
      items.add(item);
    }
    getRepository().deleteAll(items);
    return items;
  }

  @Override
  public T findById(ID id) {
    return getRepository()
      .findById(id)
      .orElseThrow(
        () -> {
          return new EntityNotFoundException();
        }
      );
  }

  @Override
  public Page<T> findAll(T entity, int page, int size, Direction direction) {
    Sort sort = Sort.Direction.DESC.equals(direction)
      ? Sort.by("id").descending()
      : Sort.by("id");
    ExampleMatcher matcher = ExampleMatcher
      .matchingAll()
      .withIgnoreCase()
      .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
    return getRepository()
      .findAll(Example.of(entity, matcher), PageRequest.of(page, size, sort));
  }
}
