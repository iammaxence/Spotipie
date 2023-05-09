package com.spotipie.secondary.repository.user.response.topsong;

import com.spotipie.domain.entity.Image;

import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@NoArgsConstructor
public class Album {
  private String name;
  private Image[] images;


  @Builder
  public Album(String name, Image[] images) {
    this.name = name;
    this.images = images;
  }
}
