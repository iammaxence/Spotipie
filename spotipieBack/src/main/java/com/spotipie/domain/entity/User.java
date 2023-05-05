package com.spotipie.domain.entity;

import java.util.List;

import com.spotipie.domain.assertions.AssertMissingMandatoryValue;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@ToString
@EqualsAndHashCode
@Getter
public class User {
  private final String email;
  private final String pseudo;
  private final List<Image> images;
  private final String country;

  @Builder
  public User(String email, String pseudo, List<Image> images, String country) {
    AssertMissingMandatoryValue.verify("email", email);
    AssertMissingMandatoryValue.verify("pseudo", pseudo);
    AssertMissingMandatoryValue.verify("country", country);

    this.email = email;
    this.pseudo = pseudo;
    this.images = images;
    this.country = country;
  }
}
