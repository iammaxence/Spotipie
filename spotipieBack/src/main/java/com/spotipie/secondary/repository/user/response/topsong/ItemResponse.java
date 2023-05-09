package com.spotipie.secondary.repository.user.response.topsong;

import java.util.List;

import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@NoArgsConstructor
public class ItemResponse {
  private List<Album> album;
  private List<Artist> artists;
  private String name;

  @Builder
  public ItemResponse(List<Album> album, List<Artist> artists, String name) {
    this.album = album;
    this.artists = artists;
    this.name = name;
  }
}
