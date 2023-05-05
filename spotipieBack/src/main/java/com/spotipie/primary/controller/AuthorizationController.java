package com.spotipie.primary.controller;

import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spotipie.domain.entity.AuthorizationCredentials;
import com.spotipie.domain.entity.Token;
import com.spotipie.domain.entity.UserAuthorization;
import com.spotipie.domain.services.AuthorizationService;
import com.spotipie.primary.mapper.TokenRequestBodyMapper;
import com.spotipie.primary.mapper.UserAuthorizationRequestMapper;
import com.spotipie.primary.request.TokenRequestBody;
import com.spotipie.primary.request.UserAuthorizationRequest;

@RestController
public class AuthorizationController {
  private static final String SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  private static final String RESPONSE_TYPE = "code";
  private static final String STATE = "state";
  private static final String CLIENT_ID_PARAM = "client_id";
  private static final String SCOPE_PARAM = "scope";
  private static final String REDIRECT_URI_PARAM = "redirect_uri";

  private final AuthorizationService authorizationService;

  private final UserAuthorizationRequestMapper userAuthorizationRequestMapper;
  private final TokenRequestBodyMapper tokenRequestBodyMapper;

  public AuthorizationController(
    AuthorizationService authorizationService,
    UserAuthorizationRequestMapper userAuthorizationRequestMapper,
    TokenRequestBodyMapper tokenRequestBodyMapper
  ) {
    this.authorizationService = authorizationService;
    this.userAuthorizationRequestMapper = userAuthorizationRequestMapper;
    this.tokenRequestBodyMapper = tokenRequestBodyMapper;
  }

  @PostMapping("/login")
  public String login(@RequestBody UserAuthorizationRequest request) {
    UserAuthorization authorization = userAuthorizationRequestMapper.userAuthorizationRequestToAuthorization(request);

    return buildAuthorizeUrl(authorization.getClientId(), authorization.getScope(),
        authorization.getRedirectUri(), generateRandomString(16));
  }

  @PostMapping("/token")
  public ResponseEntity<Token> token(@RequestBody TokenRequestBody tokenRequestBody) {

    AuthorizationCredentials authorizationCredentials = tokenRequestBodyMapper.toAuthorizationCredentials(tokenRequestBody);

    return ResponseEntity.ok().body(authorizationService.getToken(authorizationCredentials));
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
