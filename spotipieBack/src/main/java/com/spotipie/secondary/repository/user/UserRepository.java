package com.spotipie.secondary.repository.user;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.spotipie.domain.entity.User;
import com.spotipie.domain.exception.HttpExceptionHandler;
import com.spotipie.secondary.repository.user.mapper.UserResponseMapper;
import com.spotipie.secondary.repository.user.response.UserResponse;

@Repository
public class UserRepository {
  
  private final RestTemplate restTemplate;
  private static final String PROFILE_URL = "https://api.spotify.com/v1/me";

  private final UserResponseMapper userResponseMapper;

  public UserRepository(RestTemplate restTemplate, UserResponseMapper userResponseMapper) {
    this.restTemplate = restTemplate;
    this.userResponseMapper = userResponseMapper;
  }

  
  public User getUserProfile(String token) {
    try {
      HttpHeaders headers = new HttpHeaders();
      headers.set("Authorization", "Bearer " + token);

      ResponseEntity<UserResponse> response = restTemplate.exchange(
        PROFILE_URL,
        HttpMethod.GET,
        new HttpEntity<>(headers),
        UserResponse.class
      );

      return userResponseMapper.toUser(response.getBody());
    } catch(HttpClientErrorException httpClientErrorException) {
      throw new HttpExceptionHandler(httpClientErrorException.getStatusCode(), httpClientErrorException.getMessage());
    }
  }
}
