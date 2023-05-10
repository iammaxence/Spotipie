package com.spotipie.secondary.repository.user.response.topsong;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Getter
@Setter
public class ItemResponse {
  private AlbumResponse album;
  private List<ArtistResponse> artists;
  private String name;

  @Builder
  public ItemResponse(AlbumResponse album, List<ArtistResponse> artists, String name) {
    this.album = album;
    this.artists = artists;
    this.name = name;
  }
}
