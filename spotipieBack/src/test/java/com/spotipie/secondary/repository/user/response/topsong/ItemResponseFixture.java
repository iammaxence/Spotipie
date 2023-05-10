package com.spotipie.secondary.repository.user.response.topsong;

import java.util.List;

import com.spotipie.secondary.repository.user.response.topsong.ItemResponse.ItemResponseBuilder;

public class ItemResponseFixture {
  
  public static ItemResponseBuilder createDefault() {
    return ItemResponse.builder()
    .artists(ArtistResponseFixture.createDefaultList())
    .album(AlbumResponseFixture.createDefault().build())
    .name("title");
  }

  public static List<ItemResponse> createDefaultList() {
    return List.of(
      createDefault().build()
    );
  }
}
