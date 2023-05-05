package com.spotipie.domain.services;

import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.spotipie.domain.entity.User;
import static org.assertj.core.api.Assertions.assertThat;
import com.spotipie.secondary.repository.user.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests {
  
  UserService userService;

  @Mock
  UserRepository userRepository;

  @BeforeEach
  void init() {
    userService = new UserService(userRepository);
  }

  @Test
  void shoud_get_user_profile() {
    String token = "fake_token";
    User expectedUser = User.builder().email("email").country("fr").images(List.of()).pseudo("pseudo").build();
    when(userRepository.getUserProfile(token)).thenReturn(expectedUser);

    User userResponse = userService.getUserProfile(token);

    assertThat(userResponse).isNotNull().isEqualToComparingFieldByField(expectedUser);
  }
}
