package com.spotipie.domain.services;

import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.stereotype.Service;

import com.spotipie.domain.entity.AuthorizationCredentials;
import com.spotipie.domain.entity.Token;
import com.spotipie.domain.entity.UserAuthorization;
import com.spotipie.secondary.repository.AuthorizationRespository;


@Service
public class AuthorizationService {
  private static final String SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  private static final String RESPONSE_TYPE = "code";
  private static final String STATE = "state";
  private static final String CLIENT_ID_PARAM = "client_id";
  private static final String SCOPE_PARAM = "scope";
  private static final String REDIRECT_URI_PARAM = "redirect_uri";
  private static final String SHOW_DIALOG = "show_dialog";
  private static final String SCOPE = "user-read-private user-read-email user-top-read";

  private final AuthorizationRespository authorizationRespository;

  public AuthorizationService(AuthorizationRespository authorizationRespository) {
    this.authorizationRespository = authorizationRespository;
  }

  public String login(UserAuthorization authorization) {
    return buildAuthorizeUrl(
        authorization.getClientId(),
        authorization.getRedirectUri(),
        generateRandomString(16),
        authorization.isShowDialog()
    );
  }
  
  public Token getToken(AuthorizationCredentials authorizationCredentials) {
    return authorizationRespository.getToken(authorizationCredentials);
  }

  private String generateRandomString(int length) {
    byte[] bytes = new byte[length];
    new SecureRandom().nextBytes(bytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
  }

  private String buildAuthorizeUrl(String clientId, String redirectUri, String state,
      boolean showDialog) {
    String query = String.format("%s=%s&%s=%s&%s=%s&%s=%s&%s=%s&%s=%s",
      "response_type", RESPONSE_TYPE,
      CLIENT_ID_PARAM, clientId,
      SCOPE_PARAM, SCOPE,
      REDIRECT_URI_PARAM, redirectUri,
      STATE, state,
      SHOW_DIALOG, showDialog);
    return SPOTIFY_AUTHORIZE_ENDPOINT + "?" + query;
  }
}
