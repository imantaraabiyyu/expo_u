package com.team5.expoapi.repositories;

import com.team5.expoapi.entities.Category;
import com.team5.expoapi.entities.Event;
import com.team5.expoapi.entities.Merchant;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {
  Page<Event> findByCategoriesIn(Set<Category> category, Pageable pageable);
}
