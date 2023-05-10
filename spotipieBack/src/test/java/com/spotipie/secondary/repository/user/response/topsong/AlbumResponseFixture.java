package com.spotipie.secondary.repository.user.response.topsong;

import com.spotipie.secondary.repository.user.response.topsong.AlbumResponse.AlbumResponseBuilder;

public class AlbumResponseFixture {
  
  public static AlbumResponseBuilder createDefault() {
    return AlbumResponse.builder().name("albumName").images(ImageResponseFixture.createDefaultList());
  }
}
