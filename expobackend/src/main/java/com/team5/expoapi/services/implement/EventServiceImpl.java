package com.team5.expoapi.services.implement;

import com.team5.expoapi.entities.Category;
import com.team5.expoapi.entities.Event;
import com.team5.expoapi.entities.Merchant;
import com.team5.expoapi.repositories.EventRepository;
import com.team5.expoapi.services.EventService;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class EventServiceImpl
  extends CommonServiceImpl<Event, Integer>
  implements EventService {
  @Autowired
  private EventRepository repository;

  @Override
  protected JpaRepository<Event, Integer> getRepository() {
    return repository;
  }

  @Override
  public Page<Event> findByCategoryIn(
    Set<Category> category,
    int page,
    int size,
    Direction direction
  ) {
    Sort sort = Sort.Direction.DESC.equals(direction)
      ? Sort.by("id").descending()
      : Sort.by("id");

    return repository.findByCategoriesIn(
      category,
      PageRequest.of(page, size, sort)
    );
  }
}
