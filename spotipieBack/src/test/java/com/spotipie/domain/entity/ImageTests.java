package com.spotipie.domain.entity;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;

import com.spotipie.domain.entity.Image.Image;

import nl.jqno.equalsverifier.EqualsVerifier;
import nl.jqno.equalsverifier.Warning;

public class ImageTests {
  
  @Test
  void should_get_url() {
    assertThat(Image.builder().url("myurl").build().getUrl()).isNotNull().isEqualTo("myurl");
  }

  @Test
  void should_test_equals_user() {
    EqualsVerifier
      .forClass(Image.class)
      .suppress(Warning.STRICT_INHERITANCE)
    .verify();
  }

  @Test
  void should_get_image_to_string() {
    Image image = Image.builder().url("myurl").build();
    assertThat(image.toString()).isNotNull().isEqualTo("Image(url=myurl)");
  }
}
