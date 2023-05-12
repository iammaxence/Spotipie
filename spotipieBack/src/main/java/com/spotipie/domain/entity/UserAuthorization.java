package com.spotipie.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class UserAuthorization {
  private final String clientId;
  private final String redirectUri;
  private final boolean showDialog;

  @Builder
  public UserAuthorization(String clientId, String redirectUri, boolean showDialog) {
    this.clientId = clientId;
    this.redirectUri = redirectUri;
    this.showDialog = showDialog;
  }
}
