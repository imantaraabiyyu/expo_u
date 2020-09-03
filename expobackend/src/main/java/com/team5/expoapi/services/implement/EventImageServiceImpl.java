package com.team5.expoapi.services.implement;

import com.team5.expoapi.entities.Event;
import com.team5.expoapi.services.EventImageService;

import org.springframework.stereotype.Service;

@Service
public class EventImageServiceImpl
  extends CommonImageServiceImpl<Event>
  implements EventImageService {

  @Override
  protected String getType() {
    return "event";
  }
}
