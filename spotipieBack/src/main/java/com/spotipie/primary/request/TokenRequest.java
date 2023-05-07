package com.spotipie.primary.request;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

public class TokenRequest {
  private final String code;
  private final String redirect_uri;
  private final String grant_type;

  private TokenRequest(String code, String redirect_uri, String grant_type) {
    this.code = code;
    this.redirect_uri = redirect_uri;
    this.grant_type = grant_type;
  }

  public String getCode() {
    return this.code;
  }

  public String getRedirectUri() {
    return this.redirect_uri;
  }

  public String getGrantType() {
    return this.grant_type;
  }

  public MultiValueMap<String, String> toMap() {
    MultiValueMap<String, String> authBody = new LinkedMultiValueMap<>();
    authBody.add("code", code);
    authBody.add("redirect_uri", redirect_uri);
    authBody.add("grant_type", "authorization_code");
    return authBody;
  }

  public static class TokenRequestBuilder {
    private String code;
    private String redirect_uri;
    private String grant_type;
    
    public TokenRequestBuilder() {}

    public TokenRequestBuilder setCode(String code) {
      this.code = code;
      return this;
    }

    public TokenRequestBuilder setRedirectUri(String redirectUri) {
      this.redirect_uri = redirectUri;
      return this;
    } 

    public TokenRequestBuilder setGrantType(String grantType) {
      this.grant_type = grantType;
      return this;
    }

    public TokenRequest build() {
      return new TokenRequest(code, redirect_uri, grant_type);
    } 
  }
}
