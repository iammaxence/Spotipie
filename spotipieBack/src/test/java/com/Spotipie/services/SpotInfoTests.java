package com.spotipie.services;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.spotipie.domain.Song;
import com.spotipie.domain.Song.SongBuilder;
import com.spotipie.repository.ZipMethod;

@ExtendWith(MockitoExtension.class)
public class SpotInfoTests {

  SpotInfo spotInfo;

  @Mock
  ZipMethod zipMethod;

  @BeforeEach
  public void init() {
    spotInfo = new SpotInfo(zipMethod);
  }

  public List<Song> buildPlayedSongs() {
    return List.of(
        new SongBuilder().artistName("Jiji").name("my love").numberOfListening(108).build(),
        new SongBuilder().artistName("Coco").name("chan").numberOfListening(10).build(),
        new SongBuilder().artistName("Toto").name("tati").numberOfListening(3).build(),
        new SongBuilder().artistName("Mimi").name("titi").numberOfListening(1).build());
  }

  @Test
  void should_get_all_played_song() throws IOException {
    when(zipMethod.getAllPlayedSong()).thenReturn(buildPlayedSongs());
    assertEquals(buildPlayedSongs(), spotInfo.getAllPlayedSongs());
  }

  @Test
  void should_get_number_of_songs() throws IOException {
    when(zipMethod.getAllPlayedSong()).thenReturn(buildPlayedSongs());
    assertEquals(4, spotInfo.numberofSongs());
  }

  @Test
  void should_get_number_of_songs_per_page() throws IOException {
    when(zipMethod.getAllPlayedSong()).thenReturn(buildPlayedSongs());
    List<Song> expectedSongs = List.of(
    new SongBuilder().artistName("Toto").name("tati").numberOfListening(3).build(),
    new SongBuilder().artistName("Mimi").name("titi").numberOfListening(1).build());
    
    assertThat(spotInfo.songsByPages(1, 2)).usingFieldByFieldElementComparator().isEqualTo(expectedSongs);
  }

  @Nested
  class SearchForASong {

    @Test
    void should_find_song() throws IOException {
      when(zipMethod.getAllPlayedSong()).thenReturn(buildPlayedSongs());
      List<Song> expectedSongs = List.of(new
      SongBuilder().artistName("Jiji").name("my love").numberOfListening(108).build());

      assertEquals(expectedSongs, spotInfo.searchForASong("my love"));
      assertThat(spotInfo.searchForASong("my love")).usingFieldByFieldElementComparator().isEqualTo(expectedSongs);
    }

    @Test
    void should_not_find_song() throws IOException {
      when(zipMethod.getAllPlayedSong()).thenReturn(buildPlayedSongs());

      assertEquals(List.of(), spotInfo.searchForASong("unknow song"));
    }
  }

  @Test
  void should_get_top_played_song() throws IOException {
    when(zipMethod.getAllPlayedSong()).thenReturn(buildPlayedSongs());
    List<Song> expectedSongs = List.of(new
      SongBuilder().artistName("Jiji").name("my love").numberOfListening(108).build(),
      new SongBuilder().artistName("Coco").name("chan").numberOfListening(10).build()
    );

    assertThat(spotInfo.getTopPlayedSong(2)).usingFieldByFieldElementComparator().isEqualTo(expectedSongs);
  }
}
