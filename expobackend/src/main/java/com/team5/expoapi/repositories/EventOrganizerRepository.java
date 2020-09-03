package com.team5.expoapi.repositories;

import com.team5.expoapi.entities.EventOrganizer;
import com.team5.expoapi.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EventOrganizerRepository
  extends JpaRepository<EventOrganizer, Integer> {

    EventOrganizer findByUser(User user);
    
  }
