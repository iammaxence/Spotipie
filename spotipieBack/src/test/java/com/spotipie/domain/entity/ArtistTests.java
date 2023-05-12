package com.spotipie.domain.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import com.spotipie.domain.entity.artist.Artist;

import nl.jqno.equalsverifier.EqualsVerifier;
import nl.jqno.equalsverifier.Warning;

import static org.assertj.core.api.Assertions.*;

public class ArtistTests {
  Artist artist;

  @BeforeEach
  void setUp() {
    artist = Artist.builder()
      .name("John Doe")
      .build();
  }

  @Nested
  class Equals {
    @Test
    public void test_equals_artists() {
      Artist anotherArtist = Artist.builder()
        .name("John Doe")
        .build();
  
      assertThat(artist).isEqualTo(anotherArtist);
    }
  
    @Test
    public void test_not_equals_artists() {
      Artist differentArtist = Artist.builder()
              .name("Jane Smith")
              .build();
            
      assertThat(artist).isNotEqualTo(differentArtist);
    }

    @Test
    void should_test_equals_user() {
      EqualsVerifier
        .forClass(Artist.class)
        .suppress(Warning.STRICT_INHERITANCE)
      .verify();
    }
  }

  @Test
  public void test_get_name() {
    assertThat(artist.getName()).isEqualTo("John Doe");
  }

  @Test
  public void test_get_artist_to_string() {
    assertThat(artist.toString()).hasToString("Artist(name=John Doe)");
  }
}
