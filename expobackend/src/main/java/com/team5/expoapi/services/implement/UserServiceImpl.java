package com.team5.expoapi.services.implement;

import com.team5.expoapi.entities.Audience;
import com.team5.expoapi.entities.Credit;
import com.team5.expoapi.entities.EventOrganizer;
import com.team5.expoapi.entities.Merchant;
import com.team5.expoapi.entities.User;
import com.team5.expoapi.entities.enums.EntityTypes;
import com.team5.expoapi.exceptions.EmailAlreadyExistException;
import com.team5.expoapi.exceptions.EntityNotFoundException;
import com.team5.expoapi.repositories.UserRepository;
import com.team5.expoapi.services.AudienceService;
import com.team5.expoapi.services.CreditService;
import com.team5.expoapi.services.EventOrganizerService;
import com.team5.expoapi.services.MerchantService;
import com.team5.expoapi.services.UserService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl
  extends CommonServiceImpl<User, Integer>
  implements UserService {
  @Autowired
  private UserRepository repository;

  @Autowired
  private AudienceService audienceService;

  @Autowired
  private MerchantService merchantService;

  @Autowired
  private EventOrganizerService eventOrganizerService;

  @Autowired
  private CreditService creditService;

  @Override
  public UserDetails loadUserByUsername(String email)
    throws UsernameNotFoundException {
    return repository
      .findByEmail(email)
      .orElseThrow(
        () -> new UsernameNotFoundException("User Not Found : '" + email + "'.")
      );
  }

  @Override
  protected JpaRepository<User, Integer> getRepository() {
    return repository;
  }

  public User register(User entity, EntityTypes type) {
    if (!isEmailAvailable(entity.getEmail())) {
      throw new EmailAlreadyExistException();
    }
    User user = repository.save(entity);

    if (type.equals(EntityTypes.Audience)) {
      Audience audience = new Audience();
      audience.setUser(entity);
      Credit credit = new Credit();
      credit.setUser(entity);
      credit.setAmount(0);

      creditService.save(credit);
      audienceService.save(audience);
    } else if (type.equals(EntityTypes.Merchants)) {
      Merchant merchant = new Merchant();
      merchant.setUser(entity);
      merchantService.save(merchant);
    } else if (type.equals(EntityTypes.EO)) {
      EventOrganizer eo = new EventOrganizer();
      eo.setUser(entity);
      Credit credit = new Credit();
      credit.setUser(entity);
      credit.setAmount(0);
      creditService.save(credit);
      eventOrganizerService.save(eo);
    } else {
      throw new EntityNotFoundException();
    }
    return user;
  }

  public boolean isEmailAvailable(String email) {
    return repository.findByEmail(email).isEmpty();
  }

  @Override
  public Optional<User> findByUsername(String username) {
    return repository.findByUsername(username);
  }

  @Override
  public Optional<User> findByEmail(String email) {
    return repository.findByEmail(email);
  }
}
