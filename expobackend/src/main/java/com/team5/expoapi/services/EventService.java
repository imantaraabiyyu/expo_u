package com.team5.expoapi.services;

import com.team5.expoapi.entities.Category;
import com.team5.expoapi.entities.Event;
import com.team5.expoapi.entities.Merchant;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort.Direction;

public interface EventService extends CommonService<Event, Integer> {
  Page<Event> findByCategoryIn(
    Set<Category> category,
    int page,
    int size,
    Direction direction
  );
}
