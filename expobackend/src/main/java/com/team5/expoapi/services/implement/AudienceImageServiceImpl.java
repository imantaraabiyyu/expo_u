package com.team5.expoapi.services.implement;

import com.team5.expoapi.entities.Audience;
import com.team5.expoapi.services.AudienceImageService;
import org.springframework.stereotype.Service;

@Service
public class AudienceImageServiceImpl
  extends CommonImageServiceImpl<Audience>
  implements AudienceImageService {

  @Override
  protected String getType() {
    return "audience";
  }
}
