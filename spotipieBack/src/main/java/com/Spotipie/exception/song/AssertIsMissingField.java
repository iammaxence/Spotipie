package com.spotipie.exception.song;

public class AssertIsMissingField extends RuntimeException {
  private final String fieldName;
  private final String value;

  public AssertIsMissingField(String fieldName, String value) {
    super("Field " + fieldName + " is not valid: " + value);
    this.fieldName = fieldName;
    this.value = value;
  }

  public String getFieldName() {
    return fieldName;
  }

  public String getValue() {
    return value;
  }
}
