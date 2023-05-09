package com.spotipie.secondary.repository.user;

import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.spotipie.domain.entity.Song;
import com.spotipie.domain.entity.User;
import com.spotipie.domain.exception.HttpExceptionHandler;
import com.spotipie.secondary.repository.user.mapper.UserResponseMapper;
import com.spotipie.secondary.repository.user.response.topsong.TopSongResponse;
import com.spotipie.secondary.repository.user.response.user.UserResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class UserRepository {
  private final RestTemplate restTemplate;
  private static final String PROFILE_URL = "https://api.spotify.com/v1/me";
  private static final String USER_TOP_TRACKS= "https://api.spotify.com/v1/me/top/tracks";

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


  public List<Song> getTopSongs(String authHeader, String timeRange, int numberOfItems, int offset) {
    log.info("getTopSongs(): timeRange="+timeRange + "numberOfItems="+ numberOfItems + "offset=" + offset);

    try {
      HttpHeaders headers = new HttpHeaders();
      headers.set("Authorization", authHeader);

      ResponseEntity<TopSongResponse> topSongresponse = restTemplate.exchange(
        USER_TOP_TRACKS+buildTopSongQueryParams(timeRange, numberOfItems, offset),
        HttpMethod.GET,
        new HttpEntity<>(headers),
        TopSongResponse.class
      );

      ResponseEntity<String> test = restTemplate.exchange(
        USER_TOP_TRACKS+buildTopSongQueryParams(timeRange, numberOfItems, offset),
        HttpMethod.GET,
        new HttpEntity<>(headers),
        String.class
      );

      log.info(topSongresponse.getStatusCode().toString());
      log.info(topSongresponse.getBody().toString());
      log.info(test.toString());

      return List.of();
    } catch(HttpClientErrorException httpClientErrorException) {
      throw new HttpExceptionHandler(httpClientErrorException.getStatusCode(), httpClientErrorException.getMessage());
    }
  }

  private String buildTopSongQueryParams(String timeRange, int numberOfItems, int offset) {
    return "?time_range="+timeRange+"&limit="+numberOfItems+"&offset="+offset;
  }
}
