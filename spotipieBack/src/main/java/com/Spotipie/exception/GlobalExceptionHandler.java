package com.spotipie.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.spotipie.exception.song.AssertIsMissingField;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(value = AssertIsMissingField.class)
  public ResponseEntity<String> songException(AssertIsMissingField assertIsMissingField) {
    String message = "[Song] The field " + assertIsMissingField.getFieldName() + " is not valid : "
        + assertIsMissingField.getValue();
    return ResponseEntity.status(400).body(message);
  }
}
