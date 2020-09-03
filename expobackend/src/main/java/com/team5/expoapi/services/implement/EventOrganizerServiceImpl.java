package com.team5.expoapi.services.implement;

import com.team5.expoapi.entities.EventOrganizer;
import com.team5.expoapi.entities.User;
import com.team5.expoapi.repositories.EventOrganizerRepository;
import com.team5.expoapi.services.EventOrganizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class EventOrganizerServiceImpl
  extends CommonServiceImpl<EventOrganizer, Integer>
  implements EventOrganizerService {
  @Autowired
  private EventOrganizerRepository repository;

  @Override
  protected JpaRepository<EventOrganizer, Integer> getRepository() {
    return repository;
  }

  @Override
  public EventOrganizer findByUser(User user) {
    return repository.findByUser(user);
  }
}
