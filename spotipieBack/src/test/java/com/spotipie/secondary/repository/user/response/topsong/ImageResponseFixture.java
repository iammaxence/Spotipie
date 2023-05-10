package com.spotipie.secondary.repository.user.response.topsong;

import java.util.List;

import com.spotipie.secondary.repository.user.response.ImageResponse;
import com.spotipie.secondary.repository.user.response.ImageResponse.ImageResponseBuilder;

public class ImageResponseFixture {
  
  public static ImageResponseBuilder createDefault() {
    return ImageResponse.builder().url("fake_url");
  }

  public static List<ImageResponse> createDefaultList() {
    return List.of(
      createDefault().build(),
      createDefault().url("fake_url2").build()
    );
  }
}
