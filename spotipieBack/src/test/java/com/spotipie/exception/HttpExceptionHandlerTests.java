package com.spotipie.exception;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

public class HttpExceptionHandlerTests {

  @Test
  void testGetStatusCode() {
    HttpExceptionHandler exception = new HttpExceptionHandler(HttpStatus.BAD_REQUEST, "Invalid input");
    assertThat(exception.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
  }

}
