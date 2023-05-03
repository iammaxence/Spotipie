package com.spotipie.repository;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.spotipie.controller.mapper.TokenResponseMapper;
import com.spotipie.controller.response.TokenResponse;
import com.spotipie.domain.AuthorizationCredentials;
import com.spotipie.domain.Token;

@ExtendWith(MockitoExtension.class)
class AuthorizationRepositoryTests {
  

  AuthorizationRespository authorizationRespository;

  @Mock
  RestTemplate restTemplate;

  
  @BeforeEach
  void init() {
    TokenResponseMapper tokenResponseMapper = Mappers.getMapper(TokenResponseMapper.class); 
    authorizationRespository = new AuthorizationRespository(restTemplate, tokenResponseMapper);
  }

  @Test
  void should_get_token() {
    TokenResponse tokenResponse = new TokenResponse("fake_access_token", "fake_refresh_token", 3600, null, null);
    when(restTemplate.postForEntity(anyString(), any(), eq(TokenResponse.class)))
      .thenReturn(ResponseEntity.ok(tokenResponse));
    AuthorizationCredentials authorizationCredentials = new AuthorizationCredentials("fake_code", "fake_state", "fake_clientId", "");

    Token tokenToTest = authorizationRespository.getToken(authorizationCredentials);

    Token expectedToken = new Token("fake_access_token", "fake_refresh_token", 3600);
    Assertions.assertThat(tokenToTest).isEqualToComparingFieldByField(expectedToken);
  }
}
