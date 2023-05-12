package com.spotipie.domain.entity;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class UserAuthorizationTests {

  private UserAuthorization userAuthorization;

  @BeforeEach
  void setUp() {
    userAuthorization = UserAuthorization.builder().clientId("client123").redirectUri("https://example.com/callback").showDialog(false).build();
  }

  @Nested
  class Getters {

    @Test
    void test_get_client_id() {
      assertThat(userAuthorization.getClientId()).isEqualTo("client123");
    }

    @Test
    void test_get_redirect_uri() {
      assertThat(userAuthorization.getRedirectUri()).isEqualTo("https://example.com/callback");
    }


    @Test
    void test_get_show_dialog() {
      assertThat(userAuthorization.isShowDialog()).isFalse();
    }
  }

  @Test
  void test_to_string() {
    assertThat(userAuthorization.toString()).hasToString("UserAuthorization(clientId=client123, redirectUri=https://example.com/callback, showDialog=false)");
  }
}

