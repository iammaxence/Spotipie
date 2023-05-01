package com.spotipie.controller;

import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.spotipie.controller.mapper.UserAuthorizationRequestMapper;
import com.spotipie.controller.request.UserAuthorizationRequest;
import com.spotipie.domain.UserAuthorization;

@RestController
public class Authorization {
  private static final String SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  private static final String RESPONSE_TYPE = "code";
  private static final String STATE = "state";
  private static final String CLIENT_ID_PARAM = "client_id";
  private static final String SCOPE_PARAM = "scope";
  private static final String REDIRECT_URI_PARAM = "redirect_uri";

  private final UserAuthorizationRequestMapper userAuthorizationRequestMapper;

  public Authorization(UserAuthorizationRequestMapper userAuthorizationRequestMapper) {
    this.userAuthorizationRequestMapper = userAuthorizationRequestMapper;
  }

  @PostMapping("/login")
  public String login(@RequestBody UserAuthorizationRequest request) {
    UserAuthorization authorization = userAuthorizationRequestMapper.userAuthorizationRequestToAuthorization(request);

    String authorizeUrl = buildAuthorizeUrl(authorization.getClientId(), authorization.getScope(),
        authorization.getRedirectUri(), generateRandomString(16));
    return authorizeUrl;
  }

  private String generateRandomString(int length) {
    byte[] bytes = new byte[length];
    new SecureRandom().nextBytes(bytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
  }

  private String buildAuthorizeUrl(String clientId, String scope, String redirectUri, String state) {
    String query = String.format("%s=%s&%s=%s&%s=%s&%s=%s&%s=%s",
        "response_type", RESPONSE_TYPE,
        CLIENT_ID_PARAM, clientId,
        SCOPE_PARAM, scope,
        REDIRECT_URI_PARAM, redirectUri,
        STATE, state);
    return SPOTIFY_AUTHORIZE_ENDPOINT + "?" + query;
  }

}
