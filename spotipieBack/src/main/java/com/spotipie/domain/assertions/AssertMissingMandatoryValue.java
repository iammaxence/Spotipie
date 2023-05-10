package com.spotipie.domain.assertions;

import java.util.List;

import com.spotipie.domain.exception.MissingMandatoryValueException;

public class AssertMissingMandatoryValue {

  private AssertMissingMandatoryValue() {
    throw new IllegalStateException("Utility class");
  }

  public static void verify(String fieldName, String value) {
    if(value == null || value.equals("")) {
      throw new MissingMandatoryValueException(fieldName);
    }
  }

  public static void verify(String fieldName, List<?> value ) {
    if(value == null || value.isEmpty()) {
      throw new MissingMandatoryValueException(fieldName);
    }
  }
}


