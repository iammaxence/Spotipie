package com.spotipie.exception;

import org.springframework.http.HttpStatus;

public class HttpExceptionHandler extends RuntimeException {
  private final HttpStatus statusCode;

  public HttpExceptionHandler(HttpStatus statusCode, String message) {
    super(message);
    this.statusCode = statusCode;
  }

  public HttpStatus getStatusCode() {
    return this.statusCode;
  }
}
