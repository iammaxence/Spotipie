package com.spotipie.secondary.repository.user.response.topsong;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Setter
@Getter
public class TopSongResponse {
  private List<ItemResponse> items;
  
  @Builder
  public TopSongResponse(List<ItemResponse> items) {
    this.items = items;
  }
}
