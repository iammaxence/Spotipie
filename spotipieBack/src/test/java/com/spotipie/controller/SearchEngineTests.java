package com.spotipie.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import com.spotipie.domain.Song;
import com.spotipie.domain.Song.SongBuilder;
import com.spotipie.services.SpotInfo;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@WebMvcTest
public class SearchEngineTests {
  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private SpotInfo spotInfo;

  @Test
  public void should_get_top_played_songs() throws Exception {
    List<Song> mockSongList =  List.of(
      new SongBuilder().artistName("Toto").name("tati").numberOfListening(3).build(),
      new SongBuilder().artistName("Jiji").name("my love").numberOfListening(108).build(),
      new SongBuilder().artistName("Mimi").name("titi").numberOfListening(1).build());
    when(spotInfo.getTopPlayedSong(anyInt())).thenReturn(mockSongList);

    mockMvc.perform(get("/top").param("num", "5"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].name").value("tati"))
        .andExpect(jsonPath("$[1].name").value("my love"))
        .andExpect(jsonPath("$[2].name").value("titi"));

    verify(spotInfo, times(1)).getTopPlayedSong(5);
  }

  @Test
  public void should_get_played_songs_by_page() throws Exception {
    List<Song> mockSongList =  List.of(
      new SongBuilder().artistName("Toto").name("tati").numberOfListening(3).build(),
      new SongBuilder().artistName("Jiji").name("my love").numberOfListening(108).build(),
      new SongBuilder().artistName("Mimi").name("titi").numberOfListening(1).build());
    when(spotInfo.songsByPages(1, 2)).thenReturn(mockSongList);

    mockMvc.perform(get("/songsByPages").param("page", "1").param("nbElementByPage", "2"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].name").value("tati"))
        .andExpect(jsonPath("$[1].name").value("my love"))
        .andExpect(jsonPath("$[2].name").value("titi"));

    verify(spotInfo, times(1)).songsByPages(1, 2);
  }

  @Test
  public void should_get_all_played_songs() throws Exception {
    List<Song> mockSongList =  List.of(
      new SongBuilder().artistName("Toto").name("tati").numberOfListening(3).build(),
      new SongBuilder().artistName("Jiji").name("my love").numberOfListening(108).build(),
      new SongBuilder().artistName("Mimi").name("titi").numberOfListening(1).build());
    when(spotInfo.getAllPlayedSongs()).thenReturn(mockSongList);

    mockMvc.perform(get("/allsongs"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].name").value("tati"))
        .andExpect(jsonPath("$[1].name").value("my love"))
        .andExpect(jsonPath("$[2].name").value("titi"));

    verify(spotInfo, times(1)).getAllPlayedSongs();
  }

  @Test
  public void should_search_for_a_song() throws Exception {
    List<Song> mockSongList =  List.of(
      new SongBuilder().artistName("Mimi").name("titi").numberOfListening(1).build());
    when(spotInfo.searchForASong("titi")).thenReturn(mockSongList);

    mockMvc.perform(get("/search").param("song", "titi"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].name").value("titi"));

    verify(spotInfo, times(1)).searchForASong("titi");
  }

  @Test
  public void should_get_number_of_songs() throws Exception {
    when(spotInfo.numberofSongs()).thenReturn(1);

    mockMvc.perform(get("/numberOfSongs"))
     .andExpect(status().isOk())
     .andExpect(content().string("1"));

    verify(spotInfo, times(1)).numberofSongs();
  }

  @Test
  public void should_upload_file() throws Exception {
    MockMultipartFile file = new MockMultipartFile(
      "file", "test.txt", "text/plain", "Hello World".getBytes());

    mockMvc.perform(multipart("/uploadfile").file(file))
        .andExpect(status().isOk());

    verify(spotInfo, times(1)).uploadFile(any());
  }
}
