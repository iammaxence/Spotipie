package com.spotipie.primary.request;

import lombok.ToString;

@ToString
public class UserAuthorizationRequest {
  private final String clientId;
  private final String scope;
  private final String redirectUri;

  public UserAuthorizationRequest(String clientId, String scope, String redirectUri) {
    this.clientId = clientId;
    this.scope = scope;
    this.redirectUri = redirectUri;
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
}