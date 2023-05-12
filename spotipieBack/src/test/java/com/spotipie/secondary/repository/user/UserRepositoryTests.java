package com.spotipie.secondary.repository.user;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.junit.Assert.assertArrayEquals;
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
import com.spotipie.domain.entity.artist.Artist;
import com.spotipie.domain.entity.song.Song;
import com.spotipie.domain.entity.song.SongFixture;
import com.spotipie.domain.exception.HttpExceptionHandler;
import com.spotipie.secondary.repository.user.mapper.TopSongResponseMapper;
import com.spotipie.secondary.repository.user.mapper.UserResponseMapper;
import com.spotipie.secondary.repository.user.response.topsong.ItemResponseFixture;
import com.spotipie.secondary.repository.user.response.topsong.TopSongResponse;
import com.spotipie.secondary.repository.user.response.user.UserResponse;

@ExtendWith(MockitoExtension.class)
public class UserRepositoryTests {

  private static final String PROFILE_URL = "https://api.spotify.com/v1/me";
  private static final String USER_TOP_TRACKS_URL= "https://api.spotify.com/v1/me/top/tracks";
  
  UserRepository userRepository;

  @Mock
  RestTemplate restTemplate;

  @BeforeEach
  void init() {
    UserResponseMapper userResponseMapper = Mappers.getMapper(UserResponseMapper.class);
    TopSongResponseMapper topSongResponseMapper = Mappers.getMapper(TopSongResponseMapper.class);
    userRepository = new UserRepository(restTemplate, userResponseMapper, topSongResponseMapper);
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
  void test_get_user_profile_error() {
    HttpClientErrorException exception = new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");

    when(restTemplate.exchange(eq(PROFILE_URL), eq(HttpMethod.GET), any(), eq(UserResponse.class)))
    .thenThrow(exception);

    assertThatExceptionOfType(HttpExceptionHandler.class)
      .isThrownBy(() -> userRepository.getUserProfile("token"))
        .withMessage("401 Unauthorized");
  }

  @Test
  void should_get_top_songs() {
    TopSongResponse topSongResponseList = TopSongResponse.builder().items(ItemResponseFixture.createDefaultList()).build();
    String params = "?time_range=long_term&limit=3&offset=0";
    when(restTemplate.exchange(eq(USER_TOP_TRACKS_URL+params), eq(HttpMethod.GET), any(), eq(TopSongResponse.class)))
    .thenReturn(ResponseEntity.ok(topSongResponseList));
    
    List<Song> songListResponse = userRepository.getTopSongs("fake_token", "long_term", 3, 0);
    
    List<Song> expectedSongList = List.of(
     SongFixture.createDefault().build()
    );
    assertArrayEquals(songListResponse.toArray(), expectedSongList.toArray());
  }

  @Test
  void should_return_empty_top_songs_when_body_is_null() {
    String params = "?time_range=long_term&limit=3&offset=0";
    when(restTemplate.exchange(eq(USER_TOP_TRACKS_URL+params), eq(HttpMethod.GET), any(), eq(TopSongResponse.class)))
    .thenReturn(ResponseEntity.ok(null));
    
    List<Song> songListResponse = userRepository.getTopSongs("fake_token", "long_term", 3, 0);
    
    assertArrayEquals(songListResponse.toArray(), List.of().toArray());
  }

  @Test
  void test_get_top_songs_error() {
    HttpClientErrorException exception = new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Unauthorized");
    String params = "?time_range=long_term&limit=3&offset=0";
    when(restTemplate.exchange(eq(USER_TOP_TRACKS_URL+params), eq(HttpMethod.GET), any(), eq(TopSongResponse.class)))
    .thenThrow(exception);

    assertThatExceptionOfType(HttpExceptionHandler.class)
      .isThrownBy(() -> userRepository.getTopSongs("fake_token", "long_term", 3, 0))
        .withMessage("401 Unauthorized");
  }
}
