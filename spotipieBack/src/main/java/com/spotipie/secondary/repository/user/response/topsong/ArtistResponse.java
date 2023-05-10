package com.spotipie.secondary.repository.user.response.topsong;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Setter
@Getter
public class ArtistResponse {
  private String name;

  @Builder
  public ArtistResponse(String name) {
    this.name = name;
  }
}
