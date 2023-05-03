package com.spotipie.services;

import org.springframework.stereotype.Service;

import com.spotipie.domain.AuthorizationCredentials;
import com.spotipie.domain.Token;
import com.spotipie.repository.AuthorizationRespository;


@Service
public class AuthorizationService {

  private final AuthorizationRespository authorizationRespository;

  public AuthorizationService(AuthorizationRespository authorizationRespository) {
    this.authorizationRespository = authorizationRespository;
  }
  
  public Token getToken(AuthorizationCredentials authorizationCredentials) {
    return authorizationRespository.getToken(authorizationCredentials);
  }
}
