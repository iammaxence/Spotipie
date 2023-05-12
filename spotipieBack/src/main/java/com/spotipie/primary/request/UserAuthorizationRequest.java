package com.spotipie.primary.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Getter
public class UserAuthorizationRequest {
  private String clientId;
  private String redirectUri;
  private boolean showDialog;

  @Builder
  public UserAuthorizationRequest(String clientId, String redirectUri, boolean showDialog) {
    this.clientId = clientId;
    this.redirectUri = redirectUri;
    this.showDialog = showDialog;
  }
}