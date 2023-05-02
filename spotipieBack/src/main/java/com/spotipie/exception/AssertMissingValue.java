package com.spotipie.exception;

public class AssertMissingValue extends RuntimeException {
  private final String fieldName;
  private final String value;

  public AssertMissingValue(String fieldName, String value) {
    super();
    this.fieldName = fieldName;
    this.value = value;
  }

  @Override
  public String getMessage() {
    return "The field " + fieldName + " is not valid : " + value;
  }
}
