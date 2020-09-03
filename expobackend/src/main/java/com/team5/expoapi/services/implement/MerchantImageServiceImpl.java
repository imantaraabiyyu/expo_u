package com.team5.expoapi.services.implement;

import com.team5.expoapi.entities.Merchant;
import com.team5.expoapi.services.MerchantImageService;

import org.springframework.stereotype.Service;

@Service
public class MerchantImageServiceImpl
  extends CommonImageServiceImpl<Merchant>
  implements MerchantImageService {

  @Override
  protected String getType() {
    return "merchant";
  }
}
