package com.spotipie.domain;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.assertj.core.api.Assertions.*;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import com.spotipie.domain.Song.SongBuilder;
import com.spotipie.exception.song.AssertIsMissingField;

import nl.jqno.equalsverifier.EqualsVerifier;
import nl.jqno.equalsverifier.Warning;

public class SongTests {

  @Test
  void should_create_song() {
    Song song = new SongBuilder().artistName("Wejdene").name("Coco").numberOfListening(10).build();
    assertEquals("Wejdene", song.getArtistName());
    assertEquals("Coco", song.getName());
    assertEquals(10, song.getNumberOfListening());
  }

  @Nested
  class CompareSong {
    @Test
    public void equalsContract() {
        EqualsVerifier.forClass( Song.class )
            .suppress( Warning.STRICT_INHERITANCE )
            .verify();
    }

    @Test
    void should_be_equals() {
      Song song1 = new SongBuilder().artistName("Wejdene").name("Coco").numberOfListening(10).build();
      Song song2 = new SongBuilder().artistName("Wejdene").name("Coco").numberOfListening(10).build();

      assertEquals(song1, song2);
    }

    @Test
    void should_not_be_equals() {
      Song song1 = new SongBuilder().artistName("Wejdene").name("Coco").numberOfListening(10).build();
      Song song2 = new SongBuilder().artistName("Wejdene").name("Anissa").numberOfListening(10).build();

      assertNotEquals(song1, song2);
    }
  }

  @Nested
  class MissingField {
    @Test
    void should_throw_error_when_artist_name_field_is_missing() {
      assertThatThrownBy(() -> new SongBuilder().name("Coco").numberOfListening(10).build())
          .isInstanceOf(AssertIsMissingField.class)
          .hasMessageContaining("[Song] The field ArtistName is not valid : null");
    }

    @Test
    void should_throw_error_when_artist_name_field_is_empty() {
      assertThatThrownBy(() -> new SongBuilder().artistName("").name("Coco").numberOfListening(10).build())
          .isInstanceOf(AssertIsMissingField.class)
          .hasMessageContaining("[Song] The field ArtistName is not valid : ");
    }

    @Test
    void should_throw_error_when_name_field_is_missing() {
      assertThatThrownBy(() -> new SongBuilder().artistName("Wejdene").numberOfListening(10).build())
          .isInstanceOf(AssertIsMissingField.class)
          .hasMessageContaining("[Song] The field Name is not valid : null");
    }

    @Test
    void should_throw_error_when_name_field_is_empty() {
      assertThatThrownBy(() -> new SongBuilder().artistName("Wejdene").name("").numberOfListening(10).build())
          .isInstanceOf(AssertIsMissingField.class)
          .hasMessageContaining("[Song] The field Name is not valid : ");
    }
  }
}
