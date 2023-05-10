package com.spotipie.secondary.repository.user.response;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@EqualsAndHashCode
@NoArgsConstructor
@Setter
public class ImageResponse {
  private String url;

  @Builder
  public ImageResponse(String url) {
    this.url = url;
  }

  public String getUrl() {
    return this.url;
  }

  public void setUrl(String url) {
    this.url = url;
  }
}
