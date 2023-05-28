package com.spotipie.domain.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(HttpExceptionHandler.class)
  private ResponseEntity<String> handleException(HttpExceptionHandler httpExceptionHandler) {
    return ResponseEntity.status(httpExceptionHandler.getStatusCode()).body(httpExceptionHandler.getMessage());
  }
}
