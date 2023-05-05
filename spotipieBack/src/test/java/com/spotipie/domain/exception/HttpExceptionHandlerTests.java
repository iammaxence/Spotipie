package com.spotipie.domain.exception;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import com.spotipie.domain.exception.HttpExceptionHandler;

public class HttpExceptionHandlerTests {

  @Test
  void testGetStatusCode() {
    HttpExceptionHandler exception = new HttpExceptionHandler(HttpStatus.BAD_REQUEST, "Invalid input");
    assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
  }

}
