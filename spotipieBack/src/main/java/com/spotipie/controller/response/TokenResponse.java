package com.spotipie.controller.response;

public class TokenResponse {
  private String access_token;
  private String refresh_token;
  private String expires_in;
  private String token_type;
  private String scope;

    
  public TokenResponse(String access_token, String refresh_token, String expires_in, String token_type, String scope) {
      this.access_token = access_token;
      this.refresh_token = refresh_token;
      this.expires_in = expires_in;
      this.token_type = token_type;
      this.scope = scope;
  }

  public String getAccess_token() {
    return this.access_token;
  }

  public void setAccess_token(String access_token) {
    this.access_token = access_token;
  }

  public String getRefresh_token() {
    return this.refresh_token;
  }

  public void setRefresh_token(String refresh_token) {
    this.refresh_token = refresh_token;
  }

  public String getExpires_in() {
    return this.expires_in;
  }

  public void setExpires_in(String expires_in) {
    this.expires_in = expires_in;
  }

  public String getToken_type() {
    return this.token_type;
  }

  public void setToken_type(String token_type) {
    this.token_type = token_type;
  }

  public String getScope() {
    return this.scope;
  }

  public void setScope(String scope) {
    this.scope = scope;
  }

}
