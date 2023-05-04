package com.spotipie.domain;

import lombok.Builder;
import lombok.ToString;

@ToString
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
