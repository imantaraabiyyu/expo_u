package com.team5.expoapi.services;

import com.team5.expoapi.entities.EventOrganizer;
import com.team5.expoapi.entities.User;

public interface EventOrganizerService
  extends CommonService<EventOrganizer, Integer> {
    
    EventOrganizer findByUser(User user);

  }
