package com.spotipie.domain.entity;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

public class TokenTests {

  private Token token;

  @BeforeEach
  void setUp() {
    token = new Token("access123", "refresh456", 3600);
  }

  @Nested
  class Getters {

    @Test
    void testGetAccessToken() {
      assertThat(token.getAccessToken()).isEqualTo("access123");
    }

    @Test
    void testGetRefreshToken() {
      assertThat(token.getRefreshToken()).isEqualTo("refresh456");
    }

    @Test
    void testGetExpiresIn() {
      assertThat(token.getExpiresIn()).isEqualTo(3600);
    }
  }

  @Nested
  class Setters {

    @Test
    void testSetAccessToken() {
      token.setAccessToken("newAccess");
      assertThat(token.getAccessToken()).isEqualTo("newAccess");
    }

    @Test
    void testSetRefreshToken() {
      token.setRefreshToken("newRefresh");
      assertThat(token.getRefreshToken()).isEqualTo("newRefresh");
    }

    @Test
    void testSetExpiresIn() {
      token.setExpiresIn(7200);
      assertThat(token.getExpiresIn()).isEqualTo(7200);
    }
  }
}





