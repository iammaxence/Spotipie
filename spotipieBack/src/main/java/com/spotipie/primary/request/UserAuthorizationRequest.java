package com.spotipie.primary.request;

import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@NoArgsConstructor
public class UserAuthorizationRequest {
  private String clientId;
  private String scope;
  private String redirectUri;
  private boolean showDialog;

  @Builder
  public UserAuthorizationRequest(String clientId, String scope, String redirectUri, boolean showDialog) {
    this.clientId = clientId;
    this.scope = scope;
    this.redirectUri = redirectUri;
    this.showDialog = showDialog;
  }

  public String getClientId() {
    return this.clientId;
  }

  public String getScope() {
    return this.scope;
  }

  public String getRedirectUri() {
    return this.redirectUri;
  }

  public boolean getShowDialog() {
    return this.showDialog;
  }
}