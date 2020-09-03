package com.team5.expoapi.services.implement;

import com.team5.expoapi.entities.Admin;
import com.team5.expoapi.services.AdminImageService;
import org.springframework.stereotype.Service;

@Service
public class AdminImageServiceImpl
  extends CommonImageServiceImpl<Admin>
  implements AdminImageService {

  @Override
  protected String getType() {
    return "admin";
  }
}
