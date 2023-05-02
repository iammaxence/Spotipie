package com.spotipie.controller;

import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.spotipie.controller.mapper.TokenResponseMapper;
import com.spotipie.controller.mapper.UserAuthorizationRequestMapper;
import com.spotipie.controller.request.TokenRequest;
import com.spotipie.controller.request.TokenRequestBody;
import com.spotipie.controller.request.UserAuthorizationRequest;
import com.spotipie.controller.request.TokenRequest.TokenRequestBuilder;
import com.spotipie.controller.response.TokenResponse;
import com.spotipie.domain.Token;
import com.spotipie.domain.UserAuthorization;
import com.spotipie.exception.token.AssertIsMissingState;

@RestController
public class AuthorizationController {
  private static final String SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  private static final String RESPONSE_TYPE = "code";
  private static final String STATE = "state";
  private static final String CLIENT_ID_PARAM = "client_id";
  private static final String SCOPE_PARAM = "scope";
  private static final String REDIRECT_URI_PARAM = "redirect_uri";
  private static final String CLIENT_SECRET = "";

  private final RestTemplate restTemplate;
  private final UserAuthorizationRequestMapper userAuthorizationRequestMapper;
  private final TokenResponseMapper tokenResponseMapper;

  public AuthorizationController(RestTemplate restTemplate, UserAuthorizationRequestMapper userAuthorizationRequestMapper, TokenResponseMapper tokenResponseMapper) {
    this.restTemplate = restTemplate;
    this.userAuthorizationRequestMapper = userAuthorizationRequestMapper;
    this.tokenResponseMapper = tokenResponseMapper;
  }

  @PostMapping("/login")
  public String login(@RequestBody UserAuthorizationRequest request) {
    UserAuthorization authorization = userAuthorizationRequestMapper.userAuthorizationRequestToAuthorization(request);

    return buildAuthorizeUrl(authorization.getClientId(), authorization.getScope(),
        authorization.getRedirectUri(), generateRandomString(16));
  }

  @PostMapping("/token")
  public ResponseEntity<Token> token(@RequestBody TokenRequestBody tokenRequestBody) {

    if (tokenRequestBody.getState() == null) {
      throw new AssertIsMissingState("State", tokenRequestBody.getState());
    } else {
        String authUrl = "https://accounts.spotify.com/api/token";
        TokenRequest tokenRequest = new TokenRequestBuilder().setCode(tokenRequestBody.getCode()).setRedirectUri("").build();
        
        HttpHeaders authHeaders = new HttpHeaders();
        authHeaders.set("Authorization", "Basic " + Base64.getEncoder().encodeToString((tokenRequestBody.getClientId() + ":" + CLIENT_SECRET).getBytes()));
        
        HttpEntity<MultiValueMap<String, String>> authRequest = new HttpEntity<>(tokenRequest.toMap(), authHeaders);
        ResponseEntity<TokenResponse> tokenResponse = restTemplate.postForEntity(authUrl, authRequest, TokenResponse.class);

        if (tokenResponse.getStatusCode() == HttpStatus.OK) {
            Token token = tokenResponseMapper.tokenResponseToToken(tokenResponse.getBody());
            return ResponseEntity.ok().body(token);
        } else {
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
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
