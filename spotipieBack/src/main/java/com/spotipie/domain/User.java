package com.spotipie.domain;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class User {
  private final String email;
  private final String pseudo;
  private final List<Image> images;
  private final String country;

  @Builder
  public User(String email, String pseudo, List<Image> images, String country) {
    this.email = email;
    this.pseudo = pseudo;
    this.images = images;
    this.country = country;
  }
}
