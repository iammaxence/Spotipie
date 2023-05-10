package com.spotipie.domain.entity.song;

import com.spotipie.domain.entity.Image.ImageFixture;
import com.spotipie.domain.entity.artist.ArtistFixture;
import com.spotipie.domain.entity.song.Song.SongBuilder;

public class SongFixture {

  private SongFixture(){}
  
  public static SongBuilder createDefault() {
    return Song.builder()
      .title("title")
      .albumName("albumName")
      .artists(ArtistFixture.createDefaultList())
      .urlImages(ImageFixture.createDefaultList());
  }
}
