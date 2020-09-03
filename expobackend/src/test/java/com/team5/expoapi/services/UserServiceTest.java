package com.team5.expoapi.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import com.team5.expoapi.entities.Category;
import com.team5.expoapi.entities.Role;
import com.team5.expoapi.entities.User;
import com.team5.expoapi.repositories.UserRepository;
import com.team5.expoapi.services.implement.UserServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

@ExtendWith(MockitoExtension.class)
@DataJpaTest
public class UserServiceTest {

    private static final Integer ID = 99;
    private static final String USERNAME = "mamamia";
    private static final String EMAIL = "mamamia@gmail.com";
    private static final String PASSWORD = "Mama-mia123";
    private static final boolean ACTIVATED = true;

    private static final String TYPE = "Audience";


    private static final Integer ROLE_ID = 99;
    private static final String ROLE_NAME = "Audience";


    @Mock
    private UserRepository repository;

    @InjectMocks
    private UserServiceImpl service;

    @Mock
    private Pageable pageableMock;

    @Mock
    private Page<User> userPage;


    // @BeforeEach
    // void setUp() throws Exception {
    //     MockitoAnnotations.initMocks(this);
    // }

    // @Test
    // public void shouldRegister() {

    //     User user = createUser();
    //     System.out.println(user);

    //     when(service.register(user,TYPE)).thenReturn(user);

    //     User result = service.register(user, TYPE);
    //     assertEquals(user, result);
    // }
   
    // @Test
    // private Role createRole() {
    //     Role role = new Role();
    //     role.setId(ROLE_ID);
    //     role.setName(ROLE_NAME);
    //     return role;
    // }
    // @Test
    // private User createUser() {
    //     Role role = createRole();
    //     Set<Role> roles = new HashSet<>();
    //     roles.add(role);
    //     User user = new User();
    //     user.setId(ID);
    //     user.setUsername(USERNAME);
    //     user.setEmail(EMAIL);
    //     user.setPassword(PASSWORD);
    //     user.setActivated(ACTIVATED);
    //     user.setAuthorities(roles);
    //     System.out.println(user);
    //     return user;
    // }
}