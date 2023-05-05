package com.spotipie.domain.entity;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class AuthorizationCredentialsTests {
  AuthorizationCredentials credentials = new AuthorizationCredentials(
        "code123",
        "state456",
        "client789",
        "http://example.com/callback"
    );

  @Test
  void should_test_getters() {
    AuthorizationCredentials credentials = new AuthorizationCredentials(
        "code123",
        "state456",
        "client789",
        "http://example.com/callback"
    );
    
    assertThat(credentials.getCode()).isEqualTo("code123");
    assertThat(credentials.getState()).isEqualTo("state456");
    assertThat(credentials.getClientId()).isEqualTo("client789");
    assertThat(credentials.getRedirectUri()).isEqualTo("http://example.com/callback");
  }

  @Test
  void should_test_setters() {
    credentials.setCode("newCode");
    assertThat(credentials.getCode()).isEqualTo("newCode");
    
    credentials.setState("newState");
    assertThat(credentials.getState()).isEqualTo("newState");
    
    credentials.setClientId("newClient");
    assertThat(credentials.getClientId()).isEqualTo("newClient");
    
    credentials.setRedirectUri("http://example.com/newcallback");
    assertThat(credentials.getRedirectUri()).isEqualTo("http://example.com/newcallback");
  }
}
