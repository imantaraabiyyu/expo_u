package com.team5.expoapi.controller;

import com.team5.expoapi.configs.ApplicationProperties;
import com.team5.expoapi.dto.UserCredit;
import com.team5.expoapi.entities.AbstractEntity;
import com.team5.expoapi.entities.Admin;
import com.team5.expoapi.entities.Audience;
import com.team5.expoapi.entities.Credit;
import com.team5.expoapi.entities.EventOrganizer;
import com.team5.expoapi.entities.Merchant;
import com.team5.expoapi.entities.Role;
import com.team5.expoapi.entities.Transaction;
import com.team5.expoapi.entities.User;
import com.team5.expoapi.entities.enums.EntityTypes;
import com.team5.expoapi.entities.enums.LoginMethod;
import com.team5.expoapi.models.CreditModel;
import com.team5.expoapi.models.ImageModel;
import com.team5.expoapi.models.PageAbleModel;
import com.team5.expoapi.models.ResponseModel;
import com.team5.expoapi.models.TransactionModel;
import com.team5.expoapi.models.UserModel;
import com.team5.expoapi.repositories.UserAdminRepository;
import com.team5.expoapi.repositories.UserAudienceRepository;
import com.team5.expoapi.repositories.UserEventOrganizerRepository;
import com.team5.expoapi.repositories.UserMerchantRepository;
import com.team5.expoapi.security.JwtTokenProvider;
import com.team5.expoapi.services.AdminImageService;
import com.team5.expoapi.services.AudienceImageService;
import com.team5.expoapi.services.CreditService;
import com.team5.expoapi.services.EventOrganizerImageService;
import com.team5.expoapi.services.MerchantImageService;
import com.team5.expoapi.services.RoleService;
import com.team5.expoapi.services.TransactionService;
import com.team5.expoapi.services.UserService;
import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
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
  private UserService userService;

  @Autowired
  private RoleService roleService;

  @Autowired
  private CreditService creditService;

  @Autowired
  private TransactionService transactionService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  JwtTokenProvider jwtTokenProvider;

  @Autowired
  ApplicationProperties properties;

  @GetMapping(produces = "application/json")
  public ResponseModel<PageAbleModel<UserModel>> findAll(
    @RequestParam(required = false) String username,
    @RequestParam(required = false) String email,
    @RequestParam(defaultValue = "asc") String sort,
    @RequestParam(defaultValue = "0") Integer page,
    @RequestParam(defaultValue = "10") Integer size
  ) {
    User entity = new User(username, email);

    Sort.Direction direction = sort != null
      ? Sort.Direction.valueOf(sort.toUpperCase())
      : null;

    Page<User> pageUsers = userService.findAll(entity, page, size, direction);
    List<User> Users = pageUsers.toList();

    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<UserModel>>() {}.getType();

    List<UserModel> UserModels = modelMapper.map(Users, type);
    PageAbleModel<UserModel> data = new PageAbleModel<>(
      UserModels,
      pageUsers.getNumber(),
      pageUsers.getSize(),
      pageUsers.getTotalElements()
    );

    return ResponseModel.success(data);
  }

  @GetMapping(path = "/credit/{id}", produces = "application/json")
  public ResponseModel<CreditModel> credit(@PathVariable Integer id) {
    User user = userService.findById(id);
    UserCredit credit = creditService.findTotalCredit(user, id);
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<CreditModel>() {}.getType();

    CreditModel data = modelMapper.map(credit, type);
    return ResponseModel.success(data);
  }

  @GetMapping(path = "/credit/history/{id}", produces = "application/json")
  public ResponseModel<List<CreditModel>> creditHistory(
    @PathVariable Integer id
  ) {
    User user = userService.findById(id);
    List<Credit> credit = creditService.findByUser(user);
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<CreditModel>>() {}.getType();

    List<CreditModel> data = modelMapper.map(credit, type);
    return ResponseModel.success(data);
  }

  @GetMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<UserModel> findById(@PathVariable Integer id) {
    User User = userService.findById(id);

    ModelMapper modelMapper = new ModelMapper();
    UserModel data = modelMapper.map(User, UserModel.class);

    return ResponseModel.success(data);
  }

  @GetMapping(path = "/{id}/transactions", produces = "application/json")
  public ResponseModel<PageAbleModel<TransactionModel>> findTransaction(
    @PathVariable Integer id,
    @RequestParam(defaultValue = "asc") String sort,
    @RequestParam(defaultValue = "0") Integer page,
    @RequestParam(defaultValue = "10") Integer size
  ) {
    User user = userService.findById(id);
    List<Transaction> entity = transactionService.findByUserOrderByIdDesc(user);
    Page<Transaction> pageTransaction = new PageImpl<>(entity);

    List<Transaction> transaction = pageTransaction.toList();
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<TransactionModel>>() {}.getType();
    List<TransactionModel> transactionModels = modelMapper.map(
      transaction,
      type
    );
    PageAbleModel<TransactionModel> data = new PageAbleModel<>(
      transactionModels,
      pageTransaction.getNumber(),
      pageTransaction.getSize(),
      pageTransaction.getTotalElements()
    );
    return ResponseModel.success(data);
  }

  @PostMapping(produces = "application/json", consumes = "application/json")
  public ResponseModel<Object> add(
    @RequestBody @Valid UserModel model,
    @RequestParam(required = true) Integer type
  )
    throws IOException {
    Role role = roleService.findById(type);
    Set<Role> authorities = new HashSet<>();
    authorities.add(role);
    User addedUser = userService.register(
      new User(
        model.getUsername(),
        passwordEncoder.encode(model.getPassword()),
        model.getEmail(),
        LoginMethod.EXPO,
        true,
        authorities,
        false
      ),
      EntityTypes.toEnum(type)
    );

    String email = addedUser.getEmail();
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(email, model.getPassword())
    );

    List<Path> paths;
    AbstractEntity entity;
    ImageModel image = new ImageModel();
    String id = addedUser.getId().toString();
    String profileId;

    Path defaultPath = Paths
      .get(properties.getDataDir(), "/images/default/")
      .toAbsolutePath()
      .normalize()
      .resolve("default.jpg");

    if (authorities.equals("EventOrganizer")) {
      entity = userEventOrganizerRepository.findByUser(addedUser);

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
      entity = userMerchantRepository.findByUser(addedUser);

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
      entity = userAudienceRepository.findByUser(addedUser);

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
      entity = userAdminRepository.findByUser(addedUser);

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

    String token = jwtTokenProvider.generateToken(authentication);
    Map<Object, Object> result = new HashMap<>();
    result.put("id", id);
    result.put("username", addedUser.getUsername());
    result.put("email", email);
    result.put("token", token);
    result.put(
      "photo",
      image.getUrl().contains("default") ? "no_photo" : image.getUrl()
    );
    result.put("role", authorities);
    result.put("profileId", profileId);
    return ResponseModel.success(result);
  }

  @PutMapping(
    path = "/{id}",
    produces = "application/json",
    consumes = "application/json"
  )
  public ResponseModel<UserModel> edit(@RequestBody @Valid UserModel model) {
    model.setId(model.getId());
    ModelMapper modelMapper = new ModelMapper();
    User entity = userService.findById(model.getId());
    modelMapper.map(model, entity);

    User editedUser = userService.save(entity);
    UserModel data = modelMapper.map(editedUser, UserModel.class);
    return ResponseModel.success(data);
  }

  @DeleteMapping(path = "/{id}", produces = "application/json")
  public ResponseModel<UserModel> delete(@PathVariable Integer id) {
    User deletedUser = userService.removeById(id);

    ModelMapper modelMapper = new ModelMapper();
    UserModel data = modelMapper.map(deletedUser, UserModel.class);

    return ResponseModel.success(data);
  }

  @DeleteMapping(produces = "application/json")
  public ResponseModel<List<UserModel>> delete(@RequestParam Integer[] ids) {
    List<User> deletedUsers = userService.removeAll(ids);
    ModelMapper modelMapper = new ModelMapper();
    Type type = new TypeToken<List<UserModel>>() {}.getType();
    List<UserModel> data = modelMapper.map(deletedUsers, type);

    return ResponseModel.success(data);
  }
}
