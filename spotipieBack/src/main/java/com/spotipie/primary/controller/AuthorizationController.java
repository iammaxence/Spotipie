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
  private final AuthorizationService authorizationService;

  private final UserAuthorizationRequestMapper userAuthorizationRequestMapper;
  private final TokenRequestBodyMapper tokenRequestBodyMapper;

  public AuthorizationController(
      AuthorizationService authorizationService,
      UserAuthorizationRequestMapper userAuthorizationRequestMapper,
      TokenRequestBodyMapper tokenRequestBodyMapper) {
    this.authorizationService = authorizationService;
    this.userAuthorizationRequestMapper = userAuthorizationRequestMapper;
    this.tokenRequestBodyMapper = tokenRequestBodyMapper;
  }

  @PostMapping("/login")
  public String login(@RequestBody UserAuthorizationRequest request) {
    UserAuthorization authorization = userAuthorizationRequestMapper.userAuthorizationRequestToAuthorization(request);
    return authorizationService.login(authorization);
  }

  @PostMapping("/token")
  public ResponseEntity<Token> token(@RequestBody TokenRequestBody tokenRequestBody) {

    AuthorizationCredentials authorizationCredentials = tokenRequestBodyMapper
        .toAuthorizationCredentials(tokenRequestBody);

    return ResponseEntity.ok().body(authorizationService.getToken(authorizationCredentials));
  }
}
