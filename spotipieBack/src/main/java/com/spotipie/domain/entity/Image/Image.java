package com.spotipie.domain.entity.Image;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@EqualsAndHashCode
@Getter
@Setter
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
