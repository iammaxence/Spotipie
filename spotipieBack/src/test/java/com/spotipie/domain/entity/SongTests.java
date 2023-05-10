package com.spotipie.domain.entity;

import java.util.Collections;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import com.spotipie.domain.entity.Image.ImageFixture;
import com.spotipie.domain.entity.artist.ArtistFixture;
import com.spotipie.domain.entity.song.Song;
import com.spotipie.domain.entity.song.SongFixture;
import com.spotipie.domain.entity.song.Song.SongBuilder;
import com.spotipie.domain.exception.MissingMandatoryValueException;

import nl.jqno.equalsverifier.EqualsVerifier;
import nl.jqno.equalsverifier.Warning;

import static org.assertj.core.api.Assertions.*;

class SongTests {


  @Nested
  class Getter {
    Song song = SongFixture.createDefault().urlImages(ImageFixture.createDefaultList()).build();

    @Test
    public void get_artists() {
      assertThat(song.getArtists()).isEqualTo(ArtistFixture.createDefaultList());
    }

    @Test
    public void get_title() {
      assertThat(song.getTitle()).isEqualTo("title");
    }

    @Test
    public void get_album_name() {
      assertThat(song.getAlbumName()).isEqualTo("albumName");
    }

    @Test
    public void get_url_images() {
      assertThat(song.getUrlImages()).isEqualTo(ImageFixture.createDefaultList());
    }
  }

  @Nested
  class Assert {
    @Test
    public void artists_are_missing() {
      SongBuilder song = Song.builder()
      .artists(null)
      .title("title")
      .albumName("albumName")
      .urlImages(ImageFixture.createDefaultList());

      assertThatThrownBy(() -> song.build())
                .isInstanceOf(MissingMandatoryValueException.class)
                .hasMessageContaining("artists");
    }

    @Test
    public void title_is_missing() {
      SongBuilder song = Song.builder()
      .artists(ArtistFixture.createDefaultList())
      .title(null)
      .albumName("albumName")
      .urlImages(ImageFixture.createDefaultList());

      assertThatThrownBy(() -> song.build())
                .isInstanceOf(MissingMandatoryValueException.class)
                .hasMessageContaining("title");
    }

    @Test
    public void album_name_is_missing() {
      SongBuilder song = Song.builder()
      .artists(ArtistFixture.createDefaultList())
      .title("title")
      .albumName(null)
      .urlImages(ImageFixture.createDefaultList());

      assertThatThrownBy(() -> song.build())
                .isInstanceOf(MissingMandatoryValueException.class)
                .hasMessageContaining("album");
    }

    @Test
    public void images_are_missing() {
      SongBuilder song = Song.builder()
      .artists(ArtistFixture.createDefaultList())
      .title("title")
      .albumName("albumName")
      .urlImages(null);

      assertThatThrownBy(() -> song.build())
                .isInstanceOf(MissingMandatoryValueException.class)
                .hasMessageContaining("urlImages");
    }
  }
  
  @Test
  void should_test_equals_user() {
    EqualsVerifier
      .forClass(User.class)
      .suppress(Warning.STRICT_INHERITANCE)
    .verify();
  }

  @Test
  void should_get_user_to_string() {
    User user = User.builder()
      .email("test@example.com")
      .pseudo("testuser")
      .images(Collections.emptyList())
      .country("Canada")
      .build();
    assertThat(user.toString()).isNotNull().isEqualTo("User(email=test@example.com, pseudo=testuser, images=[], country=Canada)");
  }
}
