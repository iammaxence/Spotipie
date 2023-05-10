package com.spotipie.domain.entity.artist;

import java.util.List;

import com.spotipie.domain.entity.artist.Artist.ArtistBuilder;

public class ArtistFixture {
  
  private ArtistFixture(){}

  public static ArtistBuilder createDefault() {
    return Artist.builder().name("artistName");
  }

  public static List<Artist> createDefaultList() {
    return List.of(
      createDefault().build(),
      createDefault().name("artistName2").build()
    );
  }
}
