package com.spotipie.domain.entity;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@ToString
@EqualsAndHashCode
public class Song {
  private final String artistName;
  private final String title;
  private final String albumName;
  private final String urlImage;

  @Builder
  public Song(String artistName, String title, String albumName, String urlImage) {
    this.artistName = artistName;
    this.title = title;
    this.albumName = albumName;
    this.urlImage = urlImage;
  }
}
