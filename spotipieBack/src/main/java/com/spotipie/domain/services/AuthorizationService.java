package com.spotipie.domain.services;

import org.springframework.stereotype.Service;

import com.spotipie.domain.entity.AuthorizationCredentials;
import com.spotipie.domain.entity.Token;
import com.spotipie.secondary.repository.AuthorizationRespository;


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
