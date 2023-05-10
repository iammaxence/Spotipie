package com.spotipie.secondary.repository.user.response.topsong;

import java.util.List;

import com.spotipie.secondary.repository.user.response.topsong.ArtistResponse.ArtistResponseBuilder;

public class ArtistResponseFixture {

  public static ArtistResponseBuilder createDefault() {
    return ArtistResponse.builder().name("artistName");
  }

  public static List<ArtistResponse> createDefaultList() {
    return List.of(
      createDefault().build(),
      createDefault().name("artistName2").build()
    );
  }
}
