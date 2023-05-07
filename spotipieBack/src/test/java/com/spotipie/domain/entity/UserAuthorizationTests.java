package com.spotipie.domain.entity;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class UserAuthorizationTests {

  private UserAuthorization userAuthorization;

  @BeforeEach
  void setUp() {
    userAuthorization = new UserAuthorization("client123", "read write", "https://example.com/callback");
  }

  @Nested
  class Getters {

    @Test
    void testGetClientId() {
      assertThat(userAuthorization.getClientId()).isEqualTo("client123");
    }

    @Test
    void testGetScope() {
      assertThat(userAuthorization.getScope()).isEqualTo("read write");
    }

    @Test
    void testGetRedirectUri() {
      assertThat(userAuthorization.getRedirectUri()).isEqualTo("https://example.com/callback");
    }
  }
}

