package com.spotipie.domain.exception;

public class MissingMandatoryValueException extends RuntimeException {
  private final String fieldName;

  public MissingMandatoryValueException(String fieldName) {
    super(fieldName + " is mandatory");
    this.fieldName = fieldName;
  }

  public String getFieldName() {
    return fieldName;
  }
}
