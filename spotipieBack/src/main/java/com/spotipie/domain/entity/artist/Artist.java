package com.spotipie.domain.entity.artist;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@EqualsAndHashCode
@Getter
@Setter
public class Artist {
  private String name;

  @Builder
  public Artist(String name) {
    this.name = name;
  }
}
