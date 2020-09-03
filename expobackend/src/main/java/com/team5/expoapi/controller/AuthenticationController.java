package com.team5.expoapi.controller;

import com.team5.expoapi.configs.ApplicationProperties;
import com.team5.expoapi.entities.AbstractEntity;
import com.team5.expoapi.entities.Admin;
import com.team5.expoapi.entities.Audience;
import com.team5.expoapi.entities.EventOrganizer;
import com.team5.expoapi.entities.Merchant;
import com.team5.expoapi.entities.User;
import com.team5.expoapi.entities.enums.EntityTypes;
import com.team5.expoapi.models.AuthModel;
import com.team5.expoapi.models.AuthenticationRequest;
import com.team5.expoapi.models.ImageModel;
import com.team5.expoapi.models.OAuthUserModel;
import com.team5.expoapi.models.ResponseModel;
import com.team5.expoapi.repositories.UserAdminRepository;
import com.team5.expoapi.repositories.UserAudienceRepository;
import com.team5.expoapi.repositories.UserEventOrganizerRepository;
import com.team5.expoapi.repositories.UserMerchantRepository;
import com.team5.expoapi.security.JwtTokenProvider;
import com.team5.expoapi.services.AdminImageService;
import com.team5.expoapi.services.AudienceImageService;
import com.team5.expoapi.services.AuthService;
import com.team5.expoapi.services.EventOrganizerImageService;
import com.team5.expoapi.services.MerchantImageService;
import com.team5.expoapi.services.UserService;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserAudienceRepository userAudienceRepository;

  @Autowired
  UserAdminRepository userAdminRepository;

  @Autowired
  UserEventOrganizerRepository userEventOrganizerRepository;

  @Autowired
  UserMerchantRepository userMerchantRepository;

  @Autowired
  AudienceImageService audienceImageService;

  @Autowired
  AdminImageService adminImageService;

  @Autowired
  EventOrganizerImageService eventOrganizerImageService;

  @Autowired
  MerchantImageService merchantImageService;

  @Autowired
  JwtTokenProvider jwtTokenProvider;

  @Autowired
  UserService userService;

  @Autowired
  AuthService authService;

  @Autowired
  ApplicationProperties properties;

  @PostMapping(consumes = "application/json")
  public ResponseModel<Object> signIn(
    @RequestBody @Valid AuthenticationRequest data
  )
    throws IOException {
    try {
      String email = data.getEmail();
      Optional<User> user = userService.findByEmail(email);
      Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(email, data.getPassword())
      );
      String authorities = authentication
        .getAuthorities()
        .stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.joining(","));

      List<Path> paths;
      AbstractEntity entity;
      ImageModel image = new ImageModel();
      String id = user.get().getId().toString();
      String profileId;

      Path defaultPath = Paths
        .get(properties.getDataDir(), "/images/default/")
        .toAbsolutePath()
        .normalize()
        .resolve("default.jpg");

      if (authorities.equals("EventOrganizer")) {
        entity = userEventOrganizerRepository.findByUser(user.get());

        paths = eventOrganizerImageService.findAll((EventOrganizer) entity);
        profileId = entity.getId().toString();

        image =
          ImageModel.from(
            Integer.parseInt(profileId),
            paths
              .stream()
              .filter(path -> path.toString().contains("profile"))
              .findAny()
              .orElse(defaultPath),
            EntityTypes.EO
          );
      } else if (authorities.equals("Merchant")) {
        entity = userMerchantRepository.findByUser(user.get());

        paths = merchantImageService.findAll((Merchant) entity);
        profileId = entity.getId().toString();
        image =
          ImageModel.from(
            Integer.parseInt(profileId),
            paths
              .stream()
              .filter(path -> path.toString().contains("profile"))
              .findAny()
              .orElse(defaultPath),
            EntityTypes.Merchants
          );
      } else if (authorities.equals("Audience")) {
        entity = userAudienceRepository.findByUser(user.get());

        paths = audienceImageService.findAll((Audience) entity);

        profileId = entity.getId().toString();
        image =
          ImageModel.from(
            Integer.parseInt(profileId),
            paths
              .stream()
              .filter(path -> path.toString().contains("profile"))
              .findAny()
              .orElse(defaultPath),
            EntityTypes.Audience
          );
      } else {
        entity = userAdminRepository.findByUser(user.get());

        paths = adminImageService.findAll((Admin) entity);

        profileId = entity.getId().toString();
        image =
          ImageModel.from(
            Integer.parseInt(profileId),
            paths
              .stream()
              .filter(path -> path.toString().contains("profile"))
              .findAny()
              .orElse(defaultPath),
            EntityTypes.Admin
          );
      }

      String newToken = jwtTokenProvider.generateToken(authentication);
      Map<Object, Object> model = new HashMap<>();
      model.put("id", id);
      model.put("username", user.get().getUsername());
      model.put("email", email);
      model.put("token", newToken);
      model.put(
        "photo",
        image.getUrl().contains("default") ? "no_photo" : image.getUrl()
      );
      model.put("role", authorities);
      model.put("profileId", profileId);
      return ResponseModel.success(model);
    } catch (Exception e) {
      throw new BadCredentialsException("Invalid username/password supplied");
    }
  }

  @PostMapping(path = "/{token}", consumes = "application/json")
  public ResponseModel<Object> refreshToken(@PathVariable String token)
    throws IOException {
    String email = jwtTokenProvider.getUsernameFromToken(token);

    Optional<User> user = userService.findByEmail(email);

    Authentication authentication = new UsernamePasswordAuthenticationToken(
      user.get().getEmail(),
      null
    );
    String authorities = user
      .get()
      .getAuthorities()
      .stream()
      .map(GrantedAuthority::getAuthority)
      .collect(Collectors.joining(","));

    List<Path> paths;
    AbstractEntity entity;
    ImageModel image = new ImageModel();
    String id = user.get().getId().toString();
    String profileId;

    Path defaultPath = Paths
      .get(properties.getDataDir(), "/images/default/")
      .toAbsolutePath()
      .normalize()
      .resolve("default.jpg");

    if (authorities.equals("EventOrganizer")) {
      entity = userEventOrganizerRepository.findByUser(user.get());

      paths = eventOrganizerImageService.findAll((EventOrganizer) entity);
      profileId = entity.getId().toString();

      image =
        ImageModel.from(
          Integer.parseInt(profileId),
          paths
            .stream()
            .filter(path -> path.toString().contains("profile"))
            .findAny()
            .orElse(defaultPath),
          EntityTypes.EO
        );
    } else if (authorities.equals("Merchant")) {
      entity = userMerchantRepository.findByUser(user.get());

      paths = merchantImageService.findAll((Merchant) entity);
      profileId = entity.getId().toString();
      image =
        ImageModel.from(
          Integer.parseInt(profileId),
          paths
            .stream()
            .filter(path -> path.toString().contains("profile"))
            .findAny()
            .orElse(defaultPath),
          EntityTypes.Merchants
        );
    } else if (authorities.equals("Audience")) {
      entity = userAudienceRepository.findByUser(user.get());

      paths = audienceImageService.findAll((Audience) entity);

      profileId = entity.getId().toString();
      image =
        ImageModel.from(
          Integer.parseInt(profileId),
          paths
            .stream()
            .filter(path -> path.toString().contains("profile"))
            .findAny()
            .orElse(defaultPath),
          EntityTypes.Audience
        );
    } else {
      entity = userAdminRepository.findByUser(user.get());

      paths = adminImageService.findAll((Admin) entity);

      profileId = entity.getId().toString();
      image =
        ImageModel.from(
          Integer.parseInt(profileId),
          paths
            .stream()
            .filter(path -> path.toString().contains("profile"))
            .findAny()
            .orElse(defaultPath),
          EntityTypes.Admin
        );
    }

    String newToken = jwtTokenProvider.generateToken(authentication);
    Map<Object, Object> model = new HashMap<>();
    model.put("id", id);
    model.put("username", user.get().getUsername());
    model.put("email", email);
    model.put("token", newToken);
    model.put(
      "photo",
      image.getUrl().contains("default") ? "no_photo" : image.getUrl()
    );
    model.put("role", authorities);
    model.put("profileId", profileId);
    return ResponseModel.success(model);
  }

  @PostMapping(path = "/facebook", consumes = "application/json")
  public ResponseModel<Object> signInFacebook(
    @RequestBody @Valid AuthModel facebookAuthModel
  )
    throws IOException {
    OAuthUserModel data = authService.facebook(facebookAuthModel);
    String email = data.getEmail();

    Optional<User> user = userService.findByEmail(email);

    Authentication authentication = new UsernamePasswordAuthenticationToken(
      user.get().getEmail(),
      null
    );
    String authorities = user
      .get()
      .getAuthorities()
      .stream()
      .map(GrantedAuthority::getAuthority)
      .collect(Collectors.joining(","));

    List<Path> paths;
    AbstractEntity entity;
    ImageModel image = new ImageModel();
    String id = user.get().getId().toString();
    String profileId;

    Path defaultPath = Paths
      .get(properties.getDataDir(), "/images/default/")
      .toAbsolutePath()
      .normalize()
      .resolve("default.jpg");

    if (authorities.equals("EventOrganizer")) {
      entity = userEventOrganizerRepository.findByUser(user.get());

      paths = eventOrganizerImageService.findAll((EventOrganizer) entity);
      profileId = entity.getId().toString();

      image =
        ImageModel.from(
          Integer.parseInt(profileId),
          paths
            .stream()
            .filter(path -> path.toString().contains("profile"))
            .findAny()
            .orElse(defaultPath),
          EntityTypes.EO
        );
    } else if (authorities.equals("Merchant")) {
      entity = userMerchantRepository.findByUser(user.get());

      paths = merchantImageService.findAll((Merchant) entity);
      profileId = entity.getId().toString();
      image =
        ImageModel.from(
          Integer.parseInt(profileId),
          paths
            .stream()
            .filter(path -> path.toString().contains("profile"))
            .findAny()
            .orElse(defaultPath),
          EntityTypes.Merchants
        );
    } else if (authorities.equals("Audience")) {
      entity = userAudienceRepository.findByUser(user.get());

      paths = audienceImageService.findAll((Audience) entity);

      profileId = entity.getId().toString();
      image =
        ImageModel.from(
          Integer.parseInt(profileId),
          paths
            .stream()
            .filter(path -> path.toString().contains("profile"))
            .findAny()
            .orElse(defaultPath),
          EntityTypes.Audience
        );
    } else {
      entity = userAdminRepository.findByUser(user.get());

      paths = adminImageService.findAll((Admin) entity);

      profileId = entity.getId().toString();
      image =
        ImageModel.from(
          Integer.parseInt(profileId),
          paths
            .stream()
            .filter(path -> path.toString().contains("profile"))
            .findAny()
            .orElse(defaultPath),
          EntityTypes.Admin
        );
    }

    String newToken = jwtTokenProvider.generateToken(authentication);
    Map<Object, Object> model = new HashMap<>();
    model.put("id", id);
    model.put("username", user.get().getUsername());
    model.put("email", email);
    model.put("token", newToken);
    model.put(
      "photo",
      image.getUrl().contains("default") ? "no_photo" : image.getUrl()
    );
    model.put("role", authorities);
    model.put("profileId", profileId);
    return ResponseModel.success(model);
  }

  @PostMapping(path = "/google", consumes = "application/json")
  public ResponseModel<Object> signInGoogle(
    @RequestBody @Valid AuthModel googleAuthModel
  )
    throws IOException {
    OAuthUserModel data = authService.google(googleAuthModel);
    String email = data.getEmail();

    Optional<User> user = userService.findByEmail(email);

    Authentication authentication = new UsernamePasswordAuthenticationToken(
      user.get().getEmail(),
      null
    );
    String authorities = user
      .get()
      .getAuthorities()
      .stream()
      .map(GrantedAuthority::getAuthority)
      .collect(Collectors.joining(","));

    List<Path> paths;
    AbstractEntity entity;
    ImageModel image = new ImageModel();
    String id = user.get().getId().toString();
    String profileId;

    Path defaultPath = Paths
      .get(properties.getDataDir(), "/images/default/")
      .toAbsolutePath()
      .normalize()
      .resolve("default.jpg");

    if (authorities.equals("EventOrganizer")) {
      entity = userEventOrganizerRepository.findByUser(user.get());

      paths = eventOrganizerImageService.findAll((EventOrganizer) entity);
      profileId = entity.getId().toString();

      image =
        ImageModel.from(
          Integer.parseInt(profileId),
          paths
            .stream()
            .filter(path -> path.toString().contains("profile"))
            .findAny()
            .orElse(defaultPath),
          EntityTypes.EO
        );
    } else if (authorities.equals("Merchant")) {
      entity = userMerchantRepository.findByUser(user.get());

      paths = merchantImageService.findAll((Merchant) entity);
      profileId = entity.getId().toString();
      image =
        ImageModel.from(
          Integer.parseInt(profileId),
          paths
            .stream()
            .filter(path -> path.toString().contains("profile"))
            .findAny()
            .orElse(defaultPath),
          EntityTypes.Merchants
        );
    } else if (authorities.equals("Audience")) {
      entity = userAudienceRepository.findByUser(user.get());

      paths = audienceImageService.findAll((Audience) entity);

      profileId = entity.getId().toString();
      image =
        ImageModel.from(
          Integer.parseInt(profileId),
          paths
            .stream()
            .filter(path -> path.toString().contains("profile"))
            .findAny()
            .orElse(defaultPath),
          EntityTypes.Audience
        );
    } else {
      entity = userAdminRepository.findByUser(user.get());

      paths = adminImageService.findAll((Admin) entity);

      profileId = entity.getId().toString();
      image =
        ImageModel.from(
          Integer.parseInt(profileId),
          paths
            .stream()
            .filter(path -> path.toString().contains("profile"))
            .findAny()
            .orElse(defaultPath),
          EntityTypes.Admin
        );
    }

    String newToken = jwtTokenProvider.generateToken(authentication);
    Map<Object, Object> model = new HashMap<>();
    model.put("id", id);
    model.put("username", user.get().getUsername());
    model.put("email", email);
    model.put("token", newToken);
    model.put(
      "photo",
      image.getUrl().contains("default") ? "no_photo" : image.getUrl()
    );
    model.put("role", authorities);
    model.put("profileId", profileId);
    return ResponseModel.success(model);
  }
}
