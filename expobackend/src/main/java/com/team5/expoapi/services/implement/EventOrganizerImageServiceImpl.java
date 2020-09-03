package com.team5.expoapi.services.implement;

import com.team5.expoapi.entities.EventOrganizer;
import com.team5.expoapi.services.EventOrganizerImageService;

import org.springframework.stereotype.Service;


@Service
public class EventOrganizerImageServiceImpl
  extends CommonImageServiceImpl<EventOrganizer>
  implements EventOrganizerImageService {

  @Override
  protected String getType() {
    return "EventOrganizer";
  }
}
