package com.spotipie.secondary.repository.user;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.spotipie.domain.entity.User;
import com.spotipie.domain.exception.HttpExceptionHandler;
import com.spotipie.secondary.repository.user.mapper.UserResponseMapper;
import com.spotipie.secondary.repository.user.response.UserResponse;

@ExtendWith(MockitoExtension.class)
public class UserRepositoryTests {

  private static final String PROFILE_URL = "https://api.spotify.com/v1/me";

  
  UserRepository userRepository;

  @Mock
  RestTemplate restTemplate;

  @BeforeEach
  void init() {
    UserResponseMapper userResponseMapper = Mappers.getMapper(UserResponseMapper.class);
    userRepository = new UserRepository(restTemplate, userResponseMapper);
  }

  @Test
  void should_get_user_profile() {
    UserResponse userResponse = UserResponse.builder().email("email").country("fr").display_name("pseudo").images(List.of()).build();
    when(restTemplate.exchange(eq(PROFILE_URL), eq(HttpMethod.GET), any(), eq(UserResponse.class)))
    .thenReturn(ResponseEntity.ok(userResponse));
    
    User user = userRepository.getUserProfile("fake_token");
    
    User expectedUser = User.builder().email("email").country("fr").images(List.of()).pseudo("pseudo").build();
    assertThat(user).isNotNull().isEqualToComparingFieldByField(expectedUser);
  }

  @Test
  void testGetUserProfileError() {
    HttpClientErrorException exception = new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");

    when(restTemplate.exchange(eq(PROFILE_URL), eq(HttpMethod.GET), any(), eq(UserResponse.class)))
    .thenThrow(exception);

    assertThatExceptionOfType(HttpExceptionHandler.class)
      .isThrownBy(() -> userRepository.getUserProfile("token"))
        .withMessage("401 Unauthorized");
  }
}
