package com.spotipie.secondary.repository.user.response.topsong;

import java.util.List;

import com.spotipie.secondary.repository.user.response.ImageResponse;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Setter
@Getter
public class AlbumResponse {
  private String name;
  private List<ImageResponse> images;


  @Builder
  public AlbumResponse(String name, List<ImageResponse> images) {
    this.name = name;
    this.images = images;
  }
}
