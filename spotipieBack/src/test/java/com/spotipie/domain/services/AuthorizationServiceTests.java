package com.spotipie.domain.services;

import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.spotipie.domain.entity.AuthorizationCredentials;
import com.spotipie.secondary.repository.AuthorizationRespository;

@ExtendWith(MockitoExtension.class)
class AuthorizationServiceTests {

  AuthorizationService authorizationService;
  
  @Mock
  AuthorizationRespository authorizationRespository;

  @BeforeEach
  void init() {
    authorizationService = new AuthorizationService(authorizationRespository);
  }

  @Test
  void should_get_token() {
    AuthorizationCredentials authorizationCredentials = new AuthorizationCredentials("fake_code", "fake_state", "fake_clientId", "");

    authorizationService.getToken(authorizationCredentials);
    
    verify(authorizationRespository).getToken(authorizationCredentials);
  }
}
