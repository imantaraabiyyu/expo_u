package com.team5.expoapi.services;

import com.team5.expoapi.entities.Audience;
import com.team5.expoapi.entities.Role;
import com.team5.expoapi.entities.User;
import com.team5.expoapi.entities.enums.EntityTypes;
import com.team5.expoapi.entities.enums.ImageTypes;
import com.team5.expoapi.entities.enums.LoginMethod;
import com.team5.expoapi.models.AuthModel;
import com.team5.expoapi.models.OAuthUserModel;
import com.team5.expoapi.repositories.UserAudienceRepository;
import java.io.IOException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
  @Autowired
  private UserService userService;

  @Autowired
  private UserAudienceRepository userAudienceRepository;

  @Autowired
  private AudienceImageService audienceImageService;

  @Autowired
  private WebClient webClient;

  @Autowired
  private RoleService roleService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public static final String FACEBOOK_AUTH_URL =
    "https://graph.facebook.com/me?fields=email,first_name,last_name&access_token=%s";

  public static final String FACEBOOK_PICTURE_URL =
    "http://graph.facebook.com/%s/picture?type=square";

  public static final String GOOGLE_AUTH_URL =
    "https://oauth2.googleapis.com/tokeninfo?id_token=%s";

  public OAuthUserModel facebook(AuthModel authModel) throws IOException {
    String templateUrl = String.format(FACEBOOK_AUTH_URL, authModel.getToken());

    OAuthUserModel facebookUserModel = webClient
      .get()
      .uri(templateUrl)
      .retrieve()
      .onStatus(
        HttpStatus::isError,
        clientResponse -> {
          throw new ResponseStatusException(
            clientResponse.statusCode(),
            "facebook login error"
          );
        }
      )
      .bodyToMono(OAuthUserModel.class)
      .block();

    final Optional<User> userOptional = userService.findByEmail(
      facebookUserModel.getEmail()
    );

    String imageUrl = String.format(
      FACEBOOK_PICTURE_URL,
      facebookUserModel.getId()
    );

    if (userOptional.isEmpty()) {
      Role role = roleService.findById(2);
      Set<Role> authorities = new HashSet<>();
      authorities.add(role);
      String password = RandomStringUtils.randomAlphanumeric(8);
      final User user = new User(
        facebookUserModel.getFirstName(),
        passwordEncoder.encode(password),
        facebookUserModel.getEmail(),
        LoginMethod.FACEBOOK,
        true,
        authorities,
        false
      );
      userService.register(user, EntityTypes.Audience);

      Audience entity = userAudienceRepository.findByUser(user);
      audienceImageService.saveFromOAuth(
        entity,
        imageUrl,
        ImageTypes.toEnum(2)
      );
    }

    return facebookUserModel;
  }

  public OAuthUserModel google(AuthModel authModel) throws IOException {
    String templateUrl = String.format(GOOGLE_AUTH_URL, authModel.getToken());

    OAuthUserModel googleUserModel = webClient
      .get()
      .uri(templateUrl)
      .retrieve()
      .onStatus(
        HttpStatus::isError,
        clientResponse -> {
          throw new ResponseStatusException(
            clientResponse.statusCode(),
            "google login error"
          );
        }
      )
      .bodyToMono(OAuthUserModel.class)
      .block();

    final Optional<User> userOptional = userService.findByEmail(
      googleUserModel.getEmail()
    );
    System.out.println(googleUserModel.getName() + googleUserModel.getEmail());
    if (userOptional.isEmpty()) {
      Role role = roleService.findById(2);
      Set<Role> authorities = new HashSet<>();
      authorities.add(role);
      String password = RandomStringUtils.randomAlphanumeric(8);
      final User user = new User(
        googleUserModel.getName(),
        passwordEncoder.encode(password),
        googleUserModel.getEmail(),
        LoginMethod.GOOGLE,
        true,
        authorities,
        false
      );
      userService.register(user, EntityTypes.Audience);
      Audience entity = userAudienceRepository.findByUser(user);
      audienceImageService.saveFromOAuth(
        entity,
        googleUserModel.getPicture(),
        ImageTypes.toEnum(2)
      );
    }

    return googleUserModel;
  }
}
