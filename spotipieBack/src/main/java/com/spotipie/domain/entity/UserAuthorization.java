package com.spotipie.domain.entity;

public class UserAuthorization {
  private final String clientId;
  private final String scope;
  private final String redirectUri;
  private final boolean showDialog;

  public UserAuthorization(String clientId, String scope, String redirectUri, boolean showDialog) {
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
