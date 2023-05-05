package com.spotipie.domain.entity;

public class UserAuthorization {
  private final String clientId;
  private final String scope;
  private final String redirectUri;

  public UserAuthorization(String clientId, String scope, String redirectUri) {
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
