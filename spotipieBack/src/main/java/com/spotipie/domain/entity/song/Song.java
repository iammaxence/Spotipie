package com.spotipie.domain.entity.song;

import java.util.List;

import com.spotipie.domain.assertions.AssertMissingMandatoryValue;
import com.spotipie.domain.entity.Image.Image;
import com.spotipie.domain.entity.artist.Artist;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@ToString
@EqualsAndHashCode
@Getter
public class Song {
  private final List<Artist> artists;
  private final String title;
  private final String albumName;
  private final List<Image> urlImages;

  @Builder
  public Song(List<Artist> artists, String title, String albumName, List<Image> urlImages) {
    AssertMissingMandatoryValue.verify("artists", artists);
    AssertMissingMandatoryValue.verify("title", title);
    AssertMissingMandatoryValue.verify("albumName", albumName);
    AssertMissingMandatoryValue.verify("urlImages", urlImages);

    this.artists = artists;
    this.title = title;
    this.albumName = albumName;
    this.urlImages = urlImages;
  }
}
