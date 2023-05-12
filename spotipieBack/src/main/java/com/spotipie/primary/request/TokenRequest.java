package com.spotipie.primary.request;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import lombok.Builder;

public class TokenRequest {
  private final String code;
  private final String redirect_uri;
  private final String grant_type;

  @Builder
  private TokenRequest(String code, String redirect_uri, String grant_type) {
    this.code = code;
    this.redirect_uri = redirect_uri;
    this.grant_type = grant_type;
  }

  public MultiValueMap<String, String> toMap() {
    MultiValueMap<String, String> authBody = new LinkedMultiValueMap<>();
    authBody.add("code", code);
    authBody.add("redirect_uri", redirect_uri);
    authBody.add("grant_type", "authorization_code");
    return authBody;
  }
}