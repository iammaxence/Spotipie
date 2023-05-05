package com.spotipie.primary.request;

public class TokenRequestBody {
  private String code;
  private String state;
  private String clientId;
  private String redirectUri;

  public TokenRequestBody(String code, String state, String clientId, String redirectUri) {
      this.code = code;
      this.state = state;
      this.clientId = clientId;
      this.redirectUri = redirectUri;
  }

  public String getCode() {
      return code;
  }

  public void setCode(String code) {
      this.code = code;
  }

  public String getState() {
      return state;
  }

  public void setState(String state) {
      this.state = state;
  }

  public String getClientId() {
      return clientId;
  }

  public void setClientId(String clientId) {
      this.clientId = clientId;
  }

  public String getRedirectUri() {
      return redirectUri;
  }

  public void setRedirectUri(String redirectUri) {
      this.redirectUri = redirectUri;
  }
}
