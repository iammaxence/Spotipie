package com.spotipie.domain;

import com.spotipie.exception.song.AssertIsMissingField;

import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class Song {
  private String artistName;
  private String name;
  private int numberOfListening;

  private Song(String artistName, String name, int numberOfListening) {
    this.artistName = artistName;
    this.name = name;
    this.numberOfListening = numberOfListening;

    assertValidSong(this);
  }

  public String getArtistName() {
    return artistName;
  }

  public String getName() {
    return name;
  }

  public int getNumberOfListening() {
    return numberOfListening;
  }

  private void assertValidSong(Song song) {
    if (song.getArtistName() == null || song.getArtistName().equals("")) {
      throw new AssertIsMissingField("ArtistName", song.getArtistName());
    }

    if (song.getName() == null || song.getName().equals("")) {
      throw new AssertIsMissingField("Name", song.getName());
    }
  }

  public static class SongBuilder {
    private String artistName;
    private String name;
    private int numberOfListening;

    public SongBuilder() {
    }

    public SongBuilder artistName(String artistName) {
      this.artistName = artistName;
      return this;
    }

    public SongBuilder name(String name) {
      this.name = name;
      return this;
    }

    public SongBuilder numberOfListening(int numberOfListening) {
      this.numberOfListening = numberOfListening;
      return this;
    }

    public Song build() {
      return new Song(artistName, name, numberOfListening);
    }
  }
}
