package com.spotipie.domain.entity;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@ToString
@EqualsAndHashCode
public class Image {
  private final String url;

  @Builder
  public Image(String url) {
    this.url = url;
  }

  public String getUrl() {
    return this.url;
  }
}
