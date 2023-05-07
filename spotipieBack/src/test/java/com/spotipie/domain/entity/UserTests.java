package com.spotipie.domain.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;

import java.util.Collections;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import com.spotipie.domain.entity.User.UserBuilder;
import com.spotipie.domain.exception.MissingMandatoryValueException;

import nl.jqno.equalsverifier.EqualsVerifier;
import nl.jqno.equalsverifier.Warning;

class UserTests {

  @Nested
  class Exception {
    @Test
    void should_throw_exception_when_empty_user() {
      UserBuilder userBuilder = User.builder();
      assertThatExceptionOfType(MissingMandatoryValueException.class).isThrownBy(() -> userBuilder.build());
    }

    @Test
    void should_throw_exception_when_missing_pseudo() {
      UserBuilder userBuilder =  User.builder().email("email").country("country");
      assertThatExceptionOfType(MissingMandatoryValueException.class).isThrownBy(() -> userBuilder.build()).withMessage("pseudo is mandatory");
    }

    @Test
    void should_throw_exception_when_missing_country() {
      UserBuilder userBuilder = User.builder().pseudo("pseudo").email("email");
      assertThatExceptionOfType(MissingMandatoryValueException.class).isThrownBy(() -> userBuilder.build()).withMessage("country is mandatory");
    }
    @Test
    void should_throw_exception_when_missing_email() {
      UserBuilder userBuilder = User.builder().country("country").pseudo("pseudo");
      assertThatExceptionOfType(MissingMandatoryValueException.class).isThrownBy(() -> userBuilder.build()).withMessage("email is mandatory");
    }
    
  }

  @Test
  void should_build_user() {
      User user = User.builder()
              .email("test@example.com")
              .pseudo("testuser")
              .images(Collections.emptyList())
              .country("Canada")
              .build();

      assertThat(user).isNotNull()
              .hasFieldOrPropertyWithValue("email", "test@example.com")
              .hasFieldOrPropertyWithValue("pseudo", "testuser")
              .hasFieldOrPropertyWithValue("images", Collections.emptyList())
              .hasFieldOrPropertyWithValue("country", "Canada");
  }

  @Test
  void should_test_equals_user() {
    EqualsVerifier
      .forClass(User.class)
      .suppress(Warning.STRICT_INHERITANCE)
    .verify();
  }

  @Test
  void should_get_user_to_string() {
    User user = User.builder()
      .email("test@example.com")
      .pseudo("testuser")
      .images(Collections.emptyList())
      .country("Canada")
      .build();
    assertThat(user.toString()).isNotNull().isEqualTo("User(email=test@example.com, pseudo=testuser, images=[], country=Canada)");
  }
}
