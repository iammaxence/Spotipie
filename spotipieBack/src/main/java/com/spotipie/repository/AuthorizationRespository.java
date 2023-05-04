package com.spotipie.repository;

import java.util.Base64;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.spotipie.controller.mapper.TokenResponseMapper;
import com.spotipie.controller.request.TokenRequest;
import com.spotipie.controller.request.TokenRequest.TokenRequestBuilder;
import com.spotipie.controller.response.TokenResponse;
import com.spotipie.domain.AuthorizationCredentials;
import com.spotipie.domain.Token;
import com.spotipie.exception.HttpExceptionHandler;


@Repository
public class AuthorizationRespository {

  private static final String AUTH_URL = "https://accounts.spotify.com/api/token";
  private static final String CLIENT_SECRET = "efc9df2be7b54103b3a7c16602c4b29e";

  private final RestTemplate restTemplate;
  private final TokenResponseMapper tokenResponseMapper;


  public AuthorizationRespository(
    RestTemplate restTemplate,
    TokenResponseMapper tokenResponseMapper
  ) {
    this.restTemplate = restTemplate;
    this.tokenResponseMapper = tokenResponseMapper;
  }
  
  public Token getToken(AuthorizationCredentials authorizationCredentials) {
    TokenRequest tokenRequest = new TokenRequestBuilder().setCode(authorizationCredentials.getCode()).setRedirectUri(authorizationCredentials.getRedirectUri()).setGrantType("authorization_code").build();
        
    HttpHeaders authHeaders = new HttpHeaders();
    authHeaders.set("Authorization", "Basic " + Base64.getEncoder().encodeToString((authorizationCredentials.getClientId() + ":" + CLIENT_SECRET).getBytes()));
    HttpEntity<MultiValueMap<String, String>> authRequest = new HttpEntity<>(tokenRequest.toMap(), authHeaders);

    try {
      ResponseEntity<TokenResponse> tokenResponse = restTemplate.postForEntity(AUTH_URL, authRequest, TokenResponse.class);
      return tokenResponseMapper.tokenResponseToToken(tokenResponse.getBody());
    } catch(HttpClientErrorException httpClientErrorException) {
      throw new HttpExceptionHandler(httpClientErrorException.getStatusCode(), httpClientErrorException.getMessage());
    }
  }
}
