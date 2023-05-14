package com.spotipie.secondary.repository;

import java.util.Base64;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.spotipie.domain.entity.AuthorizationCredentials;
import com.spotipie.domain.entity.Token;
import com.spotipie.domain.exception.HttpExceptionHandler;
import com.spotipie.primary.mapper.TokenResponseMapper;
import com.spotipie.primary.request.TokenRequest;
import com.spotipie.primary.response.TokenResponse;

@Repository
public class AuthorizationRespository {

  private static final String AUTH_URL = "https://accounts.spotify.com/api/token";
  private static final String CLIENT_SECRET = ""; // todo : remove when push
  private static final String GRANT_TYPE = "authorization_code";

  private final RestTemplate restTemplate;
  private final TokenResponseMapper tokenResponseMapper;

  public AuthorizationRespository(
      RestTemplate restTemplate,
      TokenResponseMapper tokenResponseMapper) {
    this.restTemplate = restTemplate;
    this.tokenResponseMapper = tokenResponseMapper;
  }

  public Token getToken(AuthorizationCredentials authorizationCredentials) {
    TokenRequest tokenRequest = TokenRequest.builder()
        .code(authorizationCredentials.getCode())
        .redirect_uri(authorizationCredentials.getRedirectUri())
        .grant_type(GRANT_TYPE).build();

    HttpHeaders authHeaders = new HttpHeaders();
    authHeaders.set("Authorization", "Basic " + Base64.getEncoder()
        .encodeToString((authorizationCredentials.getClientId() + ":" + CLIENT_SECRET).getBytes()));
    HttpEntity<MultiValueMap<String, String>> authRequest = new HttpEntity<>(tokenRequest.toMap(), authHeaders);

    try {
      ResponseEntity<TokenResponse> tokenResponse = restTemplate.postForEntity(AUTH_URL, authRequest,
          TokenResponse.class);
      return tokenResponseMapper.tokenResponseToToken(tokenResponse.getBody());
    } catch (HttpClientErrorException httpClientErrorException) {
      throw new HttpExceptionHandler(httpClientErrorException.getStatusCode(), httpClientErrorException.getMessage());
    }
  }
}
