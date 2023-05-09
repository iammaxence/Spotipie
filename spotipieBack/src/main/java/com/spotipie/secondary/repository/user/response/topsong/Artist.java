package com.spotipie.secondary.repository.user.response.topsong;

import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@NoArgsConstructor
public class Artist {
  private String name;

  @Builder
  public Artist(String name) {
    this.name = name;
  }
}
