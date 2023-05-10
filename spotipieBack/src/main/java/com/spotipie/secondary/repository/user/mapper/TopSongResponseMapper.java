package com.spotipie.secondary.repository.user.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.spotipie.domain.entity.Image.Image;
import com.spotipie.domain.entity.artist.Artist;
import com.spotipie.domain.entity.song.Song;
import com.spotipie.secondary.repository.user.response.ImageResponse;
import com.spotipie.secondary.repository.user.response.topsong.ArtistResponse;
import com.spotipie.secondary.repository.user.response.topsong.ItemResponse;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface TopSongResponseMapper {
  TopSongResponseMapper INSTANCE = Mappers.getMapper(TopSongResponseMapper.class);

  List<Song> toSongList(List<ItemResponse> itemResponse);

  @Mapping(target="title", source="name")
  @Mapping(target="albumName", source="album.name")
  @Mapping(target="urlImages", source="album.images")
  Song toSong(ItemResponse itemResponse);
  
  List<Artist> toArtistList(List<ArtistResponse> artistResponseList);

  List<Image> toImageList(List<ImageResponse> imageResponseList);
  
}
