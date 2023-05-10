package com.spotipie.domain.entity.Image;

import java.util.List;

import com.spotipie.domain.entity.Image.Image.ImageBuilder;

public class ImageFixture {
  
  private ImageFixture(){}

  public static ImageBuilder createDefault() {
    return Image.builder().url("fake_url");
  }

  public static List<Image> createDefaultList() {
    return List.of(
      createDefault().build(),
      createDefault().url("fake_url2").build()
    );
  }
}
