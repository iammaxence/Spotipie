package com.spotipie.secondary.repository.user.response.topsong;

import java.util.List;

import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@NoArgsConstructor
public class TopSongResponse {
  private List<ItemResponse> items;
  
  @Builder
  public TopSongResponse(List<ItemResponse> items) {
    this.items = items;
  }
}
